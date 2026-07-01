/* Renders the Photo Gallery page from window.NADIA_DATA. */
(() => {
  "use strict";
  const { $, el, escapeHtml, initReveals, stagger, lightbox } = window.DiaryMagic;
  const data = window.NADIA_DATA;
  const gallery = data.gallery;

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

  stagger(grid, 0.06, 0.5);
  initReveals();
})();
