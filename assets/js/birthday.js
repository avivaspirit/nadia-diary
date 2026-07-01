/* The birthday experience: light the candles → make a wish → open the letters. */
(() => {
  "use strict";
  const { $, el, escapeHtml, initReveals, lightbox, burstConfetti } = window.DiaryMagic;
  const data = window.NADIA_DATA;
  const bday = data.birthday;

  function setText(sel, value) {
    const node = $(sel);
    if (node) node.textContent = value ?? "";
  }

  document.title = `Happy Birthday | ${data.site.title}`;
  setText("#siteTitle", data.site.title);
  setText("#siteFooter", data.site.footerLine);

  /* ------------------------------------------- PASSWORD GATE */
  const gate = data.birthday.gate;
  const gateEl = $("#passwordGate");
  if (gateEl && gate) {
    setText("#gateTitle", gate.title);
    setText("#gateSubtitle", gate.subtitle);
    const gateIcon = $("#gateIcon");
    if (gateIcon) gateIcon.textContent = gate.icon;
    const gateHint = $("#gateHint");
    if (gateHint) gateHint.textContent = gate.hint;

    const gateInput = $("#gateInput");
    const gateBtn = $("#gateBtn");
    const gateError = $("#gateError");

    function tryUnlock() {
      const val = (gateInput.value || "").trim();
      if (val === gate.pin) {
        gateEl.hidden = true;
        burstConfetti(1500);
        // Save unlocked state for this session
        try { sessionStorage.setItem("nadiaBdayUnlocked", "1"); } catch {}
      } else {
        gateError.textContent = "Not quite... try again ♡";
        gateInput.value = "";
        gateInput.focus();
        gateEl.style.animation = "none";
        setTimeout(() => { gateEl.style.animation = "floaty 3s ease-in-out infinite"; }, 10);
      }
    }

    // Check if already unlocked this session
    try {
      if (sessionStorage.getItem("nadiaBdayUnlocked") === "1") gateEl.hidden = true;
    } catch {}

    gateBtn.addEventListener("click", tryUnlock);
    gateInput.addEventListener("keydown", (e) => { if (e.key === "Enter") tryUnlock(); });
  }

  /* ----------------------------------------------- act 1: the candles */
  setText("#candlesEyebrow", bday.candles.eyebrow);
  setText("#candlesTitle", bday.candles.title);
  setText("#candleHint", bday.candles.hint);

  const candleRow = $("#cakeCandles");
  const counter = $("#candleCounter");
  const total = Math.max(1, bday.candles.count || 5);
  let lit = 0;
  let celebrated = false;

  const heights = [58, 74, 66, 80, 60, 72, 64];
  for (let i = 0; i < total; i++) {
    const candle = el("button", "candle");
    candle.type = "button";
    candle.setAttribute("aria-label", `Light candle ${i + 1} of ${total}`);
    candle.style.setProperty("--ch", `${heights[i % heights.length]}px`);
    candle.innerHTML = `
      <span class="candle-glow" aria-hidden="true"></span>
      <span class="candle-flame" aria-hidden="true"></span>
      <span class="candle-wick" aria-hidden="true"></span>
      <span class="candle-body" aria-hidden="true"></span>`;
    candle.addEventListener("click", () => {
      if (candle.classList.contains("is-lit")) return;
      candle.classList.add("is-lit");
      candle.setAttribute("aria-label", `Candle ${i + 1} is lit`);
      lit++;
      updateCounter();
      if (lit === total) celebrate();
    });
    candleRow.appendChild(candle);
  }

  function updateCounter() {
    counter.innerHTML = `<span class="lit-count">${lit}</span> / ${total} candles lit`;
  }
  updateCounter();

  function celebrate() {
    if (celebrated) return;
    celebrated = true;
    setText("#candleHint", bday.candles.litLine);
    counter.style.display = "none";
    setTimeout(() => {
      burstConfetti();
      $("#birthdayReveal").classList.add("is-revealed");
    }, 650);
  }

  /* --------------------------------------- act 2: headline + memories */
  setText("#birthdayHeadline", bday.headline);
  setText("#birthdayIntro", bday.intro);

  const strip = $("#memoryStrip");
  const stripItems = bday.photoStrip.map((p) => ({ src: p.src, alt: p.alt, caption: "" }));
  bday.photoStrip.forEach((photo, i) => {
    const btn = el("button", "strip-photo");
    btn.type = "button";
    btn.setAttribute("aria-label", "Open photo memory");
    btn.innerHTML = `<img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt || "")}" loading="lazy" decoding="async" />`;
    btn.addEventListener("click", () => lightbox.open(stripItems, i));
    strip.appendChild(btn);
  });

  /* ----------------------------------------------- act 3: the letters */
  setText("#lettersEyebrow", bday.lettersEyebrow);
  setText("#lettersTitle", bday.lettersTitle);
  setText("#lettersHint", bday.lettersHint);

  const grid = $("#envelopeGrid");

  function typewriterEffect(element, paragraphs, speed = 28) {
    element.innerHTML = "";
    let pIdx = 0;
    let charIdx = 0;
    let currentP = el("p");
    element.appendChild(currentP);
    const cursor = el("span", "typewriter-cursor");
    element.appendChild(cursor);

    function tick() {
      if (pIdx >= paragraphs.length) {
        cursor.remove();
        return;
      }
      const text = paragraphs[pIdx];
      if (charIdx < text.length) {
        currentP.textContent += text[charIdx];
        charIdx++;
        setTimeout(tick, speed);
      } else {
        pIdx++;
        charIdx = 0;
        if (pIdx < paragraphs.length) {
          currentP = el("p");
          element.insertBefore(currentP, cursor);
        }
        setTimeout(tick, speed * 3);
      }
    }
    tick();
  }

  bday.letters.forEach((letter) => {
    const card = el("div", "envelope-card reveal");
    const photosHtml = (letter.photos || []).map((photo, i) => `
      <figure class="polaroid" data-photo-index="${i}" style="--tilt:${i % 2 === 0 ? -3 : 3}deg; margin:0;">
        <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt || "")}" loading="lazy" decoding="async" />
        ${photo.caption ? `<figcaption>${escapeHtml(photo.caption)}</figcaption>` : ""}
      </figure>`).join("");

    card.innerHTML = `
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
          <div class="wish-text"></div>
          <div class="wish-photos">${photosHtml}</div>
        </div>
        <button class="close-envelope" type="button">close letter</button>
      </article>`;

    const cover = card.querySelector(".envelope-cover");
    let hasTyped = false;
    cover.addEventListener("click", () => {
      card.classList.add("is-open");
      cover.setAttribute("aria-expanded", "true");
      // Start typewriter effect on first open
      if (!hasTyped) {
        hasTyped = true;
        const textEl = card.querySelector(".wish-text");
        setTimeout(() => typewriterEffect(textEl, letter.paragraphs), 700);
      }
    });
    card.querySelector(".close-envelope").addEventListener("click", () => {
      card.classList.remove("is-open");
      cover.setAttribute("aria-expanded", "false");
      cover.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    const letterItems = (letter.photos || []).map((p) => ({ src: p.src, alt: p.alt, caption: p.caption || "" }));
    card.querySelectorAll(".wish-photos .polaroid").forEach((fig) => {
      fig.addEventListener("click", () => {
        lightbox.open(letterItems, Number(fig.dataset.photoIndex) || 0);
      });
    });

    grid.appendChild(card);
  });

  /* --------------------------------------- act 4: write back section */
  if (bday.writeBack) {
    const wb = bday.writeBack;
    setText("#writeBackEyebrow", wb.eyebrow);
    setText("#writeBackTitle", wb.title);

    const ta = $("#writeBackTextarea");
    const btn = $("#writeBackBtn");
    if (ta) ta.placeholder = wb.placeholder;
    if (btn) btn.textContent = wb.button;

    const listEl = $("#writeBackList");
    const STORAGE_KEY = wb.storageKey || "nadiaWriteBackNotes";

    function loadNotes() {
      if (!listEl) return;
      let notes = [];
      try { notes = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch {}
      listEl.innerHTML = "";
      if (!notes.length) return;
      notes.slice().reverse().forEach((note) => {
        const div = el("div", "write-back-note");
        div.style.setProperty("--note-tilt", `${(Math.random() - 0.5) * 6}deg`);
        div.innerHTML = `${escapeHtml(note.text)}<span class="note-date">${escapeHtml(note.date || "")}</span>`;
        listEl.appendChild(div);
      });
    }
    loadNotes();

    function saveNote() {
      const text = (ta?.value || "").trim();
      if (!text) return;
      let notes = [];
      try { notes = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch {}
      const now = new Date();
      notes.push({
        text,
        date: now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      ta.value = "";
      loadNotes();
      // Show confirmation
      btn.textContent = wb.savedMsg;
      btn.style.background = "linear-gradient(135deg, #c8e6c9, #81c784)";
      setTimeout(() => {
        btn.textContent = wb.button;
        btn.style.background = "";
      }, 2500);
    }

    btn?.addEventListener("click", saveNote);
  }

  /* ---------------------------------------------- act 5: the sign-off */
  setText("#closingText", bday.closing.text);
  const closingSignature = $("#closingSignature");
  const elephantIcon = `
    <svg class="signature-icon" viewBox="0 0 24 24" aria-label="elephant" role="img">
      <path d="M4.3 10.2c0-4 3.1-6.7 7.6-6.7h3.2c3.1 0 5.6 2.5 5.6 5.6v5.1c0 2.2-1.2 3.8-3 3.8-1.7 0-2.8-1.3-2.8-3.2v-2.1h-1.8v6.1h-3v-4.1H8.2v4.1h-3v-7.1H4.3v-1.5Zm11.5-4.3a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm1.3 1.8a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4Z"/>
    </svg>`;
  const crownIcon = `
    <svg class="signature-icon" viewBox="0 0 24 24" aria-label="crown" role="img">
      <path d="m3.2 7.1 4.5 3.4L12 4.7l4.3 5.8 4.5-3.4-1.7 10.2H4.9L3.2 7.1Zm2.1 11.5h13.4v1.8H5.3v-1.8Z"/>
    </svg>`;
  closingSignature.innerHTML = `— ${escapeHtml(bday.closing.signature)} <span class="signature-aliases">(aka. ${escapeHtml(bday.closing.aliases.dumby)} ${elephantIcon} / ${escapeHtml(bday.closing.aliases.king)} ${crownIcon})</span>`;

  initReveals();
})();
