/* ================================================================
   NADIA'S DOLLS — Gallery-style cabinet
   Same design as photo gallery: filters, layouts, upload, manage
   ================================================================ */
(() => {
  "use strict";
  const { $, el, escapeHtml, stagger, initReveals, lightbox } = window.DiaryMagic;
  const data = window.NADIA_DATA;
  const dd = data.dolls;

  const STORAGE_KEY = "nadia-dolls-user";
  const HIDDEN_KEY = "nadia-dolls-hidden";
  const OVERRIDE_KEY = "nadia-dolls-overrides";
  const DELETED_KEY = "nadia-dolls-deleted";

  /* ===== Helpers ===== */
  function setText(sel, val) { const n = $(sel); if (n) n.textContent = val ?? ""; }

  /* ===== State ===== */
  let userDolls = [];
  try { userDolls = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { userDolls = []; }
  let hiddenBuiltin = [];
  try { hiddenBuiltin = JSON.parse(localStorage.getItem(HIDDEN_KEY) || "[]"); } catch { hiddenBuiltin = []; }
  let builtinOverrides = {};
  try { builtinOverrides = JSON.parse(localStorage.getItem(OVERRIDE_KEY) || "{}"); } catch { builtinOverrides = {}; }
  let deletedBuiltin = [];
  try { deletedBuiltin = JSON.parse(localStorage.getItem(DELETED_KEY) || "[]"); } catch { deletedBuiltin = []; }

  let editMode = false;
  let editingUser = -1;
  let editingBuiltin = -1;
  let activeFilter = "all";
  let activeLayout = "scrapbook";
  let pendingPhoto = "";

  function saveAll() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userDolls));
    localStorage.setItem(HIDDEN_KEY, JSON.stringify(hiddenBuiltin));
    localStorage.setItem(OVERRIDE_KEY, JSON.stringify(builtinOverrides));
    localStorage.setItem(DELETED_KEY, JSON.stringify(deletedBuiltin));
  }

  /* ===== Page chrome ===== */
  document.title = `Nadia's Dolls | ${data.site.title}`;
  setText("#siteTitle", data.site.title);
  setText("#siteFooter", dd.footerLine || data.site.footerLine);
  setText("#dollsEyebrow", dd.eyebrow);
  setText("#dollsTitle", dd.title);
  setText("#dollsIntro", dd.intro);

  /* ===== Elements ===== */
  const grid = $("#dollGrid");
  const userGrid = $("#userDollGrid");
  const userSection = $("#userDollsSection");
  const panel = $("#dollPanel");
  const fileInput = $("#dollFileInput");
  const previewImg = $("#dollPreviewPhoto");
  const nameInput = $("#dollNameInput");
  const tagInput = $("#dollTagInput");
  const captionInput = $("#dollCaptionInput");
  const saveBtn = $("#saveDollBtn");
  const cancelBtn = $("#cancelDollBtn");
  const manageToggleBtn = $("#manageToggleBtn");
  const manageLabel = $("#manageLabel");

  /* ===== Frame chooser ===== */
  let selectedFrame = "clean";
  let selectedColor = "#f6c8d6";

  function setupFrameChooser() {
    const chooser = $("#dollFrameChooser");
    chooser?.addEventListener("click", (e) => {
      const opt = e.target.closest(".frame-option");
      if (!opt) return;
      selectedFrame = opt.dataset.frame;
      chooser.querySelectorAll(".frame-option").forEach((o) => o.classList.toggle("selected", o === opt));
    });

    const tintChooser = $("#dollTintChooser");
    tintChooser?.addEventListener("click", (e) => {
      const opt = e.target.closest(".tint-option");
      if (!opt) return;
      selectedColor = opt.dataset.color;
      tintChooser.querySelectorAll(".tint-option").forEach((o) => o.classList.toggle("selected", o === opt));
    });
  }
  setupFrameChooser();

  /* ===== Get effective doll (apply overrides) ===== */
  function getEffectiveDoll(i) {
    const original = dd.items[i];
    const ov = builtinOverrides[i];
    return {
      name: ov?.name || original.name,
      tag: ov?.tag || original.tag || "",
      photo: ov?.photo || original.photo,
      caption: ov?.caption || original.caption || "",
      frame: ov?.frame || "clean",
      color: ov?.color || "#f6c8d6"
    };
  }

  /* ===== Render builtin dolls ===== */
  function renderDolls() {
    grid.innerHTML = "";
    grid.className = "gallery-grid layout-" + activeLayout;

    dd.items.forEach((doll, i) => {
      if (deletedBuiltin.includes(i) && !editMode) return;

      /* Category filter */
      if (activeFilter !== "all") {
        const tags = doll.tags || ["plushie"];
        if (!tags.includes(activeFilter)) return;
      }

      const eff = getEffectiveDoll(i);
      const isHidden = hiddenBuiltin.includes(i);
      if (isHidden && !editMode) return;

      const card = buildDollCard(eff, false, i);
      grid.appendChild(card);

      if (editMode) {
        const menu = el("div", "gallery-manage-menu");
        let btns = "";
        if (deletedBuiltin.includes(i)) {
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
        card.appendChild(menu);
      }
    });

    /* Render user dolls */
    userGrid.innerHTML = "";
    userGrid.className = "gallery-grid layout-" + activeLayout;
    userDolls.forEach((doll, i) => {
      const card = buildDollCard(doll, true, i);
      userGrid.appendChild(card);
      if (editMode) {
        const menu = el("div", "gallery-manage-menu");
        menu.innerHTML =
          `<button class="gm-edit-user" data-index="${i}"><span>✎</span> Edit</button>` +
          `<button class="gm-delete-user" data-index="${i}"><span>🗑️</span> Delete</button>`;
        card.appendChild(menu);
      }
    });
    userSection.hidden = userDolls.length === 0;

    if (!editMode) {
      stagger(grid, 0.06, 0.5);
      stagger(userGrid, 0.06, 0.4);
    }
    initReveals();
  }

  function buildDollCard(doll, isUser, index) {
    const name = doll.name || "Unnamed";
    const tag = doll.tag || "little sweetheart";
    const caption = doll.caption || "";
    const photo = doll.photo || "";
    const frame = doll.frame || "clean";
    const color = doll.color || "#f6c8d6";

    const item = el("div", "gallery-item doll-card-v2");
    item.setAttribute("data-index", index);
    item.setAttribute("data-source", isUser ? "user" : "builtin");

    const photoHtml = photo
      ? `<img src="${escapeHtml(photo)}" alt="${escapeHtml(name)}" loading="lazy" decoding="async" />`
      : `<span style="display:grid;place-items:center;width:100%;height:200px;background:rgba(160,74,96,0.06);border-radius:12px;">🧸</span>`;

    const frameClass = frame !== "clean" ? " fc-" + frame : "";
    if (frameClass) {
      item.className += frameClass;
      if (frame === "tinted") item.style.background = color;
    }

    if (!editMode && activeLayout === "scrapbook") {
      const rotation = (Math.random() - 0.5) * 4;
      item.style.transform = `rotate(${rotation}deg)`;
    }

    item.innerHTML = `
      <div class="doll-photo-v2">${photoHtml}</div>
      <span class="gallery-caption">
        <strong>${escapeHtml(name)}</strong>
        ${tag ? `<em>${escapeHtml(tag)}</em>` : ""}
        ${caption ? `<small>${escapeHtml(caption)}</small>` : ""}
      </span>
    `;

    if (!editMode) {
      item.style.cursor = "pointer";
      item.addEventListener("click", () => {
        if (photo) lightbox.open([{ src: photo, alt: name, caption: name + " — " + tag }], 0);
      });
    }

    return item;
  }

  /* ===== Manage mode ===== */
  manageToggleBtn.addEventListener("click", () => {
    editMode = !editMode;
    grid.classList.toggle("manage-mode", editMode);
    userGrid.classList.toggle("manage-mode", editMode);
    manageToggleBtn.classList.toggle("active", editMode);
    manageLabel.textContent = editMode ? "Done managing" : "Manage dolls";
    renderDolls();
  });

  /* ===== Click handler for manage menu ===== */
  document.addEventListener("click", (e) => {
    const t = e.target;

    const editBuilt = t.closest(".gm-edit-builtin");
    if (editBuilt) {
      e.preventDefault(); e.stopPropagation();
      openEditPanel("builtin", Number(editBuilt.dataset.builtin));
      return;
    }
    const delBuilt = t.closest(".gm-delete-builtin");
    if (delBuilt) {
      e.preventDefault(); e.stopPropagation();
      const i = Number(delBuilt.dataset.builtin);
      if (!confirm(`Delete ${getEffectiveDoll(i).name}?`)) return;
      deletedBuiltin.push(i);
      saveAll();
      renderDolls();
      return;
    }
    const hideBtn = t.closest(".gm-hide");
    if (hideBtn) {
      e.preventDefault(); e.stopPropagation();
      hiddenBuiltin.push(Number(hideBtn.dataset.builtin));
      saveAll();
      renderDolls();
      return;
    }
    const unhideBtn = t.closest(".gm-unhide");
    if (unhideBtn) {
      e.preventDefault(); e.stopPropagation();
      const idx = Number(unhideBtn.dataset.builtin);
      hiddenBuiltin = hiddenBuiltin.filter((x) => x !== idx);
      saveAll();
      renderDolls();
      return;
    }
    const restoreBtn = t.closest(".gm-restore");
    if (restoreBtn) {
      e.preventDefault(); e.stopPropagation();
      const idx = Number(restoreBtn.dataset.builtin);
      deletedBuiltin = deletedBuiltin.filter((x) => x !== idx);
      saveAll();
      renderDolls();
      return;
    }
    const editUser = t.closest(".gm-edit-user");
    if (editUser) {
      e.preventDefault(); e.stopPropagation();
      openEditPanel("user", Number(editUser.dataset.index));
      return;
    }
    const delUser = t.closest(".gm-delete-user");
    if (delUser) {
      e.preventDefault(); e.stopPropagation();
      const i = Number(delUser.dataset.index);
      if (!confirm(`Delete ${userDolls[i]?.name || "this doll"}?`)) return;
      userDolls.splice(i, 1);
      saveAll();
      renderDolls();
      return;
    }
  });

  /* ===== Add / Edit panel ===== */
  $("#addDollBtn").addEventListener("click", () => openEditPanel("new", -1));
  cancelBtn.addEventListener("click", closeEditPanel);

  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    pendingPhoto = URL.createObjectURL(file);
    previewImg.src = pendingPhoto;
    previewImg.style.display = "block";
  });

  function openEditPanel(source, index) {
    editingUser = -1;
    editingBuiltin = -1;
    pendingPhoto = "";
    selectedFrame = "clean";
    selectedColor = "#f6c8d6";

    /* Reset frame chooser */
    $("#dollFrameChooser")?.querySelectorAll(".frame-option").forEach((o) =>
      o.classList.toggle("selected", o.dataset.frame === "clean"));
    $("#dollTintChooser")?.querySelectorAll(".tint-option").forEach((o) =>
      o.classList.toggle("selected", o.dataset.color === "#f6c8d6"));

    if (source === "builtin") {
      const eff = getEffectiveDoll(index);
      nameInput.value = eff.name;
      tagInput.value = eff.tag;
      captionInput.value = eff.caption;
      previewImg.src = eff.photo;
      previewImg.style.display = eff.photo ? "block" : "none";
      selectedFrame = eff.frame;
      selectedColor = eff.color;
      editingBuiltin = index;
      saveBtn.textContent = "Save changes ✨";
    } else if (source === "user") {
      const d = userDolls[index];
      nameInput.value = d.name || "";
      tagInput.value = d.tag || "";
      captionInput.value = d.caption || "";
      previewImg.src = d.photo || "";
      previewImg.style.display = d.photo ? "block" : "none";
      selectedFrame = d.frame || "clean";
      selectedColor = d.color || "#f6c8d6";
      editingUser = index;
      saveBtn.textContent = "Save changes ✨";
    } else {
      nameInput.value = "";
      tagInput.value = "";
      captionInput.value = "";
      previewImg.src = "";
      previewImg.style.display = "none";
      saveBtn.textContent = "Add to cabinet ✨";
    }

    /* Update frame selection UI */
    $("#dollFrameChooser")?.querySelectorAll(".frame-option").forEach((o) =>
      o.classList.toggle("selected", o.dataset.frame === selectedFrame));
    $("#dollTintChooser")?.querySelectorAll(".tint-option").forEach((o) =>
      o.classList.toggle("selected", o.dataset.color === selectedColor));

    panel.classList.add("open");
    nameInput.focus();
  }

  function closeEditPanel() {
    panel.classList.remove("open");
    fileInput.value = "";
    pendingPhoto = "";
    editingUser = -1;
    editingBuiltin = -1;
  }

  saveBtn.addEventListener("click", () => {
    const name = nameInput.value.trim() || "New little doll";
    const tag = tagInput.value.trim() || "soft sweetheart";
    const caption = captionInput.value.trim();
    const photo = pendingPhoto || (editingBuiltin >= 0 ? getEffectiveDoll(editingBuiltin).photo : "") ||
                  (editingUser >= 0 ? userDolls[editingUser]?.photo : "");

    const doll = { name, tag, caption, photo, frame: selectedFrame, color: selectedColor };

    if (editingBuiltin >= 0) {
      builtinOverrides[editingBuiltin] = doll;
    } else if (editingUser >= 0) {
      userDolls[editingUser] = doll;
    } else {
      userDolls.push(doll);
    }

    saveAll();
    closeEditPanel();
    renderDolls();
  });

  /* ===== Category filter + Layout switcher ===== */
  $("#dollFilters")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".gallery-filter");
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    $("#dollFilters").querySelectorAll(".gallery-filter").forEach((b) =>
      b.classList.toggle("active", b === btn));
    renderDolls();
  });

  $("#dollLayouts")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".layout-btn");
    if (!btn) return;
    activeLayout = btn.dataset.layout;
    $("#dollLayouts").querySelectorAll(".layout-btn").forEach((b) =>
      b.classList.toggle("active", b === btn));
    renderDolls();
  });

  /* ===== Init ===== */
  renderDolls();
})();
