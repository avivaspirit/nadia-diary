/* ==========================================================================
   NADIA'S GARDEN SCENE — stems grow from ground, photos hang on branches
   and edges. Saved to localStorage.
   ========================================================================== */
(() => {
  "use strict";

  const { $, $$, el, escapeHtml, reducedMotion } = window.DiaryMagic;

  const STORAGE_KEY = "nadiaGardenScene";

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

  /* State */
  let selFlower = "rose";
  let selPlace = "branch";
  let selPhoto = null;
  let plantCount = 0;

  /* Elements */
  const plantBtn = $("#scenePlantBtn");
  const clearBtn = $("#sceneClearBtn");
  const panel = $("#scenePlantPanel");
  const closeBtn = $("#closeScenePanel");
  const flowerPicker = $("#sceneFlowerPicker");
  const uploadBtn = $("#sceneUploadBtn");
  const pickBtn = $("#scenePickBtn");
  const photoGrid = $("#scenePhotoGrid");
  const photoPreview = $("#scenePhotoPreview");
  const selectedPhotoImg = $("#sceneSelectedPhoto");
  const removePhotoBtn = $("#sceneRemovePhoto");
  const captionInput = $("#sceneCaption");
  const growBtn = $("#sceneGrowBtn");
  const container = $("#gsceneContainer");
  const svg = $("#gsceneSvg");
  const plantsLayer = $("#gscenePlants");
  const emptyState = $("#gsceneEmpty");
  const fileInput = $("#sceneFileInput");
  const detail = $("#sceneDetail");
  const detailInner = $("#sceneDetailInner");

  /* --------------------------------------------------- load / save */
  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
    catch { return []; }
  }
  function save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  /* --------------------------------------------------- SVG stem path */
  function makeStemPath(x, groundY, topY, branchSide) {
    /* Curved stem from ground going up, with a little branch */
    const midY = groundY - (groundY - topY) * 0.5;
    const branchLen = 30 + Math.random() * 20;
    const bx = branchSide === "left" ? x - branchLen : x + branchLen;

    /* Main stem — slight curve */
    let d = `M ${x} ${groundY} `;
    d += `Q ${x + (Math.random() * 16 - 8)} ${midY} ${x} ${topY}`;

    /* Small branch sticking out near the top */
    const branchY = topY + 15 + Math.random() * 10;
    d += ` M ${x} ${branchY} Q ${x + (branchSide === "left" ? -branchLen / 2 : branchLen / 2)} ${branchY - 5} ${bx} ${branchY}`;

    return { path: d, bx, branchY };
  }

  /* --------------------------------------------------- render scene */
  function render() {
    const items = load();
    plantsLayer.innerHTML = "";

    /* Clear SVG */
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const rect = container.getBoundingClientRect();
    svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
    const groundY = rect.height - 50;

    if (items.length === 0) {
      emptyState.classList.remove("hidden");
      return;
    }
    emptyState.classList.add("hidden");

    /* Count branch plants for spacing */
    const branchItems = items.filter(i => i.place === "branch");
    const edgeItems = items.filter(i => i.place !== "branch");

    /* Distribute branch plants evenly across width */
    branchItems.forEach((item, idx) => {
      const spacing = rect.width / (branchItems.length + 1);
      const x = spacing * (idx + 1) + (Math.random() * 20 - 10);
      const stemHeight = 120 + Math.random() * 100;
      const topY = groundY - stemHeight;
      const side = idx % 2 === 0 ? "left" : "right";
      const stemInfo = makeStemPath(x, groundY, topY, side);

      /* Draw stem in SVG */
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", stemInfo.path);
      path.setAttribute("class", "gscene-stem");
      path.setAttribute("stroke-width", 3);
      path.style.strokeDasharray = path.getTotalLength?.() || "none";
      svg.appendChild(path);

      /* Add leaf */
      const leaf = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
      leaf.setAttribute("cx", x + (side === "left" ? -8 : 8));
      leaf.setAttribute("cy", topY + 30);
      leaf.setAttribute("rx", 8);
      leaf.setAttribute("ry", 4);
      leaf.setAttribute("transform", `rotate(${side === "left" ? -30 : 30} ${x} ${topY + 30})`);
      leaf.setAttribute("class", "gscene-leaf");
      svg.appendChild(leaf);

      /* Place ornament at top of stem */
      const ornament = createOrnament(item, false);
      /* Position: center the ornament horizontally on x, vertically at topY */
      const ow = 90; /* approx ornament width */
      ornament.style.left = (x - ow / 2) + "px";
      ornament.style.top = (topY - 40) + "px";
      plantsLayer.appendChild(ornament);
    });

    /* Place edge items */
    edgeItems.forEach((item, idx) => {
      const isLeft = item.place === "left";
      const ornament = createOrnament(item, true, isLeft);

      /* Stack vertically on edges */
      const sameSide = edgeItems.filter(i => i.place === item.place);
      const sideIdx = sameSide.indexOf(item);
      const y = 60 + sideIdx * 120;
      const x = isLeft ? 10 : (rect.width - 90);

      ornament.style.left = x + "px";
      ornament.style.top = y + "px";
      plantsLayer.appendChild(ornament);
    });
  }

  /* --------------------------------------------------- create ornament */
  function createOrnament(item, isHanging, hangSide) {
    const div = el("div", "scene-ornament");
    div.dataset.id = item.id;
    if (isHanging) {
      div.classList.add(hangSide === "left" ? "hanging-left" : "hanging-right");
    }

    /* Flower emoji */
    const fl = el("div", "scene-ornament-flower", item.emoji);
    div.appendChild(fl);

    /* Photo */
    if (item.photo) {
      const photoWrap = el("div", "scene-ornament-photo");
      const img = el("img");
      img.src = item.photo;
      img.alt = item.caption || "Nadia";
      img.loading = "lazy";
      photoWrap.appendChild(img);
      photoWrap.addEventListener("click", () => openDetail(item));
      div.appendChild(photoWrap);
    }

    /* Caption */
    if (item.caption) {
      const cap = el("p", "scene-ornament-caption", escapeHtml(item.caption));
      div.appendChild(cap);
    }

    /* Remove */
    const rm = el("button", "scene-ornament-remove", "✕");
    rm.addEventListener("click", (e) => {
      e.stopPropagation();
      removeItem(item.id);
    });
    div.appendChild(rm);

    return div;
  }

  /* --------------------------------------------------- open detail */
  function openDetail(item) {
    detailInner.innerHTML = "";

    detailInner.appendChild(el("div", "gscene-detail-flower", item.emoji));

    if (item.photo) {
      const pw = el("div", "gscene-detail-photo");
      const img = el("img");
      img.src = item.photo;
      img.alt = item.caption || "";
      pw.appendChild(img);
      detailInner.appendChild(pw);
    }

    if (item.caption) {
      detailInner.appendChild(el("p", "gscene-detail-caption", escapeHtml(item.caption)));
    }

    const ds = new Date(item.createdAt).toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric"
    });
    detailInner.appendChild(el("p", "gscene-detail-date", "Planted " + ds));

    const cl = el("button", "gscene-detail-close", "Close ♡");
    cl.addEventListener("click", () => detail.classList.remove("open"));
    detailInner.appendChild(cl);

    detail.classList.add("open");
  }

  /* --------------------------------------------------- remove item */
  function removeItem(id) {
    let items = load();
    items = items.filter(i => i.id !== id);
    save(items);
    render();
  }

  /* --------------------------------------------------- panel */
  function openPanel() {
    selFlower = "rose";
    selPlace = "branch";
    selPhoto = null;
    captionInput.value = "";
    resetFlowerPicker();
    resetPlacePicker();
    photoPreview.style.display = "none";
    photoGrid.style.display = "none";
    panel.classList.add("open");
  }
  function closePanelFn() {
    panel.classList.remove("open");
  }

  function resetFlowerPicker() {
    $$(".gscene-flower-choice", flowerPicker).forEach(b => {
      b.classList.toggle("selected", b.dataset.flower === selFlower);
    });
  }
  function resetPlacePicker() {
    $$(".gscene-place-choice").forEach(b => {
      b.classList.toggle("selected", b.dataset.place === selPlace);
    });
  }

  /* --------------------------------------------------- events */
  $$(".gscene-flower-choice", flowerPicker).forEach(btn => {
    btn.addEventListener("click", () => {
      selFlower = btn.dataset.flower;
      resetFlowerPicker();
    });
  });

  $$(".gscene-place-choice").forEach(btn => {
    btn.addEventListener("click", () => {
      selPlace = btn.dataset.place;
      resetPlacePicker();
    });
  });

  uploadBtn.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      selPhoto = ev.target.result;
      selectedPhotoImg.src = selPhoto;
      photoPreview.style.display = "block";
      photoGrid.style.display = "none";
    };
    reader.readAsDataURL(file);
  });

  pickBtn.addEventListener("click", () => {
    const photos = (window.NADIA_DATA?.gallery?.photos) || [];
    if (photos.length === 0) return;
    photoGrid.innerHTML = "";
    photos.forEach(p => {
      const img = el("img");
      img.src = p.src;
      img.alt = p.alt || "";
      img.loading = "lazy";
      img.addEventListener("click", () => {
        selPhoto = p.src;
        selectedPhotoImg.src = selPhoto;
        photoPreview.style.display = "block";
        photoGrid.style.display = "none";
      });
      photoGrid.appendChild(img);
    });
    photoGrid.style.display = "grid";
  });

  removePhotoBtn.addEventListener("click", () => {
    selPhoto = null;
    photoPreview.style.display = "none";
    fileInput.value = "";
  });

  growBtn.addEventListener("click", () => {
    const caption = captionInput.value.trim();
    if (!selPhoto && !caption) return;

    const items = load();
    items.push({
      id: Date.now().toString(),
      type: selFlower,
      emoji: FLOWERS[selFlower]?.emoji || "🌸",
      place: selPlace,
      photo: selPhoto || null,
      caption: caption || "",
      createdAt: Date.now()
    });
    save(items);
    closePanelFn();
    render();

    if (!reducedMotion && window.DiaryMagic?.burstConfetti) {
      window.DiaryMagic.burstConfetti();
    }
  });

  clearBtn.addEventListener("click", () => {
    if (confirm("Clear all plants from the garden? 🌱")) {
      localStorage.removeItem(STORAGE_KEY);
      render();
    }
  });

  /* Panel open/close */
  plantBtn.addEventListener("click", openPanel);
  closeBtn.addEventListener("click", closePanelFn);
  panel.addEventListener("click", (e) => {
    if (e.target === panel) closePanelFn();
  });
  detail.addEventListener("click", (e) => {
    if (e.target === detail) detail.classList.remove("open");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (panel.classList.contains("open")) closePanelFn();
      if (detail.classList.contains("open")) detail.classList.remove("open");
    }
  });

  /* --------------------------------------------------- init */
  const footerText = $("#footerText");
  if (footerText && window.NADIA_DATA?.site?.footerLine) {
    footerText.textContent = window.NADIA_DATA.site.footerLine;
  }

  render();

  if (window.DiaryMagic?.initReveals) {
    window.DiaryMagic.initReveals();
  }

  /* Re-render on resize (stems need re-positioning) */
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 300);
  });
})();
