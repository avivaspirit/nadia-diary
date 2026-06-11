/* Renders Nadia's Dolls cabinet from window.NADIA_DATA + localStorage edits. */
(() => {
  "use strict";
  const { $, el, escapeHtml, stagger, initReveals } = window.DiaryMagic;
  const data = window.NADIA_DATA;
  const dollsData = data.dolls;

  const STORAGE_KEY = "nadiaDollPreviewItems";
  const PERMANENT_STORAGE_KEY = "nadiaDollPermanentOverrides";

  function setText(sel, value) {
    const node = $(sel);
    if (node) node.textContent = value ?? "";
  }

  /* ------------------------------------------------------ page chrome */
  document.title = `Nadia's Dolls | ${data.site.title}`;
  setText("#siteTitle", data.site.title);
  setText("#siteFooter", dollsData.footerLine || data.site.footerLine);
  setText("#dollsEyebrow", dollsData.eyebrow);
  setText("#dollsTitle", dollsData.title);
  setText("#dollsIntro", dollsData.intro);
  setText("#shelfEyebrow", dollsData.shelfEyebrow);
  setText("#shelfTitle", dollsData.shelfTitle);

  const heroImg = $("#dollsHeroPhoto");
  heroImg.src = dollsData.heroPhoto.src;
  heroImg.alt = dollsData.heroPhoto.alt || "";
  setText("#dollsHeroCaption", dollsData.heroPhoto.caption);

  /* --------------------------------------------------------- state
     Dolls from site-data.js are the permanent collection.
     Dolls added in the browser live in localStorage on top of them. */
  let localDolls = [];
  let permanentOverrides = {};
  try {
    localDolls = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(localDolls)) localDolls = [];
  } catch { localDolls = []; }
  try {
    permanentOverrides = JSON.parse(localStorage.getItem(PERMANENT_STORAGE_KEY) || "{}");
    if (!permanentOverrides || Array.isArray(permanentOverrides) || typeof permanentOverrides !== "object") {
      permanentOverrides = {};
    }
  } catch { permanentOverrides = {}; }

  function allDolls() {
    const added = localDolls.map((d, index) => ({
      ...d,
      _source: "local",
      _sourceIndex: index
    }));
    const permanent = dollsData.items.flatMap((doll, index) => {
      const override = permanentOverrides[index];
      if (override?.deleted) return [];
      return [{
        ...doll,
        ...(override || {}),
        _source: "permanent",
        _sourceIndex: index
      }];
    });
    return [...added, ...permanent];
  }

  function saveLocal() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(localDolls));
    localStorage.setItem(PERMANENT_STORAGE_KEY, JSON.stringify(permanentOverrides));
  }

  /* --------------------------------------------------------- render */
  const grid = $("#dollGrid");

  function normalizePhotoPath(value) {
    const trimmed = String(value || "").trim().replaceAll("\\", "/");
    if (!trimmed) return "";
    if (/^(https?:|data:|blob:)/i.test(trimmed)) return trimmed;
    const fileName = trimmed.split("/").filter(Boolean).pop();
    return fileName ? `./assets/uploads/${fileName}` : "";
  }

  function render() {
    const dolls = allDolls();
    grid.innerHTML = "";

    if (dolls.length === 0) {
      grid.innerHTML = `
        <div class="empty-cabinet">
          <strong>No dolls yet</strong>
          <span>Open the drawer below to add the first tiny treasure.</span>
        </div>`;
      return;
    }

    dolls.forEach((doll) => {
      const name = doll.name || "Unnamed doll";
      const tag = doll.tag || "soft sweetheart";
      const caption = doll.caption || "";
      const photo = doll.photo || "";
      const photoHtml = photo
        ? `<img src="${escapeHtml(photo)}" alt="${escapeHtml(name)}" loading="lazy" decoding="async" />`
        : `<span>photo coming soon 🎀</span>`;
      const manageHtml = `
        <div class="doll-manage">
          <button class="doll-manage-toggle" type="button" aria-label="Manage ${escapeHtml(name)}" aria-expanded="false" title="Manage this tiny treasure">🗝️</button>
          <div class="doll-manage-menu" role="menu">
            <span class="manage-menu-label">tiny changes</span>
            <button class="edit-doll-button" type="button" role="menuitem" data-source="${doll._source}" data-index="${doll._sourceIndex}"><span aria-hidden="true">✎</span> Edit</button>
            <button class="delete-doll-button" type="button" role="menuitem" data-source="${doll._source}" data-index="${doll._sourceIndex}"><span aria-hidden="true">×</span> Delete</button>
          </div>
        </div>`;

      const card = el("article", "doll-card");
      card.innerHTML = `
        <div class="doll-card-inner">
          <button class="doll-face doll-door" type="button" aria-expanded="false">
            <span class="door-knob" aria-hidden="true"></span>
            <span class="door-bow" aria-hidden="true">🎀</span>
            <span class="door-name">${escapeHtml(name)}</span>
            <span class="door-tag">${escapeHtml(tag)}</span>
            <span class="door-hint">tap to open</span>
          </button>
          <div class="doll-face doll-inside">
            <div class="doll-photo">${photoHtml}</div>
            <div class="doll-text">
              <span class="doll-tag">${escapeHtml(tag)}</span>
              <h3>${escapeHtml(name)}</h3>
              <p>${escapeHtml(caption)}</p>
            </div>
            <button class="doll-close" type="button">close door 🗝️</button>
          </div>
        </div>
        ${manageHtml}`;
      grid.appendChild(card);
    });

    stagger(grid, 0.1, 0.5);
    initReveals();
  }

  /* ----------------------------------------------------- interactions */
  grid.addEventListener("click", (event) => {
    const manageToggle = event.target.closest(".doll-manage-toggle");
    if (manageToggle) {
      const manage = manageToggle.closest(".doll-manage");
      grid.querySelectorAll(".doll-manage.is-open").forEach((openManage) => {
        if (openManage === manage) return;
        openManage.classList.remove("is-open");
        openManage.querySelector(".doll-manage-toggle")?.setAttribute("aria-expanded", "false");
      });
      const isOpen = manage.classList.toggle("is-open");
      manageToggle.setAttribute("aria-expanded", String(isOpen));
      return;
    }
    const editButton = event.target.closest(".edit-doll-button");
    if (editButton) {
      startEdit(editButton.dataset.source, Number(editButton.dataset.index));
      return;
    }
    const deleteButton = event.target.closest(".delete-doll-button");
    if (deleteButton) {
      deleteDoll(deleteButton.dataset.source, Number(deleteButton.dataset.index));
      return;
    }

    const door = event.target.closest(".doll-door");
    if (door) {
      const card = door.closest(".doll-card");
      card.classList.add("is-open");
      door.setAttribute("aria-expanded", "true");
      return;
    }
    const closeBtn = event.target.closest(".doll-close");
    if (closeBtn) {
      const card = closeBtn.closest(".doll-card");
      card.classList.remove("is-open");
      card.querySelector(".doll-door").setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest(".doll-manage")) return;
    grid.querySelectorAll(".doll-manage.is-open").forEach((manage) => {
      manage.classList.remove("is-open");
      manage.querySelector(".doll-manage-toggle")?.setAttribute("aria-expanded", "false");
    });
  });

  /* -------------------------------------------------------- the drawer */
  const drawerCover = $(".drawer-editor-cover");
  const form = $("#previewDollForm");
  const editingIndexInput = $("#editingIndexInput");
  const photoInput = $("#dollPhotoInput");
  const photoPathInput = $("#dollPhotoPathInput");
  const nameInput = $("#dollNameInput");
  const tagInput = $("#dollTagInput");
  const colorInput = $("#dollColorInput");
  const detailInput = $("#dollDetailInput");
  const captionInput = $("#dollCaptionInput");
  const generateButton = $("#generateCaptionButton");
  const saveButton = $("#saveDollButton");
  const cancelEditButton = $("#cancelEditButton");

  let selectedPhoto = "";
  let editingSource = "";

  function makeCaption({ name, tag, color, detail }) {
    const dollName = name || "This little doll";
    const softColor = color || "soft colors";
    const cuteDetail = detail || "tiny sweet details";
    const personality = tag || "gentle little sweetheart";
    return `${dollName} feels like a ${personality}, dressed in ${softColor} with ${cuteDetail}. She looks ready to sit quietly in Nadia's collection and make the whole shelf feel a little cuter.`;
  }

  function openDrawer() {
    drawerCover.setAttribute("aria-expanded", "true");
    form.hidden = false;
  }

  function resetForm() {
    form.reset();
    editingIndexInput.value = "";
    editingSource = "";
    selectedPhoto = "";
    saveButton.textContent = "Add Doll";
    cancelEditButton.hidden = true;
  }

  function getEditableDoll(source, index) {
    if (source === "local") return localDolls[index];
    if (source === "permanent") {
      return { ...dollsData.items[index], ...(permanentOverrides[index] || {}) };
    }
    return null;
  }

  function startEdit(source, index) {
    const doll = getEditableDoll(source, index);
    if (!doll) return;
    openDrawer();
    editingSource = source;
    editingIndexInput.value = String(index);
    photoPathInput.value = doll.photo || "";
    nameInput.value = doll.name || "";
    tagInput.value = doll.tag || "";
    colorInput.value = doll.color || "";
    detailInput.value = doll.detail || "";
    captionInput.value = doll.caption || "";
    selectedPhoto = "";
    saveButton.textContent = "Save Changes";
    cancelEditButton.hidden = false;
    form.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function deleteDoll(source, index) {
    const doll = getEditableDoll(source, index);
    if (!doll) return;
    if (!confirm(`Delete ${doll.name || "this doll"}?`)) return;
    if (source === "local") {
      localDolls.splice(index, 1);
    } else {
      permanentOverrides[index] = { ...(permanentOverrides[index] || {}), deleted: true };
    }
    saveLocal();
    render();
    resetForm();
  }

  photoInput.addEventListener("change", () => {
    const file = photoInput.files?.[0];
    selectedPhoto = file ? URL.createObjectURL(file) : "";
    if (file) photoPathInput.value = `assets/uploads/${file.name}`;
  });

  generateButton.addEventListener("click", () => {
    captionInput.value = makeCaption({
      name: nameInput.value.trim(),
      tag: tagInput.value.trim(),
      color: colorInput.value.trim(),
      detail: detailInput.value.trim()
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const editingIndex = editingIndexInput.value === "" ? -1 : Number(editingIndexInput.value);
    const name = nameInput.value.trim() || "New little doll";
    const tag = tagInput.value.trim() || "soft sweetheart";
    const color = colorInput.value.trim();
    const detail = detailInput.value.trim();
    const caption = captionInput.value.trim() || makeCaption({ name, tag, color, detail });
    const existingPhoto = editingIndex >= 0
      ? getEditableDoll(editingSource, editingIndex)?.photo
      : "";
    const photo = selectedPhoto || normalizePhotoPath(photoPathInput.value) || existingPhoto || "";
    const nextDoll = { name, tag, color, detail, photo, caption };

    if (editingIndex >= 0 && editingSource === "local") {
      localDolls[editingIndex] = nextDoll;
    } else if (editingIndex >= 0 && editingSource === "permanent") {
      permanentOverrides[editingIndex] = nextDoll;
    } else {
      localDolls.unshift(nextDoll);
    }

    saveLocal();
    resetForm();
    render();
  });

  drawerCover.addEventListener("click", () => {
    const isOpen = drawerCover.getAttribute("aria-expanded") === "true";
    drawerCover.setAttribute("aria-expanded", String(!isOpen));
    form.hidden = isOpen;
  });

  cancelEditButton.addEventListener("click", resetForm);

  render();
})();
