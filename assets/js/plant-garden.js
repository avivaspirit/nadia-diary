/* ==========================================================================
   NADIA'S PLANT GARDEN — real SVG botanical illustrations
   Each flower type renders as an actual plant: stem, leaves, flower head,
   with photos pinned to specific points on the plant.
   Separate from the vine garden (nadiaGardenFlowers).
   localStorage key: "nadiaPlantGarden"
   ========================================================================== */
(() => {
  "use strict";

  const { $, $$, el, escapeHtml, reducedMotion } = window.DiaryMagic;
  const STORAGE_KEY = "nadiaPlantGarden";

  /* ---- Flower types ---- */
  const TYPES = {
    rose:      { name: "Rose",      emoji: "🌹" },
    tulip:     { name: "Tulip",     emoji: "🌷" },
    sunflower: { name: "Sunflower", emoji: "🌻" },
    daisy:     { name: "Daisy",     emoji: "🌼" },
    sakura:    { name: "Sakura",    emoji: "🌸" },
    hibiscus:  { name: "Hibiscus",  emoji: "🌺" },
    lotus:     { name: "Lotus",     emoji: "🪷" },
    bouquet:   { name: "Bouquet",   emoji: "💐" },
    lavender:  { name: "Lavender",  emoji: "💜" },
    cactus:    { name: "Cactus",    emoji: "🌵" },
    orchid:    { name: "Orchid",    emoji: "orchid" },
    peony:     { name: "Peony",     emoji: "🌸" },
    dandelion: { name: "Dandelion", emoji: "🌾" },
    bamboo:    { name: "Bamboo",    emoji: "🎋" },
  };

  var VW = 200, VH = 320; /* SVG viewBox dimensions */

  /* ========================================================================
     SVG HELPERS
     ======================================================================== */

  function petals(cx, cy, count, len, w, color, opacity) {
    if (opacity === undefined) opacity = 1;
    var s = "";
    for (var i = 0; i < count; i++) {
      var angle = ((360 / count) * i).toFixed(1);
      var py = (cy - len * 0.6).toFixed(1);
      var ry = (len * 0.6).toFixed(1);
      s += '<ellipse cx="' + cx + '" cy="' + py + '" rx="' + w +
        '" ry="' + ry + '" fill="' + color + '" opacity="' + opacity +
        '" transform="rotate(' + angle + " " + cx + " " + cy + ')"/>';
    }
    return s;
  }

  function leaf(cx, cy, rx, ry, color, angle) {
    return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry +
      '" fill="' + color + '" transform="rotate(' + angle + " " + cx + " " + cy + ')"/>';
  }

  function stem(d, w, color) {
    return '<path d="' + d + '" fill="none" stroke="' + (color || "#5a8a4a") +
      '" stroke-width="' + (w || 3) + '" stroke-linecap="round"/>';
  }

  function ground(cx, cy, rx) {
    return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' +
      (rx * 0.12).toFixed(1) + '" fill="#d4a574" opacity="0.3"/>';
  }

  function circle(cx, cy, r, color, opacity) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + color +
      (opacity ? '" opacity="' + opacity : "") + '"/>';
  }

  function dot(cx, cy, r, color) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + color + '"/>';
  }

  /* ========================================================================
     SVG PLANT GENERATORS — one per flower type
     Each returns { svg: string, anchors: [{x,y}] }
     ======================================================================== */

  var GENERATORS = {

    /* ROSE — bush with layered petals */
    rose: function () {
      var svg =
        ground(100, 310, 50) +
        stem("M100 310 C100 250 100 180 100 100", 3.5, "#5a8a4a") +
        stem("M100 280 C85 250 75 200 78 150", 2.5, "#5a8a4a") +
        stem("M100 280 C115 250 125 200 122 150", 2.5, "#5a8a4a") +
        leaf(88, 220, 12, 6, "#7ab87a", -30) +
        leaf(112, 190, 12, 6, "#7ab87a", 30) +
        leaf(90, 160, 10, 5, "#8ac88a", -25) +
        leaf(72, 195, 10, 5, "#8ac88a", -45) +
        leaf(128, 195, 10, 5, "#8ac88a", 45) +
        '<g transform="translate(100,95)">' +
          petals(0, 0, 8, 22, 8, "#f3a0b8", 0.85) +
          petals(0, 0, 6, 16, 7, "#e58aa0") +
          circle(0, 0, 8, "#d4647a") +
          circle(0, 0, 4, "#c14a63") +
        "</g>" +
        '<g transform="translate(78,145)">' +
          petals(0, 0, 6, 14, 5, "#f3a0b8", 0.85) +
          circle(0, 0, 6, "#e58aa0") +
          circle(0, 0, 3, "#d4647a") +
        "</g>" +
        '<g transform="translate(122,145)">' +
          petals(0, 0, 6, 14, 5, "#f3a0b8", 0.85) +
          circle(0, 0, 6, "#e58aa0") +
          circle(0, 0, 3, "#d4647a") +
        "</g>";
      return { svg: svg, anchors: [{x:100,y:95},{x:78,y:145},{x:122,y:145},{x:88,y:220}] };
    },

    /* TULIP — tall stem with cup flower */
    tulip: function () {
      var svg =
        ground(100, 310, 40) +
        stem("M100 310 Q98 200 100 105", 3, "#5a9a5a") +
        '<ellipse cx="72" cy="225" rx="8" ry="38" fill="#7ab87a" transform="rotate(-22 72 225)" opacity="0.75"/>' +
        '<ellipse cx="128" cy="225" rx="8" ry="38" fill="#7ab87a" transform="rotate(22 128 225)" opacity="0.75"/>' +
        leaf(93, 200, 8, 4, "#8ac88a", -20) +
        leaf(108, 170, 7, 3.5, "#8ac88a", 25) +
        '<g transform="translate(100,88)">' +
          '<path d="M-20 5 Q-24 -22 -12 -32 Q-6 -15 -10 5 Z" fill="#e58aa0"/>' +
          '<path d="M20 5 Q24 -22 12 -32 Q6 -15 10 5 Z" fill="#e58aa0"/>' +
          '<path d="M-12 8 Q-16 -20 0 -30 Q16 -20 12 8 Q6 12 0 12 Q-6 12 -12 8 Z" fill="#f3a0b8"/>' +
          '<path d="M-5 0 Q-8 -15 0 -22 Q8 -15 5 0 Z" fill="#f6c8d6" opacity="0.6"/>' +
        "</g>";
      return { svg: svg, anchors: [{x:100,y:78},{x:72,y:225},{x:128,y:225}] };
    },

    /* SUNFLOWER — thick stem + large round flower */
    sunflower: function () {
      var svg =
        ground(100, 310, 45) +
        stem("M100 310 Q103 220 100 120", 6, "#4a8a3a") +
        '<ellipse cx="74" cy="200" rx="20" ry="11" fill="#5a9a4a" transform="rotate(-30 74 200)"/>' +
        '<ellipse cx="130" cy="235" rx="20" ry="11" fill="#5a9a4a" transform="rotate(35 130 235)"/>' +
        leaf(85, 165, 14, 8, "#6aaa5a", -20) +
        '<g transform="translate(100,90)">' +
          petals(0, 0, 16, 30, 7, "#f3ddb9") +
          petals(0, 0, 16, 24, 6, "#d9a866", 0.9) +
          circle(0, 0, 20, "#8B6914") +
          circle(0, 0, 17, "#a67c1a") +
          dot(0, 0, 2, "#6B4E0E") + dot(8, 3, 1.5, "#6B4E0E") +
          dot(-8, 3, 1.5, "#6B4E0E") + dot(5, -8, 1.5, "#6B4E0E") +
          dot(-5, -8, 1.5, "#6B4E0E") + dot(10, 10, 1.5, "#6B4E0E") +
          dot(-10, 10, 1.5, "#6B4E0E") + dot(12, -5, 1.5, "#6B4E0E") +
          dot(-12, -5, 1.5, "#6B4E0E") + dot(0, 12, 1.5, "#6B4E0E") +
        "</g>";
      return { svg: svg, anchors: [{x:100,y:90},{x:74,y:200},{x:130,y:235}] };
    },

    /* DAISY — thin stem + white petals */
    daisy: function () {
      var svg =
        ground(100, 310, 35) +
        stem("M100 310 Q97 200 100 100", 2, "#6a9a5a") +
        leaf(92, 220, 7, 3.5, "#8ac88a", -25) +
        leaf(108, 190, 7, 3.5, "#8ac88a", 25) +
        leaf(93, 160, 6, 3, "#8ac88a", -18) +
        '<g transform="translate(100,90)">' +
          petals(0, 0, 14, 24, 5, "#ffffff") +
          petals(0, 0, 14, 18, 4, "#fff8f0", 0.7) +
          circle(0, 0, 9, "#f3ddb9") +
          circle(0, 0, 7, "#d9a866") +
          dot(3, 2, 1, "#c4952e") + dot(-2, 3, 1, "#c4952e") + dot(-3, -2, 1, "#c4952e") +
        "</g>";
      return { svg: svg, anchors: [{x:100,y:90},{x:92,y:220},{x:108,y:190}] };
    },

    /* SAKURA — tree branch with blossoms */
    sakura: function () {
      var br = "#8B6F47";
      var blossom = function (bx, by, sz) {
        return '<g transform="translate(' + bx + "," + by + ")\">" +
          petals(0, 0, 5, sz, sz * 0.4, "#f6c8d6") +
          petals(0, 0, 5, sz * 0.7, sz * 0.3, "#fce0e8", 0.8) +
          circle(0, 0, sz * 0.3, "#e58aa0") +
          dot(2, -1, 1, "#d4647a") + dot(-2, 1, 1, "#d4647a") +
          "</g>";
      };
      var svg =
        stem("M100 310 C100 260 95 200 85 140 C80 110 85 80 90 55", 5, br) +
        stem("M95 195 C75 185 60 160 52 125", 3.5, br) +
        stem("M90 165 C110 155 128 142 142 112", 3.5, br) +
        stem("M88 100 C80 88 72 78 66 65", 2.5, br) +
        '<ellipse cx="80" cy="150" rx="8" ry="4" fill="#7a9a5a" transform="rotate(-15 80 150)" opacity="0.5"/>' +
        '<ellipse cx="120" cy="140" rx="8" ry="4" fill="#7a9a5a" transform="rotate(20 120 140)" opacity="0.5"/>' +
        blossom(90, 55, 14) +
        blossom(66, 65, 11) +
        blossom(52, 125, 12) +
        blossom(142, 112, 12) +
        blossom(100, 150, 9) +
        blossom(78, 180, 8);
      return { svg: svg, anchors: [{x:90,y:55},{x:52,y:125},{x:142,y:112},{x:66,y:65}] };
    },

    /* HIBISCUS — tropical shrub */
    hibiscus: function () {
      var svg =
        ground(100, 310, 50) +
        stem("M90 310 C85 250 80 180 85 130", 3, "#4a7a3a") +
        stem("M110 310 C115 260 120 200 115 150", 3, "#4a7a3a") +
        stem("M100 310 C100 250 100 190 100 140", 3.5, "#4a7a3a") +
        '<ellipse cx="70" cy="220" rx="22" ry="13" fill="#3a8a2a" transform="rotate(-25 70 220)"/>' +
        '<ellipse cx="132" cy="245" rx="22" ry="13" fill="#3a8a2a" transform="rotate(30 132 245)"/>' +
        '<ellipse cx="82" cy="180" rx="17" ry="10" fill="#4a9a3a" transform="rotate(-15 82 180)"/>' +
        '<ellipse cx="122" cy="195" rx="17" ry="10" fill="#4a9a3a" transform="rotate(20 122 195)"/>' +
        '<g transform="translate(100,110)">' +
          petals(0, 0, 5, 30, 17, "#e54a63", 0.85) +
          petals(0, 0, 5, 24, 15, "#e58aa0") +
          '<ellipse cx="0" cy="-6" rx="4" ry="16" fill="#f3ddb9"/>' +
          '<line x1="0" y1="8" x2="0" y2="-18" stroke="#d9a866" stroke-width="1.5"/>' +
          dot(0, -18, 3, "#d9a866") + dot(-3, -20, 1.5, "#d9a866") +
          dot(3, -22, 1.5, "#d9a866") + dot(0, -24, 1.5, "#d9a866") +
        "</g>";
      return { svg: svg, anchors: [{x:100,y:105},{x:70,y:220},{x:132,y:245}] };
    },

    /* LOTUS — on water */
    lotus: function () {
      var svg =
        '<ellipse cx="100" cy="305" rx="80" ry="10" fill="#a8d4e8" opacity="0.4"/>' +
        '<ellipse cx="100" cy="305" rx="65" ry="7" fill="#b8e4f0" opacity="0.3"/>' +
        '<path d="M40 308 Q60 303 80 308 Q100 313 120 308 Q140 303 160 308" stroke="#a8d4e8" stroke-width="1.5" fill="none" opacity="0.5"/>' +
        '<path d="M55 312 Q70 308 85 312" stroke="#90c4d8" stroke-width="1" fill="none" opacity="0.4"/>' +
        '<ellipse cx="58" cy="275" rx="36" ry="13" fill="#4a8a3a" opacity="0.85"/>' +
        '<ellipse cx="58" cy="272" rx="33" ry="11" fill="#5a9a4a" opacity="0.7"/>' +
        '<path d="M58 275 L90 272" stroke="#3a7a2a" stroke-width="1" opacity="0.4"/>' +
        '<ellipse cx="142" cy="282" rx="30" ry="11" fill="#4a8a3a" opacity="0.75"/>' +
        '<ellipse cx="142" cy="280" rx="27" ry="9" fill="#5a9a4a" opacity="0.6"/>' +
        stem("M100 300 Q100 250 100 190", 2.5, "#5a8a4a") +
        '<g transform="translate(100,170)">' +
          petals(0, 0, 8, 38, 12, "#f3dde6", 0.65) +
          petals(0, 0, 6, 30, 11, "#f6c8d6") +
          petals(0, 0, 5, 20, 8, "#f3a0b8") +
          circle(0, 0, 6, "#f3ddb9") +
          dot(0, -3, 2, "#d9a866") + dot(3, 2, 1.5, "#d9a866") +
          dot(-3, 2, 1.5, "#d9a866") + dot(0, 4, 1.5, "#d9a866") +
        "</g>";
      return { svg: svg, anchors: [{x:100,y:170},{x:58,y:275},{x:142,y:282}] };
    },

    /* BOUQUET — wrapped flowers */
    bouquet: function () {
      var svg =
        '<path d="M78 278 L100 312 L122 278 Z" fill="#e58aa0" opacity="0.8"/>' +
        '<path d="M82 278 L100 306 L118 278 Z" fill="#f3a0b8" opacity="0.5"/>' +
        '<ellipse cx="100" cy="278" rx="24" ry="6" fill="#d4647a"/>' +
        '<path d="M85 282 Q100 290 115 282" stroke="#d9a866" stroke-width="3" fill="none"/>' +
        '<ellipse cx="100" cy="285" rx="6" ry="4" fill="#d9a866"/>' +
        stem("M90 276 C88 230 82 180 78 132", 2, "#5a9a5a") +
        stem("M100 276 C100 220 100 160 100 108", 2, "#5a9a5a") +
        stem("M110 276 C112 240 118 190 122 142", 2, "#5a9a5a") +
        leaf(85, 200, 6, 3, "#7ab87a", -20) +
        leaf(115, 210, 6, 3, "#7ab87a", 20) +
        leaf(95, 170, 5, 2.5, "#8ac88a", -15) +
        leaf(105, 195, 5, 2.5, "#8ac88a", 18) +
        '<g transform="translate(78,128)">' +
          petals(0, 0, 6, 13, 5, "#f3a0b8", 0.85) +
          circle(0, 0, 5, "#e58aa0") + circle(0, 0, 2.5, "#d4647a") +
        "</g>" +
        '<g transform="translate(100,105)">' +
          petals(0, 0, 8, 17, 6, "#f3ddb9") +
          petals(0, 0, 6, 12, 5, "#d9a866", 0.9) +
          circle(0, 0, 5, "#c4952e") +
        "</g>" +
        '<g transform="translate(122,138)">' +
          petals(0, 0, 7, 15, 6, "#f6c8d6") +
          circle(0, 0, 5, "#e58aa0") + circle(0, 0, 2.5, "#d4647a") +
        "</g>";
      return { svg: svg, anchors: [{x:100,y:105},{x:78,y:128},{x:122,y:138},{x:100,y:285}] };
    },

    /* LAVENDER — tall stalks with purple flower spikes */
    lavender: function () {
      var svg =
        ground(100, 310, 40) +
        stem("M85 310 Q83 240 82 160 Q82 120 80 80", 2.5, "#6a8a5a") +
        stem("M100 310 Q100 220 100 130 Q100 90 98 55", 2.5, "#6a8a5a") +
        stem("M115 310 Q117 240 118 160 Q118 120 120 85", 2.5, "#6a8a5a") +
        leaf(75, 240, 8, 3, "#7a9a6a", -35) +
        leaf(125, 240, 8, 3, "#7a9a6a", 35) +
        leaf(92, 200, 7, 2.5, "#8aaa7a", -20) +
        /* Spike flowers — clusters of tiny purple dots */
        function () {
          var s = "";
          var spikes = [{x:80,y:80},{x:98,y:55},{x:120,y:85}];
          spikes.forEach(function (sp) {
            for (var i = 0; i < 8; i++) {
              var fy = sp.y - i * 7;
              var cnt = Math.max(2, 4 - Math.floor(i / 2));
              for (var j = 0; j < cnt; j++) {
                var fx = sp.x + (j - cnt / 2 + 0.5) * 7;
                s += circle(fx, fy, 2.5, i % 2 ? "#9b7ec8" : "#b395d9", 0.85);
              }
            }
          });
          return s;
        }() +
        /* Small leaves at base */
        leaf(85, 280, 10, 4, "#8aaa7a", -15) +
        leaf(115, 280, 10, 4, "#8aaa7a", 15);
      return { svg: svg, anchors: [{x:98,y:55},{x:80,y:80},{x:120,y:85},{x:85,y:240}] };
    },

    /* CACTUS — rounded body with spikes and a flower on top */
    cactus: function () {
      var svg =
        ground(100, 310, 45) +
        /* Main body */
        '<rect x="78" y="90" width="44" height="210" rx="22" fill="#5a9a4a"/>' +
        '<rect x="80" y="92" width="40" height="206" rx="20" fill="#6aaa5a" opacity="0.5"/>' +
        /* Left arm */
        '<path d="M78 200 Q55 200 50 180 L50 130 Q50 115 60 115 Q70 115 70 130 L70 200" fill="#5a9a4a"/>' +
        '<path d="M80 202 Q58 202 53 182 L53 132 Q53 118 62 118 Q70 118 70 132 L70 200" fill="#6aaa5a" opacity="0.4"/>' +
        /* Right arm */
        '<path d="M122 220 Q145 220 150 200 L150 160 Q150 145 140 145 Q130 145 130 160 L130 220" fill="#5a9a4a"/>' +
        '<path d="M120 222 Q143 222 148 202 L148 162 Q148 148 138 148 Q130 148 130 162 L130 220" fill="#6aaa5a" opacity="0.4"/>' +
        /* Spikes — small dots */
        function () {
          var s = "";
          var pts = [
            [88,120],[95,110],[102,130],[110,115],[118,125],
            [88,160],[95,150],[108,165],[115,155],
            [90,210],[100,230],[110,210],
            [62,135],[68,150],[58,165],
            [138,158],[142,172],[132,185]
          ];
          pts.forEach(function (p) {
            s += dot(p[0], p[1], 1, "#3a6a2a");
          });
          return s;
        }() +
        /* Flower on top */
        '<g transform="translate(100,80)">' +
          petals(0, 0, 8, 16, 7, "#ff6b8a", 0.9) +
          petals(0, 0, 6, 11, 5, "#ff8aa0") +
          circle(0, 0, 5, "#ffd966") +
          dot(0, 0, 2, "#e6b84d") +
        "</g>";
      return { svg: svg, anchors: [{x:100,y:80},{x:55,y:160},{x:150,y:175},{x:100,y:200}] };
    },

    /* ORCHID — elegant stem with exotic bloom */
    orchid: function () {
      var br = "#4a7a3a";
      var svg =
        ground(100, 310, 38) +
        stem("M100 310 Q98 220 102 140 Q100 100 98 70", 3, br) +
        /* Long slender leaves */
        '<ellipse cx="75" cy="240" rx="6" ry="30" fill="#5a8a4a" transform="rotate(-28 75 240)" opacity="0.8"/>' +
        '<ellipse cx="128" cy="240" rx="6" ry="30" fill="#5a8a4a" transform="rotate(28 128 240)" opacity="0.8"/>' +
        leaf(90, 190, 8, 3, "#6a9a5a", -15) +
        /* Side bud */
        '<g transform="translate(105,120)">' +
          '<ellipse cx="0" cy="0" rx="4" ry="7" fill="#c77dba" opacity="0.7"/>' +
        "</g>" +
        /* Main orchid flower */
        '<g transform="translate(98,60)">' +
          /* Lateral petals — large side wings */
          '<ellipse cx="-16" cy="2" rx="14" ry="8" fill="#d486c4" transform="rotate(-25 -16 2)"/>' +
          '<ellipse cx="16" cy="2" rx="14" ry="8" fill="#d486c4" transform="rotate(25 16 2)"/>' +
          /* Dorsal sepal — top */
          '<ellipse cx="0" cy="-14" rx="8" ry="12" fill="#c77dba"/>' +
          '<ellipse cx="-10" cy="-8" rx="6" ry="10" fill="#c77dba" transform="rotate(-20 -10 -8)"/>' +
          '<ellipse cx="10" cy="-8" rx="6" ry="10" fill="#c77dba" transform="rotate(20 10 -8)"/>' +
          /* Lip — bottom petal */
          '<path d="M-12 6 Q0 20 12 6 Q8 14 0 16 Q-8 14 -12 6 Z" fill="#a85a98"/>' +
          '<path d="M-6 8 Q0 14 6 8 Q4 12 0 12 Q-4 12 -6 8 Z" fill="#8a4282"/>' +
          /* Center column */
          circle(0, 0, 4, "#ffd966") +
          dot(0, -1, 2, "#e6b84d") +
        "</g>" +
        /* Second smaller bloom */
        '<g transform="translate(108,100)">' +
          '<ellipse cx="-8" cy="0" rx="7" ry="5" fill="#d486c4" transform="rotate(-20)"/>' +
          '<ellipse cx="8" cy="0" rx="7" ry="5" fill="#d486c4" transform="rotate(20)"/>' +
          '<ellipse cx="0" cy="-7" rx="5" ry="7" fill="#c77dba"/>' +
          '<path d="M-6 3 Q0 10 6 3 Q3 7 0 8 Q-3 7 -6 3 Z" fill="#a85a98"/>' +
          circle(0, 0, 2.5, "#ffd966") +
        "</g>";
      return { svg: svg, anchors: [{x:98,y:60},{x:108,y:100},{x:75,y:240},{x:128,y:240}] };
    },

    /* PEONY — large lush ruffled bloom */
    peony: function () {
      var svg =
        ground(100, 310, 42) +
        stem("M100 310 Q98 230 100 140", 4, "#5a8a4a") +
        /* Large leaves */
        '<ellipse cx="72" cy="220" rx="14" ry="24" fill="#6a9a5a" transform="rotate(-30 72 220)"/>' +
        '<ellipse cx="128" cy="220" rx="14" ry="24" fill="#6a9a5a" transform="rotate(30 128 220)"/>' +
        leaf(88, 180, 12, 5, "#7ab87a", -20) +
        leaf(112, 165, 12, 5, "#7ab87a", 20) +
        /* Huge ruffled bloom — many layers of petals */
        '<g transform="translate(100,110)">' +
          /* Outer layer — large soft petals */
          petals(0, 0, 10, 32, 13, "#f8c8d8", 0.7) +
          petals(0, 0, 9, 28, 12, "#f4b0c8", 0.8) +
          /* Middle layer */
          petals(0, 0, 8, 23, 11, "#f098b8", 0.85) +
          petals(0, 0, 7, 19, 10, "#ec80a8", 0.9) +
          /* Inner layer */
          petals(0, 0, 6, 14, 8, "#e86a98") +
          petals(0, 0, 5, 10, 6, "#e0508a") +
          /* Center */
          circle(0, 0, 5, "#ffd966") +
          dot(0, 0, 2, "#e6b84d") +
          dot(3, 2, 1.5, "#e6b84d") +
          dot(-3, 2, 1.5, "#e6b84d") +
          dot(2, -3, 1.5, "#e6b84d") +
          dot(-2, -3, 1.5, "#e6b84d") +
        "</g>" +
        /* Side bud — half-open */
        '<g transform="translate(70,160)">' +
          petals(0, 0, 5, 14, 7, "#f4b0c8", 0.8) +
          circle(0, 0, 6, "#ec80a8") +
        "</g>";
      return { svg: svg, anchors: [{x:100,y:110},{x:70,y:160},{x:72,y:220},{x:128,y:220}] };
    },

    /* DANDELION — fluffy white seed head */
    dandelion: function () {
      var fluff = function (cx, cy, r) {
        var s = "";
        var n = 18;
        for (var i = 0; i < n; i++) {
          var a = (360 / n * i) * Math.PI / 180;
          var x1 = cx + Math.cos(a) * r;
          var y1 = cy + Math.sin(a) * r;
          var x2 = cx + Math.cos(a) * (r - 4);
          var y2 = cy + Math.sin(a) * (r - 4);
          s += '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) +
            '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) +
            '" stroke="#ffffff" stroke-width="0.8" opacity="0.7"/>';
          s += dot(x1, y1, 1.2, "#ffffff", 0.9);
        }
        return s;
      };
      var svg =
        ground(100, 310, 35) +
        stem("M100 310 Q97 200 100 90", 2.5, "#5a8a4a") +
        /* Narrow jagged leaves at base */
        '<path d="M100 285 L82 270 L88 260 L75 250 L85 245 L80 235" stroke="#7ab87a" stroke-width="2" fill="none" opacity="0.7"/>' +
        '<path d="M100 285 L118 270 L112 260 L125 250 L115 245 L120 235" stroke="#7ab87a" stroke-width="2" fill="none" opacity="0.7"/>' +
        leaf(85, 200, 5, 3, "#8ac88a", -30) +
        leaf(112, 180, 5, 3, "#8ac88a", 25) +
        /* Main fluffy seed head */
        circle(100, 90, 22, "#ffffff", 0.15) +
        circle(100, 90, 18, "#ffffff", 0.2) +
        fluff(100, 90, 24) +
        /* Inner detail */
        circle(100, 90, 6, "#d4c890", 0.5) +
        dot(100, 90, 3, "#c4b880") +
        /* A few floating seeds */
        '<g opacity="0.6">' +
          dot(135, 70, 1.5, "#ffffff") +
          '<line x1="135" y1="70" x2="140" y2="65" stroke="#ffffff" stroke-width="0.5" opacity="0.5"/>' +
          dot(65, 100, 1.5, "#ffffff") +
          '<line x1="65" y1="100" x2="60" y2="95" stroke="#ffffff" stroke-width="0.5" opacity="0.5"/>' +
          dot(145, 110, 1, "#ffffff") +
          '<line x1="145" y1="110" x2="150" y2="107" stroke="#ffffff" stroke-width="0.4" opacity="0.4"/>' +
          dot(55, 130, 1, "#ffffff") +
          '<line x1="55" y1="130" x2="50" y2="128" stroke="#ffffff" stroke-width="0.4" opacity="0.4"/>' +
        "</g>";
      return { svg: svg, anchors: [{x:100,y:90},{x:55,y:130},{x:145,y:110},{x:85,y:200}] };
    },

    /* BAMBOO — tall stalks with leaves */
    bamboo: function () {
      var svg =
        ground(100, 310, 45) +
        /* Main stalk */
        '<rect x="93" y="40" width="14" height="270" rx="3" fill="#6a9a5a"/>' +
        '<rect x="95" y="40" width="10" height="270" rx="2" fill="#7ab87a" opacity="0.4"/>' +
        /* Node lines */
        '<line x1="93" y1="100" x2="107" y2="100" stroke="#4a7a3a" stroke-width="2.5"/>' +
        '<line x1="93" y1="160" x2="107" y2="160" stroke="#4a7a3a" stroke-width="2.5"/>' +
        '<line x1="93" y1="220" x2="107" y2="220" stroke="#4a7a3a" stroke-width="2.5"/>' +
        '<line x1="93" y1="275" x2="107" y2="275" stroke="#4a7a3a" stroke-width="2.5"/>' +
        /* Side stalk — shorter */
        '<rect x="120" y="120" width="11" height="190" rx="3" fill="#5a8a4a"/>' +
        '<line x1="120" y1="170" x2="131" y2="170" stroke="#3a6a2a" stroke-width="2"/>' +
        '<line x1="120" y1="230" x2="131" y2="230" stroke="#3a6a2a" stroke-width="2"/>' +
        /* Leaves — blade-like */
        function () {
          var s = "";
          var blades = [
            [70, 70, -35], [130, 55, 30], [75, 105, -20], [135, 95, 25],
            [68, 140, -40], [140, 145, 35], [72, 185, -25], [138, 195, 28],
            [70, 240, -30], [130, 255, 25]
          ];
          blades.forEach(function (b) {
            s += '<ellipse cx="' + b[0] + '" cy="' + b[1] +
              '" rx="14" ry="4" fill="#7ab87a" transform="rotate(' +
              b[2] + " " + b[0] + " " + b[1] + ')"/>';
            s += '<ellipse cx="' + (b[0]+1) + '" cy="' + b[1] +
              '" rx="12" ry="3" fill="#8ac88a" opacity="0.4" transform="rotate(' +
              b[2] + " " + (b[0]+1) + " " + b[1] + ')"/>';
          });
          return s;
        }() +
        /* Small shoot at base */
        '<rect x="78" y="260" width="6" height="50" rx="2" fill="#7ab87a"/>' +
        '<ellipse cx="81" cy="258" rx="8" ry="3" fill="#8ac88a" transform="rotate(-15 81 258)"/>';
      return { svg: svg, anchors: [{x:100,y:40},{x:130,y:55},{x:70,y:105},{x:68,y:140}] };
    },
  };

  /* ========================================================================
     RENDER — build SVG + photo overlays for a plant
     ======================================================================== */

  /* Max photos per plant */
  var MAX_PHOTOS = 5;

  function generatePlant(type, photos) {
    var gen = GENERATORS[type] || GENERATORS.rose;
    var result = gen();
    var anchors = result.anchors;
    var photoPins = [];

    /* Cap at MAX_PHOTOS */
    var photoList = (photos || []).slice(0, MAX_PHOTOS);

    if (photoList.length > 0) {
      /* When we have more photos than anchors, distribute around the plant
         using fixed offset positions that avoid overlap */
      var offsetSlots = [
        { dx: 0,   dy: 0   },   /* slot 0: exact anchor */
        { dx: 30,  dy: 20  },   /* slot 1: right-down */
        { dx: -30, dy: 20  },   /* slot 2: left-down */
        { dx: 35,  dy: -15 },   /* slot 3: right-up */
        { dx: -35, dy: -15 },   /* slot 4: left-up */
      ];

      photoList.forEach(function (src, i) {
        var anchor = anchors[i % anchors.length];
        var slot = offsetSlots[Math.floor(i / anchors.length) % offsetSlots.length];

        var px = anchor.x + slot.dx;
        var py = anchor.y + slot.dy;

        /* Clamp within viewBox */
        px = Math.max(15, Math.min(VW - 15, px));
        py = Math.max(15, Math.min(VH - 15, py));

        var leftPct = ((px / VW) * 100).toFixed(1);
        var topPct = ((py / VH) * 100).toFixed(1);

        photoPins.push({
          src: src,
          leftPct: leftPct,
          topPct: topPct,
          offsetX: 0,
          offsetY: 0,
        });
      });
    }

    return {
      svgInner: '<svg viewBox="0 0 ' + VW + ' ' + VH + '" class="pg-plant-svg" xmlns="http://www.w3.org/2000/svg">' + result.svg + '</svg>',
      photoPins: photoPins,
    };
  }

  function buildPlantSVG(type) {
    var gen = GENERATORS[type] || GENERATORS.rose;
    var result = gen();
    return '<svg viewBox="0 0 ' + VW + " " + VH + '" class="pg-plant-svg" xmlns="http://www.w3.org/2000/svg">' +
      result.svg + "</svg>";
  }

  function buildPreviewSVG(type) {
    var gen = GENERATORS[type] || GENERATORS.rose;
    var result = gen();
    return '<svg viewBox="0 0 ' + VW + " " + VH + '" class="pg-preview-svg" xmlns="http://www.w3.org/2000/svg">' +
      result.svg + "</svg>";
  }

  /* ========================================================================
     STATE — load / save
     ======================================================================== */

  function loadPlants() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
    catch (e) { return []; }
  }
  function savePlants(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  /* ========================================================================
     EDITOR STATE
     ======================================================================== */

  var editorState = {
    mode: "new",       /* "new" | "edit" */
    editId: null,
    selectedType: "rose",
    photos: [],        /* array of src strings */
  };

  /* Elements */
  var pgGarden = $("#pgGarden");
  var pgEmpty = $("#pgEmpty");
  var pgClearBtn = $("#pgClearBtn");
  var pgPlantBtn = $("#pgPlantBtn");
  var pgAutoBtn = $("#pgAutoBtn");
  var pgEditorPanel = $("#pgEditorPanel");
  var pgCloseEditor = $("#pgCloseEditor");
  var pgTypePicker = $("#pgTypePicker");
  var pgSvgPreview = $("#pgSvgPreview");
  var pgUploadBtn = $("#pgUploadBtn");
  var pgGalleryBtn = $("#pgGalleryBtn");
  var pgGalleryGrid = $("#pgGalleryGrid");
  var pgPhotoList = $("#pgPhotoList");
  var pgCaption = $("#pgCaption");
  var pgFileInput = $("#pgFileInput");
  var pgPlantFinalBtn = $("#pgPlantFinalBtn");
  var pgGalleryMode = false;

  /* ========================================================================
     RENDER GARDEN
     ======================================================================== */

  function renderGarden() {
    var plants = loadPlants();

    /* Clear existing plant cards (keep empty state element) */
    var existingCards = $$(".pg-plant-card", pgGarden);
    existingCards.forEach(function (c) { c.remove(); });

    if (plants.length === 0) {
      pgEmpty.style.display = "flex";
      pgClearBtn.style.display = "none";
      return;
    }

    pgEmpty.style.display = "none";
    pgClearBtn.style.display = "";

    plants.forEach(function (plant, idx) {
      pgGarden.appendChild(buildPlantCard(plant, idx));
    });
  }

  function buildPlantCard(plant, idx) {
    var info = TYPES[plant.type] || TYPES.rose;
    var rendered = generatePlant(plant.type, plant.photos);

    /* Card wrapper */
    var card = el("div", "pg-plant-card reveal is-visible");
    card.dataset.id = plant.id;
    card.style.setProperty("--reveal-delay", (Math.min(idx * 0.06, 0.4)) + "s");

    /* SVG + photo container */
    var svgWrap = el("div", "pg-plant-visual");
    svgWrap.innerHTML = rendered.svgInner;

    /* Add photo pins */
    rendered.photoPins.forEach(function (pin) {
      var pinDiv = el("div", "pg-photo-pin");
      pinDiv.style.left = "calc(" + pin.leftPct + "% + " + pin.offsetX + "px)";
      pinDiv.style.top = "calc(" + pin.topPct + "% + " + pin.offsetY + "px)";
      var img = el("img");
      img.src = pin.src;
      img.alt = plant.caption || "Nadia";
      img.loading = "lazy";
      pinDiv.appendChild(img);
      svgWrap.appendChild(pinDiv);
    });

    card.appendChild(svgWrap);

    /* Info section */
    var infoDiv = el("div", "pg-plant-info");

    var typeBadge = el("div", "pg-plant-type-badge");
    typeBadge.innerHTML = '<span class="pg-type-emoji">' + info.emoji + "</span> " +
      '<span class="pg-type-name">' + escapeHtml(info.name) + "</span>";
    infoDiv.appendChild(typeBadge);

    if (plant.caption) {
      infoDiv.appendChild(el("p", "pg-plant-caption", escapeHtml(plant.caption)));
    }

    if (plant.createdAt) {
      var dateStr = new Date(plant.createdAt).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric"
      });
      infoDiv.appendChild(el("p", "pg-plant-date", "Planted " + dateStr));
    }

    if (plant.photos && plant.photos.length > 0) {
      infoDiv.appendChild(el("p", "pg-plant-photo-count",
        plant.photos.length + " photo" + (plant.photos.length > 1 ? "s" : "") + " 📸"));
    }

    /* Action buttons */
    var actions = el("div", "pg-plant-actions");

    var editBtn = el("button", "pg-action-btn pg-edit-btn", "✏️ Edit");
    editBtn.type = "button";
    editBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      openEditor("edit", plant.id);
    });
    actions.appendChild(editBtn);

    var delBtn = el("button", "pg-action-btn pg-delete-btn", "🗑️ Remove");
    delBtn.type = "button";
    delBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      removePlant(plant.id);
    });
    actions.appendChild(delBtn);

    infoDiv.appendChild(actions);
    card.appendChild(infoDiv);

    return card;
  }

  /* ========================================================================
     EDITOR PANEL
     ======================================================================== */

  function buildTypePicker() {
    pgTypePicker.innerHTML = "";
    Object.keys(TYPES).forEach(function (key) {
      var t = TYPES[key];
      var btn = el("button", "pg-type-choice");
      btn.type = "button";
      btn.dataset.type = key;
      btn.innerHTML =
        '<span class="pg-type-choice-emoji">' + t.emoji + "</span>" +
        '<span class="pg-type-choice-name">' + escapeHtml(t.name) + "</span>";
      if (key === editorState.selectedType) btn.classList.add("selected");
      btn.addEventListener("click", function () {
        editorState.selectedType = key;
        $$(".pg-type-choice", pgTypePicker).forEach(function (b) {
          b.classList.toggle("selected", b.dataset.type === key);
        });
        updatePreview();
      });
      pgTypePicker.appendChild(btn);
    });
  }

  function updatePreview() {
    pgSvgPreview.innerHTML = buildPreviewSVG(editorState.selectedType);
  }

  function openEditor(mode, editId) {
    editorState.mode = mode || "new";
    editorState.editId = editId || null;

    if (mode === "edit" && editId) {
      var plants = loadPlants();
      var plant = plants.find(function (p) { return p.id === editId; });
      if (!plant) return;
      editorState.selectedType = plant.type;
      editorState.photos = (plant.photos || []).slice();
      pgCaption.value = plant.caption || "";
      $(".pg-editor-title", pgEditorPanel).textContent = "✏️ Edit Flower";
      pgPlantFinalBtn.textContent = "💾 Save Changes";
    } else {
      editorState.selectedType = "rose";
      editorState.photos = [];
      pgCaption.value = "";
      $(".pg-editor-title", pgEditorPanel).textContent = "🌱 Plant a Flower";
      pgPlantFinalBtn.textContent = "🌷 Plant it!";
    }

    buildTypePicker();
    updatePreview();
    renderPhotoList();
    pgGalleryGrid.style.display = "none";
    pgGalleryMode = false;

    pgEditorPanel.classList.add("open");
  }

  function closeEditor() {
    pgEditorPanel.classList.remove("open");
  }

  /* ---- Photo list in editor ---- */
  function renderPhotoList() {
    pgPhotoList.innerHTML = "";
    if (editorState.photos.length === 0) {
      pgPhotoList.style.display = "none";
      return;
    }
    pgPhotoList.style.display = "flex";
    editorState.photos.forEach(function (src, i) {
      var item = el("div", "pg-photo-item");
      var img = el("img");
      img.src = src;
      img.alt = "Selected photo " + (i + 1);
      item.appendChild(img);
      var rmBtn = el("button", "pg-photo-remove", "✕");
      rmBtn.type = "button";
      rmBtn.addEventListener("click", function () {
        editorState.photos.splice(i, 1);
        renderPhotoList();
      });
      item.appendChild(rmBtn);
      pgPhotoList.appendChild(item);
    });
  }

  /* ---- Upload handler ---- */
  function handleFileUpload(files) {
    if (!files || files.length === 0) return;
    var remaining = files;
    var processed = 0;

    function readNext() {
      if (processed >= remaining.length) {
        renderPhotoList();
        return;
      }
      /* Stop at MAX_PHOTOS */
      if (editorState.photos.length >= MAX_PHOTOS) {
        renderPhotoList();
        return;
      }
      var file = remaining[processed];
      processed++;
      if (!file.type.startsWith("image/")) { readNext(); return; }
      var reader = new FileReader();
      reader.onload = function (ev) {
        if (editorState.photos.length < MAX_PHOTOS) {
          editorState.photos.push(ev.target.result);
        }
        readNext();
      };
      reader.readAsDataURL(file);
    }
    readNext();
  }

  /* ---- Gallery picker ---- */
  function toggleGallery() {
    pgGalleryMode = !pgGalleryMode;
    if (!pgGalleryMode) {
      pgGalleryGrid.style.display = "none";
      return;
    }
    var photos = (window.NADIA_DATA && window.NADIA_DATA.gallery &&
      window.NADIA_DATA.gallery.photos) || [];
    if (photos.length === 0) {
      pgGalleryGrid.style.display = "none";
      pgGalleryMode = false;
      return;
    }
    pgGalleryGrid.innerHTML = "";
    photos.forEach(function (p) {
      var item = el("div", "pg-gallery-item");
      var img = el("img");
      img.src = p.src;
      img.alt = p.alt || "";
      img.loading = "lazy";
      item.appendChild(img);
      /* Checkmark if already selected */
      if (editorState.photos.indexOf(p.src) !== -1) {
        item.classList.add("selected");
      }
      item.addEventListener("click", function () {
        var idx = editorState.photos.indexOf(p.src);
        if (idx !== -1) {
          editorState.photos.splice(idx, 1);
          item.classList.remove("selected");
        } else if (editorState.photos.length < MAX_PHOTOS) {
          editorState.photos.push(p.src);
          item.classList.add("selected");
        }
        renderPhotoList();
      });
      pgGalleryGrid.appendChild(item);
    });
    pgGalleryGrid.style.display = "grid";
  }

  /* ========================================================================
     PLANT / EDIT / DELETE
     ======================================================================== */

  function plantFlower() {
    var caption = pgCaption.value.trim();

    if (editorState.mode === "edit" && editorState.editId) {
      var plants = loadPlants();
      var idx = plants.findIndex(function (p) { return p.id === editorState.editId; });
      if (idx !== -1) {
        plants[idx].type = editorState.selectedType;
        plants[idx].caption = caption;
        plants[idx].photos = editorState.photos.slice();
        savePlants(plants);
      }
    } else {
      /* New plant */
      if (editorState.photos.length === 0 && !caption) return;
      var list = loadPlants();
      list.push({
        id: Date.now().toString(),
        type: editorState.selectedType,
        caption: caption,
        photos: editorState.photos.slice(),
        createdAt: Date.now()
      });
      savePlants(list);
    }

    closeEditor();
    renderGarden();

    if (!reducedMotion && window.DiaryMagic && window.DiaryMagic.burstConfetti) {
      window.DiaryMagic.burstConfetti();
    }

    /* Scroll to the new/edited plant */
    setTimeout(function () {
      var card = $(".pg-plant-card[data-id=\"" +
        (editorState.editId || (Date.now().toString())) + "\"]");
      if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  }

  function removePlant(id) {
    var plants = loadPlants();
    plants = plants.filter(function (p) { return p.id !== id; });
    savePlants(plants);
    renderGarden();
  }

  function clearAll() {
    if (confirm("Clear the entire plant garden? This will remove all plants.")) {
      savePlants([]);
      renderGarden();
    }
  }

  /* ========================================================================
     AUTO-PLANT — randomly generates full-grown plants with gallery photos
     ======================================================================== */

  function autoPlant() {
    var photos = (window.NADIA_DATA && window.NADIA_DATA.gallery &&
      window.NADIA_DATA.gallery.photos) || [];

    var typeKeys = Object.keys(TYPES);
    var numPlants = 3 + Math.floor(Math.random() * 3); /* 3-5 plants */
    var plants = loadPlants();
    var photoIdx = Math.floor(Math.random() * Math.max(photos.length, 1));

    var captions = [
      "our little moment ♡", "always smiling 🌸", "candid and sweet",
      "us being us", "that smile though 🌷", "golden hour ✨",
      "a sweet capture", "together 💑", "soft and lovely",
      "our favorite memory", "beautiful as always", "forever moment ♡"
    ];

    for (var i = 0; i < numPlants; i++) {
      var type = typeKeys[Math.floor(Math.random() * typeKeys.length)];
      var photoCount = 1 + Math.floor(Math.random() * 3); /* 1-3 photos per plant */
      var plantPhotos = [];

      for (var j = 0; j < photoCount && photos.length > 0; j++) {
        var offset = Math.floor(Math.random() * photos.length);
        var p = photos[(photoIdx + offset + j) % photos.length];
        if (p && p.src && plantPhotos.indexOf(p.src) === -1) {
          plantPhotos.push(p.src);
        }
      }

      var cap = captions[Math.floor(Math.random() * captions.length)];

      plants.push({
        id: Date.now().toString() + "-" + i + "-" + Math.floor(Math.random() * 9999),
        type: type,
        caption: cap,
        photos: plantPhotos,
        createdAt: Date.now() + i
      });
    }

    savePlants(plants);
    renderGarden();

    if (!reducedMotion && window.DiaryMagic && window.DiaryMagic.burstConfetti) {
      window.DiaryMagic.burstConfetti();
    }

    /* Scroll to first new plant */
    setTimeout(function () {
      var cards = document.querySelectorAll(".pg-plant-card");
      if (cards.length > 0) {
        cards[cards.length - numPlants].scrollIntoView({
          behavior: "smooth", block: "center"
        });
      }
    }, 200);
  }

  /* ========================================================================
     EVENT WIRING
     ======================================================================== */

  pgPlantBtn.addEventListener("click", function () { openEditor("new"); });
  pgAutoBtn.addEventListener("click", autoPlant);
  pgCloseEditor.addEventListener("click", closeEditor);
  pgEditorPanel.addEventListener("click", function (e) {
    if (e.target === pgEditorPanel) closeEditor();
  });
  pgUploadBtn.addEventListener("click", function () { pgFileInput.click(); });
  pgGalleryBtn.addEventListener("click", toggleGallery);
  pgPlantFinalBtn.addEventListener("click", plantFlower);
  pgClearBtn.addEventListener("click", clearAll);

  pgFileInput.addEventListener("change", function (e) {
    handleFileUpload(e.target.files);
    pgFileInput.value = "";
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && pgEditorPanel.classList.contains("open")) {
      closeEditor();
    }
  });

  /* ========================================================================
     INIT
     ======================================================================== */

  buildTypePicker();
  updatePreview();
  renderGarden();

  /* Re-run reveals for dynamically added elements */
  if (window.DiaryMagic && window.DiaryMagic.initReveals) {
    setTimeout(function () { window.DiaryMagic.initReveals(); }, 100);
  }
})();
