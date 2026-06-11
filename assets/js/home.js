/* Renders the home page (Dianeyy) from window.NADIA_DATA. */
(() => {
  "use strict";
  const { $, el, escapeHtml, stagger, initReveals, lightbox } = window.DiaryMagic;
  const data = window.NADIA_DATA;
  const home = data.home;

  function setText(sel, value) {
    const node = $(sel);
    if (node) node.textContent = value ?? "";
  }
  function setImage(sel, photo) {
    const node = $(sel);
    if (!node || !photo) return;
    node.src = photo.src;
    node.alt = photo.alt || "";
    node.loading = "lazy";
    node.decoding = "async";
  }

  document.title = data.site.title;
  setText("#siteTitle", data.site.title);
  setText("#siteFooter", data.site.footerLine);

  /* hero */
  setText("#homeEyebrow", home.eyebrow);
  setText("#homeDescription", home.description);
  const headline = $("#homeHeadline");
  headline.textContent = home.headline;

  const actions = $("#heroActions");
  [[home.ctaPrimary, "primary"], [home.ctaGhost, "ghost"]].forEach(([cta, kind]) => {
    if (!cta) return;
    const a = el("a", `button ${kind}`);
    a.href = cta.href;
    a.textContent = cta.label;
    actions.appendChild(a);
  });

  const heroImg = $("#heroPhoto");
  heroImg.src = home.heroPhoto.src;
  heroImg.alt = home.heroPhoto.alt || "";
  heroImg.fetchPriority = "high";
  setText("#heroCaption", home.heroPhoto.caption);

  /* bio */
  setText("#bioEyebrow", home.bio.eyebrow);
  setText("#bioTitle", home.bio.title);
  setText("#bioText", home.bio.text);
  setImage("#bioPhoto", home.bio.photo);
  setText("#bioPhotoCaption", home.bio.photo.caption);

  /* sticky notes */
  setText("#notesEyebrow", home.notes.eyebrow);
  setText("#notesTitle", home.notes.title);
  const board = $("#notesBoard");
  const tones = ["tone-a", "tone-b", "tone-c", "tone-d"];
  home.notes.items.forEach((note, i) => {
    const card = el("div", `sticky-note ${tones[i % tones.length]}`);
    card.style.setProperty("--tilt", `${((i * 53) % 7) - 3}deg`);
    card.style.setProperty("--tape-tilt", `${((i * 31) % 9) - 4}deg`);
    card.innerHTML = `<span class="note-num">no. ${String(i + 1).padStart(2, "0")}</span>${escapeHtml(note)}`;
    board.appendChild(card);
  });
  stagger(board, 0.06, 0.5);

  setImage("#notesFeaturePhoto", home.notes.featurePhoto);
  setText("#notesFeatureCaption", home.notes.featurePhoto.caption);

  /* moments — polaroid wall + lightbox */
  setText("#momentsEyebrow", home.moments.eyebrow);
  setText("#momentsTitle", home.moments.title);
  const wall = $("#momentsWall");
  const pins = ["📌", "🎀", "💗", "⭐", "🧸"];
  const galleryItems = home.moments.items.map((m) => ({ src: m.src, alt: m.alt, caption: m.caption }));

  home.moments.items.forEach((moment, i) => {
    const fig = el("button", "polaroid");
    fig.type = "button";
    fig.setAttribute("aria-label", `Open photo: ${moment.caption || moment.alt || "memory"}`);
    fig.style.setProperty("--tilt", `${((i * 47) % 8) - 4}deg`);
    fig.innerHTML = `
      <span class="pol-pin" aria-hidden="true">${pins[i % pins.length]}</span>
      <img src="${escapeHtml(moment.src)}" alt="${escapeHtml(moment.alt || "")}" loading="lazy" decoding="async" />
      <span class="pol-caption">${escapeHtml(moment.caption || "")}</span>`;
    fig.addEventListener("click", () => lightbox.open(galleryItems, i));
    wall.appendChild(fig);
  });
  stagger(wall, 0.1, 0.5);

  /* section preview cards */
  const cards = $("#sectionCards");
  home.sections.forEach((section) => {
    const card = el("a", "preview-link-card");
    card.href = section.href;
    card.setAttribute("aria-label", `Open ${section.title}`);
    card.innerHTML = `
      <span class="card-icon">${escapeHtml(section.num)}</span>
      <span class="card-emoji" aria-hidden="true">${escapeHtml(section.emoji)}</span>
      <h3>${escapeHtml(section.title)}</h3>
      <p>${escapeHtml(section.text)}</p>
      <span class="card-go">visit →</span>`;
    cards.appendChild(card);
  });
  stagger(cards, 0.12, 0.4);

  initReveals();
})();
