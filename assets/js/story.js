/* Renders the Our Story timeline page from window.NADIA_DATA. */
(() => {
  "use strict";
  const { $, el, escapeHtml, stagger, initReveals } = window.DiaryMagic;
  const data = window.NADIA_DATA;
  const story = data.story;

  function setText(sel, value) {
    const node = $(sel);
    if (node) node.textContent = value ?? "";
  }

  document.title = `Our Story | ${data.site.title}`;
  setText("#siteTitle", data.site.title);
  setText("#siteFooter", data.site.footerLine);

  setText("#storyEyebrow", story.eyebrow);
  setText("#storyTitle", story.title);
  setText("#storyIntro", story.intro);

  /* days counter */
  const daysHost = $("#daysCounter");
  if (daysHost && data.site.firstDay) {
    const start = new Date(data.site.firstDay);
    const now = new Date();
    const days = Math.max(1, Math.floor((now - start) / 86400000));
    daysHost.innerHTML = `<span>Day</span> <span class="days-number">${days}</span> <span>together</span> <span class="days-heart">♡</span>`;
  }

  const timeline = $("#timeline");
  story.milestones.forEach((ms) => {
    const item = el("div", "timeline-item reveal");
    const photoHtml = ms.photo
      ? `<img src="${escapeHtml(ms.photo)}" alt="${escapeHtml(ms.title)}" loading="lazy" decoding="async" />`
      : "";
    const inner = el("div", "timeline-content");
    inner.innerHTML = `
      <span class="timeline-emoji" aria-hidden="true">${escapeHtml(ms.emoji || "💕")}</span>
      <p class="timeline-date">${escapeHtml(ms.date || "")}</p>
      <h3>${escapeHtml(ms.title)}</h3>
      <p>${escapeHtml(ms.text || "")}</p>
      ${photoHtml}`;
    const dot = el("div", "timeline-dot");
    item.appendChild(inner);
    item.appendChild(dot);
    timeline.appendChild(item);
  });

  stagger(timeline, 0.15, 0.6);
  initReveals();
})();
