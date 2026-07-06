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
      vibe: "สาวหวาน",
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
      vibe: "สาวแซ่บ",
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
      vibe: "Sporty Girl",
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
      vibe: "สาววินเทจ",
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
      vibe: "สาว Glam Hiso",
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
      vibe: "สาวเจ้าหญิง Disney",
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
      vibe: "สาวโคซี่",
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
      vibe: "สาว Y2K",
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
      vibe: "สาวสตรีท",
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

      // Style-specific background
      card.style.background = style.gradient;

      // Build tips HTML
      var tipsHTML = style.tips.map(function (t) {
        return '<div class="closet-tip">' +
          '<span class="closet-tip-icon">' + t.icon + '</span>' +
          '<div class="closet-tip-body">' +
          '<span class="closet-tip-label" style="color:' + style.accent + '">' + t.label + '</span>' +
          '<span class="closet-tip-text">' + t.text + '</span>' +
          '</div></div>';
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
          (isLight(style.gradient) ? '' : ' style="color:rgba(255,255,255,0.85)"') + '>' +
          style.tagline + '</p>' +
        '<div class="closet-tips' + (isLight(style.gradient) ? '' : ' dark') + '">' + tipsHTML + '</div>' +
        '<div class="closet-palette"' +
          (isLight(style.gradient) ? '' : ' style="border-color:rgba(255,255,255,0.15)"') + '>' +
          '<span class="closet-palette-label"' +
          (isLight(style.gradient) ? '' : ' style="color:rgba(255,255,255,0.5)"') + '>PALETTE</span>' +
          '<div class="closet-swatches">' + swatchHTML + '</div>' +
        '</div>';

      grid.appendChild(card);
    });

    // Trigger reveals
    if (window.DiaryMagic && window.DiaryMagic.initReveals) {
      window.DiaryMagic.initReveals();
    }
  }

  function isLight(grad) {
    // Dark backgrounds: spicy, glam, street
    return !(style_id_isDark(grad));
  }

  function style_id_isDark(grad) {
    return grad.indexOf("#1a") !== -1 || grad.indexOf("#2c") !== -1 || grad.indexOf("#0f") !== -1;
  }

  renderGrid(null);
})();
