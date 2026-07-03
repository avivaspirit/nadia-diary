/* ==========================================================================
   NADIA'S GAMES — 4 cute minigames for the sweetest person ♡
   1) Balloon Pop  2) Flower Catch  3) Memory Match  4) Heart Tap
   ========================================================================== */
(() => {
  "use strict";

  const { $, $$, el, escapeHtml, reducedMotion } = window.DiaryMagic;

  /* Best scores per game in localStorage */
  const BEST_KEY = "nadiaGameBest";

  /* Game state */
  let currentGame = "balloon";
  let score = 0;
  let gameLoop = null;
  let spawnTimer = null;
  let timerInterval = null;

  /* Elements */
  const tabs = $$(".game-tab");
  const gameAreas = { balloon: $("#gameBalloon"), catch: $("#gameCatch"), memory: $("#gameMemory"), reaction: $("#gameReaction") };
  const overlays = { balloon: $("#balloonOverlay"), catch: $("#catchOverlay"), memory: $("#memoryOverlay"), reaction: $("#reactionOverlay") };
  const scoreEl = $("#gameScore");
  const bestEl = $("#gameBest");
  const heartsEl = $("#gameHearts");

  /* === Utility === */
  function getBest(game) {
    const data = JSON.parse(localStorage.getItem(BEST_KEY) || "{}");
    return data[game] || 0;
  }
  function setBest(game, val) {
    const data = JSON.parse(localStorage.getItem(BEST_KEY) || "{}");
    if (val > (data[game] || 0)) {
      data[game] = val;
      localStorage.setItem(BEST_KEY, JSON.stringify(data));
    }
  }
  function updateScore() { scoreEl.textContent = score; }
  function updateBest() { bestEl.textContent = getBest(currentGame); }
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  /* === Game switching === */
  function switchGame(game) {
    stopAllGames();
    currentGame = game;

    tabs.forEach(t => t.classList.toggle("active", t.dataset.game === game));
    Object.entries(gameAreas).forEach(([k, el]) => {
      el.classList.toggle("active", k === game);
    });

    score = 0;
    updateScore();
    updateBest();
    heartsEl.textContent = "💖";

    /* Show overlay */
    overlays[game].classList.remove("hidden");
  }

  function stopAllGames() {
    /* Clear all timers */
    if (gameLoop) cancelAnimationFrame(gameLoop);
    if (spawnTimer) clearInterval(spawnTimer);
    if (timerInterval) clearInterval(timerInterval);
    gameLoop = null; spawnTimer = null; timerInterval = null;

    /* Clear play areas */
    $("#balloonPlayArea").innerHTML = "";
    $("#reactionArea").querySelectorAll(".reaction-target").forEach(e => e.remove());
    const cv = $("#catchCanvas");
    const ctx = cv.getContext("2d");
    ctx.clearRect(0, 0, cv.width, cv.height);

    /* Hide overlays for all */
    Object.values(overlays).forEach(o => o.classList.remove("hidden"));
  }

  tabs.forEach(t => t.addEventListener("click", () => switchGame(t.dataset.game)));

  /* === End game overlay === */
  function showEnd(emoji, title, resultText, btnText) {
    const overlay = overlays[currentGame];
    overlay.querySelector(".game-overlay-inner").innerHTML = `
      <div class="game-emoji-big">${emoji}</div>
      <h2>${title}</h2>
      <p class="game-result">${resultText}</p>
      <button class="game-start-btn" type="button">${btnText}</button>
    `;
    overlay.querySelector(".game-start-btn").addEventListener("click", () => {
      overlay.classList.add("hidden");
      startGame(currentGame);
    });
    overlay.classList.remove("hidden");
  }

  /* ==================================================== 1. BALLOON POP */
  const BALLOON_TYPES = [
    { emoji: "🎈", score: 1 },
    { emoji: "🎈", score: 1 },
    { emoji: "🎈", score: 1 },
    { emoji: "🦋", score: 3 },
    { emoji: "🌷", score: 2 },
    { emoji: "🌸", score: 2 },
    { emoji: "💕", score: 5 },
    { emoji: "💣", score: -3 },
    { emoji: "💣", score: -3 }
  ];

  function startBalloonPop() {
    score = 0; updateScore();
    let missed = 0;
    const maxMissed = 8;
    const area = $("#balloonPlayArea");
    const rect = area.getBoundingClientRect();
    const width = rect.width;

    spawnTimer = setInterval(() => {
      if (missed >= maxMissed) return;

      const type = pick(BALLOON_TYPES);
      const balloon = document.createElement("div");
      balloon.className = "balloon-game-item";
      balloon.textContent = type.emoji;
      balloon.style.fontSize = rnd(32, 48) + "px";
      balloon.style.left = rnd(10, width - 50) + "px";
      balloon.style.top = (rect.height + 10) + "px";
      balloon.style.setProperty("--drift", rnd(-60, 60) + "px");
      const duration = rnd(3, 6);
      balloon.style.animationDuration = duration + "s";

      /* Track if missed */
      let popped = false;

      balloon.addEventListener("click", (e) => {
        e.stopPropagation();
        if (popped) return;
        popped = true;
        score += type.score;
        if (score < 0) score = 0;
        updateScore();
        balloon.classList.add("popped");

        /* Score popup */
        const popup = document.createElement("div");
        popup.className = "balloon-pop-score";
        popup.textContent = (type.score > 0 ? "+" : "") + type.score;
        popup.style.color = type.score > 0 ? "var(--rose)" : "#f44";
        popup.style.left = balloon.style.left;
        popup.style.top = balloon.style.top;
        area.appendChild(popup);
        setTimeout(() => popup.remove(), 800);

        /* Hearts display */
        if (type.score >= 3) heartsEl.textContent = "💖💖";
        if (type.score >= 5) heartsEl.textContent = "💖💖💖";

        setTimeout(() => balloon.remove(), 300);
      });

      /* Detect missed balloon (reached top) */
      area.appendChild(balloon);
      const missChecker = setTimeout(() => {
        if (!popped) {
          missed++;
          balloon.remove();
          if (type.score > 0) {
            /* Only count miss for positive balloons */
          }
          if (missed >= maxMissed) {
            clearInterval(spawnTimer);
            setBest("balloon", score);
            updateBest();
            showEnd("🎈", "Time's Up!", `You scored <strong style="color:var(--rose)">${score}</strong> points! 🎉`, "Play Again 🎈");
          }
        }
      }, duration * 1000);

      /* Cleanup checker if popped */
      balloon.addEventListener("click", () => clearTimeout(missChecker));

    }, 700);
  }

  /* ==================================================== 2. FLOWER CATCH */
  const FLOWERS = ["🌷", "🌸", "🌺", "🌻", "🌼", "💐", "🌹", "🪷"];
  const BAD_ITEMS = ["🍂", "🥀"];

  function startFlowerCatch() {
    score = 0; updateScore();
    let missed = 0;
    const maxMissed = 5;
    const cv = $("#catchCanvas");
    const ctx = cv.getContext("2d");

    /* Resize canvas */
    function resizeCanvas() {
      const wrap = cv.parentElement;
      cv.width = wrap.clientWidth;
      cv.height = wrap.clientHeight;
    }
    resizeCanvas();

    /* Basket */
    let basketX = cv.width / 2;
    const basketW = 80;
    const basketH = 40;
    const basketY = cv.height - 50;
    const basketEmoji = "🧺";

    /* Falling items */
    const items = [];

    /* Input */
    function moveBasket(clientX) {
      const rect = cv.getBoundingClientRect();
      basketX = clientX - rect.left;
      if (basketX < basketW / 2) basketX = basketW / 2;
      if (basketX > cv.width - basketW / 2) basketX = cv.width - basketW / 2;
    }
    cv.addEventListener("mousemove", (e) => moveBasket(e.clientX));
    cv.addEventListener("touchmove", (e) => { e.preventDefault(); moveBasket(e.touches[0].clientX); }, { passive: false });

    /* Spawn */
    spawnTimer = setInterval(() => {
      const isBad = Math.random() < 0.15;
      items.push({
        x: rnd(30, cv.width - 30),
        y: -30,
        emoji: isBad ? pick(BAD_ITEMS) : pick(FLOWERS),
        speed: rnd(1.5, 3.5),
        bad: isBad,
        size: rnd(28, 38)
      });
    }, 800);

    /* Game loop */
    function loop() {
      ctx.clearRect(0, 0, cv.width, cv.height);

      /* Draw items */
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        item.y += item.speed;
        ctx.font = item.size + "px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item.emoji, item.x, item.y);

        /* Check catch */
        if (item.y > basketY - 20 && item.y < basketY + 20 &&
            Math.abs(item.x - basketX) < basketW / 2) {
          if (item.bad) {
            score = Math.max(0, score - 2);
          } else {
            score += 1;
          }
          updateScore();
          items.splice(i, 1);
          continue;
        }

        /* Missed */
        if (item.y > cv.height) {
          if (!item.bad) missed++;
          items.splice(i, 1);
        }
      }

      /* Draw basket */
      ctx.font = "40px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(basketEmoji, basketX, basketY);

      /* Draw missed indicator */
      ctx.font = "14px sans-serif";
      ctx.fillStyle = "rgba(229,138,160,0.6)";
      ctx.textAlign = "left";
      ctx.fillText(`Missed: ${missed}/${maxMissed}`, 12, 20);

      if (missed >= maxMissed) {
        clearInterval(spawnTimer);
        setBest("catch", score);
        updateBest();
        showEnd("🌷", "Game Over!", `You caught <strong style="color:var(--rose)">${score}</strong> flowers! 🌸`, "Play Again 🌷");
        return;
      }

      gameLoop = requestAnimationFrame(loop);
    }
    loop();
  }

  /* ==================================================== 3. MEMORY MATCH */
  const MEMORY_EMOJIS = ["🐰", "🎀", "🌹", "🌷", "🦋", "💖", "🍓", "🌟"];

  function startMemoryMatch() {
    score = 0; updateScore();
    const grid = $("#memoryGrid");
    grid.innerHTML = "";

    /* Create pairs */
    const pairs = [...MEMORY_EMOJIS, ...MEMORY_EMOJIS];
    /* Shuffle */
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }

    let flipped = [];
    let matched = 0;
    let moves = 0;
    let lockBoard = false;

    pairs.forEach((emoji, idx) => {
      const card = document.createElement("div");
      card.className = "memory-card";
      card.dataset.emoji = emoji;
      card.dataset.idx = idx;
      card.innerHTML = `
        <div class="memory-card-inner">
          <div class="memory-front">🎀</div>
          <div class="memory-back">${emoji}</div>
        </div>
      `;

      card.addEventListener("click", () => {
        if (lockBoard) return;
        if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

        card.classList.add("flipped");
        flipped.push(card);

        if (flipped.length === 2) {
          moves++;
          lockBoard = true;

          const [a, b] = flipped;
          if (a.dataset.emoji === b.dataset.emoji) {
            /* Match */
            setTimeout(() => {
              a.classList.add("matched");
              b.classList.add("matched");
              matched++;
              score += 10;
              updateScore();
              heartsEl.textContent = "💖".repeat(Math.min(matched, 4));
              flipped = [];
              lockBoard = false;

              if (matched === MEMORY_EMOJIS.length) {
                /* Win */
                setBest("memory", score);
                updateBest();
                const stars = moves <= 10 ? "⭐⭐⭐" : moves <= 16 ? "⭐⭐" : "⭐";
                showEnd("🎉", "Perfect Match!", `You matched all pairs in <strong style="color:var(--rose)">${moves} moves</strong>! ${stars}`, "Play Again 🃏");
              }
            }, 300);
          } else {
            /* No match */
            setTimeout(() => {
              a.classList.remove("flipped");
              b.classList.remove("flipped");
              flipped = [];
              lockBoard = false;
            }, 800);
          }
        }
      });

      grid.appendChild(card);
    });
  }

  /* ==================================================== 4. HEART TAP */
  const HEART_EMOJIS = ["💖", "💕", "💗", "💝", "❤️", "💘", "💟", "♥️"];
  const SPARKLE_EMOJIS = ["✨", "⭐", "💫"];

  function startHeartTap() {
    score = 0; updateScore();
    let timeLeft = 20; /* 20 seconds */
    const area = $("#reactionArea");
    const rect = area.getBoundingClientRect();

    /* Timer bar */
    const timerBar = document.createElement("div");
    timerBar.className = "reaction-timer";
    timerBar.innerHTML = '<div class="reaction-timer-fill" style="width:100%"></div>';
    area.appendChild(timerBar);

    /* Spawn hearts */
    spawnTimer = setInterval(() => {
      if (timeLeft <= 0) return;
      const isSparkle = Math.random() < 0.2;
      const emoji = isSparkle ? pick(SPARKLE_EMOJIS) : pick(HEART_EMOJIS);

      const target = document.createElement("div");
      target.className = "reaction-target";
      target.textContent = emoji;
      target.style.fontSize = rnd(28, 44) + "px";
      target.style.left = rnd(10, rect.width - 50) + "px";
      target.style.top = rnd(20, rect.height - 50) + "px";

      let tapped = false;
      target.addEventListener("click", (e) => {
        e.stopPropagation();
        if (tapped) return;
        tapped = true;
        score += isSparkle ? 5 : 1;
        updateScore();
        target.classList.add("tapped");
        setTimeout(() => target.remove(), 300);
      });

      /* Auto-despawn */
      const life = isSparkle ? 1500 : 2500;
      setTimeout(() => {
        if (!tapped) target.remove();
      }, life);

      area.appendChild(target);
    }, 400);

    /* Timer countdown */
    timerInterval = setInterval(() => {
      timeLeft--;
      const fill = timerBar.querySelector(".reaction-timer-fill");
      if (fill) fill.style.width = (timeLeft / 20 * 100) + "%";

      if (timeLeft <= 0) {
        clearInterval(spawnTimer);
        clearInterval(timerInterval);
        timerBar.remove();
        area.querySelectorAll(".reaction-target").forEach(e => e.remove());
        setBest("reaction", score);
        updateBest();
        showEnd("💓", "Time's Up!", `You tapped <strong style="color:var(--rose)">${score}</strong> hearts! 💕`, "Play Again ✨");
      }
    }, 1000);
  }

  /* ==================================================== Start dispatcher */
  function startGame(game) {
    score = 0; updateScore();
    overlays[game].classList.add("hidden");

    /* Clean up any leftover */
    if (spawnTimer) clearInterval(spawnTimer);
    if (timerInterval) clearInterval(timerInterval);
    if (gameLoop) cancelAnimationFrame(gameLoop);

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
  if (footerText && window.NADIA_DATA?.site?.footerLine) {
    footerText.textContent = window.NADIA_DATA.site.footerLine;
  }
  if (window.DiaryMagic?.initReveals) {
    window.DiaryMagic.initReveals();
  }
})();
