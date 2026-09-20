/* ==========================================================================
   HAPPY ANNIVERSARY 💌 — love timer, letters, reasons, polaroid scrapbook
   ========================================================================== */
(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const FIRST_DAY = (window.NADIA_DATA && window.NADIA_DATA.site && window.NADIA_DATA.site.firstDay) || "2026-05-21";
  const DATA = (window.NADIA_DATA && window.NADIA_DATA.anniversary) || {};

  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[c]);
  }

  /* ------------------------------------------------------------ love timer */
  function startCounter() {
    const [y, m, d] = FIRST_DAY.split("-").map(Number);
    const start = new Date(y, m - 1, d);

    const since = $("#annivSinceDate");
    if (since) since.textContent = start.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    function set(sel, val) { const el = $(sel); if (el) el.textContent = val; }

    function tick() {
      const now = new Date();
      const ms = now - start;
      const totalDays = Math.max(0, Math.floor(ms / 86400000));

      /* whole months since day 1, plus the leftover days */
      let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
      let anchor = new Date(start.getFullYear(), start.getMonth() + months, start.getDate());
      if (anchor > now) {
        months -= 1;
        anchor = new Date(start.getFullYear(), start.getMonth() + months, start.getDate());
      }
      const extraDays = Math.max(0, Math.floor((now - anchor) / 86400000));

      set("#annivMonths", months);
      set("#annivMdDays", extraDays);
      set("#annivDays", totalDays.toLocaleString("en-US"));
      set("#annivWeeks", Math.floor(totalDays / 7).toLocaleString("en-US"));
      set("#annivHours", Math.floor(ms / 3600000).toLocaleString("en-US"));
      set("#annivMinutes", Math.floor(ms / 60000).toLocaleString("en-US"));

      /* progress to the next yearly anniversary */
      let next = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      while (next <= now) next = new Date(next.getFullYear() + 1, next.getMonth(), next.getDate());
      const prev = new Date(next.getFullYear() - 1, next.getMonth(), next.getDate());
      const yearLen = (next - prev) / 86400000;
      const done = (now - prev) / 86400000;
      const pct = Math.min(100, Math.max(0, (done / yearLen) * 100));
      const daysToNext = Math.ceil((next - now) / 86400000);
      const nextStr = next.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

      const fill = $("#annivProgressFill");
      if (fill) setTimeout(() => { fill.style.width = pct.toFixed(1) + "%"; }, 400);
      const label = $("#annivProgressLabel");
      if (label) {
        const yearNo = Math.floor(months / 12) + 1;
        label.textContent = "♡ " + pct.toFixed(1) + "% of year no." + yearNo +
          " of us — " + daysToNext + (daysToNext === 1 ? " day" : " days") + " until " + nextStr + " ♡";
      }

      /* milestone chips — every 100 days of us */
      const chips = $("#annivChips");
      if (chips) {
        const items = [];
        let mstone = 100;
        while (mstone <= totalDays && items.length < 4) { items.push({ n: mstone, passed: true }); mstone += 100; }
        while (items.length > 3) items.shift();
        items.push({ n: mstone, passed: false, left: mstone - totalDays });
        chips.innerHTML = items.map(it => it.passed
          ? '<span class="anniv-chip">✓ ' + it.n + " days</span>"
          : '<span class="anniv-chip next">♡ ' + it.n + " days — in " + it.left + (it.left === 1 ? " day" : " days") + "</span>"
        ).join("");
      }

      const nextEl = $("#annivNextAnniv");
      if (nextEl) {
        nextEl.textContent = "Next anniversary: " + nextStr + " — " +
          daysToNext + (daysToNext === 1 ? " day" : " days") + " from now 💫";
      }

      window.__annivQA = { months, extraDays, totalDays, pct: +pct.toFixed(1), daysToNext };
    }

    tick();
    setInterval(tick, 30000);
  }

  /* ------------------------------------------------------------ mini card */
  function buildMiniCard() {
    const box = $("#annivMiniCard");
    if (!box) return;
    const lines = (DATA.miniCard && DATA.miniCard.lines) || [];
    box.innerHTML = lines.map(l => `<p class="anniv-mini-line">${escapeHtml(l)}</p>`).join("");
  }

  /* ------------------------------------------------------------ letters */
  function buildLetters() {
    const grid = $("#annivEnvelopeGrid");
    if (!grid) return;
    const letters = DATA.letters || [];

    grid.innerHTML = letters.map(letter => {
      const photosHtml = (letter.photos || []).map((photo, i) => `
        <figure class="polaroid" data-photo-index="${i}" style="--tilt:${i % 2 === 0 ? -3 : 3}deg; margin:0;">
          <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt || "")}" loading="lazy" decoding="async" />
          ${photo.caption ? `<figcaption>${escapeHtml(photo.caption)}</figcaption>` : ""}
        </figure>`).join("");

      return `
      <div class="envelope-card reveal is-visible">
        <button class="envelope-cover" type="button" aria-expanded="false" aria-label="Open the letter: ${escapeHtml(letter.title)}">
          <span class="env-body" aria-hidden="true"></span>
          <span class="env-letter-peek" aria-hidden="true">a little secret ♡</span>
          <span class="env-flap" aria-hidden="true"></span>
          <span class="env-seal" aria-hidden="true">${escapeHtml(letter.seal)}</span>
          <span class="env-label">
            <strong>${escapeHtml(letter.title)}</strong>
            <span>tap to open</span>
          </span>
        </button>
        <article class="wish-card">
          <div class="wish-card-inner">
            <span class="wish-sticker" aria-hidden="true">${escapeHtml(letter.sticker)}</span>
            <h3>${escapeHtml(letter.title)}</h3>
            <div class="wish-text">${(letter.paragraphs || []).map(p => `<p>${escapeHtml(p)}</p>`).join("")}</div>
            <div class="wish-photos">${photosHtml}</div>
          </div>
          <button class="close-envelope" type="button">close letter</button>
        </article>
      </div>`;
    }).join("");

    $$(".envelope-card", grid).forEach(card => {
      const cover = $(".envelope-cover", card);
      const close = $(".close-envelope", card);
      if (cover) cover.addEventListener("click", () => {
        card.classList.add("is-open");
        cover.setAttribute("aria-expanded", "true");
      });
      if (close) close.addEventListener("click", () => {
        card.classList.remove("is-open");
        cover.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ------------------------------------------------------------ reasons */
  function buildReasons() {
    const grid = $("#annivReasonsGrid");
    if (!grid) return;
    const reasons = DATA.reasons || [];
    grid.innerHTML = reasons.map((r, i) => `
      <div class="anniv-reason-card" style="--d:${i * 70}ms">
        <span class="anniv-reason-emoji" aria-hidden="true">${escapeHtml(r.emoji)}</span>
        <p>${escapeHtml(r.text)}</p>
      </div>`).join("");
  }

  /* ------------------------------------------------------- polaroids */
  function buildPolaroids() {
    const wall = $("#annivPolaroidWall");
    if (!wall) return;
    let photos = DATA.photos || [];
    const extra = (DATA.couplePhotos || []).map(p => (typeof p === "string" ? { src: p } : p));
    photos = photos.concat(extra);

    const render = () => {
      const shown = photos.slice(0, shownCount);
      wall.innerHTML = shown.map((photo, i) => `
      <figure class="polaroid" style="--tilt:${(i % 2 === 0 ? -1 : 1) * (2 + (i % 3))}deg;">
        <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt || "Us together")}" loading="lazy" decoding="async" />
        ${photo.caption ? `<figcaption>${escapeHtml(photo.caption)}</figcaption>` : ""}
      </figure>`).join("");

      const more = $("#annivMoreBtn");
      if (more) more.style.display = shownCount >= photos.length ? "none" : "";
    };

    const shownCount = 12;
    render();

    const moreBtn = $("#annivMoreBtn");
    if (moreBtn) {
      let count = shownCount;
      moreBtn.addEventListener("click", () => {
        count += 12;
        const shown = photos.slice(0, count);
        wall.innerHTML = shown.map((photo, i) => `
        <figure class="polaroid" style="--tilt:${(i % 2 === 0 ? -1 : 1) * (2 + (i % 3))}deg;">
          <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt || "Us together")}" loading="lazy" decoding="async" />
          ${photo.caption ? `<figcaption>${escapeHtml(photo.caption)}</figcaption>` : ""}
        </figure>`).join("");
        if (count >= photos.length) moreBtn.style.display = "none";
      });
    }

    /* tap to open lightbox — delegate on wall */
    wall.addEventListener("click", (ev) => {
      const fig = ev.target.closest("figure.polaroid");
      if (!fig) return;
      const idx = Array.prototype.indexOf.call(wall.querySelectorAll("figure.polaroid"), fig);
      const photo = photos[idx];
      if (photo && window.DiaryMagic && window.DiaryMagic.lightbox) {
        window.DiaryMagic.lightbox(photo.src, photo.alt || "");
      }
    });
  }

  /* ------------------------------------------------------------ celebrate */
  function bindCelebrate() {
    const btn = $("#annivCelebrateBtn");
    if (!btn) return;
    btn.addEventListener("click", () => {
      if (window.DiaryMagic && window.DiaryMagic.burstConfetti) {
        window.DiaryMagic.burstConfetti();
        setTimeout(() => window.DiaryMagic.burstConfetti(), 450);
        setTimeout(() => window.DiaryMagic.burstConfetti(), 900);
      }
      const card = $(".anniv-counter-card");
      if (card) {
        card.classList.remove("anniv-pop");
        void card.offsetWidth;
        card.classList.add("anniv-pop");
      }
    });
  }

  /* -------------------------------------------------- cuteness upgrades */
  function initCuteness() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* 1) 3D tilt on the love-timer card (desktop hover only) */
    if (!window.matchMedia("(hover: none)").matches) {
      const card = $(".anniv-counter-card");
      if (card) {
        card.addEventListener("mousemove", (e) => {
          const r = card.getBoundingClientRect();
          const rx = ((e.clientY - r.top) / r.height - 0.5) * -5;
          const ry = ((e.clientX - r.left) / r.width - 0.5) * 5;
          card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        });
        card.addEventListener("mouseleave", () => {
          card.style.transition = "transform 0.6s cubic-bezier(.25,.8,.25,1)";
          card.style.transform = "";
          setTimeout(() => card.style.transition = "", 650);
        });
      }
    }

    /* 2) floating hearts + sparkles background (canvas, auto-fade, z-index low) */
    const canvas = document.createElement("canvas");
    canvas.id = "annivFloatCanvas";
    canvas.style.cssText = "position:fixed;inset:0;width:100%;pointer-events:none;z-index:1;";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    let W, H, parts = [];
    const HEARTS = ["💗", "💖", "🩷", "✨", "💕"];
    function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
    resize();
    addEventListener("resize", resize);

    function spawn(n) {
      for (let i = 0; i < n; i++) {
        parts.push({
          x: Math.random() * W,
          y: H + 20,
          s: 12 + Math.random() * 16,
          v: 0.35 + Math.random() * 0.6,
          sway: Math.random() * Math.PI * 2,
          swayV: 0.008 + Math.random() * 0.015,
          e: HEARTS[Math.floor(Math.random() * HEARTS.length)],
          a: 0.55 + Math.random() * 0.35,
          wob: Math.random() * Math.PI * 2
        });
      }
    }
    spawn(14);
    let t = 0, alive = true;
    (function loop() {
      if (!alive) return;
      t++;
      ctx.clearRect(0, 0, W, H);
      if (t < 520) { if (t % 46 === 0) spawn(2); }
      parts.forEach(p => {
        p.y -= p.v;
        p.sway += p.swayV;
        p.wob += 0.03;
        const x = p.x + Math.sin(p.sway) * 26;
        const s = p.s * (1 + Math.sin(p.wob) * 0.07);
        ctx.globalAlpha = p.a * Math.min(1, t / 40);
        ctx.font = s + "px serif";
        ctx.fillText(p.e, x, p.y);
      });
      ctx.globalAlpha = 1;
      parts = parts.filter(p => p.y > -40);
      if (t > 700 && parts.length === 0) { canvas.remove(); alive = false; return; }
      requestAnimationFrame(loop);
    })();

    /* 3) burst hearts on Celebrate click (extra, after confetti) */
    const btn = $("#annivCelebrateBtn");
    if (btn) {
      btn.addEventListener("click", () => {
        for (let k = 0; k < 10; k++) {
          setTimeout(() => {
            const h = document.createElement("span");
            h.textContent = ["💗", "💖", "🩷", "💕", "✨"][Math.floor(Math.random() * 5)];
            h.style.cssText = "position:fixed;pointer-events:none;z-index:99;font-size:" + (14 + Math.random() * 18) + "px;left:" + (btn.getBoundingClientRect().left + Math.random() * btn.offsetWidth) + "px;top:" + (btn.getBoundingClientRect().top - 8) + "px;transition:transform 1.1s cubic-bezier(.22,1,.36,1),opacity 1.1s ease;";
            document.body.appendChild(h);
            requestAnimationFrame(() => {
              h.style.transform = "translateY(-" + (90 + Math.random() * 110) + "px) scale(" + (0.9 + Math.random() * 0.5) + ") rotate(" + ((Math.random() - 0.5) * 40) + "deg)";
              h.style.opacity = "0";
            });
            setTimeout(() => h.remove(), 1200);
          }, k * 60);
        }
      });
    }

    /* 4) mini card: gentle wiggle on hover, tiny bounce on load */
    const mini = $(".anniv-mini-card");
    if (mini) {
      mini.addEventListener("mouseenter", () => {
        mini.style.animation = "annivWiggle 0.5s ease";
        setTimeout(() => mini.style.animation = "", 520);
      });
    }
  }

  /* ---------------------------------------------------------------- init */
  function init() {
    try { startCounter(); } catch (e) { console.warn("anniv timer:", e.message); }
    try { buildMiniCard(); } catch (e) { console.warn("anniv mini card:", e.message); }
    try { buildLetters(); } catch (e) { console.warn("anniv letters:", e.message); }
    try { buildReasons(); } catch (e) { console.warn("anniv reasons:", e.message); }
    try { buildPolaroids(); } catch (e) { console.warn("anniv polaroids:", e.message); }
    try { bindCelebrate(); } catch (e) { console.warn("anniv celebrate:", e.message); }
    try { initCuteness(); } catch (e) { console.warn("anniv cuteness:", e.message); }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
