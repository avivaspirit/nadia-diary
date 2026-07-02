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
  document.body.classList.add("page-story");
  setText("#siteTitle", data.site.title);
  setText("#siteFooter", data.site.footerLine);

  setText("#storyEyebrow", story.eyebrow);
  setText("#storyTitle", story.title);
  setText("#storyIntro", story.intro);

  /* days counter + hourglass */
  /* Parse as local date to avoid timezone off-by-one */
  const startDate = data.site.firstDay
    ? new Date(data.site.firstDay + "T00:00:00")
    : null;
  const now = new Date();
  let days = 1;
  if (startDate) {
    /* Use local-midnight to local-midnight for accurate day count */
    const s = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const n = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    days = Math.max(1, Math.round((n - s) / 86400000));
  }

  const daysHost = $("#daysCounter");
  if (daysHost) {
    daysHost.innerHTML = `<span>Day</span> <span class="days-number">${days}</span> <span>together</span> <span class="days-heart">♡</span>`;
  }

  /* ===== ⏳ Hourglass ===== */
  const hgDays = $("#hourglassDays");
  if (hgDays) hgDays.textContent = days;

  // activate tilt animation when scrolled into view
  const hgWrap = $("#hourglassWrap");
  if (hgWrap && "IntersectionObserver" in window) {
    const hgObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          hgWrap.classList.add("active");
        }
      });
    }, { threshold: 0.4 });
    hgObserver.observe(hgWrap);
  }

  // animate sand levels based on day-of-year progress
  if (startDate) {
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    const fraction = (dayOfYear % 30) / 30; // cycles every 30 days
    const sandTop = $("#sandTop");
    const sandBottom = $("#sandBottom");
    if (sandTop && sandBottom) {
      // top pile shrinks, bottom pile grows
      const topH = 38 * (1 - fraction);
      const botH = 36 * fraction;
      sandTop.setAttribute("d", `M 28 12 L 72 12 L ${50} ${12 + topH} Z`);
      sandBottom.setAttribute("d", `M ${50 - 15 * fraction} 146 L ${50 + 15 * fraction} 146 L ${50 + 12 * fraction} ${146 - botH} L ${50 - 12 * fraction} ${146 - botH} Z`);
    }
  }

  /* ===== 🌙 Moon Phase ===== */
  function moonPhase(date) {
    // Conway's approximate algorithm
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let r = year % 100;
    r %= 19;
    if (r > 9) r -= 19;
    r = ((r * 11) % 30) + month + day;
    if (month < 3) r += 2;
    r -= year < 2000 ? 4 : 8.3;
    r = Math.floor(r + 0.5) % 30;
    const phase = (r < 0 ? r + 30 : r) / 29.53; // 0..1
    return phase;
  }

  const moonEmojis = ["🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘"];
  const moonNames = ["New Moon","Waxing Crescent","First Quarter","Waxing Gibbous","Full Moon","Waning Gibbous","Last Quarter","Waning Crescent"];

  function phaseToEmoji(phase) {
    const idx = Math.round(phase * 8) % 8;
    return { emoji: moonEmojis[idx], name: moonNames[idx] };
  }

  const moonMetEmoji = $("#moonMetEmoji");
  const moonNowEmoji = $("#moonNowEmoji");
  const moonMetDate = $("#moonMetDate");
  const moonNowDate = $("#moonNowDate");
  const moonCaption = $("#moonCaption");

  if (startDate && moonMetEmoji) {
    const pMet = moonPhase(startDate);
    const pNow = moonPhase(now);
    const met = phaseToEmoji(pMet);
    const tonight = phaseToEmoji(pNow);

    moonMetEmoji.textContent = met.emoji;
    moonNowEmoji.textContent = tonight.emoji;
    moonMetDate.textContent = startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    moonNowDate.textContent = now.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    const captions = [
      `The moon was ${met.name.toLowerCase()} when we met — now it's ${tonight.name.toLowerCase()}.`,
      `Different phases, same sky, same us.`,
      `From ${met.name.toLowerCase()} to ${tonight.name.toLowerCase()} — the moon watches over every chapter.`,
      `We met under a ${met.name.toLowerCase()}, and tonight the sky shows ${tonight.name.toLowerCase()}. ♡`,
    ];
    moonCaption.textContent = captions[Math.floor(Math.random() * captions.length)];
  }

  /* ===== 🕯️ Wish Candle ===== */
  const candleStage = $("#candleStage");
  const candleHint = $("#candleHint");
  const candleWish = $("#candleWish");
  const wishes = (data.loveJar?.reasons || [
    "You are my favorite hello and my hardest goodbye.",
    "You make home feel like a person, not a place.",
    "Every day with you is a day I'd live again.",
    "You are the best plot twist in my story.",
    "I wish for more mornings with you, always.",
  ]);

  let candleLit = false;
  if (candleStage) {
    const toggleCandle = () => {
      candleLit = !candleLit;
      candleStage.classList.toggle("lit", candleLit);
      if (candleLit) {
        candleHint.textContent = "tap to blow it out ♡";
        const wish = wishes[Math.floor(Math.random() * wishes.length)];
        candleWish.textContent = wish;
        candleWish.classList.add("show");
      } else {
        candleHint.textContent = "tap to light a candle ♡";
        candleWish.classList.remove("show");
      }
    };
    candleStage.addEventListener("click", toggleCandle);
    candleStage.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleCandle(); }
    });
  }

  /* ===== ✨ Starry Night (full page) ===== */
  /* Move stars to body, not just starrySection */
  // generate stars
  const numStars = 40;
  const starFrag = document.createDocumentFragment();
  for (let i = 0; i < numStars; i++) {
    const s = document.createElement("div");
    s.className = "star" + (Math.random() > 0.7 ? " big" : "");
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%"; /* Use 100% height */
    s.style.setProperty("--dur", (2 + Math.random() * 3) + "s");
    s.style.animationDelay = Math.random() * 3 + "s";
    starFrag.appendChild(s);
  }
  document.body.appendChild(starFrag); /* Append to body */

  // shooting star on star click
  const starWishes = [
    "a wish for more days with you ✨",
    "a wish for your smile, always ✨",
    "a wish that time slows down when we're together ✨",
    "a wish for forever, one day at a time ✨",
    "a wish for all the little moments yet to come ✨",
  ];

  const starryCaptionEl = el("div", "starry-caption"); /* New caption element */
  starryCaptionEl.textContent = "tap a star to make a wish ✨";
  document.body.appendChild(starryCaptionEl);

  document.body.querySelectorAll(".star").forEach((star) => { /* Listen on body stars */
    star.addEventListener("click", () => {
      // create shooting star
      const shoot = document.createElement("div");
      shoot.className = "shooting-star";
      const startX = Math.random() * 60;
      const startY = Math.random() * 40;
      shoot.style.left = startX + "%";
      shoot.style.top = startY + "%";
      shoot.style.transform = "rotate(35deg)";
      document.body.appendChild(shoot); /* Append to body */

      shoot.animate([
        { opacity: 0, transform: "rotate(35deg) translateX(0)" },
        { opacity: 1, offset: 0.2 },
        { opacity: 1, offset: 0.8 },
        { opacity: 0, transform: "rotate(35deg) translateX(200px)" },
      ], { duration: 800, easing: "ease-out" });

      setTimeout(() => shoot.remove(), 900);

      // show wish briefly
      const original = starryCaptionEl.textContent;
      starryCaptionEl.textContent = starWishes[Math.floor(Math.random() * starWishes.length)];
      setTimeout(() => { starryCaptionEl.textContent = original; }, 2500);
    });
  });

  /* ===== 💌 Floating Love Notes ===== */
  const loveFloatArea = $("#loveFloatArea");
  if (loveFloatArea && wishes.length) {
    let floatIdx = 0;
    const spawnNote = () => {
      const note = document.createElement("div");
      note.className = "love-note-float";
      note.textContent = wishes[floatIdx % wishes.length];
      floatIdx++;
      note.style.left = (10 + Math.random() * 70) + "%";
      note.style.bottom = "0px";
      loveFloatArea.appendChild(note);
      setTimeout(() => note.remove(), 8500);
    };
    // spawn one every 3 seconds
    setTimeout(spawnNote, 1000);
    setInterval(spawnNote, 3500);
  }

  /* ===== Timeline milestones ===== */
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
