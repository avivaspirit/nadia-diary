/* ==========================================================================
   HAPPY MEAL 🍽️ — Interactive Food Picker & Chef Assistant Logic
   ========================================================================== */
(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  let currentCategory = "all";
  let currentCraving = "";
  let favoriteFoodIds = new Set(JSON.parse(localStorage.getItem("nadia_fav_foods") || "[]"));

  const data = window.NADIA_DATA?.happyMeal || { categories: [], items: [] };

  /* --------------------------------------------------- Craving & Picker */
  function initMealPicker() {
    const cravingRow = $("#mealCravingsRow");
    const btnPick = $("#btnPickMeal");
    const btnAgain = $("#btnAgainMeal");
    const loading = $("#mealLoading");
    const card = $("#mealResultCard");

    if (!btnPick || !card) return;

    // Cravings pill selection
    if (cravingRow) {
      cravingRow.addEventListener("click", (e) => {
        const pill = e.target.closest(".meal-craving-pill");
        if (!pill) return;
        $$(".meal-craving-pill", cravingRow).forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        currentCraving = pill.dataset.craving || "";
      });
    }

    function pickRandomMeal() {
      let pool = data.items;
      if (currentCraving) {
        pool = data.items.filter(item => {
          const text = (item.tags.join(" ") + " " + item.vibe + " " + item.category).toLowerCase();
          return text.includes(currentCraving.toLowerCase());
        });
        if (!pool.length) pool = data.items;
      }

      const selected = pool[Math.floor(Math.random() * pool.length)];

      // Hide card, show loading
      card.classList.add("hidden");
      loading.classList.remove("hidden");

      setTimeout(() => {
        loading.classList.add("hidden");
        renderMealResultCard(selected);
        card.classList.remove("hidden");
        if (btnAgain) btnAgain.classList.remove("hidden");

        // Scroll smoothly to result card
        card.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 500);
    }

    btnPick.addEventListener("click", pickRandomMeal);
    if (btnAgain) btnAgain.addEventListener("click", pickRandomMeal);

    // Initial random pick on page load
    pickRandomMeal();
  }

  function renderMealResultCard(item) {
    $("#mealEmoji").textContent = item.emoji || "🍽️";
    $("#mealTitleEn").textContent = item.nameEn;
    $("#mealTitleTh").textContent = item.nameTh;

    // Badges
    const badgeRow = $("#mealBadgeRow");
    if (badgeRow) {
      badgeRow.innerHTML = `
        <span class="meal-badge">${item.category.toUpperCase()}</span>
        <span class="meal-badge badge-spice">${item.spiceLevel}</span>
        ${item.tags.map(t => `<span class="meal-badge">#${t}</span>`).join("")}
      `;
    }

    $("#mealVibe").textContent = item.vibe;
    $("#mealPairing").textContent = item.pairing;
    $("#mealNote").textContent = item.whyForNadia;
  }

  /* -------------------------------------------------- Category & Food Grid */
  function renderCategoryTabs() {
    const tabsContainer = $("#mealCategoryTabs");
    if (!tabsContainer || !data.categories) return;

    tabsContainer.innerHTML = data.categories.map(cat => `
      <button class="meal-cat-pill ${cat.id === currentCategory ? 'active' : ''}" data-category="${cat.id}" type="button">
        ${cat.icon} ${cat.name}
      </button>
    `).join("");

    tabsContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".meal-cat-pill");
      if (!btn) return;
      $$(".meal-cat-pill", tabsContainer).forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.dataset.category || "all";
      renderFoodGrid();
    });
  }

  function renderFoodGrid() {
    const grid = $("#mealGrid");
    if (!grid) return;

    let items = data.items;
    if (currentCategory !== "all") {
      items = data.items.filter(item => item.category === currentCategory);
    }

    if (!items.length) {
      grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#888; font-family:'Caveat',cursive; font-size:1.4rem;">No meals found in this category yet ♡</p>`;
      return;
    }

    grid.innerHTML = items.map(item => {
      const isFav = favoriteFoodIds.has(item.id);
      return `
        <div class="food-card" data-id="${item.id}">
          <div class="food-card-banner">
            <span class="food-card-emoji-icon">${item.emoji}</span>
            <button class="food-card-fav-btn ${isFav ? 'active' : ''}" type="button" aria-label="Favorite dish">
              ${isFav ? '❤️' : '🤍'}
            </button>
          </div>
          <div class="food-card-content">
            <span class="food-card-category">${item.category} · ${item.spiceLevel}</span>
            <h3 class="food-card-title">${item.nameEn}</h3>
            <p class="food-card-title-th">${item.nameTh}</p>
            <div class="food-card-tags">
              ${item.tags.map(t => `<span class="food-tag-pill">#${t}</span>`).join("")}
            </div>
            <p class="food-card-vibe">${item.vibe}</p>
          </div>
        </div>
      `;
    }).join("");
          <div class="food-card-content">
            <span class="food-card-category">${item.category} · ${item.spiceLevel}</span>
            <h3 class="food-card-title">${item.nameEn}</h3>
            <p class="food-card-title-th">${item.nameTh}</p>
            <div class="food-card-tags">
              ${item.tags.map(t => `<span class="food-tag-pill">#${t}</span>`).join("")}
            </div>
            <p class="food-card-vibe">${item.vibe}</p>
          </div>
        </div>
      `;
    }).join("");

    // Add heart button listener
    $$(".food-card-fav-btn", grid).forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const card = btn.closest(".food-card");
        const id = card.dataset.id;
        if (favoriteFoodIds.has(id)) {
          favoriteFoodIds.delete(id);
          btn.classList.remove("active");
          btn.textContent = "🤍";
        } else {
          favoriteFoodIds.add(id);
          btn.classList.add("active");
          btn.textContent = "❤️";
        }
        localStorage.setItem("nadia_fav_foods", JSON.stringify(Array.from(favoriteFoodIds)));
      });
    });
  }

  /* --------------------------------------------------- Chef AI Chat Widget */
  function initChefChat() {
    const toggle = $("#chatToggle");
    const box = $("#chatBox");
    const close = $("#chatClose");
    const input = $("#chatInput");
    const send = $("#chatSend");
    const messages = $("#chatMessages");

    if (!toggle || !box) return;

    toggle.addEventListener("click", () => box.classList.toggle("open"));
    if (close) close.addEventListener("click", () => box.classList.remove("open"));

    // Welcome message
    if (messages && !messages.children.length) {
      appendBotMsg("สวัสดีค่ะ Nadia! 🍽️ วันนี้อยากทานอะไรเป็นพิเศษไหมคะ? บอกรสชาติ อาหารที่ชอบ หรือ mood วันนี้มาได้เลยค่ะ เดี๋ยวเชฟจัดให้! ♡");
    }

    function appendUserMsg(text) {
      const msg = document.createElement("div");
      msg.className = "chat-msg chat-msg-user";
      msg.textContent = text;
      messages.appendChild(msg);
      messages.scrollTop = messages.scrollHeight;
    }

    function appendBotMsg(text) {
      const msg = document.createElement("div");
      msg.className = "chat-msg chat-msg-bot";
      msg.textContent = text;
      messages.appendChild(msg);
      messages.scrollTop = messages.scrollHeight;
    }

    function handleSend() {
      const text = input.value.trim();
      if (!text) return;
      appendUserMsg(text);
      input.value = "";

      // Chef recommendations logic
      setTimeout(() => {
        const lower = text.toLowerCase();
        let match = null;

        if (lower.includes("เผ็ด") || lower.includes("spicy") || lower.includes("ต้มยำ") || lower.includes("ส้มตำ")) {
          match = data.items.find(i => i.spiceLevel.includes("🌶️🌶️🌶️") || i.category === "thai");
        } else if (lower.includes("หวาน") || lower.includes("ขนม") || lower.includes("dessert") || lower.includes("เค้ก") || lower.includes("ชานม")) {
          match = data.items.find(i => i.category === "desserts");
        } else if (lower.includes("สเต๊ก") || lower.includes("ทรัฟเฟิล") || lower.includes("พาสต้า") || lower.includes("western")) {
          match = data.items.find(i => i.category === "western");
        } else if (lower.includes("ชาบู") || lower.includes("หม่าล่า") || lower.includes("ซูชิ") || lower.includes("เกาหลี")) {
          match = data.items.find(i => i.category === "fusion" || i.category === "others");
        } else {
          match = data.items[Math.floor(Math.random() * data.items.length)];
        }

        if (match) {
          appendBotMsg(`แนะนำเมนูนี้ให้นาเดียเลยค่ะ: ${match.emoji} ${match.nameTh} (${match.nameEn})! ✨\n${match.vibe}\nจับคู่กับ: ${match.pairing} ทานแล้วฟินแน่นอนค่ะ ♡`);
        } else {
          appendBotMsg("เมนูนี้น่าทานมากเลยค่ะ! ลองกดปุ่ม 🎲 Pick My Meal ข้างบนให้เชฟสุ่มให้อีกจานไหมคะ? 🍽️");
        }
      }, 600);
    }

    if (send) send.addEventListener("click", handleSend);
    if (input) {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleSend();
      });
    }
  }

  /* --------------------------------------------------- DOM Ready */
  document.addEventListener("DOMContentLoaded", () => {
    initMealPicker();
    renderCategoryTabs();
    renderFoodGrid();
    initChefChat();
  });
})();
