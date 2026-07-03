/* ==========================================================================
   MOVIE TIME — AI-powered romantic movie recommender for Nadia ♡
   Calls /api/movie (Gemini-powered serverless function)
   ========================================================================== */
(() => {
  "use strict";

  const { $, $$ } = window.DiaryMagic || {
    $: (s) => document.querySelector(s),
    $$: (s) => document.querySelectorAll(s),
  };

  const HISTORY_KEY = "nadiaMovieHistory";
  const MAX_HISTORY = 8;

  /* Elements */
  const btnPick = $("#btnPick");
  const btnAgain = $("#btnAgain");
  const loading = $("#movieLoading");
  const card = $("#movieCard");
  const historySection = $("#movieHistory");
  const historyList = $("#historyList");

  /* === Helpers === */
  function getHistory() {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); } catch { return []; }
  }
  function saveHistory(item) {
    const hist = getHistory();
    // Don't duplicate same title
    const existing = hist.findIndex((h) => h.title === item.title);
    if (existing >= 0) hist.splice(existing, 1);
    hist.unshift({ title: item.title, type: item.type, year: item.year, emoji: item.emoji });
    if (hist.length > MAX_HISTORY) hist.length = MAX_HISTORY;
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(hist)); } catch {}
    renderHistory();
  }
  function renderHistory() {
    const hist = getHistory();
    if (hist.length === 0) {
      historySection.classList.add("hidden");
      return;
    }
    historySection.classList.remove("hidden");
    historyList.innerHTML = hist
      .map(
        (h, i) =>
          `<div class="history-item"><span class="h-emoji">${h.emoji || "🎬"}</span><span class="h-title">${escapeHtml(h.title)}</span><span class="h-meta">${escapeHtml(h.type || "Movie")}${h.year ? " · " + h.year : ""}</span><button class="h-delete" data-idx="${i}" type="button" title="Remove">✕</button></div>`
      )
      .join("");

    /* Bind delete buttons */
    $$(".h-delete", historyList).forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx, 10);
        deleteHistoryItem(idx);
      });
    });
  }
  function deleteHistoryItem(idx) {
    const hist = getHistory();
    hist.splice(idx, 1);
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(hist)); } catch {}
    renderHistory();
  }
  function escapeHtml(s) {
    if (!s) return "";
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
    );
  }

  /* === Fill movie card === */
  function showMovie(m) {
    $("#movieEmoji").textContent = m.emoji || "🍿";
    $("#movieTitle").textContent = m.title || "Unknown";
    $("#movieGenre").textContent = m.genre || "Romance";
    $("#tagType").textContent = m.type || "Movie";
    $("#tagYear").textContent = m.year || "—";
    $("#tagRating").textContent = m.rating || "—";
    $("#tagDuration").textContent = m.duration || "—";
    $("#movieMood").textContent = "✨ " + (m.mood || "cozy");
    $("#movieWatch").textContent = "📺 " + (m.where_to_watch || "Streaming");
    $("#movieSynopsis").textContent = m.synopsis || "—";
    $("#movieWhy").textContent = m.why_for_them || "—";
    $("#movieSweet").textContent = m.sweet_message || "Enjoy together ♡";

    loading.classList.add("hidden");
    card.classList.remove("hidden");
    // Restart reveal animation
    card.style.animation = "none";
    void card.offsetWidth;
    card.style.animation = "";
  }

  /* === Fetch from API === */
  async function pickMovie() {
    btnPick.disabled = true;
    btnAgain.disabled = true;
    card.classList.add("hidden");
    loading.classList.remove("hidden");

    try {
      const resp = await fetch("/api/movie");
      if (!resp.ok) throw new Error("API " + resp.status);
      const data = await resp.json();
      showMovie(data);
      saveHistory(data);
      btnAgain.classList.remove("hidden");
    } catch (err) {
      console.error("Movie pick failed:", err);
      loading.querySelector("p").textContent = "Couldn't reach the AI… but don't worry, we still got a pick! 🎬";
      // Try again after a moment
      setTimeout(async () => {
        try {
          const resp2 = await fetch("/api/movie");
          const data2 = await resp2.json();
          showMovie(data2);
          saveHistory(data2);
          btnAgain.classList.remove("hidden");
        } catch {
          // Final fallback — show a static card
          showMovie({
            title: "About Time",
            year: 2013,
            type: "Movie",
            genre: "Romance / Sci-Fi",
            rating: "R",
            duration: "2h 3m",
            mood: "warm & heartfelt",
            where_to_watch: "Netflix",
            synopsis:
              "A young man discovers he can time travel and uses it to win the girl of his dreams — but learns the best moments are the ordinary ones.",
            why_for_them: "Because every ordinary day together is worth reliving ♡",
            sweet_message: "Perfect for a cozy night in together 🍿",
            emoji: "⏰",
          });
          btnAgain.classList.remove("hidden");
        }
      }, 1500);
    } finally {
      btnPick.disabled = false;
      btnAgain.disabled = false;
    }
  }

  /* === Bind === */
  btnPick.addEventListener("click", pickMovie);
  btnAgain.addEventListener("click", pickMovie);

  /* === Init === */
  renderHistory();

  // Auto-pick on first visit
  const hasSeen = getHistory().length > 0;
  if (!hasSeen) {
    pickMovie();
  } else {
    // Show last pick from history summary, but let user click
    loading.classList.add("hidden");
    card.classList.add("hidden");
  }

  const footerText = $("#footerText");
  if (footerText && window.NADIA_DATA?.site?.footerLine) {
    footerText.textContent = window.NADIA_DATA.site.footerLine;
  }
  if (window.DiaryMagic?.initReveals) {
    window.DiaryMagic.initReveals();
  }
})();
