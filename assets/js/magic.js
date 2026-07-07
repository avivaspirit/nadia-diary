/* ==========================================================================
   NADIA'S DIARY — shared magic: sparkles, reveals, lightbox, transitions
   ========================================================================== */
(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------- tiny helpers */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  /* --------------------------------------------------- page transitions */
  function initPageTransitions() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href");
      // only intercept same-site page links
      if (!href || !/\.html(\?|#|$)/.test(href) || link.target === "_blank") return;
      if (event.metaKey || event.ctrlKey || event.shiftKey) return;
      event.preventDefault();
      document.body.classList.add("page-leaving");
      setTimeout(() => { window.location.href = href; }, 240);
    });
    // restore if user navigates back via bfcache
    window.addEventListener("pageshow", () => document.body.classList.remove("page-leaving"));
  }

  /* ------------------------------------------------------ scroll reveal */
  function initReveals() {
    const targets = $$(".reveal");
    if (!targets.length) return;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    targets.forEach((t) => io.observe(t));
  }

  /* mark children of a container with staggered reveal delays */
  function stagger(container, step = 0.07, max = 0.6) {
    if (!container) return;
    Array.from(container.children).forEach((child, i) => {
      child.classList.add("reveal");
      child.style.setProperty("--reveal-delay", `${Math.min(i * step, max)}s`);
    });
  }

  /* ------------------------------------------------- card glow tracking */
  function initCardGlow() {
    $$(".preview-link-card").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
        card.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
      });
    });
  }

  /* -------------------------------------------------- sparkle canvas bg */
  function initSparkles() {
    if (reducedMotion) return;
    const canvas = el("canvas");
    canvas.id = "sparkleCanvas";
    document.body.prepend(canvas);
    const ctx = canvas.getContext("2d");

    let width = 0, height = 0, dpr = 1;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const COLORS = window.__DIARY_SEASON_COLORS || ["#f6c8d6", "#f3dde6", "#e8ddf5", "#f7e3c8"];
    const isSmall = window.innerWidth < 700;
    const COUNT = isSmall ? 16 : 26;

    function makeParticle(seedY) {
      const sparkle = Math.random() < 0.45;
      return {
        sparkle,
        x: Math.random() * width,
        y: seedY ? Math.random() * height : height + 20,
        size: sparkle ? 1.5 + Math.random() * 2.4 : 3 + Math.random() * 5,
        speed: 0.12 + Math.random() * 0.3,
        drift: (Math.random() - 0.5) * 0.25,
        phase: Math.random() * Math.PI * 2,
        twinkle: 0.5 + Math.random() * 0.5,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        alpha: 0.25 + Math.random() * 0.4
      };
    }

    const particles = Array.from({ length: COUNT }, () => makeParticle(true));

    function drawStar(x, y, r, alpha, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      // 4-point soft star
      ctx.moveTo(0, -r * 2);
      ctx.quadraticCurveTo(0, 0, r * 2, 0);
      ctx.quadraticCurveTo(0, 0, 0, r * 2);
      ctx.quadraticCurveTo(0, 0, -r * 2, 0);
      ctx.quadraticCurveTo(0, 0, 0, -r * 2);
      ctx.fill();
      ctx.restore();
    }

    let running = true;
    document.addEventListener("visibilitychange", () => {
      running = !document.hidden;
      if (running) requestAnimationFrame(tick);
    });

    let last = performance.now();
    function tick(now) {
      if (!running) return;
      const dt = Math.min((now - last) / 16.7, 3);
      last = now;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speed * dt;
        p.x += (p.drift + Math.sin(p.phase + now / 2400) * 0.15) * dt;
        if (p.y < -30 || p.x < -30 || p.x > width + 30) particles[i] = makeParticle(false);
        const tw = p.sparkle ? (0.5 + 0.5 * Math.sin(now / 350 * p.twinkle + p.phase)) : 1;
        if (p.sparkle) {
          drawStar(p.x, p.y, p.size, p.alpha * tw, p.color);
        } else {
          ctx.globalAlpha = p.alpha * 0.8;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size, p.size * 0.78, Math.sin(p.phase + now / 3000), 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ----------------------------------------------------------- lightbox */
  const lightbox = (() => {
    let node = null, imgEl = null, capEl = null;
    let items = [], index = 0;

    function build() {
      node = el("div", "lightbox");
      node.setAttribute("role", "dialog");
      node.setAttribute("aria-label", "Photo viewer");
      node.innerHTML = `
        <div class="lightbox-frame">
          <img alt="" />
          <div class="lightbox-caption"></div>
          <button class="lightbox-btn lightbox-prev" type="button" aria-label="Previous photo">‹</button>
          <button class="lightbox-btn lightbox-next" type="button" aria-label="Next photo">›</button>
          <button class="lightbox-btn lightbox-close" type="button" aria-label="Close">✕</button>
        </div>`;
      document.body.appendChild(node);
      imgEl = $("img", node);
      capEl = $(".lightbox-caption", node);

      $(".lightbox-close", node).addEventListener("click", close);
      $(".lightbox-prev", node).addEventListener("click", () => show(index - 1));
      $(".lightbox-next", node).addEventListener("click", () => show(index + 1));
      node.addEventListener("click", (e) => { if (e.target === node) close(); });
      document.addEventListener("keydown", (e) => {
        if (!node.classList.contains("is-open")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") show(index - 1);
        if (e.key === "ArrowRight") show(index + 1);
      });

      // swipe support
      let startX = null;
      const frame = $(".lightbox-frame", node);
      frame.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
      frame.addEventListener("touchend", (e) => {
        if (startX === null) return;
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 42) show(index + (dx < 0 ? 1 : -1));
        startX = null;
      }, { passive: true });
    }

    function show(i) {
      if (!items.length) return;
      index = (i + items.length) % items.length;
      const item = items[index];
      imgEl.src = item.src;
      imgEl.alt = item.alt || "";
      capEl.textContent = item.caption || "";
      const multi = items.length > 1;
      $(".lightbox-prev", node).style.display = multi ? "" : "none";
      $(".lightbox-next", node).style.display = multi ? "" : "none";
    }

    function open(list, startIndex = 0) {
      if (!node) build();
      items = list;
      show(startIndex);
      node.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function close() {
      node.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    return { open };
  })();

  /* ------------------------------------------------------- soft parallax */
  function initParallax() {
    if (reducedMotion) return;
    const layers = $$("[data-parallax]");
    if (!layers.length) return;
    let ticking = false;
    function update() {
      ticking = false;
      const vh = window.innerHeight;
      layers.forEach((layer) => {
        const rect = layer.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - vh / 2;
        const strength = parseFloat(layer.dataset.parallax) || 0.06;
        layer.style.translate = `0 ${(-center * strength).toFixed(1)}px`;
      });
    }
    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ------------------------------------------------------------ confetti */
  function burstConfetti(durationMs = 2800) {
    if (reducedMotion) return;
    const canvas = el("canvas");
    canvas.id = "confettiCanvas";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const W = window.innerWidth, H = window.innerHeight;

    const COLORS = ["#e58aa0", "#f6c8d6", "#d9a866", "#e8ddf5", "#fff3d9", "#cdeadd"];
    const SHAPES = ["rect", "circle", "heart"];
    const pieces = Array.from({ length: W < 700 ? 90 : 150 }, () => ({
      x: W / 2 + (Math.random() - 0.5) * W * 0.35,
      y: H * 0.55,
      vx: (Math.random() - 0.5) * 11,
      vy: -7 - Math.random() * 9,
      size: 5 + Math.random() * 6,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.25,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      shape: SHAPES[(Math.random() * SHAPES.length) | 0],
      wobble: Math.random() * Math.PI * 2
    }));

    function drawHeart(s) {
      ctx.beginPath();
      ctx.moveTo(0, s * 0.3);
      ctx.bezierCurveTo(-s, -s * 0.5, -s * 0.4, -s * 1.1, 0, -s * 0.4);
      ctx.bezierCurveTo(s * 0.4, -s * 1.1, s, -s * 0.5, 0, s * 0.3);
      ctx.fill();
    }

    const start = performance.now();
    function frame(now) {
      const t = now - start;
      ctx.clearRect(0, 0, W, H);
      const fade = t > durationMs ? Math.max(0, 1 - (t - durationMs) / 700) : 1;
      pieces.forEach((p) => {
        p.vy += 0.22;
        p.vx *= 0.992;
        p.x += p.vx + Math.sin(p.wobble + now / 300) * 0.6;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = fade * 0.95;
        ctx.fillStyle = p.color;
        if (p.shape === "rect") ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66);
        else if (p.shape === "circle") { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill(); }
        else drawHeart(p.size * 0.6);
        ctx.restore();
      });
      if (t < durationMs + 750) requestAnimationFrame(frame);
      else canvas.remove();
    }
    requestAnimationFrame(frame);
  }

  /* ------------------------------------------------------- seasonal themes */
  function initSeasonal() {
    const month = new Date().getMonth(); // 0-11
    let season;
    if (month >= 2 && month <= 4) season = "spring";
    else if (month >= 5 && month <= 7) season = "summer";
    else if (month >= 8 && month <= 10) season = "autumn";
    else season = "winter";
    document.body.classList.add("season-" + season);

    // seasonal sparkle colors
    const seasonColors = {
      spring: ["#f6c8d6", "#f3dde6", "#e8ddf5", "#f7e3c8"],
      summer: ["#f6c8d6", "#f3dde6", "#fce8c8", "#cdeadd"],
      autumn: ["#e5b58c", "#d9a866", "#e58aa0", "#f3ddb9"],
      winter: ["#dde6f0", "#e8e2f6", "#f3dde6", "#f6c8d6"]
    };
    // override sparkle colors based on season
    if (seasonColors[season]) {
      window.__DIARY_SEASON_COLORS = seasonColors[season];
    }
  }

  /* ------------------------------------------------------- music player (playlist) */
  function initMusic() {
    const music = window.NADIA_DATA?.music;
    if (!music) return;

    /* Support both old single-track and new playlist format */
    const tracks = music.tracks || [];
    if (!tracks.length && !music.spotifyId) return;
    const defaultId = music.defaultTrack || music.spotifyId || (tracks[0]?.id ?? "");
    let currentTrack = defaultId;

    /* floating button */
    const btn = el("button", "music-toggle");
    btn.type = "button";
    btn.setAttribute("aria-label", "Open music player");
    btn.textContent = music.emoji || "🎵";
    document.body.appendChild(btn);

    /* floating player */
    const player = el("div", "music-player");
    player.id = "musicPlayer";

    /* Build track list HTML */
    let trackListHtml = "";
    if (tracks.length) {
      trackListHtml = '<div class="mp-playlist-header">' +
        '<span class="mp-playlist-icon">playlist ♡</span>' +
        '<span class="mp-playlist-name">' + escapeHtml(music.playlistName || "Our Songs") + '</span>' +
      '</div>' +
      '<div class="mp-track-list" id="mpTrackList">' +
        tracks.map((t, i) =>
          '<div class="mp-track' + (t.id === currentTrack ? ' active' : '') + '" data-id="' + t.id + '" data-idx="' + i + '">' +
            '<span class="mp-track-num">' + (i + 1) + '</span>' +
            '<span class="mp-track-info">' +
              '<span class="mp-track-title">' + escapeHtml(t.title) + '</span>' +
              '<span class="mp-track-artist">' + escapeHtml(t.artist) + '</span>' +
            '</span>' +
            '<span class="mp-track-playing">' + (t.id === currentTrack ? '♪' : '') + '</span>' +
          '</div>'
        ).join("") +
      '</div>';
    }

    player.innerHTML =
      '<button class="music-player-close" aria-label="Close player">✕</button>' +
      '<div class="mp-embed-wrap">' +
        '<iframe id="mpIframe" src="https://open.spotify.com/embed/track/' + currentTrack +
        '?utm_source=generator&theme=0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" ' +
        'loading="lazy"></iframe>' +
      '</div>' +
      '<a class="mp-open-spotify" id="mpOpenSpotify" href="https://open.spotify.com/playlist/' + (music.playlistId || "") +
        '" target="_blank" rel="noopener">Open in Spotify app ♡</a>' +
      trackListHtml;
    document.body.appendChild(player);

    const closeBtn = player.querySelector(".music-player-close");
    const iframe = player.querySelector("#mpIframe");

    let isOpen = false;
    function openPlayer() {
      isOpen = true;
      player.classList.add("open");
      btn.classList.add("playing");
      btn.textContent = "🎶";
    }
    function closePlayer() {
      isOpen = false;
      player.classList.remove("open");
      btn.classList.remove("playing");
      btn.textContent = music.emoji || "🎵";
    }

    btn.addEventListener("click", () => {
      if (isOpen) closePlayer(); else openPlayer();
    });
    closeBtn.addEventListener("click", closePlayer);

    /* Track selection */
    if (tracks.length) {
      const trackList = player.querySelector("#mpTrackList");
      if (trackList) {
        trackList.addEventListener("click", (e) => {
          const row = e.target.closest(".mp-track");
          if (!row) return;
          const id = row.dataset.id;
          if (id === currentTrack) return; /* already playing */

          /* Update active states */
          trackList.querySelectorAll(".mp-track").forEach((r) => {
            r.classList.toggle("active", r.dataset.id === id);
            const playing = r.querySelector(".mp-track-playing");
            if (playing) playing.textContent = r.dataset.id === id ? "♪" : "";
          });

          currentTrack = id;
          /* Reload iframe with new track */
          iframe.src = "https://open.spotify.com/embed/track/" + id +
            "?utm_source=generator&theme=0";
          /* Update open-in-spotify link */
          var openLink = player.querySelector("#mpOpenSpotify");
          if (openLink) openLink.href = "https://open.spotify.com/track/" + id;
        });
      }
    }
  }

  /* ------------------------------------------------------- passcode gate */
  function initPasscode() {
    var PASSCODE = "larny";
    var STORAGE_KEY = "nadia-diary-unlocked";
    /* Already unlocked this browser */
    if (sessionStorage.getItem(STORAGE_KEY) === "yes") return;

    /* Create overlay */
    var gate = el("div", "passcode-gate");
    gate.innerHTML =
      '<div class="passcode-card">' +
        '<div class="passcode-icon">🎀</div>' +
        '<h2 class="passcode-title">Nadia\'s Diary</h2>' +
        '<p class="passcode-subtitle">type the secret word to come in ♡</p>' +
        '<input type="text" class="passcode-input" id="passcodeInput" ' +
          'placeholder="• • • • •" autocomplete="off" autocapitalize="off" ' +
          'spellcheck="false" maxlength="20" />' +
        '<button class="passcode-btn" id="passcodeBtn" type="button">Enter ✨</button>' +
        '<p class="passcode-hint" id="passcodeHint"></p>' +
        '<p class="passcode-hint2">psst… it starts with an L</p>' +
      '</div>';
    document.body.appendChild(gate);

    /* Lock body scroll */
    document.body.style.overflow = "hidden";

    var input = gate.querySelector("#passcodeInput");
    var btn = gate.querySelector("#passcodeBtn");
    var hint = gate.querySelector("#passcodeHint");

    function tryUnlock() {
      var val = input.value.trim().toLowerCase();
      if (val === PASSCODE) {
        gate.classList.add("unlocked");
        sessionStorage.setItem(STORAGE_KEY, "yes");
        document.body.style.overflow = "";
        setTimeout(function() { gate.remove(); }, 700);
        /* Trigger sparkles celebration */
        burstConfetti(2000);
      } else {
        hint.textContent = "hmm, that\'s not it… try again? ♡";
        input.classList.add("shake");
        setTimeout(function() { input.classList.remove("shake"); }, 400);
        input.value = "";
        input.focus();
      }
    }

    btn.addEventListener("click", tryUnlock);
    input.addEventListener("keydown", function(e) {
      if (e.key === "Enter") tryUnlock();
    });

    /* Focus input on load */
    setTimeout(function() { input.focus(); }, 200);
  }

  /* ------------------------------------------------------------- balloons */
  function initBalloons() {
    if (reducedMotion) return;
    // All pages EXCEPT Our Story
    if (/story\.html/.test(location.pathname)) return;

    const colors = [
      "linear-gradient(135deg,#ffd6e0,#ff8fa3)",
      "linear-gradient(135deg,#d4eaff,#8ecaff)",
      "linear-gradient(135deg,#fff0d4,#ffd56b)",
      "linear-gradient(135deg,#e8d4ff,#c08aff)",
      "linear-gradient(135deg,#d4ffe8,#6bd4a0)",
      "linear-gradient(135deg,#ffe0e0,#ff9b9b)"
    ];
    const layer = el("div", "balloon-layer");
    document.body.prepend(layer);

    const COUNT = 10;
    for (let i = 0; i < COUNT; i++) {
      const b = el("div", "balloon");
      const size = 32 + Math.random() * 36;
      const dur = 12 + Math.random() * 14;
      const delay = Math.random() * dur;
      const left = Math.random() * 100;
      const color = colors[Math.floor(Math.random() * colors.length)];
      b.style.left = left + "%";
      b.style.width = size + "px";
      b.style.height = (size * 1.25) + "px";
      b.style.background = color;
      b.style.animationDuration = dur + "s";
      b.style.animationDelay = -delay + "s";
      layer.appendChild(b);
    }
  }

  /* ------------------------------------------------- sparkle cursor trail */
  function initCursorTrail() {
    if (reducedMotion) return;
    if (window.matchMedia("(hover: none)").matches) return; // skip touch devices
    let lastX = 0, lastY = 0;
    const symbols = ["✦", "✧", "♡", "⋆", "·"];
    let throttle = 0;

    document.addEventListener("mousemove", (e) => {
      throttle++;
      if (throttle % 3 !== 0) return; // every 3rd move event
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      if (Math.abs(dx) + Math.abs(dy) < 8) return; // skip tiny moves
      lastX = e.clientX; lastY = e.clientY;

      const dot = el("span", "cursor-sparkle");
      dot.textContent = symbols[(Math.random() * symbols.length) | 0];
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 900);
    });
  }

  /* ----------------------------------------------- 3D tilt on preview cards */
  function init3DTilt() {
    if (reducedMotion) return;
    if (window.matchMedia("(hover: none)").matches) return;

    $$(".preview-link-card").forEach((card) => {
      if (card.dataset.tilted) return;
      card.dataset.tilted = "1";
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left, y = e.clientY - rect.top;
        const cx = rect.width / 2, cy = rect.height / 2;
        const rotateX = ((y - cy) / cy) * -6; // max 6deg
        const rotateY = ((x - cx) / cx) * 6;
        card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        card.style.transition = "transform 0.08s ease-out";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.transition = "transform 0.5s cubic-bezier(.25,.8,.25,1)";
      });
    });
  }

  /* ----------------------------------------------- magnetic nav pills */
  function initMagneticPills() {
    if (reducedMotion) return;
    if (window.matchMedia("(hover: none)").matches) return;

    $$(".site-header nav a").forEach((pill) => {
      if (pill.dataset.magnetic) return;
      pill.dataset.magnetic = "1";
      pill.addEventListener("mousemove", (e) => {
        const rect = pill.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        pill.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.06)`;
        pill.style.transition = "transform 0.15s ease-out";
      });
      pill.addEventListener("mouseleave", () => {
        pill.style.transform = "";
        pill.style.transition = "transform 0.4s cubic-bezier(.25,.8,.25,1)";
      });
    });
  }

  /* ----------------------------------------------- hero ribbon entrance */
  function initHeroEntrance() {
    if (reducedMotion) return;
    const hero = $("main .hero h1, main .hero-copy h1, main section h1, main > div:first-child h1");
    if (!hero) return;
    // Guard: skip if already animated (called from home.js after dynamic render)
    if (hero.dataset.entranced) return;
    hero.dataset.entranced = "1";
    hero.style.opacity = "0";
    hero.style.transform = "translateY(30px) scaleX(0.85)";
    hero.style.transition = "none";

    requestAnimationFrame(() => {
      setTimeout(() => {
        hero.style.transition = "opacity 0.9s cubic-bezier(.22,1,.36,1), transform 0.9s cubic-bezier(.22,1,.36,1)";
        hero.style.opacity = "1";
        hero.style.transform = "translateY(0) scaleX(1)";
      }, 600);
    });
  }

  /* ----------------------------------------------- floating wish bubbles */
  function initWishBubbles() {
    if (reducedMotion) return;
    if (!document.body.classList.contains("page-wish")) return;

    const container = el("div", "wish-bubble-layer");
    document.body.prepend(container);

    for (let i = 0; i < 12; i++) {
      const b = el("div", "wish-bubble");
      const size = 20 + Math.random() * 50;
      const dur = 8 + Math.random() * 12;
      b.style.width = size + "px";
      b.style.height = size + "px";
      b.style.left = Math.random() * 100 + "%";
      b.style.bottom = "-60px";
      b.style.animationDuration = dur + "s";
      b.style.animationDelay = Math.random() * dur + "s";
      b.style.opacity = 0.15 + Math.random() * 0.35;
      container.appendChild(b);
    }
  }

  /* ------------------------------------------------------------- expose */
  window.DiaryMagic = {
    $, $$, el, escapeHtml,
    stagger,
    initReveals,
    init3DTilt,
    initMagneticPills,
    initHeroEntrance,
    applyOverrides,
    lightbox,
    burstConfetti,
    reducedMotion
  };

  /* ──────────────────────── NAV TOGGLE (hamburger) ─────────────────────── */
  function initNavToggle() {
    const header = $(".site-header");
    if (!header) return;

    // Inject hamburger button before nav
    const nav = header.querySelector("nav");
    if (!nav) return;

    const btn = document.createElement("button");
    btn.className = "nav-toggle";
    btn.setAttribute("aria-label", "Toggle menu");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = "<span></span>";
    header.insertBefore(btn, nav);

    // Toggle on click
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      btn.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open);
    });

    // Close when a nav link is clicked (mobile UX)
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        btn.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!header.contains(e.target)) {
        nav.classList.remove("open");
        btn.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ===================================================================
     PHOTO EDITOR — swap any image from gallery
     =================================================================== */

  var PHOTOS_KEY = "nadia_photo_overrides";
  var EDIT_MODE = false;

  function getOverrides() {
    try { return JSON.parse(localStorage.getItem(PHOTOS_KEY) || "{}"); }
    catch (e) { return {}; }
  }

  function saveOverride(originalSrc, newSrc) {
    var overrides = getOverrides();
    overrides[originalSrc] = newSrc;
    try { localStorage.setItem(PHOTOS_KEY, JSON.stringify(overrides)); } catch (e) {}
  }

  function applyOverrides() {
    var overrides = getOverrides();
    var keys = Object.keys(overrides);
    if (!keys.length) return;
    $$("img").forEach(function (img) {
      var src = img.getAttribute("src");
      if (src && overrides[src]) {
        img.setAttribute("src", overrides[src]);
        img.setAttribute("data-original-src", src);
      }
    });
  }

  /* Build gallery photo list from NADIA_DATA */
  function getGalleryPhotos() {
    var data = window.NADIA_DATA || window.siteData;
    if (data && data.gallery && data.gallery.photos) {
      return data.gallery.photos.map(function (p) { return p.src; });
    }
    return [];
  }

  function initPhotoEditor() {
    /* Skip on gallery page itself */
    if (document.body.classList.contains("page-gallery")) return;

    /* Wait for page to render dynamic images */
    setTimeout(function () { applyOverrides(); }, 800);

    /* Create floating edit toggle button */
    var editBtn = el("button", "photo-edit-toggle");
    editBtn.setAttribute("type", "button");
    editBtn.setAttribute("aria-label", "Toggle photo edit mode");
    editBtn.textContent = "📸";
    editBtn.title = "Edit Photos";
    document.body.appendChild(editBtn);

    /* Create picker overlay */
    var picker = el("div", "photo-picker-overlay");
    picker.innerHTML =
      '<div class="photo-picker-panel">' +
        '<div class="photo-picker-header">' +
          '<span>🎀 Pick a Photo</span>' +
          '<button class="photo-picker-close" type="button">✕</button>' +
        '</div>' +
        '<div class="photo-picker-grid" id="photoPickerGrid"></div>' +
        '<p class="photo-picker-hint">tap a photo to replace the current one</p>' +
      '</div>';
    document.body.appendChild(picker);

    var pickerGrid = picker.querySelector("#photoPickerGrid");
    var pickerClose = picker.querySelector(".photo-picker-close");

    var currentTargetImg = null;
    var photosPopulated = false;

    /* Populate grid lazily — only when picker first opens */
    function ensurePhotosPopulated() {
      if (photosPopulated) return;
      photosPopulated = true;
      var photos = getGalleryPhotos();
      photos.forEach(function (src) {
        var thumb = el("button", "photo-picker-thumb");
        thumb.setAttribute("type", "button");
        thumb.style.backgroundImage = "url('" + src + "')";
        thumb.addEventListener("click", function () {
          if (currentTargetImg) {
            var origSrc = currentTargetImg.getAttribute("data-original-src") || currentTargetImg.getAttribute("src");
            saveOverride(origSrc, src);
            currentTargetImg.setAttribute("src", src);
            currentTargetImg.setAttribute("data-original-src", origSrc);
          }
          picker.classList.remove("show");
        });
        pickerGrid.appendChild(thumb);
      });
    }

    /* Close picker */
    pickerClose.addEventListener("click", function () {
      picker.classList.remove("show");
    });
    picker.addEventListener("click", function (e) {
      if (e.target === picker) picker.classList.remove("show");
    });

    /* Toggle edit mode */
    editBtn.addEventListener("click", function () {
      EDIT_MODE = !EDIT_MODE;
      editBtn.classList.toggle("active", EDIT_MODE);
      document.body.classList.toggle("photo-edit-mode", EDIT_MODE);
    });

    /* Click on images in edit mode → open picker */
    document.addEventListener("click", function (e) {
      if (!EDIT_MODE) return;
      if (e.target.closest(".photo-picker-overlay")) return;
      if (e.target.closest(".photo-edit-toggle")) return;

      var img = e.target.closest("img");
      if (!img) return;

      e.preventDefault();
      e.stopPropagation();
      currentTargetImg = img;
      ensurePhotosPopulated();
      picker.classList.add("show");
    });
  }

  /* ========================================== ORIGINKIT-INSPIRED EFFECTS == */

  /* ----------------------------------------------- rose petal fall (birthday) */
  function initRosePetals() {
    if (reducedMotion) return;
    if (!/birthday/.test(location.pathname)) return;

    var canvas = document.createElement("canvas");
    canvas.className = "petal-canvas";
    canvas.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:60;";
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");

    var W, H, dpr;
    function resize() {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    var PETAL_COLORS = [
      "#ff6b8a",  // deep rose
      "#ff8fa3",  // pink
      "#ffb6c1",  // light pink
      "#ff9a6b",  // peach
      "#e8557a",  // dark rose
      "#ffc0cb",  // pale pink
    ];

    var COUNT = 30;
    var petals = [];
    for (var i = 0; i < COUNT; i++) {
      petals.push({
        x: Math.random() * W,
        y: Math.random() * H - H,
        size: 14 + Math.random() * 16,
        speedY: 0.5 + Math.random() * 1.0,
        speedX: -0.4 + Math.random() * 0.8,
        swayAmp: 0.8 + Math.random() * 2,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.015 + Math.random() * 0.025,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: -0.03 + Math.random() * 0.06,
        color: PETAL_COLORS[(Math.random() * PETAL_COLORS.length) | 0],
        opacity: 0.7 + Math.random() * 0.3,
      });
    }

    function drawPetal(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      // Petal shape: two overlapping arcs for natural petal look
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
      ctx.fill();

      // Inner shading — darker center
      ctx.globalAlpha = p.opacity * 0.3;
      ctx.fillStyle = "rgba(200,50,80,1)";
      ctx.beginPath();
      ctx.ellipse(0, p.size * 0.2, p.size * 0.25, p.size * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Highlight — bright tip
      ctx.globalAlpha = p.opacity * 0.5;
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.beginPath();
      ctx.ellipse(0, -p.size * 0.4, p.size * 0.15, p.size * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < petals.length; i++) {
        var p = petals[i];
        p.y += p.speedY;
        p.swayPhase += p.swaySpeed;
        p.x += p.speedX + Math.sin(p.swayPhase) * p.swayAmp * 0.4;
        p.rotation += p.rotSpeed;
        if (p.y > H + 30) {
          p.y = -30;
          p.x = Math.random() * W;
        }
        if (p.x < -40) p.x = W + 40;
        if (p.x > W + 40) p.x = -40;
        drawPetal(p);
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ----------------------------------------------- glitter wrap (all pages) */
  // Bold gold/rose sparkles visible on light backgrounds
  function initGlitterWrap() {
    if (reducedMotion) return;
    if (/gallery/.test(location.pathname)) return;

    var canvas = document.createElement("canvas");
    canvas.className = "glitter-canvas";
    // NO mix-blend-mode — use normal alpha so it's visible on pink/white
    canvas.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:58;";
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");

    var W, H, dpr;
    function resize() {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    var COUNT = 50;
    var sparkles = [];
    for (var i = 0; i < COUNT; i++) {
      sparkles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        size: 1.5 + Math.random() * 3,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.015 + Math.random() * 0.035,
        driftX: -0.2 + Math.random() * 0.4,
        driftY: -0.15 + Math.random() * 0.25,
        baseOpacity: 0.4 + Math.random() * 0.5,
        // Gold dominant, some rose, some deep pink
        type: Math.random() < 0.55 ? "gold" : (Math.random() < 0.5 ? "rose" : "pink"),
      });
    }

    function drawSparkle(s) {
      var brightness = 0.2 + Math.abs(Math.sin(s.twinklePhase)) * 0.8;
      var opacity = s.baseOpacity * brightness;
      if (opacity < 0.05) return;

      var color, glowColor;
      if (s.type === "gold") {
        color = "rgba(255,200,60," + opacity + ")";
        glowColor = "rgba(255,180,30,0)";
      } else if (s.type === "rose") {
        color = "rgba(255,130,160," + opacity + ")";
        glowColor = "rgba(255,100,130,0)";
      } else {
        color = "rgba(230,80,120," + opacity + ")";
        glowColor = "rgba(200,50,100,0)";
      }

      ctx.save();

      // Glow halo — soft radial gradient
      var glowSize = s.size * 5;
      var grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowSize);
      grad.addColorStop(0, color);
      grad.addColorStop(0.5, s.type === "gold"
        ? "rgba(255,200,60," + (opacity * 0.2) + ")"
        : (s.type === "rose"
          ? "rgba(255,130,160," + (opacity * 0.2) + ")"
          : "rgba(230,80,120," + (opacity * 0.2) + ")"));
      grad.addColorStop(1, glowColor);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(s.x, s.y, glowSize, 0, Math.PI * 2);
      ctx.fill();

      // Bright core
      ctx.fillStyle = s.type === "gold"
        ? "rgba(255,235,150," + opacity + ")"
        : (s.type === "rose"
          ? "rgba(255,200,210," + opacity + ")"
          : "rgba(255,170,190," + opacity + ")");
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();

      // Cross sparkle rays for bigger twinkles
      if (s.size > 2 && brightness > 0.5) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        var r = s.size * 4;
        ctx.beginPath();
        ctx.moveTo(s.x - r, s.y);
        ctx.lineTo(s.x + r, s.y);
        ctx.moveTo(s.x, s.y - r);
        ctx.lineTo(s.x, s.y + r);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Fade out after 6 seconds, remove after 8
    setTimeout(function() {
      canvas.style.transition = "opacity 2s ease-out";
      canvas.style.opacity = "0";
      setTimeout(function() { canvas.remove(); }, 2000);
    }, 6000);

    function animate() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < sparkles.length; i++) {
        var s = sparkles[i];
        s.twinklePhase += s.twinkleSpeed;
        s.x += s.driftX;
        s.y += s.driftY;
        if (s.x < -10) s.x = W + 10;
        if (s.x > W + 10) s.x = -10;
        if (s.y < -10) s.y = H + 10;
        if (s.y > H + 10) s.y = -10;
        drawSparkle(s);
      }
      if (canvas.parentNode) requestAnimationFrame(animate);
    }
    animate();
  }

  /* ----------------------------------------------- star burst (story page) */
  // Golden radial glow emanating from bottom-center
  function initStarBurst() {
    if (reducedMotion) return;
    if (!/story|index|^\//.test(location.pathname)) return;

    var canvas = document.createElement("canvas");
    canvas.className = "starburst-canvas";
    canvas.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:57;";
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");

    var W, H, dpr;
    function resize() {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // Radial spokes from bottom-center
    var SPOKES = 30;
    var spokeParticles = [];
    for (var i = 0; i < SPOKES; i++) {
      var angle = -Math.PI / 2 + (-0.7 + (i / (SPOKES - 1)) * 1.4); // wider fan upward
      for (var j = 0; j < 12; j++) {
        spokeParticles.push({
          angle: angle,
          dist: 30 + j * 35 + Math.random() * 25,
          speed: 0.4 + Math.random() * 0.6,
          size: 1.5 + Math.random() * 3.5,
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.02 + Math.random() * 0.03,
        });
      }
    }

    // Fade out after 8 seconds, remove after 10
    setTimeout(function() {
      canvas.style.transition = "opacity 2s ease-out";
      canvas.style.opacity = "0";
      setTimeout(function() { canvas.remove(); }, 2000);
    }, 8000);

    var frameNum = 0;
    function animate() {
      frameNum++;
      ctx.clearRect(0, 0, W, H);

      var cx = W / 2;
      var cy = H + 20; // bottom center

      // Central glow bloom
      var bloomGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 300);
      bloomGrad.addColorStop(0, "rgba(255,200,80,0.25)");
      bloomGrad.addColorStop(0.3, "rgba(255,180,60,0.1)");
      bloomGrad.addColorStop(1, "rgba(255,150,50,0)");
      ctx.fillStyle = bloomGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 300, 0, Math.PI * 2);
      ctx.fill();

      // Spoke particles
      for (var i = 0; i < spokeParticles.length; i++) {
        var sp = spokeParticles[i];
        sp.dist += sp.speed;
        sp.phase += sp.twinkleSpeed;
        // Recycle when too far
        if (sp.dist > Math.max(W, H) * 0.7) {
          sp.dist = 50 + Math.random() * 30;
        }

        var px = cx + Math.cos(sp.angle) * sp.dist;
        var py = cy + Math.sin(sp.angle) * sp.dist;
        var brightness = 0.3 + Math.abs(Math.sin(sp.phase)) * 0.7;
        var fadeDist = 1 - Math.min(1, sp.dist / (Math.max(W, H) * 0.6));
        var opacity = brightness * fadeDist * 0.6;

        if (opacity < 0.03) continue;

        ctx.fillStyle = "rgba(255,210,80," + opacity + ")";
        ctx.beginPath();
        ctx.arc(px, py, sp.size, 0, Math.PI * 2);
        ctx.fill();

        // Soft glow
        var sg = ctx.createRadialGradient(px, py, 0, px, py, sp.size * 4);
        sg.addColorStop(0, "rgba(255,200,60," + (opacity * 0.5) + ")");
        sg.addColorStop(1, "rgba(255,150,50,0)");
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.arc(px, py, sp.size * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      if (canvas.parentNode) requestAnimationFrame(animate);
    }
    animate();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNavToggle();
    initPasscode();
    initSeasonal();
    initPageTransitions();
    initSparkles();
    initCardGlow();
    initCursorTrail();
    init3DTilt();
    initMagneticPills();
    initHeroEntrance();
    initWishBubbles();
    initParallax();
    initMusic();
    initBalloons();
    initPhotoEditor();
    // Originkit-inspired effects — wrapped in try-catch so one failure doesn't block others
    try { initRosePetals(); } catch(e) { console.warn("petals:", e.message); }
    try { initGlitterWrap(); } catch(e) { console.warn("glitter:", e.message); }
    try { initStarBurst(); } catch(e) { console.warn("starburst:", e.message); }
    // initReveals is called by each page AFTER it renders dynamic content
  });
})();