/* ==========================================================================
   NADIA'S GARDEN — plant flowers with photos, saved to localStorage
   ========================================================================== */
(() => {
  "use strict";

  const { $, $$, el, escapeHtml, reducedMotion } = window.DiaryMagic;

  const STORAGE_KEY = "nadiaGardenFlowers";

  /* Flower definitions */
  const FLOWERS = {
    rose:      { emoji: "🌹", name: "Rose" },
    sunflower: { emoji: "🌻", name: "Sunflower" },
    tulip:     { emoji: "🌷", name: "Tulip" },
    daisy:     { emoji: "🌼", name: "Daisy" },
    cherry:    { emoji: "🌸", name: "Sakura" },
    hibiscus:  { emoji: "🌺", name: "Hibiscus" },
    cactus:    { emoji: "🌵", name: "Cactus" },
    lotus:     { emoji: "🪷", name: "Lotus" },
    bloom:     { emoji: "💐", name: "Bouquet" },
    herb:      { emoji: "🌿", name: "Herb" }
  };

  /* State */
  let selectedFlower = "rose";
  let selectedPhoto = null; // data URL or gallery path
  let editingId = null;

  /* Elements */
  const plantBtn = $("#plantBtn");
  const plantPanel = $("#plantPanel");
  const closeBtn = $("#closePlantPanel");
  const flowerPicker = $("#flowerPicker");
  const uploadPhotoBtn = $("#uploadPhotoBtn");
  const pickExistingBtn = $("#pickExistingBtn");
  const photoGrid = $("#photoGrid");
  const photoPreview = $("#photoPreview");
  const selectedPhotoPreview = $("#selectedPhotoPreview");
  const removePhotoBtn = $("#removePhotoBtn");
  const captionInput = $("#flowerCaption");
  const plantFlowerBtn = $("#plantFlowerBtn");
  const gardenBed = $("#gardenBed");
  const gardenEmpty = $("#gardenEmpty");
  const fileInput = $("#gardenFileInput");
  const flowerDetail = $("#flowerDetail");
  const flowerDetailInner = $("#flowerDetailInner");

  /* ----------------------------------------------------- load / save */
  function loadFlowers() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch { return []; }
  }
  function saveFlowers(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  /* ----------------------------------------------------- render garden */
  function renderGarden() {
    const flowers = loadFlowers();
    gardenBed.innerHTML = "";

    if (flowers.length === 0) {
      gardenEmpty.classList.remove("hidden");
      gardenBed.style.display = "none";
      return;
    }

    gardenEmpty.classList.add("hidden");
    gardenBed.style.display = "flex";

    flowers.forEach((f) => {
      const card = el("div", "flower-card");
      card.dataset.id = f.id;

      const emoji = el("div", "flower-card-emoji", f.emoji);
      card.appendChild(emoji);

      if (f.photo) {
        const photoWrap = el("div", "flower-card-photo");
        const img = el("img");
        img.src = f.photo;
        img.alt = f.caption || "Garden memory";
        img.loading = "lazy";
        photoWrap.appendChild(img);
        card.appendChild(photoWrap);
      }

      if (f.caption) {
        const cap = el("p", "flower-card-caption", escapeHtml(f.caption));
        card.appendChild(cap);
      }

      const dateStr = new Date(f.createdAt).toLocaleDateString("en-US", {
        month: "short", day: "numeric"
      });
      const dateEl = el("p", "flower-card-date", dateStr);
      card.appendChild(dateEl);

      /* Remove button */
      const rmBtn = el("button", "flower-card-remove", "✕");
      rmBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        removeFlower(f.id);
      });
      card.appendChild(rmBtn);

      /* Click to open detail */
      card.addEventListener("click", () => openDetail(f));

      gardenBed.appendChild(card);
    });
  }

  /* ----------------------------------------------------- open / close panel */
  function openPanel() {
    editingId = null;
    selectedFlower = "rose";
    selectedPhoto = null;
    captionInput.value = "";
    resetPicker();
    photoPreview.style.display = "none";
    photoGrid.style.display = "none";
    plantPanel.classList.add("open");
  }
  function closePanel() {
    plantPanel.classList.remove("open");
  }

  function resetPicker() {
    $$(".flower-choice", flowerPicker).forEach((b) => {
      b.classList.toggle("selected", b.dataset.flower === selectedFlower);
    });
  }

  /* ----------------------------------------------------- flower picker */
  $$(".flower-choice", flowerPicker).forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedFlower = btn.dataset.flower;
      resetPicker();
    });
  });

  /* ----------------------------------------------------- photo handling */
  uploadPhotoBtn.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      selectedPhoto = ev.target.result;
      selectedPhotoPreview.src = selectedPhoto;
      photoPreview.style.display = "block";
      photoGrid.style.display = "none";
    };
    reader.readAsDataURL(file);
  });

  pickExistingBtn.addEventListener("click", () => {
    const photos = (window.NADIA_DATA?.gallery?.photos) || [];
    if (photos.length === 0) return;

    photoGrid.innerHTML = "";
    photos.forEach((p) => {
      const img = el("img");
      img.src = p.src;
      img.alt = p.alt || "";
      img.loading = "lazy";
      img.addEventListener("click", () => {
        selectedPhoto = p.src;
        selectedPhotoPreview.src = selectedPhoto;
        photoPreview.style.display = "block";
        photoGrid.style.display = "none";
        $$(".garden-photo-grid img").forEach((i) => i.classList.remove("selected"));
        img.classList.add("selected");
      });
      photoGrid.appendChild(img);
    });
    photoGrid.style.display = "grid";
  });

  removePhotoBtn.addEventListener("click", () => {
    selectedPhoto = null;
    photoPreview.style.display = "none";
    fileInput.value = "";
  });

  /* ----------------------------------------------------- plant flower */
  plantFlowerBtn.addEventListener("click", () => {
    const caption = captionInput.value.trim();
    if (!selectedPhoto && !caption) return;

    const flowers = loadFlowers();
    const flower = {
      id: Date.now().toString(),
      type: selectedFlower,
      emoji: FLOWERS[selectedFlower]?.emoji || "🌸",
      photo: selectedPhoto || null,
      caption: caption || "",
      createdAt: Date.now()
    };
    flowers.push(flower);
    saveFlowers(flowers);
    closePanel();
    renderGarden();

    /* Sparkle burst */
    if (!reducedMotion && window.DiaryMagic?.burstConfetti) {
      window.DiaryMagic.burstConfetti();
    }
  });

  /* ----------------------------------------------------- remove flower */
  function removeFlower(id) {
    let flowers = loadFlowers();
    flowers = flowers.filter((f) => f.id !== id);
    saveFlowers(flowers);
    renderGarden();
  }

  /* ----------------------------------------------------- detail popup */
  function openDetail(f) {
    const emojiEl = el("div", "flower-detail-emoji", f.emoji);
    flowerDetailInner.innerHTML = "";

    flowerDetailInner.appendChild(emojiEl);

    if (f.photo) {
      const photoWrap = el("div", "flower-detail-photo");
      const img = el("img");
      img.src = f.photo;
      img.alt = f.caption || "";
      photoWrap.appendChild(img);
      flowerDetailInner.appendChild(photoWrap);
    }

    if (f.caption) {
      flowerDetailInner.appendChild(el("p", "flower-detail-caption", escapeHtml(f.caption)));
    }

    const dateStr = new Date(f.createdAt).toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric"
    });
    flowerDetailInner.appendChild(el("p", "flower-detail-date", "Planted " + dateStr));

    const closeDetailBtn = el("button", "flower-detail-close", "Close ♡");
    closeDetailBtn.addEventListener("click", () => {
      flowerDetail.classList.remove("open");
    });
    flowerDetailInner.appendChild(closeDetailBtn);

    flowerDetail.classList.add("open");
  }

  flowerDetail.addEventListener("click", (e) => {
    if (e.target === flowerDetail) {
      flowerDetail.classList.remove("open");
    }
  });

  /* ----------------------------------------------------- init */
  plantBtn.addEventListener("click", openPanel);
  closeBtn.addEventListener("click", closePanel);

  plantPanel.addEventListener("click", (e) => {
    if (e.target === plantPanel) closePanel();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (plantPanel.classList.contains("open")) closePanel();
      if (flowerDetail.classList.contains("open")) flowerDetail.classList.remove("open");
    }
  });

  /* Footer */
  const footerText = $("#footerText");
  if (footerText && window.NADIA_DATA?.site?.footerLine) {
    footerText.textContent = window.NADIA_DATA.site.footerLine;
  }

  /* Initial render */
  renderGarden();

  /* Reveal animations */
  if (window.DiaryMagic?.initReveals) {
    window.DiaryMagic.initReveals();
  }
})();
