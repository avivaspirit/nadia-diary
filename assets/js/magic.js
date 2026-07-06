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

  /* ------------------------------------------------------------- expose */
  window.DiaryMagic = {
    $, $$, el, escapeHtml,
    stagger,
    initReveals,
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

  document.addEventListener("DOMContentLoaded", () => {
    initNavToggle();
    initPasscode();
    initSeasonal();
    initPageTransitions();
    initSparkles();
    initCardGlow();
    initParallax();
    initMusic();
    initBalloons();
    // initReveals is called by each page AFTER it renders dynamic content
  });
})();
