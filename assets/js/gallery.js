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
  try { userPhotos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { userPhotos = []; }
  let hiddenBuiltin = [];
  try { hiddenBuiltin = JSON.parse(localStorage.getItem(HIDDEN_KEY) || "[]"); } catch { hiddenBuiltin = []; }
  let editMode = false;
  let editingIndex = -1;

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

  /* ===== Save (add or edit) ===== */
  savePhotoBtn.addEventListener("click", () => {
    if (!pendingPhoto && editingIndex < 0) return;
    const photo = {
      id: editingIndex >= 0 ? userPhotos[editingIndex].id : Date.now(),
      src: pendingPhoto ? pendingPhoto.dataUrl : (editingIndex >= 0 ? userPhotos[editingIndex].src : ""),
      caption: captionInput.value.trim() || "a little memory",
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
  function renderBuiltinGallery() {
    grid.innerHTML = "";
    gallery.photos.forEach((photo, i) => {
      const isHidden = hiddenBuiltin.includes(i);
      if (isHidden && !editMode) return;

      const item = el("div", "gallery-item");
      if (isHidden) item.classList.add("is-hidden-photo");
      item.setAttribute("role", "button");
      item.setAttribute("tabindex", "0");
      item.setAttribute("aria-label", `Photo: ${photo.caption || photo.alt || "memory"}`);
      item.innerHTML = `
        <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt || "")}" loading="lazy" decoding="async" />
        <span class="gallery-caption">${escapeHtml(photo.caption || "")}</span>`;

      if (editMode) {
        const menu = el("div", "gallery-manage-menu");
        menu.innerHTML = isHidden
          ? `<button class="gm-unhide" data-builtin="${i}"><span>👁️</span> Show</button>`
          : `<button class="gm-hide" data-builtin="${i}"><span>🙈</span> Hide</button>`;
        item.appendChild(menu);
      } else {
        item.addEventListener("click", () => {
          const visible = gallery.photos
            .map((p, idx) => ({ ...p, idx }))
            .filter((p) => !hiddenBuiltin.includes(p.idx));
          const visIdx = visible.findIndex((p) => p.idx === i);
          if (visIdx >= 0) lightbox.open(visible, visIdx);
        });
      }
      grid.appendChild(item);
    });
    if (!editMode) stagger(grid, 0.06, 0.5);
  }

  /* ===== Manage menu clicks (builtin) ===== */
  grid.addEventListener("click", (e) => {
    const hideBtn = e.target.closest(".gm-hide");
    if (hideBtn) {
      e.stopPropagation();
      e.preventDefault();
      const idx = Number(hideBtn.dataset.builtin);
      if (!hiddenBuiltin.includes(idx)) hiddenBuiltin.push(idx);
      saveAll();
      renderBuiltinGallery();
      return;
    }
    const unhideBtn = e.target.closest(".gm-unhide");
    if (unhideBtn) {
      e.stopPropagation();
      e.preventDefault();
      const idx = Number(unhideBtn.dataset.builtin);
      hiddenBuiltin = hiddenBuiltin.filter((i) => i !== idx);
      saveAll();
      renderBuiltinGallery();
      return;
    }
  });

  /* Also catch clicks directly on gm-hide/gm-unhide buttons */
  document.addEventListener("click", (e) => {
    const hideBtn = e.target.closest && e.target.closest(".gm-hide");
    if (hideBtn && grid.contains(hideBtn)) {
      e.stopPropagation();
      e.preventDefault();
      const idx = Number(hideBtn.dataset.builtin);
      if (!hiddenBuiltin.includes(idx)) hiddenBuiltin.push(idx);
      saveAll();
      renderBuiltinGallery();
      return;
    }
    const unhideBtn = e.target.closest && e.target.closest(".gm-unhide");
    if (unhideBtn && grid.contains(unhideBtn)) {
      e.stopPropagation();
      e.preventDefault();
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

  /* ===== Init ===== */
  renderBuiltinGallery();
  renderMyPhotos();
  initReveals();
})();
