/* ==========================================================================
   NADIA'S GAMES — 4 cute minigames (performance-optimized) ♡
   1) Balloon Pop  2) Flower Catch  3) Memory Match  4) Heart Tap
   ========================================================================== */
(() => {
  "use strict";

  const { $, $$, el, escapeHtml, reducedMotion } = window.DiaryMagic;

  const BEST_KEY = "nadiaGameBest";

  /* Game state */
  let currentGame = "balloon";
  let score = 0;
  let gameLoop = null;
  let spawnTimer = null;
  let timerInterval = null;
  let cleanupTimer = null;
  /* Object pools to reuse DOM nodes */
  let balloonPool = [];
  let heartPool = [];

  /* Elements */
  const tabs = $$(".game-tab");
  const gameAreas = { balloon: $("#gameBalloon"), catch: $("#gameCatch"), memory: $("#gameMemory"), reaction: $("#gameReaction") };
  const overlays = { balloon: $("#balloonOverlay"), catch: $("#catchOverlay"), memory: $("#memoryOverlay"), reaction: $("#reactionOverlay") };
  const scoreEl = $("#gameScore");
  const bestEl = $("#gameBest");
  const heartsEl = $("#gameHearts");

  /* === Utility === */
  function getBest(game) {
    try { return (JSON.parse(localStorage.getItem(BEST_KEY) || "{}"))[game] || 0; } catch { return 0; }
  }
  function setBest(game, val) {
    try {
      const d = JSON.parse(localStorage.getItem(BEST_KEY) || "{}");
      if (val > (d[game] || 0)) { d[game] = val; localStorage.setItem(BEST_KEY, JSON.stringify(d)); }
    } catch {}
  }
  function updateScore() { scoreEl.textContent = score; }
  function updateBest() { bestEl.textContent = getBest(currentGame); }
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  /* === Game switching === */
  function switchGame(game) {
    stopAllGames();
    currentGame = game;
    tabs.forEach(t => t.classList.toggle("active", t.dataset.game === game));
    Object.entries(gameAreas).forEach(([k, e]) => e.classList.toggle("active", k === game));
    score = 0; updateScore(); updateBest();
    heartsEl.textContent = "💖";
    overlays[game].classList.remove("hidden");
  }

  function stopAllGames() {
    if (gameLoop) { cancelAnimationFrame(gameLoop); gameLoop = null; }
    if (spawnTimer) { clearInterval(spawnTimer); spawnTimer = null; }
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
    if (cleanupTimer) { clearInterval(cleanupTimer); cleanupTimer = null; }
    balloonPool = [];
    heartPool = [];

    const area = $("#balloonPlayArea");
    if (area) area.textContent = "";
    const rArea = $("#reactionArea");
    if (rArea) rArea.querySelectorAll(".reaction-target,.reaction-timer").forEach(e => e.remove());
    const cv = $("#catchCanvas");
    if (cv) { const ctx = cv.getContext("2d"); ctx.clearRect(0, 0, cv.width, cv.height); }
    Object.values(overlays).forEach(o => o.classList.remove("hidden"));
  }

  tabs.forEach(t => t.addEventListener("click", () => switchGame(t.dataset.game)));

  /* === End game overlay === */
  function showEnd(emoji, title, resultText, btnText) {
    const overlay = overlays[currentGame];
    overlay.querySelector(".game-overlay-inner").innerHTML =
      `<div class="game-emoji-big">${emoji}</div><h2>${title}</h2><p class="game-result">${resultText}</p><button class="game-start-btn" type="button">${btnText}</button>`;
    overlay.querySelector(".game-start-btn").addEventListener("click", () => {
      overlay.classList.add("hidden");
      startGame(currentGame);
    });
    overlay.classList.remove("hidden");
  }

  /* ==================================================== 1. BALLOON POP
     Uses rAF loop instead of CSS animations for smooth 60fps.
     Balloons are DOM elements moved via transform (GPU-composited).
     Object pool recycles removed balloons.
     ================================================================= */
  const BALLOON_TYPES = [
    { emoji: "🎈", score: 1 }, { emoji: "🎈", score: 1 }, { emoji: "🎈", score: 1 },
    { emoji: "🦋", score: 3 }, { emoji: "🌷", score: 2 }, { emoji: "🌸", score: 2 },
    { emoji: "💕", score: 5 }, { emoji: "💣", score: -3 }, { emoji: "💣", score: -3 }
  ];
  const MAX_BALLOONS = 15;

  function startBalloonPop() {
    score = 0; updateScore();
    let missed = 0;
    const maxMissed = 8;
    const area = $("#balloonPlayArea");
    const W = area.clientWidth;
    const H = area.clientHeight;
    const balloons = [];

    function spawnBalloon() {
      if (balloons.length >= MAX_BALLOONS) return;
      const type = pick(BALLOON_TYPES);

      /* Reuse from pool or create */
      let node;
      if (balloonPool.length > 0) {
        node = balloonPool.pop();
        node.textContent = type.emoji;
        node.style.fontSize = rnd(32, 46) + "px";
        node.classList.remove("popped");
      } else {
        node = document.createElement("div");
        node.className = "balloon-game-item";
        node.textContent = type.emoji;
        node.style.fontSize = rnd(32, 46) + "px";
      }
      node.style.display = "";
      node.style.willChange = "transform";

      const b = {
        node,
        x: rnd(10, W - 50),
        y: H + 10,
        speed: rnd(1.2, 2.8),
        drift: rnd(-0.5, 0.5),
        wobble: Math.random() * Math.PI * 2,
        type,
        alive: true
      };
      node.style.transform = `translate(${b.x}px, ${b.y}px)`;

      /* Click handler — inline for zero closure overhead */
      node.onclick = (e) => {
        e.stopPropagation();
        if (!b.alive) return;
        b.alive = false;
        score = Math.max(0, score + type.score);
        updateScore();
        node.classList.add("popped");
        if (type.score >= 3) heartsEl.textContent = "💖💖";
        if (type.score >= 5) heartsEl.textContent = "💖💖💖";
        setTimeout(() => {
          node.style.display = "none";
          if (balloonPool.length < 10) balloonPool.push(node);
        }, 300);
      };

      area.appendChild(node);
      balloons.push(b);
    }

    /* Spawn on interval */
    spawnTimer = setInterval(spawnBalloon, 650);

    /* rAF game loop */
    let lastTime = performance.now();
    function loop(now) {
      const dt = Math.min((now - lastTime) / 16.67, 3); // normalize to 60fps, cap
      lastTime = now;

      for (let i = balloons.length - 1; i >= 0; i--) {
        const b = balloons[i];
        if (!b.alive) { balloons.splice(i, 1); continue; }

        b.y -= b.speed * dt;
        b.wobble += 0.03 * dt;
        b.x += Math.sin(b.wobble) * 0.4 * dt;

        b.node.style.transform = `translate(${b.x}px, ${b.y}px)`;

        /* Off screen = missed */
        if (b.y < -60) {
          b.alive = false;
          b.node.style.display = "none";
          if (balloonPool.length < 10) balloonPool.push(b.node);
          balloons.splice(i, 1);
          missed++;
          if (missed >= maxMissed) {
            clearInterval(spawnTimer);
            setBest("balloon", score);
            updateBest();
            showEnd("🎈", "Time's Up!", `You scored <strong style="color:var(--rose)">${score}</strong> points! 🎉`, "Play Again 🎈");
            return;
          }
        }
      }
      gameLoop = requestAnimationFrame(loop);
    }
    gameLoop = requestAnimationFrame(loop);
  }

  /* ==================================================== 2. FLOWER CATCH
     Canvas-based, pre-loads emoji sprites to offscreen canvas for speed.
     ================================================================= */
  const FLOWERS = ["🌷", "🌸", "🌺", "🌻", "🌼", "💐", "🌹", "🪷"];
  const BAD_ITEMS = ["🍂", "🥀"];

  /* Pre-render emoji to offscreen canvases */
  const emojiCache = new Map();
  function getEmojiSprite(emoji, size) {
    const key = emoji + size;
    if (emojiCache.has(key)) return emojiCache.get(key);
    const c = document.createElement("canvas");
    c.width = size; c.height = size;
    const ctx = c.getContext("2d");
    ctx.font = size + "px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(emoji, size / 2, size / 2);
    emojiCache.set(key, c);
    return c;
  }

  function startFlowerCatch() {
    score = 0; updateScore();
    let missed = 0;
    const maxMissed = 5;
    const cv = $("#catchCanvas");
    const ctx = cv.getContext("2d");

    /* Resize once */
    const wrap = cv.parentElement;
    cv.width = wrap.clientWidth;
    cv.height = wrap.clientHeight;

    const W = cv.width, H = cv.height;
    let basketX = W / 2;
    const basketW = 80;
    const basketY = H - 50;

    /* Pre-render basket */
    const basketSprite = getEmojiSprite("🧺", 40);

    /* Items pool (reuse objects) */
    const items = [];
    const ITEM_POOL_SIZE = 20;

    function spawnItem() {
      const isBad = Math.random() < 0.15;
      const emoji = isBad ? pick(BAD_ITEMS) : pick(FLOWERS);
      const size = Math.round(rnd(28, 36));
      const sprite = getEmojiSprite(emoji, size);

      items.push({
        x: rnd(30, W - 30), y: -30,
        speed: rnd(1.8, 3.2),
        sprite, size, bad: isBad, alive: true
      });
    }

    /* Touch/mouse */
    function moveBasket(clientX) {
      const r = cv.getBoundingClientRect();
      basketX = clamp(clientX - r.left, basketW / 2, W - basketW / 2);
    }
    cv.onmousemove = (e) => moveBasket(e.clientX);
    cv.ontouchmove = (e) => { e.preventDefault(); moveBasket(e.touches[0].clientX); };

    spawnTimer = setInterval(spawnItem, 750);

    /* Game loop */
    function loop() {
      ctx.clearRect(0, 0, W, H);

      for (let i = items.length - 1; i >= 0; i--) {
        const it = items[i];
        it.y += it.speed;

        /* Draw from cache */
        ctx.drawImage(it.sprite, it.x - it.size / 2, it.y - it.size / 2);

        /* Catch detection */
        if (it.y > basketY - 20 && it.y < basketY + 20 && Math.abs(it.x - basketX) < basketW / 2) {
          score = it.bad ? Math.max(0, score - 2) : score + 1;
          updateScore();
          items.splice(i, 1);
          continue;
        }
        if (it.y > H + 30) {
          if (!it.bad) missed++;
          items.splice(i, 1);
        }
      }

      /* Draw basket */
      ctx.drawImage(basketSprite, basketX - 20, basketY - 20);

      /* HUD */
      ctx.font = "14px Quicksand, sans-serif";
      ctx.fillStyle = "rgba(229,138,160,0.6)";
      ctx.textAlign = "left";
      ctx.fillText("Missed: " + missed + "/" + maxMissed, 12, 20);

      if (missed >= maxMissed) {
        clearInterval(spawnTimer);
        setBest("catch", score);
        updateBest();
        showEnd("🌷", "Game Over!", `You caught <strong style="color:var(--rose)">${score}</strong> flowers! 🌸`, "Play Again 🌷");
        return;
      }
      gameLoop = requestAnimationFrame(loop);
    }
    gameLoop = requestAnimationFrame(loop);
  }

  /* ==================================================== 3. MEMORY MATCH
     Pure CSS flip — already smooth. Just optimize JS side.
     ================================================================= */
  const MEMORY_EMOJIS = ["🐰", "🎀", "🌹", "🌷", "🦋", "💖", "🍓", "🌟"];

  function startMemoryMatch() {
    score = 0; updateScore();
    const grid = $("#memoryGrid");
    grid.textContent = "";

    const pairs = [...MEMORY_EMOJIS, ...MEMORY_EMOJIS];
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }

    let flipped = [];
    let matched = 0;
    let moves = 0;
    let lockBoard = false;

    /* Build all cards as fragment, append once */
    const frag = document.createDocumentFragment();
    pairs.forEach((emoji) => {
      const card = document.createElement("div");
      card.className = "memory-card";
      card.dataset.emoji = emoji;
      card.innerHTML = `<div class="memory-card-inner"><div class="memory-front">🎀</div><div class="memory-back">${emoji}</div></div>`;
      card.addEventListener("click", onCardClick);
      frag.appendChild(card);
    });
    grid.appendChild(frag);

    function onCardClick() {
      const card = this;
      if (lockBoard || card.classList.contains("flipped") || card.classList.contains("matched")) return;
      card.classList.add("flipped");
      flipped.push(card);

      if (flipped.length === 2) {
        moves++;
        lockBoard = true;
        const [a, b] = flipped;
        if (a.dataset.emoji === b.dataset.emoji) {
          /* Match — use shorter timeout for snappier feel */
          requestAnimationFrame(() => {
            a.classList.add("matched");
            b.classList.add("matched");
            matched++;
            score += 10;
            updateScore();
            heartsEl.textContent = "💖".repeat(Math.min(matched, 4));
            flipped = [];
            lockBoard = false;
            if (matched === MEMORY_EMOJIS.length) {
              setBest("memory", score);
              updateBest();
              const stars = moves <= 10 ? "⭐⭐⭐" : moves <= 16 ? "⭐⭐" : "⭐";
              showEnd("🎉", "Perfect Match!", `You matched all pairs in <strong style="color:var(--rose)">${moves} moves</strong>! ${stars}`, "Play Again 🃏");
            }
          });
        } else {
          setTimeout(() => {
            a.classList.remove("flipped");
            b.classList.remove("flipped");
            flipped = [];
            lockBoard = false;
          }, 600);
        }
      }
    }
  }

  /* ==================================================== 4. HEART TAP
     DOM-based but with max target cap + object pool + rAF cleanup.
     ================================================================= */
  const HEART_EMOJIS = ["💖", "💕", "💗", "💝", "❤️", "💘", "💟", "♥️"];
  const SPARKLE_EMOJIS = ["✨", "⭐", "💫"];
  const MAX_HEARTS = 12;

  function startHeartTap() {
    score = 0; updateScore();
    let timeLeft = 20;
    const area = $("#reactionArea");
    const rect = area.getBoundingClientRect();
    const W = rect.width, H = rect.height;
    const targets = [];

    /* Timer bar */
    let timerBar = area.querySelector(".reaction-timer");
    if (!timerBar) {
      timerBar = document.createElement("div");
      timerBar.className = "reaction-timer";
      timerBar.innerHTML = '<div class="reaction-timer-fill"></div>';
      area.appendChild(timerBar);
    } else {
      timerBar.style.display = "";
    }
    const timerFill = timerBar.querySelector(".reaction-timer-fill");
    timerFill.style.width = "100%";

    function spawnHeart() {
      if (timeLeft <= 0 || targets.length >= MAX_HEARTS) return;
      const isSparkle = Math.random() < 0.2;
      const emoji = isSparkle ? pick(SPARKLE_EMOJIS) : pick(HEART_EMOJIS);

      /* Reuse from pool */
      let node;
      if (heartPool.length > 0) {
        node = heartPool.pop();
        node.textContent = emoji;
        node.classList.remove("tapped");
      } else {
        node = document.createElement("div");
        node.className = "reaction-target";
      }
      node.style.display = "";
      node.style.left = rnd(10, W - 50) + "px";
      node.style.top = rnd(30, H - 50) + "px";
      node.style.willChange = "transform, opacity";

      const t = { node, alive: true, sparkle: isSparkle };
      targets.push(t);

      node.onclick = (e) => {
        e.stopPropagation();
        if (!t.alive) return;
        t.alive = false;
        score += isSparkle ? 5 : 1;
        updateScore();
        node.classList.add("tapped");
        setTimeout(() => {
          node.style.display = "none";
          if (heartPool.length < 10) heartPool.push(node);
        }, 250);
      };

      area.appendChild(node);

      /* Auto-despawn */
      t.timeout = setTimeout(() => {
        if (t.alive) {
          t.alive = false;
          node.style.display = "none";
          if (heartPool.length < 10) heartPool.push(node);
        }
      }, isSparkle ? 1200 : 2000);
    }

    spawnTimer = setInterval(spawnHeart, 350);

    /* rAF cleanup of dead targets from array */
    function cleanup() {
      for (let i = targets.length - 1; i >= 0; i--) {
        if (!targets[i].alive) targets.splice(i, 1);
      }
    }
    cleanupTimer = setInterval(cleanup, 500);

    /* Countdown */
    timerInterval = setInterval(() => {
      timeLeft--;
      timerFill.style.width = (timeLeft / 20 * 100) + "%";
      if (timeLeft <= 0) {
        clearInterval(spawnTimer);
        clearInterval(timerInterval);
        clearInterval(cleanupTimer);
        timerBar.style.display = "none";
        area.querySelectorAll(".reaction-target").forEach(e => e.remove());
        targets.length = 0;
        setBest("reaction", score);
        updateBest();
        showEnd("💓", "Time's Up!", `You tapped <strong style="color:var(--rose)">${score}</strong> hearts! 💕`, "Play Again ✨");
      }
    }, 1000);
  }

  /* ==================================================== Start dispatcher === */
  function startGame(game) {
    score = 0; updateScore();
    overlays[game].classList.add("hidden");
    if (spawnTimer) { clearInterval(spawnTimer); spawnTimer = null; }
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
    if (cleanupTimer) { clearInterval(cleanupTimer); cleanupTimer = null; }
    if (gameLoop) { cancelAnimationFrame(gameLoop); gameLoop = null; }

    switch (game) {
      case "balloon":  startBalloonPop();  break;
      case "catch":    startFlowerCatch(); break;
      case "memory":   startMemoryMatch(); break;
      case "reaction": startHeartTap();    break;
    }
  }

  /* Bind start buttons */
  $("#balloonStart").addEventListener("click", () => startGame("balloon"));
  $("#catchStart").addEventListener("click", () => startGame("catch"));
  $("#memoryStart").addEventListener("click", () => startGame("memory"));
  $("#reactionStart").addEventListener("click", () => startGame("reaction"));

  /* Init */
  updateBest();
  const footerText = $("#footerText");
  if (footerText && window.NADIA_DATA?.site?.footerLine) footerText.textContent = window.NADIA_DATA.site.footerLine;
  if (window.DiaryMagic?.initReveals) window.DiaryMagic.initReveals();
})();
