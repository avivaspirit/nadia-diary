/* Renders the Photo Gallery page from window.NADIA_DATA.
   Supports user uploads with frame styles, persisted in localStorage.
   Edit mode (🗝️) allows editing/deleting all photos. */
(() => {
  "use strict";
  const { $, el, escapeHtml, initReveals, stagger, lightbox } = window.DiaryMagic;
  const data = window.NADIA_DATA;
  const gallery = data.gallery;
  const STORAGE_KEY = "nadia-gallery-photos";
  const HIDDEN_KEY = "nadia-gallery-hidden";

  function setText(sel, value) {
    const node = $(sel);
    if (node) node.textContent = value ?? "";
  }

  document.title = `Photo Gallery | ${data.site.title}`;
  setText("#siteTitle", data.site.title);
  setText("#siteFooter", data.site.footerLine);
  setText("#galleryEyebrow", gallery.eyebrow);
  setText("#galleryTitle", gallery.title);
  setText("#galleryIntro", gallery.intro);

  /* ===== State ===== */
  let userPhotos = [];
  try {
    userPhotos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    // Clean up any old parents' photos if stored in localStorage
    const filtered = userPhotos.filter(p => p.src && !p.src.includes("birthday-couple-1") && !p.src.includes("birthday-couple-2"));
    if (filtered.length !== userPhotos.length) {
      userPhotos = filtered;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userPhotos));
    }
  } catch { userPhotos = []; }
  let hiddenBuiltin = [];
  try { hiddenBuiltin = JSON.parse(localStorage.getItem(HIDDEN_KEY) || "[]"); } catch { hiddenBuiltin = []; }
  let builtinOverrides = {};
  try { builtinOverrides = JSON.parse(localStorage.getItem("nadia-gallery-overrides") || "{}"); } catch { builtinOverrides = {}; }
  let editMode = false;
  let editingIndex = -1;
  let editingBuiltin = -1;
  let activeFilter = "all";
  let activeLayout = "scrapbook";

  const grid = $("#galleryGrid");
  const myPhotosGrid = $("#myPhotosGrid");
  const myPhotosEmpty = $("#myPhotosEmpty");
  const myPhotosDivider = $("#myPhotosDivider");
  const allItems = gallery.photos.map((p) => ({ src: p.src, alt: p.alt, caption: p.caption }));

  const uploadBtn = $("#uploadBtn");
  const fileInput = $("#fileInput");
  const uploadPanel = $("#uploadPanel");
  const previewImg = $("#previewImg");
  const captionInput = $("#captionInput");
  const frameChooser = $("#frameChooser");
  const tintRow = $("#tintRow");
  const tintColors = $("#tintColors");
  const savePhotoBtn = $("#savePhotoBtn");
  const cancelUploadBtn = $("#cancelUploadBtn");
  const manageToggleBtn = $("#manageToggleBtn");
  const manageLabel = $("#manageLabel");

  let pendingPhoto = null;
  let selectedFrame = "clean";
  let selectedColor = "#e58aa0";

  /* ===== Helpers ===== */
  function saveAll() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userPhotos));
    localStorage.setItem(HIDDEN_KEY, JSON.stringify(hiddenBuiltin));
    localStorage.setItem("nadia-gallery-overrides", JSON.stringify(builtinOverrides));
  }

  /* ===== File picker ===== */
  function openFilePicker() {
    try { fileInput.click(); } catch (e) { fileInput.focus(); }
  }
  uploadBtn.addEventListener("click", openFilePicker);

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      pendingPhoto = { dataUrl: e.target.result };
      previewImg.src = pendingPhoto.dataUrl;
      captionInput.value = "";
      selectedFrame = "clean";
      selectedColor = "#e58aa0";
      editingIndex = -1;
      updateFrameUI();
      tintRow.style.display = "none";
      uploadPanel.classList.add("open");
      applyPreviewFrame();
      savePhotoBtn.textContent = "Add to gallery ✨";
    };
    reader.readAsDataURL(file);
    fileInput.value = "";
  });

  /* ===== Frame chooser ===== */
  frameChooser.addEventListener("click", (e) => {
    const opt = e.target.closest(".frame-option");
    if (!opt) return;
    selectedFrame = opt.dataset.frame;
    updateFrameUI();
    applyPreviewFrame();
  });

  function updateFrameUI() {
    frameChooser.querySelectorAll(".frame-option").forEach((o) => {
      o.classList.toggle("selected", o.dataset.frame === selectedFrame);
    });
    tintRow.style.display = selectedFrame === "tinted" ? "" : "none";
  }

  tintColors.addEventListener("click", (e) => {
    const dot = e.target.closest(".tint-dot");
    if (!dot) return;
    selectedColor = dot.dataset.color;
    tintColors.querySelectorAll(".tint-dot").forEach((d) => {
      d.classList.toggle("selected", d.dataset.color === selectedColor);
    });
    applyPreviewFrame();
  });

  function applyPreviewFrame() {
    const wrap = $("#uploadPreviewImg");
    wrap.className = "upload-preview-img fc-" + selectedFrame;
    if (selectedFrame === "tinted") {
      wrap.style.background = selectedColor;
      wrap.style.borderColor = selectedColor;
    } else {
      wrap.style.background = "";
      wrap.style.borderColor = "";
    }
  }

  /* ===== Save (add, edit user, or edit builtin) ===== */
  savePhotoBtn.addEventListener("click", () => {
    const caption = captionInput.value.trim() || "a little memory";

    /* Editing a builtin photo (frame/caption override) */
    if (editingBuiltin >= 0) {
      builtinOverrides[editingBuiltin] = {
        ...(builtinOverrides[editingBuiltin] || {}),
        caption,
        frame: selectedFrame,
        color: selectedColor
      };
      saveAll();
      editingBuiltin = -1;
      uploadPanel.classList.remove("open");
      renderBuiltinGallery();
      return;
    }

    /* Editing or adding user photo */
    if (!pendingPhoto && editingIndex < 0) return;
    const photo = {
      id: editingIndex >= 0 ? userPhotos[editingIndex].id : Date.now(),
      src: pendingPhoto ? pendingPhoto.dataUrl : (editingIndex >= 0 ? userPhotos[editingIndex].src : ""),
      caption,
      frame: selectedFrame,
      color: selectedColor,
      date: editingIndex >= 0 ? userPhotos[editingIndex].date : new Date().toISOString(),
    };
    if (editingIndex >= 0) {
      userPhotos[editingIndex] = photo;
    } else {
      userPhotos.unshift(photo);
    }
    try { saveAll(); } catch (e) {
      alert("Storage is full — try removing some photos first.");
      return;
    }
    pendingPhoto = null;
    editingIndex = -1;
    uploadPanel.classList.remove("open");
    renderMyPhotos();
  });

  cancelUploadBtn.addEventListener("click", () => {
    pendingPhoto = null;
    editingIndex = -1;
    uploadPanel.classList.remove("open");
  });

  /* ===== Edit mode toggle ===== */
  manageToggleBtn.addEventListener("click", () => {
    editMode = !editMode;
    manageToggleBtn.classList.toggle("active", editMode);
    manageLabel.textContent = editMode ? "Done managing" : "Manage photos";
    grid.classList.toggle("manage-mode", editMode);
    myPhotosGrid.classList.toggle("manage-mode", editMode);
    renderBuiltinGallery();
    renderMyPhotos();
  });

  /* ===== Render: built-in gallery ===== */
  function getEffectivePhoto(i) {
    const original = gallery.photos[i];
    const ov = builtinOverrides[i];
    if (!ov) return { ...original, frame: "clean", color: "#e58aa0" };
    return {
      src: original.src,
      alt: ov.alt || original.alt,
      caption: ov.caption !== undefined ? ov.caption : original.caption,
      frame: ov.frame || "clean",
      color: ov.color || "#e58aa0"
    };
  }

  function renderBuiltinGallery() {
    grid.innerHTML = "";
    grid.className = "gallery-grid layout-" + activeLayout;

    gallery.photos.forEach((photo, i) => {
      const isDeleted = builtinOverrides[i]?.deleted;
      if (isDeleted && !editMode) return;

      /* Category filter */
      if (activeFilter !== "all") {
        const tags = photo.tags || [];
        if (!tags.includes(activeFilter)) return;
      }

      const eff = getEffectivePhoto(i);
      const isHidden = hiddenBuiltin.includes(i);
      if (isHidden && !editMode && !isDeleted) return;

      /* Use frame wrapper if frame is set */
      if (eff.frame && eff.frame !== "clean") {
        const card = el("div", "gallery-card fc-" + eff.frame);
        if (eff.frame === "tinted") card.style.background = eff.color;
        if (!editMode && activeLayout === "scrapbook") {
          const rotation = (Math.random() - 0.5) * 4;
          card.style.transform = `rotate(${rotation}deg)`;
        }
        const imgWrap = el("div", "fc-img-wrap");
        imgWrap.innerHTML = `<img src="${escapeHtml(eff.src)}" alt="${escapeHtml(eff.alt || "")}" loading="lazy" decoding="async" />`;
        const cap = el("div", "fc-caption");
        cap.textContent = eff.caption || "";
        card.appendChild(imgWrap);
        card.appendChild(cap);
        if (!editMode) {
          card.addEventListener("click", () => lightbox.open(gallery.photos, i));
        }
        grid.appendChild(card);
      } else {
        const item = el("div", "gallery-item");
        if (isHidden || isDeleted) item.classList.add("is-hidden-photo");
        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0");
        item.setAttribute("aria-label", `Photo: ${eff.caption || eff.alt || "memory"}`);
        item.innerHTML = `<img src="${escapeHtml(eff.src)}" alt="${escapeHtml(eff.alt || "")}" loading="lazy" decoding="async" /><span class="gallery-caption">${escapeHtml(eff.caption || "")}</span>`;
        if (!editMode) {
          item.addEventListener("click", () => lightbox.open(gallery.photos, i));
        }
        grid.appendChild(item);
      }

      /* Add manage menu in edit mode */
      if (editMode) {
        const lastEl = grid.lastElementChild;
        if (lastEl) {
          const menu = el("div", "gallery-manage-menu");
          let btns = "";
          if (isDeleted) {
            btns = `<button class="gm-restore" data-builtin="${i}"><span>♻️</span> Restore</button>`;
          } else {
            btns = `<button class="gm-edit-builtin" data-builtin="${i}"><span>✎</span> Edit</button>`;
            if (isHidden) {
              btns += `<button class="gm-unhide" data-builtin="${i}"><span>👁️</span> Show</button>`;
            } else {
              btns += `<button class="gm-hide" data-builtin="${i}"><span>🙈</span> Hide</button>`;
            }
            btns += `<button class="gm-delete-builtin" data-builtin="${i}"><span>🗑️</span> Delete</button>`;
          }
          menu.innerHTML = btns;
          lastEl.appendChild(menu);
        }
      }
    });
    if (!editMode) {
      stagger(grid, 0.06, 0.5);
      /* Make sure items are visible after re-render */
      grid.querySelectorAll(".reveal").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-visible");
        }
      });
    }
  }

  /* ===== Manage menu clicks (builtin) ===== */
  grid.addEventListener("click", (e) => {
    const t = e.target;

    const editBuilt = t.closest(".gm-edit-builtin");
    if (editBuilt) {
      e.stopPropagation(); e.preventDefault();
      const idx = Number(editBuilt.dataset.builtin);
      const eff = getEffectivePhoto(idx);
      editingBuiltin = idx;
      editingIndex = -1;
      pendingPhoto = null;
      previewImg.src = eff.src;
      captionInput.value = eff.caption || "";
      selectedFrame = eff.frame || "clean";
      selectedColor = eff.color || "#e58aa0";
      updateFrameUI();
      tintRow.style.display = selectedFrame === "tinted" ? "" : "none";
      uploadPanel.classList.add("open");
      applyPreviewFrame();
      savePhotoBtn.textContent = "Save frame ♡";
      uploadPanel.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const delBuilt = t.closest(".gm-delete-builtin");
    if (delBuilt) {
      e.stopPropagation(); e.preventDefault();
      const idx = Number(delBuilt.dataset.builtin);
      builtinOverrides[idx] = { ...(builtinOverrides[idx] || {}), deleted: true };
      saveAll();
      renderBuiltinGallery();
      return;
    }

    const restoreBuilt = t.closest(".gm-restore");
    if (restoreBuilt) {
      e.stopPropagation(); e.preventDefault();
      const idx = Number(restoreBuilt.dataset.builtin);
      if (builtinOverrides[idx]) delete builtinOverrides[idx].deleted;
      saveAll();
      renderBuiltinGallery();
      return;
    }

    const hideBtn = t.closest(".gm-hide");
    if (hideBtn) {
      e.stopPropagation(); e.preventDefault();
      const idx = Number(hideBtn.dataset.builtin);
      if (!hiddenBuiltin.includes(idx)) hiddenBuiltin.push(idx);
      saveAll();
      renderBuiltinGallery();
      return;
    }
    const unhideBtn = t.closest(".gm-unhide");
    if (unhideBtn) {
      e.stopPropagation(); e.preventDefault();
      const idx = Number(unhideBtn.dataset.builtin);
      hiddenBuiltin = hiddenBuiltin.filter((i) => i !== idx);
      saveAll();
      renderBuiltinGallery();
      return;
    }
  });

  /* ===== Build user photo card ===== */
  function buildCard(photo, index) {
    const card = el("div", "gallery-card fc-" + photo.frame);
    if (photo.frame === "tinted") card.style.background = photo.color;
    if (!editMode) {
      const rotation = (Math.random() - 0.5) * 4;
      card.style.transform = `rotate(${rotation}deg)`;
    }

    const imgWrap = el("div", "fc-img-wrap");
    const img = el("img");
    img.src = photo.src;
    img.alt = escapeHtml(photo.caption);
    img.loading = "lazy";
    imgWrap.appendChild(img);

    const caption = el("div", "fc-caption");
    caption.textContent = photo.caption;
    card.appendChild(imgWrap);
    card.appendChild(caption);

    if (editMode) {
      const menu = el("div", "gallery-manage-menu");
      menu.innerHTML =
        `<button class="gm-edit" data-idx="${index}"><span>✎</span> Edit</button>` +
        `<button class="gm-delete" data-idx="${index}"><span>✕</span> Delete</button>`;
      card.appendChild(menu);
    } else {
      card.addEventListener("click", (e) => {
        if (e.target.classList.contains("fc-delete")) return;
        const items = userPhotos.map((p) => ({ src: p.src, alt: p.caption, caption: p.caption }));
        lightbox.open(items, index);
      });
      const delBtn = el("button", "fc-delete");
      delBtn.type = "button";
      delBtn.setAttribute("aria-label", "Delete photo");
      delBtn.textContent = "✕";
      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        userPhotos.splice(index, 1);
        try { saveAll(); } catch {}
        renderMyPhotos();
      });
      card.appendChild(delBtn);
    }
    return card;
  }

  /* ===== Manage menu clicks (user photos) ===== */
  myPhotosGrid.addEventListener("click", (e) => {
    const editBtn = e.target.closest(".gm-edit");
    if (editBtn) {
      e.stopPropagation();
      const idx = Number(editBtn.dataset.idx);
      const photo = userPhotos[idx];
      if (!photo) return;
      editingIndex = idx;
      pendingPhoto = null;
      previewImg.src = photo.src;
      captionInput.value = photo.caption;
      selectedFrame = photo.frame || "clean";
      selectedColor = photo.color || "#e58aa0";
      updateFrameUI();
      tintRow.style.display = selectedFrame === "tinted" ? "" : "none";
      uploadPanel.classList.add("open");
      applyPreviewFrame();
      savePhotoBtn.textContent = "Save changes ♡";
      uploadPanel.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const delBtn = e.target.closest(".gm-delete");
    if (delBtn) {
      e.stopPropagation();
      const idx = Number(delBtn.dataset.idx);
      userPhotos.splice(idx, 1);
      try { saveAll(); } catch {}
      renderMyPhotos();
      return;
    }
  });

  /* ===== Render user photos ===== */
  function renderMyPhotos() {
    myPhotosGrid.innerHTML = "";
    if (userPhotos.length === 0) {
      myPhotosEmpty.style.display = editMode ? "none" : "";
      myPhotosDivider.style.display = "none";
      return;
    }
    myPhotosEmpty.style.display = "none";
    myPhotosDivider.style.display = "";
    userPhotos.forEach((photo, i) => {
      myPhotosGrid.appendChild(buildCard(photo, i));
    });
    if (!editMode) stagger(myPhotosGrid, 0.06, 0.4);
  }

  /* ===== Category filter + Layout switcher ===== */
  const galleryFilters = $("#galleryFilters");
  const galleryLayouts = $("#galleryLayouts");

  if (galleryFilters) {
    galleryFilters.addEventListener("click", (e) => {
      const btn = e.target.closest(".gallery-filter");
      if (!btn) return;
      activeFilter = btn.dataset.filter;
      galleryFilters.querySelectorAll(".gallery-filter").forEach((b) =>
        b.classList.toggle("active", b === btn));
      renderBuiltinGallery();
    });
  }

  if (galleryLayouts) {
    galleryLayouts.addEventListener("click", (e) => {
      const btn = e.target.closest(".layout-btn");
      if (!btn) return;
      activeLayout = btn.dataset.layout;
      galleryLayouts.querySelectorAll(".layout-btn").forEach((b) =>
        b.classList.toggle("active", b === btn));
      renderBuiltinGallery();
    });
  }

  /* ===== Init ===== */
  renderBuiltinGallery();
  renderMyPhotos();
  initReveals();
})();
