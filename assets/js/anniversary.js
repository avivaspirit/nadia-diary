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
    const photos = DATA.photos || [];
    wall.innerHTML = photos.map((photo, i) => `
      <figure class="polaroid" style="--tilt:${(i % 2 === 0 ? -1 : 1) * (2 + (i % 3))}deg;">
        <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt || "")}" loading="lazy" decoding="async" />
        ${photo.caption ? `<figcaption>${escapeHtml(photo.caption)}</figcaption>` : ""}
      </figure>`).join("");

    $$("figure.polaroid", wall).forEach((fig, i) => {
      fig.style.cursor = "zoom-in";
      fig.addEventListener("click", () => {
        if (window.DiaryMagic && window.DiaryMagic.lightbox) {
          window.DiaryMagic.lightbox(photos[i].src, photos[i].alt || "");
        }
      });
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

  /* ---------------------------------------------------------------- init */
  function init() {
    try { startCounter(); } catch (e) { console.warn("anniv timer:", e.message); }
    try { buildMiniCard(); } catch (e) { console.warn("anniv mini card:", e.message); }
    try { buildLetters(); } catch (e) { console.warn("anniv letters:", e.message); }
    try { buildReasons(); } catch (e) { console.warn("anniv reasons:", e.message); }
    try { buildPolaroids(); } catch (e) { console.warn("anniv polaroids:", e.message); }
    try { bindCelebrate(); } catch (e) { console.warn("anniv celebrate:", e.message); }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
