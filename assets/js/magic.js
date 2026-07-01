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

  /* ------------------------------------------------------- music toggle */
  function initMusic() {
    const trackId = window.NADIA_DATA?.music?.spotifyId;
    if (!trackId) return;

    /* floating button */
    const btn = el("button", "music-toggle");
    btn.type = "button";
    btn.setAttribute("aria-label", "Open music player");
    btn.textContent = "🎵";
    document.body.appendChild(btn);

    /* floating player with Spotify embed */
    const player = el("div", "music-player");
    player.id = "musicPlayer";
    player.innerHTML =
      '<button class="music-player-close" aria-label="Close player">✕</button>' +
      '<iframe src="https://open.spotify.com/embed/track/' + trackId +
      '?utm_source=generator&theme=0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" ' +
      'loading="lazy"></iframe>';
    document.body.appendChild(player);

    const closeBtn = player.querySelector(".music-player-close");

    let open = false;
    btn.addEventListener("click", () => {
      open = !open;
      player.classList.toggle("open", open);
      btn.classList.toggle("playing", open);
      btn.textContent = open ? "🎶" : "🎵";
    });
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      open = false;
      player.classList.remove("open");
      btn.classList.remove("playing");
      btn.textContent = "🎵";
    });
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

  document.addEventListener("DOMContentLoaded", () => {
    initSeasonal();
    initPageTransitions();
    initSparkles();
    initCardGlow();
    initParallax();
    initMusic();
    // initReveals is called by each page AFTER it renders dynamic content
  });
})();
