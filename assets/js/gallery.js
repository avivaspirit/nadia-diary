/* Renders the Photo Gallery page from window.NADIA_DATA.
   Supports user uploads with frame styles, persisted in localStorage. */
(() => {
  "use strict";
  const { $, el, escapeHtml, initReveals, stagger, lightbox } = window.DiaryMagic;
  const data = window.NADIA_DATA;
  const gallery = data.gallery;
  const STORAGE_KEY = "nadia-gallery-photos";

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

  /* ===== Pre-loaded gallery photos ===== */
  const grid = $("#galleryGrid");
  const allItems = gallery.photos.map((p) => ({ src: p.src, alt: p.alt, caption: p.caption }));

  gallery.photos.forEach((photo, i) => {
    const btn = el("button", "gallery-item");
    btn.type = "button";
    btn.setAttribute("aria-label", `Open photo: ${photo.caption || photo.alt || "memory"}`);
    btn.innerHTML = `
      <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt || "")}" loading="lazy" decoding="async" />
      <span class="gallery-caption">${escapeHtml(photo.caption || "")}</span>`;
    btn.addEventListener("click", () => lightbox.open(allItems, i));
    grid.appendChild(btn);
  });

  /* ===== User upload system ===== */
  const myPhotosGrid = $("#myPhotosGrid");
  const myPhotosEmpty = $("#myPhotosEmpty");
  const myPhotosDivider = $("#myPhotosDivider");

  let userPhotos = [];
  try { userPhotos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { userPhotos = []; }

  // Current upload state
  let pendingPhoto = null;     // { dataUrl }
  let selectedFrame = "clean";
  let selectedColor = "#e58aa0";

  /* DOM refs */
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

  /* Open file picker — wrap in try/catch for browsers that block programmatic clicks */
  function openFilePicker() {
    try {
      fileInput.click();
    } catch (e) {
      /* fallback: focus + Enter key */
      fileInput.style.position = "fixed";
      fileInput.style.top = "50%";
      fileInput.style.left = "50%";
      fileInput.style.width = "1px";
      fileInput.style.height = "1px";
      fileInput.style.opacity = "0.01";
      fileInput.removeAttribute("style");
      fileInput.focus();
    }
  }
  uploadBtn.addEventListener("click", openFilePicker);

  /* Read selected file → open edit panel */
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      pendingPhoto = { dataUrl: e.target.result };
      previewImg.src = pendingPhoto.dataUrl;
      captionInput.value = "";
      selectedFrame = "clean";
      selectedColor = "#e58aa0";
      updateFrameUI();
      tintRow.style.display = "none";
      uploadPanel.classList.add("open");
      applyPreviewFrame();
    };
    reader.readAsDataURL(file);
    fileInput.value = "";
  });

  /* Frame chooser clicks */
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

  /* Tint color picker */
  tintColors.addEventListener("click", (e) => {
    const dot = e.target.closest(".tint-dot");
    if (!dot) return;
    selectedColor = dot.dataset.color;
    tintColors.querySelectorAll(".tint-dot").forEach((d) => {
      d.classList.toggle("selected", d.dataset.color === selectedColor);
    });
    applyPreviewFrame();
  });

  /* Apply frame class to preview image container */
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

  /* Save photo to gallery */
  savePhotoBtn.addEventListener("click", () => {
    if (!pendingPhoto) return;
    const photo = {
      id: Date.now(),
      src: pendingPhoto.dataUrl,
      caption: captionInput.value.trim() || "a little memory",
      frame: selectedFrame,
      color: selectedColor,
      date: new Date().toISOString(),
    };
    userPhotos.unshift(photo);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(userPhotos)); } catch (e) {
      alert("Storage is full — try removing some photos first.");
      return;
    }
    pendingPhoto = null;
    uploadPanel.classList.remove("open");
    renderMyPhotos();
  });

  /* Cancel upload */
  cancelUploadBtn.addEventListener("click", () => {
    pendingPhoto = null;
    uploadPanel.classList.remove("open");
  });

  /* Build a gallery card element for a user photo */
  function buildCard(photo, index) {
    const card = el("div", "gallery-card fc-" + photo.frame);
    if (photo.frame === "tinted") {
      card.style.background = photo.color;
    }
    const rotation = (Math.random() - 0.5) * 4;
    card.style.transform = `rotate(${rotation}deg)`;

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

    // click → lightbox
    card.addEventListener("click", (e) => {
      if (e.target.classList.contains("fc-delete")) return;
      const items = userPhotos.map((p) => ({ src: p.src, alt: p.caption, caption: p.caption }));
      lightbox.open(items, index);
    });

    // delete button
    const delBtn = el("button", "fc-delete");
    delBtn.type = "button";
    delBtn.setAttribute("aria-label", "Delete photo");
    delBtn.textContent = "✕";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      userPhotos.splice(index, 1);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(userPhotos)); } catch {}
      renderMyPhotos();
    });
    card.appendChild(delBtn);

    return card;
  }

  /* Render user photos section */
  function renderMyPhotos() {
    myPhotosGrid.innerHTML = "";
    if (userPhotos.length === 0) {
      myPhotosEmpty.style.display = "";
      myPhotosDivider.style.display = "none";
      return;
    }
    myPhotosEmpty.style.display = "none";
    myPhotosDivider.style.display = "";

    userPhotos.forEach((photo, i) => {
      myPhotosGrid.appendChild(buildCard(photo, i));
    });
    stagger(myPhotosGrid, 0.06, 0.4);
  }

  renderMyPhotos();
  stagger(grid, 0.06, 0.5);
  initReveals();
})();
