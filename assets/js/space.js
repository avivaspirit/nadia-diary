/* ==========================================================================
   SPACE VOYAGE 🚀🌌 — Starfield, Rocket Builder, Planetarium & Star Catcher
   ========================================================================== */
(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const data = window.NADIA_DATA?.space || { planets: [], fortunes: [] };
  let starScore = 0;
  let audioContext = null;
  let isRadioPlaying = false;
  let radioOscillator = null;

  /* --------------------------------------------------- 1. Starfield Canvas */
  function initStarfieldCanvas() {
    const canvas = $("#spaceCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005
    }));

    function render() {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0) s.speed = -s.speed;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, s.alpha)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(render);
    }
    render();
  }

  /* -------------------------------------------------- 2. Rocket Builder & Warp */
  function initRocketBuilder() {
    const bodyColorBtns = $$("[data-body-color]");
    const flameColorBtns = $$("[data-flame-color]");
    const decalBtns = $$("[data-decal]");
    const rocketSvg = $("#rocketBodySvg");
    const rocketFlames = $("#rocketFlames");
    const decalIcon = $("#rocketDecalIcon");
    const btnLaunch = $("#btnLaunchRocket");
    const warpOverlay = $("#warpOverlay");

    if (!btnLaunch) return;

    // Body color switch
    bodyColorBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        bodyColorBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const color = btn.dataset.bodyColor;
        if (rocketSvg) {
          rocketSvg.style.filter = `drop-shadow(0 0 16px ${color})`;
          const mainHull = $("#svgHull", rocketSvg);
          if (mainHull) mainHull.setAttribute("fill", color);
        }
      });
    });

    // Flame color switch
    flameColorBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        flameColorBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const color = btn.dataset.flameColor;
        if (rocketFlames) {
          rocketFlames.style.background = `linear-gradient(180deg, ${color} 0%, #fb923c 60%, transparent 100%)`;
          rocketFlames.style.boxShadow = `0 0 24px ${color}`;
        }
      });
    });

    // Decal switch
    decalBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        decalBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        if (decalIcon) decalIcon.textContent = btn.dataset.decal;
      });
    });

    // Launch action
    btnLaunch.addEventListener("click", () => {
      if (warpOverlay) {
        warpOverlay.classList.add("active");
        playWarpSound();
        setTimeout(() => {
          warpOverlay.classList.remove("active");
          showCosmicToast("🚀 LAUNCH SUCCESS! Nadia's rocket is now orbiting Planet Pink Nebula! ✨");
        }, 2600);
      }
    });
  }

  /* -------------------------------------------------- 3. Planetarium Galaxy */
  function initPlanetarium() {
    const grid = $("#planetsGrid");
    const modal = $("#planetModal");
    const modalClose = $("#modalCloseBtn");

    if (!grid || !data.planets) return;

    grid.innerHTML = data.planets.map(p => `
      <div class="planet-card" data-id="${p.id}" style="--p-color: ${p.color};">
        <div class="planet-icon-wrap">${p.icon}</div>
        <span class="planet-tag">${p.tag}</span>
        <h3 class="planet-title-en">${p.nameEn}</h3>
        <p class="planet-title-th">${p.nameTh}</p>
      </div>
    `).join("");

    grid.addEventListener("click", (e) => {
      const card = e.target.closest(".planet-card");
      if (!card) return;
      const id = card.dataset.id;
      const planet = data.planets.find(p => p.id === id);
      if (planet && modal) {
        $("#modalIcon").textContent = planet.icon;
        $("#modalTitle").textContent = `${planet.nameEn} (${planet.nameTh})`;
        $("#modalVibe").textContent = planet.vibe;
        $("#modalNote").textContent = planet.secretNote;
        modal.classList.add("open");
        playPlanetChime();
      }
    });

    if (modalClose && modal) {
      modalClose.addEventListener("click", () => modal.classList.remove("open"));
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("open");
      });
    }
  }

  /* -------------------------------------------------- 4. Shooting Star Game */
  function initShootingStarGame() {
    const area = $("#starCatcherArea");
    const scoreDisplay = $("#starScoreDisplay");
    const toast = $("#wishToast");

    if (!area) return;

    function spawnStar() {
      if (area.children.length > 5) return;
      const star = document.createElement("div");
      star.className = "falling-star";
      star.textContent = ["⭐", "✨", "💫", "🌟"][Math.floor(Math.random() * 4)];
      star.style.left = `${Math.random() * 85 + 5}%`;
      star.style.animationDuration = `${Math.random() * 2 + 2.5}s`;

      star.addEventListener("click", (e) => {
        e.stopPropagation();
        starScore += 100;
        if (scoreDisplay) scoreDisplay.textContent = `${starScore} PTS`;

        // Sparkle sound
        playChimeFreq(880);

        // Show fortune
        if (toast && data.fortunes) {
          const fortune = data.fortunes[Math.floor(Math.random() * data.fortunes.length)];
          toast.textContent = fortune;
          toast.classList.remove("hidden");
        }

        star.remove();
      });

      star.addEventListener("animationend", () => star.remove());
      area.appendChild(star);
    }

    setInterval(spawnStar, 1200);
  }

  /* -------------------------------------------------- Audio Synth Helpers */
  function getAudioCtx() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
  }

  function playChimeFreq(freq) {
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch(e) {}
  }

  function playWarpSound() {
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 2.0);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 2.2);
    } catch(e) {}
  }

  function playPlanetChime() {
    playChimeFreq(523.25); // C5
    setTimeout(() => playChimeFreq(659.25), 120); // E5
    setTimeout(() => playChimeFreq(783.99), 240); // G5
  }

  function initCosmicRadio() {
    const radioBtn = $("#btnRadioToggle");
    const radioStatus = $("#radioStatusText");

    if (!radioBtn) return;

    radioBtn.addEventListener("click", () => {
      const ctx = getAudioCtx();
      if (ctx.state === "suspended") ctx.resume();

      if (isRadioPlaying) {
        if (radioOscillator) {
          radioOscillator.stop();
          radioOscillator = null;
        }
        isRadioPlaying = false;
        radioBtn.textContent = "▶";
        if (radioStatus) radioStatus.textContent = "Radio Paused";
      } else {
        radioOscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        radioOscillator.type = "sine";
        radioOscillator.frequency.setValueAtTime(220, ctx.currentTime); // A3 ambient drone
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        radioOscillator.connect(gain);
        gain.connect(ctx.destination);
        radioOscillator.start();
        isRadioPlaying = true;
        radioBtn.textContent = "⏸";
        if (radioStatus) radioStatus.textContent = "Cosmic Lo-Fi Playing";
      }
    });
  }

  function showCosmicToast(msg) {
    const toast = $("#wishToast");
    if (toast) {
      toast.textContent = msg;
      toast.classList.remove("hidden");
    }
  }

  /* --------------------------------------------------- DOM Ready */
  document.addEventListener("DOMContentLoaded", () => {
    initStarfieldCanvas();
    initRocketBuilder();
    initPlanetarium();
    initShootingStarGame();
    initCosmicRadio();
  });
})();
