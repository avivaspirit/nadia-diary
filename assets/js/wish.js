/* ================================================================
   MAKE A WISH 🌠 — shooting star ceremony
   ================================================================ */
(function () {
  "use strict";

  /* ---- tiny helpers ---- */
  var $ = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return Array.from(document.querySelectorAll(sel)); };
  var rand = function (min, max) { return min + Math.random() * (max - min); };
  var pick = function (arr) { return arr[Math.floor(Math.random() * arr.length)]; };

  /* ---- element refs ---- */
  var canvas = $("#starCanvas");
  var ctx = canvas ? canvas.getContext("2d") : null;
  var wishText = $("#wishText");
  var wishSendBtn = $("#wishSendBtn");
  var wishHint = $("#wishHint");
  var charCount = $("#charCount");
  var wishCountNum = $("#wishCountNum");
  var wishWallSection = $("#wishWallSection");
  var wishWall = $("#wishWall");
  var wishPopup = $("#wishPopup");
  var wishPopupText = $("#wishPopupText");
  var wishPopupClose = $("#wishPopupClose");
  var shootingStarOverlay = $("#shootingStarOverlay");
  var moon = $("#moon");

  if (!canvas || !ctx) return;

  /* ---- canvas sizing ---- */
  var W = 0, H = 0;
  function resize() {
    W = canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
    H = canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
  }
  resize();
  window.addEventListener("resize", resize);

  /* ---- stars ---- */
  var stars = [];
  var STAR_COUNT = 180;

  function initStars() {
    stars = [];
    for (var i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: rand(0.3, 1.8),
        baseAlpha: rand(0.3, 0.9),
        twinkleSpeed: rand(0.5, 2.5),
        twinklePhase: Math.random() * Math.PI * 2,
        hue: pick([45, 50, 55, 210, 220, 280, 320])
      });
    }
  }
  initStars();

  /* ---- shooting stars ---- */
  var shootingStars = [];
  var starAvailable = false;

  function spawnShootingStar(isManual) {
    var startX = rand(W * 0.2, W * 0.8);
    var startY = rand(0, H * 0.3);
    var angle = rand(Math.PI * 0.15, Math.PI * 0.4);
    var speed = rand(8, 14) * (window.devicePixelRatio || 1);

    shootingStars.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: 0.008,
      trail: [],
      maxTrail: 25,
      isManual: !!isManual
    });
  }

  /* ---- auto shooting star cycle ---- */
  var starTimer = null;
  function scheduleNextStar() {
    var delay = isMobile() ? rand(5000, 10000) : rand(3000, 7000);
    starTimer = setTimeout(function () {
      spawnShootingStar(false);
      starAvailable = true;
      updateButtonState();
      // star is "catchable" for 8 seconds
      setTimeout(function () {
        starAvailable = false;
        updateButtonState();
      }, 8000);
      scheduleNextStar();
    }, delay);
  }

  function isMobile() {
    return window.innerWidth <= 768;
  }

  /* ---- button state ---- */
  function updateButtonState() {
    var hasText = wishText.value.trim().length > 0;
    if (starAvailable && hasText) {
      wishSendBtn.disabled = false;
      wishSendBtn.classList.add("ready");
      $(".wish-btn-text").textContent = "Catch the star! 🌠";
      wishHint.textContent = "💫 A shooting star is crossing the sky — make your wish now!";
      wishHint.classList.add("urgent");
    } else if (starAvailable && !hasText) {
      wishSendBtn.disabled = true;
      wishSendBtn.classList.remove("ready");
      $(".wish-btn-text").textContent = "Type your wish first... ⭐";
      wishHint.textContent = "💫 A star is here! Type your wish quickly!";
      wishHint.classList.add("urgent");
    } else if (hasText) {
      wishSendBtn.disabled = true;
      wishSendBtn.classList.remove("ready");
      $(".wish-btn-text").textContent = "Wait for a shooting star... 🌠";
      wishHint.textContent = "✨ Your wish is ready. Watch the sky for the next shooting star... ✨";
      wishHint.classList.remove("urgent");
    } else {
      wishSendBtn.disabled = true;
      wishSendBtn.classList.remove("ready");
      $(".wish-btn-text").textContent = "Wait for a shooting star... 🌠";
      wishHint.textContent = "✨ A shooting star will appear soon — type your wish and catch it! ✨";
      wishHint.classList.remove("urgent");
    }
  }

  /* ---- input listeners ---- */
  wishText.addEventListener("input", function () {
    var len = wishText.value.length;
    charCount.textContent = len;
    updateButtonState();
  });

  /* ---- make a wish ---- */
  wishSendBtn.addEventListener("click", function () {
    var text = wishText.value.trim();
    if (!text || !starAvailable) return;

    // Launch the ceremonial shooting star
    starAvailable = false;
    updateButtonState();

    var dpr = window.devicePixelRatio || 1;

    // --- METEOR SHOWER: multiple smaller stars first ---
    for (var ms = 0; ms < 8; ms++) {
      (function (idx) {
        setTimeout(function () {
          var angle = rand(Math.PI * 0.15, Math.PI * 0.4);
          shootingStars.push({
            x: rand(W * 0.05, W * 0.7),
            y: rand(0, H * 0.25),
            vx: Math.cos(angle) * rand(10, 16) * dpr,
            vy: Math.sin(angle) * rand(10, 16) * dpr,
            life: 1,
            decay: 0.012,
            trail: [],
            maxTrail: 20,
            isManual: true,
            ceremonial: false
          });
        }, idx * 180);
      })(ms);
    }

    // --- MAIN ceremonial star carries the wish text ---
    setTimeout(function () {
      var ceremonialStar = {
        x: W * 0.05,
        y: H * 0.12,
        vx: Math.cos(0.28) * 12 * dpr,
        vy: Math.sin(0.28) * 12 * dpr,
        life: 1,
        decay: 0.004, // slow — stays longer so text is readable
        trail: [],
        maxTrail: 50,
        isManual: true,
        ceremonial: true,
        wishText: text // ← wish text carried by this star
      };
      shootingStars.push(ceremonialStar);
    }, 600);

    // Save wish
    saveWish(text);

    // Clear input
    wishText.value = "";
    charCount.textContent = "0";

    // Show popup after star animation
    setTimeout(function () {
      wishPopupText.textContent = "“" + text + "”";
      wishPopup.classList.add("show");
    }, 3000);
  });

  wishPopupClose.addEventListener("click", function () {
    wishPopup.classList.remove("show");
  });

  /* ---- storage ---- */
  var STORAGE_KEY = "nadia_wishes";
  function getWishes() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (e) { return []; }
  }
  function saveWish(text) {
    var wishes = getWishes();
    wishes.push({
      text: text,
      date: new Date().toISOString(),
      id: Date.now()
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    renderWishWall();
  }
  function deleteWish(id) {
    var wishes = getWishes().filter(function (w) { return w.id !== id; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    renderWishWall();
  }

  function renderWishWall() {
    var wishes = getWishes();
    wishCountNum.textContent = wishes.length;
    if (wishes.length === 0) {
      wishWallSection.style.display = "none";
      return;
    }
    wishWallSection.style.display = "";
    wishWall.innerHTML = "";

    var constellations = [
      { symbol: "⭐", name: "Star" },
      { symbol: "🌟", name: "Glowing Star" },
      { symbol: "✨", name: "Sparkles" },
      { symbol: "💫", name: "Dizzy Star" },
      { symbol: "🌠", name: "Shooting Star" },
      { symbol: "🪐", name: "Planet" },
      { symbol: "🌙", name: "Moon" },
      { symbol: "🏳️", name: "Comet" }
    ];

    wishes.forEach(function (w, i) {
      var c = constellations[i % constellations.length];
      var tile = document.createElement("div");
      tile.className = "wish-tile";
      tile.style.animationDelay = (i * 0.08) + "s";

      var date = new Date(w.date);
      var dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

      tile.innerHTML =
        '<div class="wish-tile-star">' + c.symbol + '</div>' +
        '<p class="wish-tile-text">' + escapeHtml(w.text) + '</p>' +
        '<p class="wish-tile-date">' + dateStr + '</p>' +
        '<button class="wish-tile-delete" data-id="' + w.id + '" type="button" title="Release to the sky">✕</button>';

      wishWall.appendChild(tile);
    });

    // Wire delete buttons
    $$(".wish-tile-delete").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = parseInt(this.getAttribute("data-id"));
        var tile = this.closest(".wish-tile");
        tile.classList.add("vanishing");
        setTimeout(function () { deleteWish(id); }, 500);
      });
    });
  }

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* ---- animation loop ---- */
  var time = 0;
  var dpr = window.devicePixelRatio || 1;
  function animate() {
    time += 0.016;

    // Clear transparent — body gradient shows through (uniform bg, no seams)
    ctx.clearRect(0, 0, W, H);

    // Draw stars
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var twinkle = Math.sin(time * s.twinkleSpeed + s.twinklePhase);
      var alpha = s.baseAlpha + twinkle * 0.3;
      if (alpha < 0.05) alpha = 0.05;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * (window.devicePixelRatio || 1), 0, Math.PI * 2);

      // Colored glow for bigger stars
      if (s.r > 1.2) {
        ctx.shadowColor = "hsl(" + s.hue + ", 80%, 75%)";
        ctx.shadowBlur = 8;
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.fillStyle = "hsla(" + s.hue + ", 30%, 95%, " + alpha + ")";
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // Draw shooting stars
    for (var j = shootingStars.length - 1; j >= 0; j--) {
      var ss = shootingStars[j];

      // Update position
      ss.x += ss.vx;
      ss.y += ss.vy;
      ss.life -= ss.decay;

      // Trail
      ss.trail.push({ x: ss.x, y: ss.y });
      if (ss.trail.length > ss.maxTrail) ss.trail.shift();

      // Draw trail
      if (ss.trail.length > 1) {
        for (var t = 0; t < ss.trail.length - 1; t++) {
          var trailAlpha = (t / ss.trail.length) * ss.life;
          var trailWidth = (t / ss.trail.length) * (ss.ceremonial ? 6 : 3) * (window.devicePixelRatio || 1);

          ctx.beginPath();
          ctx.moveTo(ss.trail[t].x, ss.trail[t].y);
          ctx.lineTo(ss.trail[t + 1].x, ss.trail[t + 1].y);
          ctx.strokeStyle = "rgba(255, 240, 200, " + trailAlpha + ")";
          ctx.lineWidth = trailWidth;
          ctx.lineCap = "round";
          ctx.stroke();
        }

        // Star head glow
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, (ss.ceremonial ? 8 : 4) * (window.devicePixelRatio || 1), 0, Math.PI * 2);
        ctx.shadowColor = "rgba(255, 245, 200, 1)";
        ctx.shadowBlur = ss.ceremonial ? 30 : 15;
        ctx.fillStyle = "rgba(255, 250, 230, " + ss.life + ")";
        ctx.fill();
        ctx.shadowBlur = 0;

        // --- Draw wish text following the ceremonial star ---
        if (ss.ceremonial && ss.wishText && ss.life > 0.15) {
          ctx.save();
          var fontSize = 13 * dpr;
          ctx.font = "600 " + fontSize + "px Quicksand, sans-serif";
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";

          // Wrap text if too long — max 25 chars per line
          var maxChars = 28;
          var words = ss.wishText.split(" ");
          var lines = [];
          var line = "";
          for (var wi = 0; wi < words.length; wi++) {
            if ((line + words[wi]).length > maxChars) {
              if (line) lines.push(line);
              line = words[wi] + " ";
            } else {
              line += words[wi] + " ";
            }
          }
          if (line) lines.push(line);
          if (lines.length > 2) lines = lines.slice(0, 2); // max 2 lines

          var textX = ss.x + 16 * dpr;
          var textY = ss.y - 10 * dpr - (lines.length - 1) * fontSize * 0.6;

          for (var li = 0; li < lines.length; li++) {
            // Dark shadow behind for readability
            ctx.shadowColor = "rgba(5, 2, 20, 1)";
            ctx.shadowBlur = 6;
            ctx.fillStyle = "rgba(255, 255, 240, " + Math.min(ss.life * 1.3, 1) + ")";
            ctx.fillText(lines[li].trim(), textX, textY + li * fontSize * 1.25);
          }

          ctx.restore();
        }
      }

      // Remove if off-screen or dead
      if (ss.life <= 0 || ss.x > W + 100 || ss.y > H + 100) {
        shootingStars.splice(j, 1);
      }
    }

    requestAnimationFrame(animate);
  }
  animate();

  /* ---- moon parallax ---- */
  var moonEl = moon;
  if (moonEl) {
    document.addEventListener("mousemove", function (e) {
      var mx = (e.clientX / window.innerWidth - 0.5) * 20;
      var my = (e.clientY / window.innerHeight - 0.5) * 15;
      moonEl.style.transform = "translate(" + mx + "px, " + my + "px)";
    });
  }

  /* ---- init ---- */
  renderWishWall();
  scheduleNextStar();

  // First shooting star comes fast (1.5s) for instant gratification
  setTimeout(function () {
    spawnShootingStar(false);
    starAvailable = true;
    updateButtonState();
    setTimeout(function () {
      starAvailable = false;
      updateButtonState();
    }, 8000);
    scheduleNextStar();
  }, 1500);

  // Re-init stars on resize
  window.addEventListener("resize", function () {
    setTimeout(function () {
      resize();
      initStars();
    }, 200);
  });
})();
