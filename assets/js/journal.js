/* ==========================================================================
   MY LITTLE JOURNAL 📔 — Daily diary entries: place, activity, mood, photos
   ========================================================================== */
(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const STORAGE_KEY = "nadiaJournal";
  const MAX_PHOTOS = 4;

  const PLACES = [
    { id: "home",    emoji: "🏠", label: "Home" },
    { id: "cafe",    emoji: "☕", label: "Café" },
    { id: "mall",    emoji: "🛍️", label: "Mall" },
    { id: "park",    emoji: "🌳", label: "Park" },
    { id: "beach",   emoji: "🏖️", label: "Beach" },
    { id: "movie",   emoji: "🍿", label: "Cinema" },
    { id: "food",    emoji: "🍜", label: "Restaurant" },
    { id: "travel",  emoji: "✈️", label: "Travel" },
    { id: "school",  emoji: "📚", label: "School" },
    { id: "work",    emoji: "💼", label: "Work" }
  ];

  const MOODS = [
    { id: "happy",   emoji: "😊", label: "Happy" },
    { id: "love",    emoji: "🥰", label: "Loved" },
    { id: "excited", emoji: "🤩", label: "Excited" },
    { id: "calm",    emoji: "😌", label: "Calm" },
    { id: "sleepy",  emoji: "😴", label: "Sleepy" },
    { id: "silly",   emoji: "🤪", label: "Silly" },
    { id: "meh",     emoji: "😐", label: "Meh" },
    { id: "sad",     emoji: "🥺", label: "Sad" }
  ];

  const WEATHERS = [
    { id: "sun",   emoji: "☀️", label: "Sunny" },
    { id: "cloud", emoji: "☁️", label: "Cloudy" },
    { id: "rain",  emoji: "🌧️", label: "Rainy" },
    { id: "storm", emoji: "⛈️", label: "Storm" },
    { id: "snow",  emoji: "❄️", label: "Snow" },
    { id: "night", emoji: "🌙", label: "Night" }
  ];

  let entries = [];
  let currentFilter = "all";
  let galleryMode = false;

  /* composer state */
  let compose = {
    date: todayStr(),
    placeId: "home",
    placeCustom: "",
    mood: "happy",
    weather: "",
    text: "",
    photos: []
  };

  function todayStr() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function load() {
    try { entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
    catch (e) { entries = []; }
  }
  function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(entries)); }

  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[c]);
  }

  function placeOf(entry) {
    if (entry.placeCustom) return { emoji: "📍", label: entry.placeCustom };
    return PLACES.find(p => p.id === entry.placeId) || { emoji: "📍", label: "Somewhere" };
  }
  function moodOf(entry)  { return MOODS.find(m => m.id === entry.mood) || MOODS[0]; }
  function weatherOf(entry) { return entry.weather ? (WEATHERS.find(w => w.id === entry.weather) || null) : null; }

  function prettyDate(dateStr) {
    const [y, m, d] = dateStr.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffDays = Math.round((today - dt) / 86400000);
    let rel = "";
    if (diffDays === 0) rel = " · Today";
    else if (diffDays === 1) rel = " · Yesterday";
    else if (diffDays > 1 && diffDays < 7) rel = " · " + diffDays + " days ago";
    return dt.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) + rel;
  }

  /* ------------------------------------------------------------- render */
  function renderTimeline() {
    const list = $("#journalTimeline");
    const empty = $("#journalEmpty");
    if (!list) return;

    const visible = entries.filter(e => {
      if (currentFilter === "photo") return e.photos && e.photos.length > 0;
      if (currentFilter === "place") return e.placeId !== "home" || !!e.placeCustom;
      return true;
    });

    empty.style.display = entries.length === 0 ? "" : "none";
    list.style.display = entries.length === 0 ? "none" : "";

    list.innerHTML = visible.map((e, i) => {
      const place = placeOf(e);
      const mood = moodOf(e);
      const weather = weatherOf(e);
      const photos = (e.photos || []).slice(0, MAX_PHOTOS);
      const photoCount = e.photos ? e.photos.length : 0;

      const photoStrip = photos.length ? `
        <div class="journal-entry-photos ${photos.length === 1 ? "single" : ""}">
          ${photos.map((p, pi) => `<img src="${p.src}" alt="Journal photo" loading="lazy" data-photo="${pi}" />`).join("")}
        </div>` : "";

      return `
      <article class="journal-entry reveal is-visible" data-id="${e.id}">
        <div class="journal-entry-dot"></div>
        <div class="journal-entry-card">
          <div class="journal-entry-head">
            <span class="journal-entry-date">${escapeHtml(prettyDate(e.date))}</span>
            <span class="journal-entry-place">${place.emoji} ${escapeHtml(place.label)}</span>
            ${weather ? `<span class="journal-entry-weather">${weather.emoji}</span>` : ""}
          </div>
          ${e.text ? `<p class="journal-entry-text">${escapeHtml(e.text)}</p>` : ""}
          ${photoStrip}
          <div class="journal-entry-foot">
            <span class="journal-entry-mood">${mood.emoji} ${escapeHtml(mood.label)}</span>
            <span class="journal-entry-actions">
              ${photoCount > 1 ? `<span class="journal-photo-count">📸 ${photoCount}</span>` : ""}
              <button class="journal-entry-view" type="button" data-view="${e.id}">Read ♡</button>
              <button class="journal-entry-del" type="button" data-del="${e.id}" aria-label="Delete entry">🗑️</button>
            </span>
          </div>
        </div>
      </article>`;
    }).join("");
  }

  function renderPlacePicker() {
    const wrap = $("#journalPlacePicker");
    if (!wrap) return;
    wrap.innerHTML = PLACES.map(p => `
      <button class="journal-place-pill ${p.id === compose.placeId && !compose.placeCustom ? "active" : ""}" data-place="${p.id}" type="button">
        <span>${p.emoji}</span> ${p.label}
      </button>`).join("");
  }

  function renderMoodRow() {
    const row = $("#journalMoodRow");
    if (!row) return;
    row.innerHTML = MOODS.map(m => `
      <button class="journal-mood ${m.id === compose.mood ? "active" : ""}" data-mood="${m.id}" type="button" title="${m.label}">
        ${m.emoji}
      </button>`).join("");
  }

  function renderWeatherRow() {
    const row = $("#journalWeatherRow");
    if (!row) return;
    row.innerHTML = WEATHERS.map(w => `
      <button class="journal-weather ${w.id === compose.weather ? "active" : ""}" data-weather="${w.id}" type="button" title="${w.label}">
        ${w.emoji}
      </button>`).join("");
  }

  function renderPhotoList() {
    const wrap = $("#journalPhotoList");
    if (!wrap) return;
    if (!compose.photos.length) { wrap.innerHTML = ""; wrap.style.display = "none"; return; }
    wrap.style.display = "";
    wrap.innerHTML = compose.photos.map((p, i) => `
      <div class="journal-photo-thumb">
        <img src="${p.src}" alt="photo ${i + 1}" />
        <button class="journal-photo-x" type="button" data-x="${i}">✕</button>
      </div>`).join("");
  }

  function updateDateLabel() {
    const el = $("#journalDateLabel");
    if (el) el.textContent = "✧ " + prettyDate(compose.date) + " ✧";
  }

  /* --------------------------------------------------------- composer */
  function resetCompose(keepOpen) {
    compose = { date: todayStr(), placeId: "home", placeCustom: "", mood: "happy", weather: "", text: "", photos: [] };
    const txt = $("#journalText");
    if (txt) { txt.value = ""; }
    const cc = $("#journalCharCount");
    if (cc) cc.textContent = "0";
    const pi = $("#journalPlaceInput");
    if (pi) pi.value = "";
    renderPlacePicker(); renderMoodRow(); renderPhotoList();
    updateDateLabel();
  }

  function saveEntry() {
    const place = compose.placeCustom.trim() || null;
    const text = compose.text.trim();
    if (!text && compose.photos.length === 0) {
      wiggle($("#journalSaveBtn"));
      return;
    }
    entries.unshift({
      id: "j" + Date.now(),
      date: compose.date,
      placeId: place ? "" : compose.placeId,
      placeCustom: place || "",
      mood: compose.mood,
      weather: compose.weather,
      text: text,
      photos: compose.photos.slice(0, MAX_PHOTOS),
      created: Date.now()
    });
    save();
    resetCompose();
    renderTimeline();
    const btn = $("#journalSaveBtn");
    if (btn) {
      const old = btn.textContent;
      btn.textContent = "✨ Saved!";
      btn.classList.add("saved");
      setTimeout(() => { btn.textContent = old; btn.classList.remove("saved"); }, 1800);
    }
    const magic = window.DiaryMagic;
    if (magic && magic.burstConfetti) { try { magic.burstConfetti(); } catch (e) {} }
    closeGalleryPicker();
  }

  function wiggle(el) {
    if (!el) return;
    el.classList.remove("wiggle");
    void el.offsetWidth;
    el.classList.add("wiggle");
  }

  /* ------------------------------------------------------ photo picker */
  function toggleGalleryPicker() {
    const grid = $("#journalGalleryGrid");
    if (!grid) return;
    galleryMode = !galleryMode;
    if (!galleryMode) { grid.style.display = "none"; return; }
    const photos = (window.NADIA_DATA && window.NADIA_DATA.gallery && window.NADIA_DATA.gallery.photos) || [];
    if (!photos.length) {
      grid.innerHTML = "<p class='journal-gallery-empty'>No gallery photos found 💭</p>";
      grid.style.display = "";
      return;
    }
    grid.innerHTML = photos.map((p, i) => `
      <button class="journal-gallery-item" data-g="${i}" type="button">
        <img src="${p.src}" alt="${escapeHtml(p.alt || "")}" loading="lazy" />
      </button>`).join("");
    grid.style.display = "";
  }
  function closeGalleryPicker() {
    galleryMode = false;
    const grid = $("#journalGalleryGrid");
    if (grid) grid.style.display = "none";
  }

  function addPhoto(src, kind) {
    if (compose.photos.length >= MAX_PHOTOS) return false;
    compose.photos.push({ src, kind: kind || "upload" });
    renderPhotoList();
    return true;
  }

  /* --------------------------------------------------------- detail popup */
  function openDetail(id) {
    const e = entries.find(x => x.id === id);
    const popup = $("#journalDetail");
    const inner = $("#journalDetailInner");
    if (!e || !popup || !inner) return;
    const place = placeOf(e);
    const mood = moodOf(e);
    const weather = weatherOf(e);
    const photos = e.photos || [];

    inner.innerHTML = `
      <button class="journal-detail-close" type="button" data-close>✕</button>
      <p class="journal-detail-date">${escapeHtml(prettyDate(e.date))}</p>
      <div class="journal-detail-tags">
        <span class="journal-tag">${place.emoji} ${escapeHtml(place.label)}</span>
        ${weather ? `<span class="journal-tag">${weather.emoji} ${escapeHtml(weather.label)}</span>` : ""}
        <span class="journal-tag">${mood.emoji} ${escapeHtml(mood.label)}</span>
      </div>
      ${e.text ? `<p class="journal-detail-text">${escapeHtml(e.text)}</p>` : ""}
      ${photos.length ? `
      <div class="journal-detail-photos">
        ${photos.map((p, i) => `<img src="${p.src}" alt="Journal photo ${i + 1}" data-dphoto="${i}" loading="lazy" />`).join("")}
      </div>` : ""}
    `;
    popup.dataset.currentId = e.id;
    popup.classList.add("show");
    document.body.style.overflow = "hidden";
  }
  function closeDetail() {
    const popup = $("#journalDetail");
    if (popup) popup.classList.remove("show");
    document.body.style.overflow = "";
  }

  /* --------------------------------------------------------------- init */
  function init() {
    load();
    renderPlacePicker();
    renderMoodRow();
    renderWeatherRow();
    renderPhotoList();
    updateDateLabel();
    renderTimeline();

    /* filter pills */
    const filterBar = $(".journal-filter-bar");
    if (filterBar) filterBar.addEventListener("click", (e) => {
      const pill = e.target.closest(".journal-filter-pill");
      if (!pill) return;
      $$(".journal-filter-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentFilter = pill.dataset.filter || "all";
      renderTimeline();
    });

    /* place picker */
    const placePicker = $("#journalPlacePicker");
    if (placePicker) placePicker.addEventListener("click", (e) => {
      const pill = e.target.closest(".journal-place-pill");
      if (!pill) return;
      compose.placeId = pill.dataset.place;
      compose.placeCustom = "";
      const inp = $("#journalPlaceInput");
      if (inp) inp.value = "";
      renderPlacePicker();
    });

    /* custom place input */
    const placeInput = $("#journalPlaceInput");
    if (placeInput) placeInput.addEventListener("input", () => {
      compose.placeCustom = placeInput.value;
      renderPlacePicker();
    });

    /* text */
    const txt = $("#journalText");
    if (txt) txt.addEventListener("input", () => {
      compose.text = txt.value;
      const cc = $("#journalCharCount");
      if (cc) cc.textContent = String(txt.value.length);
    });

    /* moods */
    const moodRow = $("#journalMoodRow");
    if (moodRow) moodRow.addEventListener("click", (e) => {
      const b = e.target.closest(".journal-mood");
      if (!b) return;
      compose.mood = b.dataset.mood;
      renderMoodRow();
    });

    /* weather */
    const weatherRow = $("#journalWeatherRow");
    if (weatherRow) weatherRow.addEventListener("click", (e) => {
      const b = e.target.closest(".journal-weather");
      if (!b) return;
      compose.weather = compose.weather === b.dataset.weather ? "" : b.dataset.weather;
      renderWeatherRow();
    });

    /* upload */
    const uploadBtn = $("#journalUploadBtn");
    const fileInput = $("#journalFileInput");
    if (uploadBtn && fileInput) {
      uploadBtn.addEventListener("click", () => fileInput.click());
      fileInput.addEventListener("change", () => {
        const files = Array.from(fileInput.files || []);
        const imgs = files.filter(f => f.type && f.type.startsWith("image/"));
        let processed = 0;
        (function next() {
          if (processed >= imgs.length || compose.photos.length >= MAX_PHOTOS) { fileInput.value = ""; return; }
          const f = imgs[processed++];
          const r = new FileReader();
          r.onload = (ev) => { addPhoto(ev.target.result, "upload"); next(); };
          r.readAsDataURL(f);
        })();
      });
    }

    /* gallery picker */
    const galleryBtn = $("#journalGalleryBtn");
    if (galleryBtn) galleryBtn.addEventListener("click", toggleGalleryPicker);
    const galleryGrid = $("#journalGalleryGrid");
    if (galleryGrid) galleryGrid.addEventListener("click", (e) => {
      const item = e.target.closest(".journal-gallery-item");
      if (!item) return;
      const photos = (window.NADIA_DATA && window.NADIA_DATA.gallery && window.NADIA_DATA.gallery.photos) || [];
      const p = photos[Number(item.dataset.g)];
      if (p && addPhoto(p.src, "gallery")) {
        if (compose.photos.length >= MAX_PHOTOS) closeGalleryPicker();
      }
    });

    /* photo list remove */
    const photoList = $("#journalPhotoList");
    if (photoList) photoList.addEventListener("click", (e) => {
      const x = e.target.closest(".journal-photo-x");
      if (!x) return;
      compose.photos.splice(Number(x.dataset.x), 1);
      renderPhotoList();
    });

    /* save */
    const saveBtn = $("#journalSaveBtn");
    if (saveBtn) saveBtn.addEventListener("click", saveEntry);

    /* timeline delegation: view / delete / photo lightbox */
    const timeline = $("#journalTimeline");
    if (timeline) timeline.addEventListener("click", (e) => {
      const del = e.target.closest(".journal-entry-del");
      if (del) {
        const id = del.dataset.del;
        const card = del.closest(".journal-entry-card");
        if (card) {
          card.classList.add("deleting");
          setTimeout(() => {
            entries = entries.filter(x => x.id !== id);
            save();
            renderTimeline();
          }, 280);
        }
        return;
      }
      const view = e.target.closest(".journal-entry-view");
      if (view) { openDetail(view.dataset.view); return; }
      const img = e.target.closest(".journal-entry-photos img");
      if (img) {
        const entryEl = img.closest(".journal-entry");
        const entry = entries.find(x => x.id === entryEl.dataset.id);
        if (entry && window.DiaryMagic && window.DiaryMagic.lightbox) {
          window.DiaryMagic.lightbox.open(
            entry.photos.map(p => ({ src: p.src, alt: "Journal photo", caption: prettyDate(entry.date) })),
            Number(img.dataset.photo)
          );
        }
      }
    });

    /* detail popup: close + photo lightbox */
    const detail = $("#journalDetail");
    if (detail) {
      detail.addEventListener("click", (e) => {
        if (e.target === detail || e.target.closest("[data-close]")) { closeDetail(); return; }
        const img = e.target.closest(".journal-detail-photos img");
        if (img) {
          const entry = entries.find(x => x.id === detail.dataset.currentId);
          if (entry && window.DiaryMagic && window.DiaryMagic.lightbox) {
            window.DiaryMagic.lightbox.open(
              entry.photos.map(p => ({ src: p.src, alt: "Journal photo", caption: prettyDate(entry.date) })),
              Number(img.dataset.dphoto)
            );
          }
        }
      });
    }

    /* mobile compose toggle */
    const composeClose = $("#journalComposeClose");
    if (composeClose) composeClose.addEventListener("click", () => {
      const panel = $("#journalCompose");
      if (panel) panel.classList.toggle("collapsed");
    });

    /* expose for debugging */
    window.NadiaJournal = { entries, refresh: renderTimeline };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
