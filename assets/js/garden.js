/* ==========================================================================
   NADIA'S GARDEN — single continuous vine, flowers + photos grow upward
   Photos alternate left/right along a curving stem, connected as one plant.
   ========================================================================== */
(() => {
  "use strict";

  const { $, $$, el, escapeHtml, reducedMotion } = window.DiaryMagic;

  const STORAGE_KEY = "nadiaGardenFlowers";

  const FLOWERS = {
    rose:      { emoji: "🌹", name: "Rose" },
    sunflower: { emoji: "🌻", name: "Sunflower" },
    tulip:     { emoji: "🌷", name: "Tulip" },
    daisy:     { emoji: "🌼", name: "Daisy" },
    cherry:    { emoji: "🌸", name: "Sakura" },
    hibiscus:  { emoji: "🌺", name: "Hibiscus" },
    lotus:     { emoji: "🪷", name: "Lotus" },
    bouquet:   { emoji: "💐", name: "Bouquet" }
  };

  /* Layout constants */
  const NODE_SPACING = 200;   // px vertical spacing between nodes
  const STEM_WIGGLE = 60;     // px horizontal wiggle amplitude
  const PHOTO_SIZE = 110;     // px photo circle diameter
  const BOTTOM_PAD = 40;      // px from ground to first node

  /* State */
  let selectedFlower = "rose";
  let selectedPhoto = null;

  /* Elements */
  const plantBtn = $("#plantBtn");
  const clearBtn = $("#clearBtn");
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
  const vineGarden = $("#vineGarden");
  const vineSvg = $("#vineSvg");
  const vineNodes = $("#vineNodes");
  const vineEmpty = $("#vineEmpty");
  const fileInput = $("#gardenFileInput");
  const flowerDetail = $("#flowerDetail");
  const flowerDetailInner = $("#flowerDetailInner");

  /* ----------------------------------------------------- load / save */
  function loadFlowers() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
  }
  function saveFlowers(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  /* ----------------------------------------------------- render vine */
  function renderGarden() {
    const flowers = loadFlowers();
    vineNodes.innerHTML = "";
    vineSvg.innerHTML = "";

    if (flowers.length === 0) {
      vineEmpty.style.display = "flex";
      clearBtn.style.display = "none";
      vineSvg.setAttribute("height", "0");
      return;
    }

    vineEmpty.style.display = "none";
    clearBtn.style.display = "";

    /* Calculate total height needed */
    const totalHeight = BOTTOM_PAD + flowers.length * NODE_SPACING + 80;

    /* Set container height so it scrolls */
    vineGarden.style.height = totalHeight + "px";

    /* Build the curving stem path via SVG */
    const w = vineGarden.clientWidth || 400;
    const centerX = w / 2;

    /* Generate stem path — a gentle S-curve going up */
    let pathD = `M ${centerX} ${totalHeight}`;
    let stemPoints = [];

    flowers.forEach((f, i) => {
      const y = totalHeight - BOTTOM_PAD - i * NODE_SPACING;
      const side = i % 2 === 0 ? -1 : 1; // alternate left/right
      const x = centerX + side * STEM_WIGGLE;
      stemPoints.push({ x, y, side });
    });

    /* Draw stem from bottom through each node */
    let prevX = centerX;
    let prevY = totalHeight;
    stemPoints.forEach((pt) => {
      /* Curve from previous to this point */
      const midY = (prevY + pt.y) / 2;
      pathD += ` Q ${prevX} ${midY}, ${pt.x} ${pt.y}`;
      prevX = pt.x;
      prevY = pt.y;
    });
    /* Top cap */
    pathD += ` Q ${prevX} ${prevY - 30}, ${centerX} ${prevY - 60}`;

    /* Set SVG dimensions */
    vineSvg.setAttribute("width", w);
    vineSvg.setAttribute("height", totalHeight);
    vineSvg.setAttribute("viewBox", `0 0 ${w} ${totalHeight}`);

    /* Stem path */
    vineSvg.innerHTML = `
      <defs>
        <linearGradient id="stemGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#7cb87c" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#5a9a5a" stop-opacity="0.7" />
        </linearGradient>
      </defs>
      <path d="${pathD}" fill="none" stroke="url(#stemGrad)" stroke-width="4" stroke-linecap="round" />
    `;

    /* Add small leaves along stem */
    stemPoints.forEach((pt, i) => {
      if (i === 0) return; // skip first, ground level
      const leafSide = pt.side * -1;
      const leafX = pt.x + leafSide * 25;
      const leafY = pt.y + NODE_SPACING * 0.25;
      const leaf = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
      leaf.setAttribute("cx", leafX);
      leaf.setAttribute("cy", leafY);
      leaf.setAttribute("rx", "14");
      leaf.setAttribute("ry", "7");
      leaf.setAttribute("fill", "#8cc88c");
      leaf.setAttribute("opacity", "0.6");
      leaf.setAttribute("transform", `rotate(${leafSide * 30} ${leafX} ${leafY})`);
      vineSvg.appendChild(leaf);
    });

    /* Place nodes (flowers + photos) */
    flowers.forEach((f, i) => {
      const pt = stemPoints[i];
      const node = el("div", "vine-node");
      node.style.left = pt.x + "px";
      node.style.top = pt.y + "px";
      node.dataset.id = f.id;
      node.style.setProperty("--side", pt.side);

      /* Connector line from stem to photo */
      if (f.photo) {
        const connector = el("div", "vine-connector");
        connector.style.setProperty("--side", pt.side);
        node.appendChild(connector);
      }

      /* Photo (circle, on the side) */
      if (f.photo) {
        const photoWrap = el("div", "vine-photo");
        const img = el("img");
        img.src = f.photo;
        img.alt = f.caption || "";
        img.loading = "lazy";
        photoWrap.appendChild(img);
        node.appendChild(photoWrap);
      }

      /* Flower emoji at center of stem */
      const emoji = el("div", "vine-flower", f.emoji);
      node.appendChild(emoji);

      /* Caption */
      if (f.caption) {
        const cap = el("p", "vine-caption", escapeHtml(f.caption));
        node.appendChild(cap);
      }

      /* Remove button */
      const rmBtn = el("button", "vine-remove", "✕");
      rmBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        removeFlower(f.id);
      });
      node.appendChild(rmBtn);

      /* Click to open detail */
      node.addEventListener("click", () => openDetail(f));

      vineNodes.appendChild(node);
    });

    /* Scroll to bottom (ground level) initially */
    vineGarden.scrollTop = totalHeight;
  }

  /* ----------------------------------------------------- panel */
  function openPanel() {
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
  uploadPhotoBtn.addEventListener("click", () => fileInput.click());

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

  /* ----------------------------------------------------- plant */
  plantFlowerBtn.addEventListener("click", () => {
    const caption = captionInput.value.trim();
    if (!selectedPhoto && !caption) return;

    const flowers = loadFlowers();
    flowers.push({
      id: Date.now().toString(),
      type: selectedFlower,
      emoji: FLOWERS[selectedFlower]?.emoji || "🌸",
      photo: selectedPhoto || null,
      caption: caption || "",
      createdAt: Date.now()
    });
    saveFlowers(flowers);
    closePanel();
    renderGarden();

    if (!reducedMotion && window.DiaryMagic?.burstConfetti) {
      window.DiaryMagic.burstConfetti();
    }

    /* Scroll to show the newest flower */
    setTimeout(() => {
      const newest = vineNodes.querySelector(".vine-node:last-child");
      if (newest) {
        newest.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  });

  /* ----------------------------------------------------- remove */
  function removeFlower(id) {
    let flowers = loadFlowers();
    flowers = flowers.filter((f) => f.id !== id);
    saveFlowers(flowers);
    renderGarden();
  }

  /* ----------------------------------------------------- clear all */
  clearBtn.addEventListener("click", () => {
    if (confirm("Clear the entire garden? This will remove all flowers.")) {
      saveFlowers([]);
      renderGarden();
    }
  });

  /* ----------------------------------------------------- detail popup */
  function openDetail(f) {
    flowerDetailInner.innerHTML = "";

    if (f.photo) {
      const photoWrap = el("div", "flower-detail-photo");
      const img = el("img");
      img.src = f.photo;
      img.alt = f.caption || "";
      photoWrap.appendChild(img);
      flowerDetailInner.appendChild(photoWrap);
    }

    const emojiEl = el("div", "flower-detail-emoji", f.emoji);
    flowerDetailInner.appendChild(emojiEl);

    if (f.caption) {
      flowerDetailInner.appendChild(el("p", "flower-detail-caption", escapeHtml(f.caption)));
    }

    const dateStr = new Date(f.createdAt).toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric"
    });
    flowerDetailInner.appendChild(el("p", "flower-detail-date", "Planted " + dateStr));

    const closeDetailBtn = el("button", "flower-detail-close", "Close ♡");
    closeDetailBtn.addEventListener("click", () => flowerDetail.classList.remove("open"));
    flowerDetailInner.appendChild(closeDetailBtn);

    flowerDetail.classList.add("open");
  }

  flowerDetail.addEventListener("click", (e) => {
    if (e.target === flowerDetail) flowerDetail.classList.remove("open");
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

  /* Resize handler — re-render to adjust stem */
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(renderGarden, 200);
  });

  /* Footer */
  const footerText = $("#footerText");
  if (footerText && window.NADIA_DATA?.site?.footerLine) {
    footerText.textContent = window.NADIA_DATA.site.footerLine;
  }

  /* Initial render */
  renderGarden();

  if (window.DiaryMagic?.initReveals) {
    window.DiaryMagic.initReveals();
  }
})();
