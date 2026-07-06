/* ================================================================
   NADIA'S CLOSET 👗 — style inspo for every mood
   ================================================================ */
(function () {
  "use strict";

  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.from(document.querySelectorAll(s)); };

  /* ---- style data ---- */
  var styles = [
    {
      id: "sweet",
      tag: "Sweet Girl",
      emoji: "🌸",
      gradient: "linear-gradient(135deg, #ffd1dc 0%, #ffe5ec 50%, #fff0f5 100%)",
      accent: "#e87fa3",
      vibe: "Sweet & Cute",
      tagline: "Soft pastels, floral prints, and a smile that melts hearts.",
      tips: [
        { icon: "👗", label: "Dress", text: "Floral midi dress in blush pink, puffed sleeves" },
        { icon: "👟", label: "Shoes", text: "White Mary Janes or ballet flats" },
        { icon: "🎀", label: "Hair", text: "Half-up space buns with a ribbon" },
        { icon: "💄", label: "Makeup", text: "Dewy base, peach blush, glossy pink lips" },
        { icon: "💍", label: "Accessories", text: "Pearl hairpins, dainty heart necklace" }
      ],
      colorPalette: ["#FFD1DC", "#FFE5EC", "#FFB6C1", "#FFC0CB", "#F0E6FA"],
      scene: "🌹🌷🌸"
    },
    {
      id: "spicy",
      tag: "Spicy Chic",
      emoji: "🔥",
      gradient: "linear-gradient(135deg, #1a0a0a 0%, #3d0c0c 50%, #1a0a0a 100%)",
      accent: "#ff4444",
      vibe: "Bold & Spicy",
      tagline: "Bold, confident, turning heads wherever she walks.",
      tips: [
        { icon: "👗", label: "Dress", text: "Bodycon mini in black or deep red, strappy details" },
        { icon: "👠", label: "Shoes", text: "Stiletto heels, ankle boots, or knee-high boots" },
        { icon: "💇‍♀️", label: "Hair", text: "Sleek straight or voluminous waves, middle part" },
        { icon: "💄", label: "Makeup", text: "Winged liner, bold red lip, contour" },
        { icon: "💎", label: "Accessories", text: "Gold chain necklace, hoop earrings, ring stack" }
      ],
      colorPalette: ["#1A0A0A", "#8B0000", "#DC143C", "#FF0000", "#2B0A0A"],
      scene: "🔥🖤💋"
    },
    {
      id: "sporty",
      tag: "Sporty Girl",
      emoji: "⚽",
      gradient: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)",
      accent: "#2e7d32",
      vibe: "Sporty & Active",
      tagline: "Athleisure energy — comfy, cool, and ready to move.",
      tips: [
        { icon: "👕", label: "Top", text: "Oversized crop hoodie or fitted sports bra + windbreaker" },
        { icon: "🩳", label: "Bottom", text: "High-waist biker shorts or track pants" },
        { icon: "👟", label: "Shoes", text: "Chunky white sneakers (Air Force 1, Nike Dunk)" },
        { icon: "🎒", label: "Bag", text: "Crossbody mini or sporty belt bag" },
        { icon: "🌅", label: "Hair", text: "High ponytail with claw clip, baby hairs laid" }
      ],
      colorPalette: ["#E8F5E9", "#C8E6C9", "#81C784", "#66BB6A", "#388E3C"],
      scene: "🏃‍♀️🧘‍♀️🎾"
    },
    {
      id: "vintage",
      tag: "Vintage Romance",
      emoji: "📻",
      gradient: "linear-gradient(135deg, #f5e6d3 0%, #e8d5b7 50%, #d4a574 100%)",
      accent: "#8b6914",
      vibe: "Retro & Classic",
      tagline: "Timeless elegance from another era — tea dresses and retro waves.",
      tips: [
        { icon: "👗", label: "Dress", text: "Tea-length polka dot dress, puff sleeves, cinched waist" },
        { icon: "👡", label: "Shoes", text: "Espadrille wedges or Oxford flats in tan" },
        { icon: "💁‍♀️", label: "Hair", text: "Victory rolls or soft finger waves, silk scarf" },
        { icon: "💋", label: "Makeup", text: "Matte red lip, thin brows, cat-eye flick" },
        { icon: "👜", label: "Accessories", text: "Woven basket bag, cat-eye sunglasses, gloves" }
      ],
      colorPalette: ["#F5E6D3", "#E8D5B7", "#C4A672", "#8B6914", "#6B4226"],
      scene: "📻🕰️☕"
    },
    {
      id: "glam",
      tag: "Glam HiSo",
      emoji: "💎",
      gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 100%)",
      accent: "#ffd700",
      vibe: "Glam & Luxe",
      tagline: "Old money, quiet luxury — understated elegance that whispers wealth.",
      tips: [
        { icon: "👗", label: "Dress", text: "Silk slip dress or tailored blazer dress in ivory/navy" },
        { icon: "👞", label: "Shoes", text: "Pointed-toe heels (Louboutin, Manolo Blahnik)" },
        { icon: "💇‍♀️", label: "Hair", text: "Blowout with curtain bangs, glossy and voluminous" },
        { icon: "✨", label: "Makeup", text: "No-makeup makeup, glass skin, nude gloss, soft contour" },
        { icon: "⌚", label: "Accessories", text: "Cartier Love bracelet, Rolex, structured mini Kelly bag" }
      ],
      colorPalette: ["#1A1A2E", "#0F3460", "#C5A572", "#FFD700", "#F5F5DC"],
      scene: "💎🥂✨"
    },
    {
      id: "princess",
      tag: "Disney Princess",
      emoji: "👸",
      gradient: "linear-gradient(135deg, #e6e6fa 0%, #dda0dd 30%, #ee82ee 100%)",
      accent: "#9370db",
      vibe: "Princess Dreams",
      tagline: "Fairytale magic — tulle, sparkles, and a tiara to match your dreams.",
      tips: [
        { icon: "👗", label: "Dress", text: "Tulle ball gown, off-shoulder bodice, sparkle overlay" },
        { icon: "👑", label: "Crown", text: "Crystal tiara or pearl-encrusted headband" },
        { icon: "💇‍♀️", label: "Hair", text: "Side-swept curls or braided updo with baby's breath" },
        { icon: "💄", label: "Makeup", text: "Sparkly eyeshadow, rosy cheeks, peachy-nude lips" },
        { icon: " Wand", label: "Magic", text: "Crystal earrings, satin gloves, glitter platform heels" }
      ],
      colorPalette: ["#E6E6FA", "#DDA0DD", "#EE82EE", "#FFB6C1", "#FFF0F5"],
      scene: "👸✨🏰"
    },
    {
      id: "cozy",
      tag: "Cozy Aesthetic",
      emoji: "🧸",
      gradient: "linear-gradient(135deg, #fdf2e9 0%, #f5e6d3 50%, #e8c4a0 100%)",
      accent: "#c4956c",
      vibe: "Cozy & Warm",
      tagline: "Warm, soft, and huggable — like a latte on a rainy day.",
      tips: [
        { icon: "🧶", label: "Top", text: "Chunky knit sweater or oversized cardigan in cream" },
        { icon: "👖", label: "Bottom", text: "Wide-leg jeans or corduroy pants in caramel" },
        { icon: "👢", label: "Shoes", text: "Sock boots or platform UGGs" },
        { icon: "☕", label: "Vibe", text: "Holding a latte, reading a book, wrapped in a scarf" },
        { icon: "👜", label: "Accessories", text: "Knit beanie, round glasses, canvas tote bag" }
      ],
      colorPalette: ["#FDF2E9", "#F5E6D3", "#C4956C", "#8B6F47", "#5D4E37"],
      scene: "🧸☕📖"
    },
    {
      id: "y2k",
      tag: "Y2K Revival",
      emoji: "🦋",
      gradient: "linear-gradient(135deg, #e0ffff 0%, #87ceeb 30%, #dda0dd 100%)",
      accent: "#ff69b4",
      vibe: "Y2K Nostalgia",
      tagline: "Noughties nostalgia — butterfly clips, low-rise, and baby tees.",
      tips: [
        { icon: "👕", label: "Top", text: "Cropped baby tee with rhinestone logo or butterfly print" },
        { icon: "👖", label: "Bottom", text: "Low-rise baggy jeans or cargo mini skirt" },
        { icon: "👟", label: "Shoes", text: "Platform sandals or chunky dad sneakers" },
        { icon: "🦋", label: "Hair", text: "Pigtails with butterfly clips, spiky buns" },
        { icon: "📱", label: "Accessories", text: "Frameless tinted sunglasses, chain wallet, jelly bag" }
      ],
      colorPalette: ["#E0FFFF", "#87CEEB", "#DDA0DD", "#FF69B4", "#FFD700"],
      scene: "🦋💿✨"
    },
    {
      id: "street",
      tag: "Street Style",
      emoji: "🧢",
      gradient: "linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 50%, #333333 100%)",
      accent: "#ff6b35",
      vibe: "Street & Cool",
      tagline: "Effortlessly cool — oversized everything and sneakers worth flexing.",
      tips: [
        { icon: "🧥", label: "Top", text: "Oversized graphic tee or bomber jacket, layered chains" },
        { icon: "👖", label: "Bottom", text: "Baggy cargo pants or ripped wide-leg denim" },
        { icon: "👟", label: "Shoes", text: "Jordans, Yeezys, or Nike SB Dunk" },
        { icon: "🧢", label: "Hat", text: "Snapback or beanie, gold hoop earrings" },
        { icon: "🎒", label: "Bag", text: "Stussy shoulder bag or Nike crossbody" }
      ],
      colorPalette: ["#2C2C2C", "#1A1A1A", "#FF6B35", "#F5F5F5", "#333333"],
      scene: "🧢🎧🛹"
    }
  ];

  /* ---- tags for filter ---- */
  var tags = ["All ✨", "Sweet 🌸", "Spicy 🔥", "Sporty ⚽", "Vintage 📻", "Glam 💎", "Princess 👑", "Cozy 🧸", "Y2K 🦋", "Street 🧢"];
  var tagMap = {
    "All ✨": null,
    "Sweet 🌸": "sweet",
    "Spicy 🔥": "spicy",
    "Sporty ⚽": "sporty",
    "Vintage 📻": "vintage",
    "Glam 💎": "glam",
    "Princess 👑": "princess",
    "Cozy 🧸": "cozy",
    "Y2K 🦋": "y2k",
    "Street 🧢": "street"
  };

  /* ---- render filters ---- */
  var filterContainer = $("#closetFilters");
  tags.forEach(function (tag, idx) {
    var pill = document.createElement("button");
    pill.className = "closet-filter-pill" + (idx === 0 ? " active" : "");
    pill.textContent = tag;
    pill.addEventListener("click", function () {
      $$(".closet-filter-pill").forEach(function (p) { p.classList.remove("active"); });
      pill.classList.add("active");
      var filterId = tagMap[tag];
      renderGrid(filterId);
    });
    filterContainer.appendChild(pill);
  });

  /* ---- render grid ---- */
  var grid = $("#closetGrid");

  function renderGrid(filterId) {
    grid.innerHTML = "";
    var filtered = filterId ? styles.filter(function (s) { return s.id === filterId; }) : styles;

    filtered.forEach(function (style, i) {
      var card = document.createElement("div");
      card.className = "closet-card reveal";
      card.style.animationDelay = (i * 0.08) + "s";
      card.dataset.styleId = style.id;

      // Style-specific background
      card.style.background = style.gradient;

      // Build tips HTML — each tip gets a swap button
      var tipsHTML = style.tips.map(function (t, ti) {
        return '<div class="closet-tip" data-tip-idx="' + ti + '">' +
          '<span class="closet-tip-icon">' + t.icon + '</span>' +
          '<div class="closet-tip-body">' +
          '<span class="closet-tip-label" style="color:' + style.accent + '">' + t.label + '</span>' +
          '<span class="closet-tip-text">' + t.text + '</span>' +
          '</div>' +
          '<button class="tip-swap-btn" data-style="' + style.id + '" data-idx="' + ti + '" type="button" title="Swap this item">🔄</button>' +
          '</div>';
      }).join("");

      // Color palette swatches
      var swatchHTML = style.colorPalette.map(function (c) {
        return '<span class="closet-swatch" style="background:' + c + '"></span>';
      }).join("");

      card.innerHTML =
        '<div class="closet-card-header">' +
          '<span class="closet-card-emoji">' + style.emoji + '</span>' +
          '<div>' +
            '<h3 style="color:' + style.accent + '">' + style.tag + '</h3>' +
            '<span class="closet-card-vibe">' + style.vibe + '</span>' +
          '</div>' +
          '<span class="closet-card-scene">' + style.scene + '</span>' +
        '</div>' +
        '<p class="closet-card-tagline"' +
          (isDark(style.gradient) ? ' style="color:rgba(255,255,255,0.85)"' : '') + '>' +
          style.tagline + '</p>' +
        '<div class="closet-tips' + (isDark(style.gradient) ? ' dark' : '') + '">' + tipsHTML + '</div>' +
        '<div class="closet-palette"' +
          (isDark(style.gradient) ? ' style="border-color:rgba(255,255,255,0.15)"' : '') + '>' +
          '<span class="closet-palette-label"' +
          (isDark(style.gradient) ? ' style="color:rgba(255,255,255,0.5)"' : '') + '>PALETTE</span>' +
          '<div class="closet-swatches">' + swatchHTML + '</div>' +
        '</div>';

      grid.appendChild(card);
    });

    // Wire swap buttons on style card tips
    $$(".tip-swap-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var styleId = btn.dataset.style;
        var tipIdx = parseInt(btn.dataset.idx);
        var styleObj = styles.filter(function (s) { return s.id === styleId; })[0];
        if (!styleObj) return;

        // Find alternatives from the item pool by category label
        var currentTip = styleObj.tips[tipIdx];
        var label = currentTip.label.toLowerCase();

        // Map label to itemPool category
        var cat = null;
        if (label.indexOf("dress") !== -1 || label.indexOf("top") !== -1) cat = "top";
        else if (label.indexOf("bottom") !== -1 || label.indexOf("pants") !== -1 || label.indexOf("skirt") !== -1) cat = "bottom";
        else if (label.indexOf("shoe") !== -1) cat = "shoes";
        else if (label.indexOf("hair") !== -1) cat = "hair";
        else if (label.indexOf("makeup") !== -1 || label.indexOf("lip") !== -1) cat = "makeup";
        else cat = "accessories";

        // Pick a random alternative from the pool
        var pool = itemPool[cat] || [];
        var candidates = pool.filter(function (p) { return p.t !== currentTip.text; });
        var newPick = pickRandom(candidates.length ? candidates : pool);

        // Animate
        btn.style.transform = "rotate(360deg)";
        btn.style.transition = "transform 0.4s ease";

        // Update the tip text
        setTimeout(function () {
          btn.style.transform = "";
          currentTip.text = newPick.t;
          currentTip.icon = categoryIcons[cat] || currentTip.icon;

          // Re-render just this tip's text
          var tipEl = btn.closest(".closet-tip");
          var textEl = tipEl.querySelector(".closet-tip-text");
          var iconEl = tipEl.querySelector(".closet-tip-icon");
          if (textEl) textEl.textContent = newPick.t;
          if (iconEl) iconEl.textContent = currentTip.icon;

          // Flash effect
          if (textEl) {
            textEl.style.transition = "none";
            textEl.style.opacity = "0.3";
            setTimeout(function () {
              textEl.style.transition = "opacity 0.4s ease";
              textEl.style.opacity = "1";
            }, 50);
          }
        }, 200);
      });
    });

    // Trigger reveals
    if (window.DiaryMagic && window.DiaryMagic.initReveals) {
      window.DiaryMagic.initReveals();
    }
  }

  function isDark(grad) {
    return grad.indexOf("#1a0a0a") !== -1 ||
           grad.indexOf("#1a1a2e") !== -1 ||
           grad.indexOf("#2c2c2c") !== -1 ||
           grad.indexOf("#0f3460") !== -1;
  }

  /* ================================================================
     LOCAL OUTFIT RECOMMENDER — no API, pure JS randomizer
     ================================================================ */

  /* ---- item pool per category ---- */
  var itemPool = {
    top: [
      { t: "Floral midi dress with puff sleeves", style: "sweet" },
      { t: "Oversized graphic tee or baby tee", style: "y2k" },
      { t: "Chunky knit sweater in cream", style: "cozy" },
      { t: "Silk slip dress in ivory", style: "glam" },
      { t: "Off-shoulder tulle bodice top", style: "princess" },
      { t: "Fitted sports bra + windbreaker", style: "sporty" },
      { t: "Tea-length polka dot dress", style: "vintage" },
      { t: "Bodycon mini in black", style: "spicy" },
      { t: "Oversized bomber jacket, layered chains", style: "street" }
    ],
    bottom: [
      { t: "High-waist biker shorts", style: "sporty" },
      { t: "Low-rise baggy jeans", style: "y2k" },
      { t: "Wide-leg corduroy pants in caramel", style: "cozy" },
      { t: "Tailored trousers in navy", style: "glam" },
      { t: "Tulle ball gown skirt", style: "princess" },
      { t: "Cargo mini skirt", style: "y2k" },
      { t: "Ripped wide-leg denim", style: "street" },
      { t: "Fitted pencil skirt in black", style: "spicy" }
    ],
    shoes: [
      { t: "White Mary Janes or ballet flats", style: "sweet" },
      { t: "Stiletto heels", style: "spicy" },
      { t: "Chunky white sneakers (AF1, Dunks)", style: "sporty" },
      { t: "Espadrille wedges in tan", style: "vintage" },
      { t: "Pointed-toe heels (Louboutin)", style: "glam" },
      { t: "Glitter platform heels", style: "princess" },
      { t: "Platform UGGs or sock boots", style: "cozy" },
      { t: "Platform sandals or dad sneakers", style: "y2k" },
      { t: "Jordans or Yeezys", style: "street" }
    ],
    hair: [
      { t: "Half-up space buns with ribbon", style: "sweet" },
      { t: "Sleek straight, middle part", style: "spicy" },
      { t: "High ponytail with claw clip", style: "sporty" },
      { t: "Victory rolls or finger waves", style: "vintage" },
      { t: "Blowout with curtain bangs", style: "glam" },
      { t: "Side-swept curls with baby's breath", style: "princess" },
      { t: "Messy bun with face-framing pieces", style: "cozy" },
      { t: "Pigtails with butterfly clips", style: "y2k" }
    ],
    accessories: [
      { t: "Pearl hairpins, dainty heart necklace", style: "sweet" },
      { t: "Gold chain necklace, hoop earrings", style: "spicy" },
      { t: "Crossbody mini or belt bag", style: "sporty" },
      { t: "Woven basket bag, cat-eye sunglasses", style: "vintage" },
      { t: "Cartier Love bracelet, Rolex, Kelly bag", style: "glam" },
      { t: "Crystal tiara, pearl headband", style: "princess" },
      { t: "Knit beanie, round glasses, tote", style: "cozy" },
      { t: "Butterfly clips, tinted sunglasses, jelly bag", style: "y2k" },
      { t: "Snapback, Stussy shoulder bag", style: "street" }
    ],
    makeup: [
      { t: "Dewy base, peach blush, glossy pink lips", style: "sweet" },
      { t: "Winged liner, bold red lip, contour", style: "spicy" },
      { t: "No-makeup makeup, SPF, lip balm", style: "sporty" },
      { t: "Matte red lip, thin brows, cat-eye", style: "vintage" },
      { t: "Glass skin, nude gloss, soft contour", style: "glam" },
      { t: "Sparkly eyeshadow, rosy cheeks", style: "princess" },
      { t: "Fresh-faced, minimal, warm tones", style: "cozy" },
      { t: "Glossy lips, sticker gems, pastel shadow", style: "y2k" }
    ]
  };

  var categoryIcons = {
    top: "👗", bottom: "👖", shoes: "👟", hair: "💇‍♀️", accessories: "💍", makeup: "💄"
  };

  /* ---- current outfit state ---- */
  var currentOutfit = {};

  function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function generateOutfit(mood) {
    var keys = Object.keys(itemPool);
    var outfit = {};
    keys.forEach(function (cat) {
      var pool = mood ? itemPool[cat].filter(function (i) { return i.style === mood; }) : itemPool[cat];
      if (!pool.length) pool = itemPool[cat];
      var pick = pickRandom(pool);
      outfit[cat] = { text: pick.t, style: pick.style };
    });
    return outfit;
  }

  /* ---- swap one item ---- */
  function swapItem(category) {
    var pool = itemPool[category];
    var current = currentOutfit[category] ? currentOutfit[category].text : "";
    var candidates = pool.filter(function (i) { return i.t !== current; });
    var pick = pickRandom(candidates.length ? candidates : pool);
    currentOutfit[category] = { text: pick.t, style: pick.style };
    renderOutfitCard();
  }

  /* ---- elements ---- */
  var btnPickOutfit = $("#btnPickOutfit");
  var btnAgainOutfit = $("#btnAgainOutfit");
  var outfitCard = $("#outfitCard");
  var outfitLoading = $("#outfitLoading");

  function renderOutfitCard() {
    var keys = Object.keys(currentOutfit);
    var piecesHTML = keys.map(function (cat) {
      var item = currentOutfit[cat];
      return '<div class="outfit-piece">' +
        '<span class="outfit-piece-cat">' + (categoryIcons[cat] || "✨") + " " + cat + "</span>" +
        '<span class="outfit-piece-item">' + item.text + "</span>" +
        '<button class="outfit-swap-btn" data-cat="' + cat + '" type="button" title="swap this item">🔄</button>' +
        "</div>";
    }).join("");
    $("#outfitPieces").innerHTML = piecesHTML;

    // wire swap buttons
    $$(".outfit-swap-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var cat = btn.dataset.cat;
        btn.style.transform = "rotate(360deg)";
        btn.style.transition = "transform 0.4s ease";
        setTimeout(function () { btn.style.transform = ""; }, 400);
        swapItem(cat);
      });
    });
  }

  function showOutfit(mood) {
    currentOutfit = generateOutfit(mood);
    var styleMatch = styles.filter(function (s) { return s.id === mood; })[0];
    if (styleMatch) {
      $("#outfitEmoji").textContent = styleMatch.emoji;
      $("#outfitStyleName").textContent = styleMatch.tag;
      $("#outfitMood").textContent = styleMatch.vibe;
      $("#outfitSwatches").innerHTML = styleMatch.colorPalette.map(function (c) {
        return '<span class="outfit-swatch" style="background:' + c + '"></span>';
      }).join("");
      $("#outfitWhy").textContent = styleMatch.tagline;
      $("#outfitTip").textContent = "Tap 🔄 on any item to swap it for something new!";
      $("#outfitSweet").textContent = "You look amazing ♡";
    } else {
      var rs = pickRandom(styles);
      $("#outfitEmoji").textContent = rs.emoji;
      $("#outfitStyleName").textContent = "Surprise Mix";
      $("#outfitMood").textContent = "mixed & matched";
      $("#outfitSwatches").innerHTML = rs.colorPalette.map(function (c) {
        return '<span class="outfit-swatch" style="background:' + c + '"></span>';
      }).join("");
      $("#outfitWhy").textContent = "A fun mashup of different vibes — because why choose just one?";
      $("#outfitTip").textContent = "Tap 🔄 on any item to swap it!";
      $("#outfitSweet").textContent = "Confidence is your best accessory ♡";
    }

    renderOutfitCard();
    outfitLoading.classList.add("hidden");
    outfitCard.classList.remove("hidden");
    outfitCard.style.animation = "none";
    void outfitCard.offsetWidth;
    outfitCard.style.animation = "";
  }

  function pickOutfit() {
    btnPickOutfit.disabled = true;
    outfitCard.classList.add("hidden");
    outfitLoading.classList.remove("hidden");
    setTimeout(function () {
      showOutfit(selectedMood || null);
      btnAgainOutfit.classList.remove("hidden");
      btnPickOutfit.disabled = false;
    }, 600);
  }

  /* ---- mood pills ---- */
  var selectedMood = "";
  var moodPills = $$(".closet-mood-pill");
  moodPills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      moodPills.forEach(function (p) { p.classList.remove("active"); });
      pill.classList.add("active");
      selectedMood = pill.dataset.mood;
    });
  });

  btnPickOutfit.addEventListener("click", pickOutfit);
  btnAgainOutfit.addEventListener("click", pickOutfit);

  /* Auto-pick on first visit */
  pickOutfit();

  /* ================================================================
     AI CHAT STYLIST — keyword-based outfit suggestions
     ================================================================ */

  var chatToggle = $("#chatToggle");
  var chatBox = $("#chatBox");
  var chatClose = $("#chatClose");
  var chatMessages = $("#chatMessages");
  var chatInput = $("#chatInput");
  var chatSend = $("#chatSend");

  function addChatMsg(text, who) {
    var msg = document.createElement("div");
    msg.className = "chat-msg " + (who === "user" ? "chat-user" : "chat-bot");
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function chatReply(input) {
    var q = input.toLowerCase();
    var reply = "";
    var matched = [];

    // Check for style keywords
    var styleKeywords = {
      sweet: ["sweet", "cute", "หวาน", "น่ารัก", "pink", "pastel", "floral"],
      spicy: ["spicy", "hot", "แซ่บ", "sexy", "bold", "red", "fierce"],
      sporty: ["sport", "athletic", "สปอร์ต", "gym", "active", "comfy", "sneaker"],
      vintage: ["vintage", "retro", "วินเทจ", "classic", "old"],
      glam: ["glam", "hiso", "รวย", "luxury", "elegant", "fancy", "expensive"],
      princess: ["princess", "disney", "เจ้าหญิง", "fairytale", "ball gown", "tiara"],
      cozy: ["cozy", "warm", "อบอุ่น", "comfy", "lazy", "sweater", "knit"],
      y2k: ["y2k", "2000", "butterfly", "retro 2000", "low rise"],
      street: ["street", "urban", "สตรีท", "cool", "skater", "baggy"]
    };

    Object.keys(styleKeywords).forEach(function (style) {
      styleKeywords[style].forEach(function (kw) {
        if (q.indexOf(kw) !== -1) matched.push(style);
      });
    });

    // Check for category swaps
    var swapKeywords = {
      shoes: ["shoes", "รองเท้า", "sneaker", "heels", "boots", "flats"],
      top: ["top", "เสื้อ", "dress", "ชุด", "shirt", "tee"],
      hair: ["hair", "ผม", "ทรงผม", "hairstyle"],
      accessories: ["accessories", "เครื่องประดับ", "bag", "กระเป๋า", "hat", "หมวก", "jewelry"],
      makeup: ["makeup", "เมคอัพ", "ลิป", "lipstick", "cosmetics"],
      bottom: ["bottom", "กางเกง", "pants", "skirt", "ขายาว"]
    };

    var swapCat = null;
    Object.keys(swapKeywords).forEach(function (cat) {
      swapKeywords[cat].forEach(function (kw) {
        if (q.indexOf(kw) !== -1) swapCat = cat;
      });
    });

    if (q.indexOf("swap") !== -1 || q.indexOf("change") !== -1 || q.indexOf("เปลี่ยน") !== -1 || q.indexOf("หนึ่ง") !== -1) {
      if (swapCat) {
        swapItem(swapCat);
        reply = "Swapped " + swapCat + " ใหม่ให้แล้วค่ะ! 🔄 ดูด้านบนนะ — ลองอันอื่นเพิ่มเติมได้น้า ♡";
      } else {
        reply = "อยากเปลี่ยนอะไรเป็นพิเศษไหม? บอกได้เลย เช่น 'เปลี่ยนรองเท้า' หรือ 'swap hair' 🔄";
      }
    } else if (q.indexOf("help") !== -1 || q.indexOf("ช่วย") !== -1 || q === "") {
      reply = "บอกได้เลยว่าอยากได้สไตล์อะไร — เช่น 'sweet', 'glam', 'sporty', 'vintage' หรือบอกว่าไม่ชอบชิ้นไหน เดี๋ยวสลับให้! 🔄";
    } else if (matched.length > 0) {
      var mood = matched[0];
      selectedMood = mood;
      moodPills.forEach(function (p) {
        p.classList.toggle("active", p.dataset.mood === mood);
      });
      showOutfit(mood);
      var styleObj = styles.filter(function (s) { return s.id === mood; })[0];
      reply = styleObj.emoji + " " + styleObj.tag + " — " + styleObj.tagline + " ลองดูแล้วกด 🔄 ถ้าอยากเปลี่ยนชิ้นไหนนะ ♡";
    } else if (q.indexOf("random") !== -1 || q.indexOf("surprise") !== -1 || q.indexOf("สุ่ม") !== -1 || q.indexOf("เซอร์ไพรส์") !== -1) {
      showOutfit(null);
      reply = "สุ่มลุคใหม่ให้แล้วค่ะ! 🎲✨";
    } else {
      reply = "ลองบอกสไตล์ที่ชอบดูสิ — เช่น 'sweet', 'spicy', 'glam', 'street' หรือบอกว่าอยากเปลี่ยนชิ้นไหน 🔄";
    }

    return reply;
  }

  function sendChat() {
    var text = chatInput.value.trim();
    if (!text) return;
    addChatMsg(text, "user");
    chatInput.value = "";
    setTimeout(function () {
      var reply = chatReply(text);
      addChatMsg(reply, "bot");
    }, 400);
  }

  chatSend.addEventListener("click", sendChat);
  chatInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); sendChat(); }
  });

  chatToggle.addEventListener("click", function () {
    chatBox.classList.toggle("open");
    chatToggle.classList.toggle("open");
  });
  chatClose.addEventListener("click", function () {
    chatBox.classList.remove("open");
    chatToggle.classList.remove("open");
  });

  /* Welcome message */
  addChatMsg("สวัสดีค่ะ! 🎀 เป็นสไตล์ลิสต์ส่วนตัวของ Nadia บอกได้เลยว่าอยากได้ลุคแบบไหน — sweet, spicy, glam, sporty? หรืออยากเปลี่ยนชิ้นไหนในชุดบอกได้เลยน้า ♡", "bot");

  renderGrid(null);
})();
