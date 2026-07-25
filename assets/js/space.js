/* ==========================================================================
   SPACE VOYAGE 🚀🌌 — Starfield, Interactive Flight Simulator & Planetarium
   ========================================================================== */
(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const data = window.NADIA_DATA?.space || { planets: [], fortunes: [] };

  let starScore = 0;
  let flightStardust = 0;
  let audioContext = null;
  let isRadioPlaying = false;
  let radioOscillator = null;

  // Selected Rocket Customization State
  let rocketConfig = {
    hullColor: "#a855f7",
    flameColor: "#f472b6",
    decal: "🎀"
  };

  /* --------------------------------------------------- 1. Background Starfield */
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

    const stars = Array.from({ length: 160 }, () => ({
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

  /* -------------------------------------------------- 2. Rocket Customizer & Launch */
  function initRocketBuilder() {
    const bodyColorBtns = $$("[data-body-color]");
    const flameColorBtns = $$("[data-flame-color]");
    const decalBtns = $$("[data-decal]");
    const rocketSvg = $("#rocketBodySvg");
    const rocketFlames = $("#rocketFlames");
    const decalIcon = $("#rocketDecalIcon");
    const btnLaunch = $("#btnLaunchRocket");

    if (!btnLaunch) return;

    bodyColorBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        bodyColorBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        rocketConfig.hullColor = btn.dataset.bodyColor;
        if (rocketSvg) {
          rocketSvg.style.filter = `drop-shadow(0 0 16px ${rocketConfig.hullColor})`;
          const hull = $("#svgHull", rocketSvg);
          if (hull) hull.setAttribute("fill", rocketConfig.hullColor);
        }
      });
    });

    flameColorBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        flameColorBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        rocketConfig.flameColor = btn.dataset.flameColor;
        if (rocketFlames) {
          rocketFlames.style.background = `linear-gradient(180deg, ${rocketConfig.flameColor} 0%, #fb923c 60%, transparent 100%)`;
          rocketFlames.style.boxShadow = `0 0 24px ${rocketConfig.flameColor}`;
        }
      });
    });

    decalBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        decalBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        rocketConfig.decal = btn.dataset.decal;
        if (decalIcon) decalIcon.textContent = rocketConfig.decal;
      });
    });

    btnLaunch.addEventListener("click", () => {
      startLaunchSequence();
    });
  }

  /* -------------------------------------------------- 3. Launch Countdown & Warp */
  function startLaunchSequence() {
    const warpOverlay = $("#warpOverlay");
    const countdownEl = $("#warpCountdown");
    const textEl = $("#warpText");

    if (!warpOverlay) return;

    warpOverlay.classList.add("active");
    let count = 3;
    if (countdownEl) countdownEl.textContent = count;
    if (textEl) textEl.textContent = "IGNITION & COUNTDOWN... 🚀";
    playChimeFreq(440);

    const timer = setInterval(() => {
      count--;
      if (count > 0) {
        if (countdownEl) countdownEl.textContent = count;
        playChimeFreq(440 + (3 - count) * 110);
      } else {
        clearInterval(timer);
        if (countdownEl) countdownEl.textContent = "🚀 BLAST OFF!";
        if (textEl) textEl.textContent = "WARP DRIVE ENGAGED!";
        playWarpSound();

        setTimeout(() => {
          warpOverlay.classList.remove("active");
          startSpaceFlightSimulator();
        }, 1200);
      }
    }, 800);
  }

  /* -------------------------------------------------- 4. Interactive Space Flight Simulator */
  function startSpaceFlightSimulator() {
    const overlay = $("#spaceFlightMode");
    const canvas = $("#flightCanvas");
    const btnNitro = $("#btnNitroBoost");
    const btnExit = $("#btnExitFlight");
    const stardustDisplay = $("#flightStardust");
    const speedDisplay = $("#flightSpeed");

    if (!overlay || !canvas) return;
    overlay.classList.remove("hidden");

    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    let isNitro = false;
    let isFlying = true;
    let currentSpeed = 800;

    // Rocket Position
    let rx = w / 2;
    let ry = h - 180;
    let targetX = rx;
    let targetY = ry;

    // Controls
    function handlePointer(e) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      targetX = clientX;
      targetY = clientY;
    }
    window.addEventListener("mousemove", handlePointer);
    window.addEventListener("touchmove", handlePointer, { passive: true });

    // Nitro listeners
    if (btnNitro) {
      btnNitro.addEventListener("mousedown", () => { isNitro = true; });
      btnNitro.addEventListener("mouseup", () => { isNitro = false; });
      btnNitro.addEventListener("touchstart", () => { isNitro = true; });
      btnNitro.addEventListener("touchend", () => { isNitro = false; });
    }

    if (btnExit) {
      btnExit.addEventListener("click", () => {
        isFlying = false;
        overlay.classList.add("hidden");
        window.removeEventListener("mousemove", handlePointer);
        showCosmicToast("🌌 Nadia's Rocket safely landed back on Earth station! ♡");
      });
    }

    // Space Entities (Stars, Collectibles, Planets)
    const flightStars = Array.from({ length: 120 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      length: Math.random() * 8 + 2,
      speed: Math.random() * 6 + 4
    }));

    const collectibles = [];
    function spawnCollectible() {
      if (collectibles.length > 8) return;
      const types = [
        { icon: "💖", pts: 100 },
        { icon: "💎", pts: 50 },
        { icon: "🍬", pts: 30 },
        { icon: "✨", pts: 20 }
      ];
      const type = types[Math.floor(Math.random() * types.length)];
      collectibles.push({
        x: Math.random() * (w - 100) + 50,
        y: -40,
        icon: type.icon,
        pts: type.pts,
        speed: Math.random() * 3 + 3,
        size: 32
      });
    }
    const spawnTimer = setInterval(spawnCollectible, 1000);

    // Orbiting Planets in flight
    const flightPlanets = data.planets.map((p, idx) => ({
      ...p,
      x: (idx + 1) * (w / (data.planets.length + 1)),
      y: -200 - idx * 300,
      speed: 1.8
    }));

    // Game loop
    function loop() {
      if (!isFlying) {
        clearInterval(spawnTimer);
        return;
      }

      ctx.fillStyle = isNitro ? "#090514" : "#030712";
      ctx.fillRect(0, 0, w, h);

      const speedMultiplier = isNitro ? 2.5 : 1.0;
      currentSpeed = Math.round((isNitro ? 2400 : 800) + Math.random() * 20);
      if (speedDisplay) speedDisplay.textContent = `${currentSpeed} km/h`;

      // 1. Draw Star Trails
      ctx.strokeStyle = isNitro ? "rgba(236, 72, 153, 0.8)" : "rgba(255, 255, 255, 0.6)";
      ctx.lineWidth = isNitro ? 2.5 : 1.2;
      flightStars.forEach(s => {
        s.y += s.speed * speedMultiplier;
        if (s.y > h) {
          s.y = 0;
          s.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x, s.y + s.length * (isNitro ? 4 : 1));
        ctx.stroke();
      });

      // 2. Smooth Rocket Movement
      rx += (targetX - rx) * 0.12;
      ry += (targetY - ry) * 0.12;

      // 3. Render Collectibles & Collision
      collectibles.forEach((c, idx) => {
        c.y += c.speed * speedMultiplier;
        ctx.font = `${c.size}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(c.icon, c.x, c.y);

        // Distance check
        const dist = Math.hypot(rx - c.x, ry - c.y);
        if (dist < 45) {
          flightStardust += c.pts;
          if (stardustDisplay) stardustDisplay.textContent = flightStardust;
          playChimeFreq(700 + c.pts * 2);
          collectibles.splice(idx, 1);
        } else if (c.y > h + 50) {
          collectibles.splice(idx, 1);
        }
      });

      // 4. Render Planets
      flightPlanets.forEach(p => {
        p.y += p.speed * speedMultiplier;
        if (p.y > h + 300) p.y = -600;

        ctx.font = "56px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(p.icon, p.x, p.y);
        ctx.font = "bold 14px 'Quicksand', sans-serif";
        ctx.fillStyle = p.color;
        ctx.fillText(p.nameEn, p.x, p.y + 40);

        // Landing distance check
        const pDist = Math.hypot(rx - p.x, ry - p.y);
        if (pDist < 60) {
          p.y = -600; // Reset planet
          playPlanetChime();
          showPlanetLandingModal(p);
        }
      });

      // 5. Render Nadia's Custom Rocket
      drawRocket(ctx, rx, ry, isNitro);

      requestAnimationFrame(loop);
    }

    loop();
  }

  function drawRocket(ctx, x, y, isNitro) {
    ctx.save();
    ctx.translate(x, y);

    // Flames
    const flameHeight = isNitro ? 55 : 30;
    const grad = ctx.createLinearGradient(0, 30, 0, 30 + flameHeight);
    grad.addColorStop(0, rocketConfig.flameColor);
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(0, 30 + flameHeight / 2, 12, flameHeight / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body Hull
    ctx.fillStyle = rocketConfig.hullColor;
    ctx.beginPath();
    ctx.roundRect(-15, -25, 30, 50, 8);
    ctx.fill();

    // Nose Cone
    ctx.fillStyle = "#ec4899";
    ctx.beginPath();
    ctx.moveTo(0, -45);
    ctx.lineTo(-15, -25);
    ctx.lineTo(15, -25);
    ctx.closePath();
    ctx.fill();

    // Window
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(0, -10, 8, 0, Math.PI * 2);
    ctx.fill();

    // Decal Sticker
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(rocketConfig.decal, 0, 10);

    ctx.restore();
  }

  function showPlanetLandingModal(planet) {
    const modal = $("#planetModal");
    if (!modal) return;
    $("#modalIcon").textContent = planet.icon;
    $("#modalTitle").textContent = `🛬 TOUCHDOWN ON ${planet.nameEn.toUpperCase()}!`;
    $("#modalVibe").textContent = planet.vibe;
    $("#modalNote").textContent = `✨ MISSION UNLOCKED: ${planet.secretNote}`;
    modal.classList.add("open");
  }

  /* -------------------------------------------------- 5. Planetarium Grid */
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
        showPlanetLandingModal(planet);
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

  /* -------------------------------------------------- 6. Shooting Star Catcher */
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
        playChimeFreq(880);

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
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 1.2);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.3);
    } catch(e) {}
  }

  function playPlanetChime() {
    playChimeFreq(523.25);
    setTimeout(() => playChimeFreq(659.25), 120);
    setTimeout(() => playChimeFreq(783.99), 240);
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
        radioOscillator.frequency.setValueAtTime(220, ctx.currentTime);
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
