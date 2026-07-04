/* ==========================================================================
   NADIA'S DIARY — ALL EDITABLE CONTENT LIVES IN THIS ONE FILE
   --------------------------------------------------------------------------
   Edit any text or photo path below, save, and re-upload this file.
   Photo rule: put photos in  assets/uploads/  and reference them as
   "./assets/uploads/photo-name.jpg"  (relative paths only — never C:\...).
   ========================================================================== */

window.NADIA_DATA = {

  /* ------------------------------ SITE-WIDE ----------------------------- */
  site: {
    title: "Nadia's Diary 🎀",
    footerLine: "Made for little collections, many birthdays ahead, and one very loved girl.",
    // Day 1 of the relationship — used by the live days counter
    firstDay: "2026-05-21"
  },

  /* ----------------------------- HOME / DIANEYY ------------------------- */
  home: {
    eyebrow: "Nadia's Little World ✨",
    headline: "A cozy diary for her smile, her stories, and her tiny treasures. ♡",
    description: "A private place for the things she loves, the memories we share, and the birthday surprise made just for her.",
    ctaPrimary: { label: "Open Nadia's Dolls 🧸", href: "./collection.html" },
    ctaGhost:   { label: "Happy Birthday 🎂",     href: "./birthday.html" },
    heroPhoto: {
      src: "./assets/uploads/nadia-mac-pov-collage.jpg",
      alt: "His and her point of view photo collage",
      caption: "same moment, two little views"
    },

    bio: {
      eyebrow: "Mini bio",
      title: "The girl this diary belongs to",
      text: "Her world is full of soft details, pretty little treasures, and warm conversations. She has the softest heart and cares deeply about the people around her. She makes everything feel more fun, even the simplest moments. This diary is for the joy she creates, the memories that stay, and the way she makes ordinary days feel brighter. ♡",
      photo: { src: "./assets/uploads/img_2434.jpg", alt: "Nadia's prettiest smile", caption: "the prettiest smile ♡" }
    },

    notes: {
      eyebrow: "Little Nadia notes ✏️",
      title: "Tiny things that make her, her.",
      /* Each note becomes a handwritten sticky note. Add or remove freely. */
      items: [
        "She brings laughter and good energy everywhere she goes.",
        "She has the prettiest face, and an even more beautiful soul.",
        "She never misses a barre or yoga session.",
        "She looks beautiful on Instagram, but real-life Nadia is even better: funny, warm, and full of joy.",
        "She is brilliant, talented, and quietly hardworking.",
        "She has the kindest heart, even in the smallest moments.",
        "She makes everyday conversations feel warm and easy.",
        "She laughs at every joke, funny or not.",
        "She has a soft little world full of cute treasures.",
        "She deserves every success waiting for her career and brand.",
        "She makes every little spot feel like its own adventure.",
        "She makes love feel like home, adventure, and forever."
      ],
      featurePhoto: {
        src: "./assets/uploads/img_photobooth.jpg",
        alt: "Photo booth strip",
        caption: "booth strip memories 🎞️"
      }
    },

    moments: {
      eyebrow: "Little moments ♡",
      title: "Small memories with their own sparkle.",
      /* Polaroids on the scrapbook wall. Tap any photo to open the gallery. */
      items: [
        { src: "./assets/uploads/img_first_flowers.jpg",     alt: "Nadia with the first flowers",  caption: "the first flowers I gave her 🌹" },
        { src: "./assets/uploads/img_6539.jpg",     alt: "Close-up couple portrait",    caption: "where it all began ♡" },
        { src: "./assets/uploads/img_2333.jpg",     alt: "Sweet couple moment",         caption: "my favorite face" }
      ]
    },

    sections: [
      {
        num: "01", emoji: "🐰", title: "Dianeyy",
        text: "A little love note for Nadia herself: the girl who makes ordinary days feel lighter, sweeter, and worth remembering.",
        href: "./index.html"
      },
      {
        num: "02", emoji: "🧸", title: "Nadia's Dolls",
        text: "A tiny cabinet for her plushies, charms, dolls, and every cute little treasure she loves.",
        href: "./collection.html"
      },
      {
        num: "03", emoji: "🎂", title: "Happy Birthday",
        text: "A private birthday wish filled with memories and letters made just for her.",
        href: "./birthday.html"
      },
      {
        num: "04", emoji: "💑", title: "Our Story",
        text: "A little timeline of the moments that brought us here, one chapter at a time.",
        href: "./story.html"
      },
      {
        num: "05", emoji: "📸", title: "Photo Gallery",
        text: "Every little moment, captured together in one cozy scrapbook wall.",
        href: "./gallery.html"
      },
      {
        num: "06", emoji: "🌿", title: "Garden",
        text: "Plant a flower, pin a memory, and watch every moment bloom into a living garden.",
        href: "./garden.html"
      },
      {
        num: "07", emoji: "🎮", title: "Play & Movies",
        text: "Mini games and movie picks for cozy nights in — balloon popping, memory matching, and more.",
        href: "./games.html"
      }
    ]
  },

  /* ------------------------------- LOVE JAR ----------------------------- */
  loveJar: {
    eyebrow: "A jar of reasons 💗",
    title: "Tap the jar for a little reason.",
    hint: "tap the jar to pull out a note ♡",
    /* Each tap pulls out one at random. Duplicate the 12 notes above + extras */
    reasons: [
      "She brings laughter and good energy everywhere she goes.",
      "She has the prettiest face, and an even more beautiful soul.",
      "She never misses a barre or yoga session.",
      "She looks beautiful on Instagram, but real-life Nadia is even better.",
      "She is brilliant, talented, and quietly hardworking.",
      "She has the kindest heart, even in the smallest moments.",
      "She makes everyday conversations feel warm and easy.",
      "She laughs at every joke, funny or not.",
      "She has a soft little world full of cute treasures.",
      "She deserves every success waiting for her career and brand.",
      "She makes every little spot feel like its own adventure.",
      "She makes love feel like home, adventure, and forever.",
      "She makes me smile without even trying.",
      "Her laugh is the best sound in the world.",
      "She remembers the little things that others forget.",
      "She makes ordinary dinners feel like dates in Paris.",
      "She is the first person I want to share everything with.",
      "She makes me want to be better every single day.",
      "She has the cutest way of getting excited over little things.",
      "She is my favorite hello and my hardest goodbye.",
      "She turns the most boring day into something worth remembering.",
      "She makes me feel like the luckiest person alive.",
      "She is the plot twist I never knew I needed.",
      "She has a heart that could make the whole world softer.",
      "She is exactly who I want beside me for every adventure.",
      "She makes home feel like a person, not a place.",
      "She is the reason I look forward to coming home.",
      "She makes even grocery runs feel like a date."
    ]
  },

  /* ------------------------------ OUR STORY ---------------------------- */
  story: {
    eyebrow: "Our Story 💑",
    title: "Every little chapter that led us here.",
    intro: "A growing timeline of the moments that made us, us. From day one to forever.",
    milestones: [
      {
        date: "May 21, 2026",
        emoji: "💕",
        title: "Day One",
        text: "The day everything started. The first hello, the first smile, the moment our story began.",
        photo: "./assets/uploads/img_6507.jpg"
      },
      {
        date: "May 21, 2026",
        emoji: "🌃",
        title: "First Rooftop Date",
        text: "City lights, warm hearts, and the kind of view that makes you fall even harder.",
        photo: "./assets/uploads/img_6557.jpg"
      },
      {
        date: "May 21, 2026",
        emoji: "🌹",
        title: "Flowers in the Night",
        text: "The evening that turned into magic. Flowers, city backdrop, and just us.",
        photo: "./assets/uploads/nadia-note-couple.jpg"
      },
      {
        date: "Jun 7, 2026",
        emoji: "🐰",
        title: "Her Smile",
        text: "A day spent together, just being us. Her laugh, her joy, her everything.",
        photo: "./assets/uploads/img_6306.jpg"
      },
      {
        date: "Jun 13, 2026",
        emoji: "✨",
        title: "Aesthetic Vibes",
        text: "She looked absolutely stunning. The light was perfect, and so was she.",
        photo: "./assets/uploads/img_2434.jpg"
      },
      {
        date: "Jun 19, 2026",
        emoji: "🍽️",
        title: "Dinner for Two",
        text: "Good food, great company, and the kind of date that makes you never want to go home.",
        photo: "./assets/uploads/img_1399.jpg"
      },
      {
        date: "Jun 20, 2026",
        emoji: "🎁",
        title: "A Little Something",
        text: "A small surprise, a big smile. It's the little things that mean the most.",
        photo: "./assets/uploads/img_1562.jpg"
      },
      {
        date: "Jun 27, 2026",
        emoji: "🥰",
        title: "Us Being Us",
        text: "The sweetest moments are the ones where we're just together, doing nothing special, and everything feels perfect.",
        photo: "./assets/uploads/img_2333.jpg"
      },
      {
        date: "Jul 1, 2026",
        emoji: "📸",
        title: "Picture Perfect",
        text: "Booth memories and architectural backdrops. Every frame looks like a movie poster when we're in it.",
        photo: "./assets/uploads/2026-07-01(2).jpg"
      }
    ]
  },

  /* ---------------------------- PHOTO GALLERY -------------------------- */
  gallery: {
    eyebrow: "Photo Gallery 📸",
    title: "Every little moment, in one place.",
    intro: "A scrapbook wall of our favorite memories. Tap any photo to look closer ✨",
    /* Uses all photos from uploads folder. Add more here as they come. */
    photos: [
      { src: "./assets/uploads/nadia-mac-pov-collage.jpg", alt: "His and her POV collage", caption: "same moment, two views", tags: ["us"] },
      { src: "./assets/uploads/nadia-note-1.jpg",          alt: "Photo of Nadia",            caption: "the diary girl", tags: ["me"] },
      { src: "./assets/uploads/nadia-note-2.jpg",          alt: "Nadia by a blue door",      caption: "soft and bright", tags: ["me"] },
      { src: "./assets/uploads/nadia-note-3.jpg",          alt: "Nadia with dessert",        caption: "night sparkle", tags: ["me"] },
      { src: "./assets/uploads/nadia-note-4.jpg",          alt: "Nadia at dinner",           caption: "little bunny", tags: ["me"] },
      { src: "./assets/uploads/nadia-note-couple.jpg",     alt: "Nadia and Mac together",    caption: "little us moment", tags: ["us"] },
      { src: "./assets/uploads/nadia-cabinet-hero.jpg",    alt: "Nadia with flowers",        caption: "keeper of the cabinet", tags: ["me"] },

      { src: "./assets/uploads/birthday-solo-1.jpg",       alt: "A sweet memory",            caption: "your moments", tags: ["moments"] },
      { src: "./assets/uploads/birthday-solo-2-web.jpg",   alt: "A sweet memory",            caption: "your moments", tags: ["moments"] },
      /* --- New photos from Nadia 🐰 album (Jul 3 2026) --- */
      { src: "./assets/uploads/img_6507.jpg",                  alt: "Couple close-up selfie",            caption: "my favorite face", tags: ["us"] },
      { src: "./assets/uploads/img_6539.jpg",                  alt: "Intimate couple portrait",           caption: "where it all began ♡", tags: ["us"] },
      { src: "./assets/uploads/img_6557.jpg",                  alt: "Couple with city skyline",           caption: "rooftop dreams", tags: ["us"] },
      { src: "./assets/uploads/img_1399.jpg",                  alt: "Couple at restaurant",               caption: "dinner for two", tags: ["us"] },
      { src: "./assets/uploads/img_2333.jpg",                  alt: "Sweet couple interaction",           caption: "us being us", tags: ["us"] },
      { src: "./assets/uploads/img_2434.jpg",                  alt: "Nadia solo portrait",               caption: "the prettiest smile", tags: ["me"] },
      { src: "./assets/uploads/img_6306.jpg",                  alt: "Nadia with flowers",                caption: "soft like flowers", tags: ["me"] },

      { src: "./assets/uploads/img_6631.jpg",                  alt: "Couple romantic moment",            caption: "golden hour love", tags: ["us"] },
      { src: "./assets/uploads/img_1562.jpg",                  alt: "Romantic card and gift setup",       caption: "a little something ♡", tags: ["moments"] },
      { src: "./assets/uploads/2026-07-01(2).jpg",              alt: "Photo booth strip",                 caption: "booth memories", tags: ["moments"] },
      { src: "./assets/uploads/2026-07-01(14).jpg",             alt: "Architectural couple shot",         caption: "our kind of view", tags: ["us"] },
      { src: "./assets/uploads/moment-eebc59c1-4c2.jpg",       alt: "Nadia with Slinky Dog toy",           caption: "toy story date 🐕", tags: ["moments"] },
      { src: "./assets/uploads/doll-bunny.png",                 alt: "Bunny plushie in pink dress",         caption: "little bunny ♡", tags: ["moments"] },
      { src: "./assets/uploads/doll-mimi.jpg",                  alt: "Cute plushie collection",             caption: "our fluffy friends 🧸", tags: ["moments"] },
      { src: "./assets/uploads/slinky_dog_close_up.jpg",       alt: "Slinky Dog toy close up",           caption: "slinky dog close up 🐕", tags: ["moments"] },
      { src: "./assets/uploads/plushie_close_up.jpg",          alt: "Cute plushie close up",              caption: "fluffy friend 🧸", tags: ["moments"] },
      { src: "./assets/uploads/nadia_wink_peace.jpg",          alt: "Nadia winking with peace sign",      caption: "wink and peace ✌️", tags: ["me"] },
      { src: "./assets/uploads/nadia_smile_drink.jpg",         alt: "Nadia smiling with a drink",         caption: "cheers to sweet moments 🥂", tags: ["me"] },
      { src: "./assets/uploads/couple_rose.jpg",               alt: "Nadia in blue dress",                caption: "sweet blue dress 🩵", tags: ["me"] },
      { src: "./assets/uploads/nadia_restaurant.jpg",          alt: "Nadia winking and peace sign",      caption: "peace and smile ✌️", tags: ["me"] },
      { src: "./assets/uploads/couple_photobooth_strip.jpg",   alt: "Couple photo booth strip",           caption: "booth strip memories 🎞️", tags: ["us"] },
      { src: "./assets/uploads/nadia_with_plushie.jpg",        alt: "Nadia with plushie",                 caption: "Nadia and puppy 🐶", tags: ["me"] },
      { src: "./assets/uploads/plushie_close_up_2.jpg",        alt: "Plushie close up",                   caption: "soft little resident 🧸", tags: ["moments"] },
      { src: "./assets/uploads/teddy_plushie.jpg",             alt: "Teddy bear plushie",                 caption: "teddy bear friend 🧸", tags: ["moments"] },
      { src: "./assets/uploads/img_0709.jpg",               alt: "Couple at the movies",             caption: "movie date night 🎬", tags: ["us"] },
      { src: "./assets/uploads/img_0710.jpg",               alt: "Nadia at the cinema",             caption: "cinema vibes ✨", tags: ["me"] },
      { src: "./assets/uploads/img_60607.jpg",              alt: "Nadia charming pose",              caption: "sweet like always 🌸", tags: ["me"] },
      { src: "./assets/uploads/jul01-04.jpg",               alt: "Nadia casual and cute",            caption: "everyday beauty ♡", tags: ["me"] },
      { src: "./assets/uploads/vc-call-1.jpg",              alt: "Video call with Nadia",             caption: "faceTime smiles 📱♡", tags: ["me"] },
      { src: "./assets/uploads/new-photo-2.jpg",            alt: "Nadia smiling solo",               caption: "that smile though 🌷", tags: ["me"] },
      { src: "./assets/uploads/new-photo-3.jpg",            alt: "Nadia in white top",               caption: "soft and lovely ✨", tags: ["me"] },
      { src: "./assets/uploads/new-photo-4.jpg",            alt: "Couple selfie together",            caption: "us in a frame 📸", tags: ["us"] },
      { src: "./assets/uploads/new-photo-5.jpg",            alt: "Slinky Dog plushie",               caption: "slinky dog goes out 🐕", tags: ["moments"] },
      /* --- Added Jul 3: more photos from Nadia album --- */
      { src: "./assets/uploads/0d7b3a63-224b-4791-a7c4-c0e3fc078446.jpg", alt: "Shared moment", caption: "a little moment ♡", tags: ["moments"] },
      { src: "./assets/uploads/44d5cf22-7815-4791-adc7-7715c4d2c7c3.jpg", alt: "Shared memory", caption: "kept memories 📸", tags: ["moments"] },
      { src: "./assets/uploads/480e236a-1bc3-4076-9894-2259895db032.jpg", alt: "Candid moment", caption: "candid and sweet ✨", tags: ["moments"] },
      { src: "./assets/uploads/680f6076-6026-4d7b-88fe-8073f54ab926.jpg", alt: "Shared photo", caption: "tiny moments ♡", tags: ["moments"] },
      { src: "./assets/uploads/6be257c7-dd6f-4a00-b525-5a723e1dc7e1.jpg", alt: "Sweet memory", caption: "a sweet capture 🌸", tags: ["moments"] },
      { src: "./assets/uploads/birthday-couple-1.jpg", alt: "Birthday together", caption: "birthday vibes 🎂", tags: ["us"] },
      { src: "./assets/uploads/birthday-couple-2.jpg", alt: "Birthday couple", caption: "celebration day 🎉", tags: ["us"] },
      { src: "./assets/uploads/img_0695.jpg", alt: "Couple at the cinema", caption: "movie night together 🎬", tags: ["us"] },
      { src: "./assets/uploads/img_0706.jpg", alt: "Nadia at the cinema", caption: "big screen smiles 🍿", tags: ["me"] },
      { src: "./assets/uploads/img_0707.jpg", alt: "Couple selfie at movies", caption: "cinema date 🎬", tags: ["us"] },
      { src: "./assets/uploads/img_0712.jpg", alt: "Nadia movie night", caption: "popcorn and her 🍿", tags: ["me"] },
      { src: "./assets/uploads/img_0713.jpg", alt: "Couple cozy at cinema", caption: "cozy cinema vibes ♡", tags: ["us"] },
      { src: "./assets/uploads/img_1392.jpg", alt: "Dinner date night", caption: "dinner for two 🕯️", tags: ["us"] },
      { src: "./assets/uploads/img_1393.jpg", alt: "Nadia at restaurant", caption: "restaurant glow ✨", tags: ["me"] },
      { src: "./assets/uploads/img_1396.jpg", alt: "Couple at dinner", caption: "sweet dinner date 🍽️", tags: ["us"] },
      { src: "./assets/uploads/img_1397.jpg", alt: "Nadia smiling at dinner", caption: "dinner smiles 😊", tags: ["me"] },
      { src: "./assets/uploads/img_1398.jpg", alt: "Couple dinner portrait", caption: "our table for two ♡", tags: ["us"] },
      { src: "./assets/uploads/img_1400.jpg", alt: "Nadia at cafe", caption: "cafe moments ☕", tags: ["me"] },
      { src: "./assets/uploads/img_1405.jpg", alt: "Couple cafe date", caption: "coffee and love ☕♡", tags: ["us"] },
      { src: "./assets/uploads/img_1406.jpg", alt: "Nadia cafe portrait", caption: "soft cafe light 🌸", tags: ["me"] },
      { src: "./assets/uploads/img_1535.jpg", alt: "Day out together", caption: "adventure day 🌇", tags: ["us"] },
      { src: "./assets/uploads/img_1536.jpg", alt: "Nadia outdoor portrait", caption: "outdoor beauty 🌿", tags: ["me"] },
      { src: "./assets/uploads/img_1564.jpg", alt: "Couple scenic shot", caption: "our view 🌆", tags: ["us"] },
      { src: "./assets/uploads/img_1566.jpg", alt: "Nadia outdoor candid", caption: "golden glow ✨", tags: ["me"] },
      { src: "./assets/uploads/img_20260521_170435.jpg", alt: "Couple spring day", caption: "spring together 🌷", tags: ["us"] },
      { src: "./assets/uploads/img_20260526_200547.jpg", alt: "Evening together", caption: "golden hour us 🌅", tags: ["us"] },
      { src: "./assets/uploads/img_20260607_135653.jpg", alt: "June day out", caption: "june adventures ☀️", tags: ["us"] },
      { src: "./assets/uploads/img_20260627_194629.jpg", alt: "Summer night", caption: "summer nights ✨", tags: ["us"] },
      { src: "./assets/uploads/img_2329.jpg", alt: "Couple close-up", caption: "us being us ♡", tags: ["us"] },
      { src: "./assets/uploads/img_2330.jpg", alt: "Sweet couple moment", caption: "together 💑", tags: ["us"] },
      { src: "./assets/uploads/img_2334.jpg", alt: "Couple portrait", caption: "our favorite frame 📸", tags: ["us"] },
      { src: "./assets/uploads/img_2335.jpg", alt: "Nadia candid portrait", caption: "that smile though 🌸", tags: ["me"] },
      { src: "./assets/uploads/img_2447.jpg", alt: "Couple selfie", caption: "selfie time 🤳", tags: ["us"] },
      { src: "./assets/uploads/img_2449.jpg", alt: "Nadia pretty portrait", caption: "the prettiest 🌷", tags: ["me"] },
      { src: "./assets/uploads/img_2450.jpg", alt: "Couple together", caption: "always together ♡", tags: ["us"] },
      { src: "./assets/uploads/img_2451.jpg", alt: "Nadia lovely portrait", caption: "lovely as always ✨", tags: ["me"] },
      { src: "./assets/uploads/img_6374.jpg", alt: "Couple moment", caption: "us in the moment ♡", tags: ["us"] },
      { src: "./assets/uploads/img_6503.jpg", alt: "Nadia event portrait", caption: "event night sparkle ✨", tags: ["me"] },
      { src: "./assets/uploads/img_6504.jpg", alt: "Couple event photo", caption: "dressed up together 👗", tags: ["us"] },
      { src: "./assets/uploads/img_6505.jpg", alt: "Nadia glowing", caption: "she glows 🌟", tags: ["me"] },
      { src: "./assets/uploads/img_6510.jpg", alt: "Couple event night", caption: "a night to remember 🌙", tags: ["us"] },
      { src: "./assets/uploads/img_6523.jpg", alt: "Nadia pretty smile", caption: "that smile 🌸", tags: ["me"] },
      { src: "./assets/uploads/img_6524.jpg", alt: "Couple candid", caption: "candid us 📸", tags: ["us"] },
      { src: "./assets/uploads/img_6529.jpg", alt: "Nadia portrait", caption: "soft and sweet ♡", tags: ["me"] },
      { src: "./assets/uploads/img_6533.jpg", alt: "Couple photo", caption: "us at our best ✨", tags: ["us"] },
      { src: "./assets/uploads/img_6541.jpg", alt: "Nadia event night", caption: "radiant 🌟", tags: ["me"] },
      { src: "./assets/uploads/img_6542.jpg", alt: "Couple portrait night", caption: "night out together 🌃", tags: ["us"] },
      { src: "./assets/uploads/img_6543.jpg", alt: "Nadia evening portrait", caption: "evening elegance ✨", tags: ["me"] },
      { src: "./assets/uploads/img_6548.jpg", alt: "Couple close moment", caption: "close and cozy ♡", tags: ["us"] },
      { src: "./assets/uploads/img_6550.jpg", alt: "Nadia solo portrait", caption: "beautiful as always 🌹", tags: ["me"] },
      { src: "./assets/uploads/img_6558.jpg", alt: "Couple romantic", caption: "romantic night 💫", tags: ["us"] },
      { src: "./assets/uploads/img_6825.jpg", alt: "Couple day out", caption: "out and about 🌇", tags: ["us"] },
      { src: "./assets/uploads/img_6834.jpg", alt: "Nadia portrait", caption: "natural beauty 🌸", tags: ["me"] },
      { src: "./assets/uploads/img_6848.jpg", alt: "Couple recent", caption: "lately us ♡", tags: ["us"] },
      { src: "./assets/uploads/img_6849.jpg", alt: "Nadia recent portrait", caption: "always smiling 😊", tags: ["me"] },
      { src: "./assets/uploads/img_6850.jpg", alt: "Couple latest", caption: "our latest chapter 📖", tags: ["us"] },
      { src: "./assets/uploads/img_6851.jpg", alt: "Nadia candid latest", caption: "candid and cute 🐰", tags: ["me"] },
      { src: "./assets/uploads/img_photobooth.jpg", alt: "Photobooth strip", caption: "photo booth memories 🎞️", tags: ["moments"] },
      { src: "./assets/uploads/img_plushies.jpg", alt: "Plushie collection", caption: "our fluffy family 🧸", tags: ["moments"] },
    ]
  },

  /* ------------------------------ NADIA'S DOLLS ------------------------- */
  dolls: {
    eyebrow: "Nadia's tiny cabinet 🧸",
    title: "A tiny cabinet of soft treasures.",
    intro: "Plushies, charms, and little finds sit together like a private mini museum. Tap a cabinet door to peek inside each tiny story 🗝️.",
    heroPhoto: {
      src: "./assets/uploads/img_2434.jpg",
      alt: "Nadia's prettiest smile with soft lighting",
      caption: "keeper of the cabinet ✨"
    },
    shelfEyebrow: "Tiny cabinet stories",
    shelfTitle: "Open a little treasure door",
    /* Each item is one cabinet door. Add more by copying a block. */
    items: [
      {
        name: "Mimi",
        tag: "first little resident",
        photo: "./assets/uploads/doll-mimi.jpg",
        caption: "Mimi sits in the middle of a soft birthday shelf, surrounded by tiny keepsakes and warm pink light. She looks like the first page of a very loved collection.",
        tags: ["plushie"]
      },
      {
        name: "Bunny 🎀",
        tag: "เด็กหญิงบันนี่",
        photo: "./assets/uploads/doll-bunny.png",
        caption: "Bunny 🎀 (บันนี่) — เด็กหญิงบันนี่",
        tags: ["plushie"]
      },
      {
        name: "Slinky Dog 🐕",
        tag: "movie buddy",
        photo: "./assets/uploads/new-photo-5.jpg",
        caption: "Slinky Dog 🐕 — เจ้าตัวน้อยที่ไปดูหนังด้วยทุกครั้ง เพราะไม่มีใครจอตั๋วเก่งเท่าเขา 🎬♡",
        tags: ["plushie"]
      }
    ],
    footerLine: "Made for her favorite little friends."
  },

  /* ------------------------------ HAPPY BIRTHDAY ------------------------ */
  birthday: {
    /* Password gate — she enters this to see the surprise */
    gate: {
      icon: "🎁",
      title: "A little surprise inside...",
      subtitle: "Enter our special day to open this (DDMM)",
      pin: "2105",
      hint: "hint: the day our story began ♡"
    },

    /* Step 1 — the candles. She taps each one to light it. */
    candles: {
      count: 5,
      eyebrow: "It's your day 🎂",
      title: "Make a wish, Nadia.",
      hint: "Tap each candle to light it…",
      litLine: "Now close your eyes and make a wish ✨"
    },

    /* Step 2 — revealed after all candles are lit. */
    headline: "Happy birthday Nadia 🎂, my favorite person.",
    intro: "You bring laughter and radiate positivity everywhere you go. You're brilliant, talented, and incredibly kind-hearted. Thank you for always treating me so well, and for being the best friend and girlfriend I could ever ask for. My life is so much brighter with you in it. ✨",
    photoStrip: [
      { src: "./assets/uploads/birthday-solo-1.jpg",  alt: "Warm smiles together" },
      { src: "./assets/uploads/birthday-solo-2-web.jpg",  alt: "Sweet memories together" }
    ],

    /* Step 3 — the letters. Typewriter effect on open. */
    lettersEyebrow: "Birthday letters ♡",
    lettersTitle: "Two little letters waiting for you.",
    lettersHint: "Tap an envelope to open a tiny birthday secret.",
    letters: [
      {
        seal: "🎀",
        sticker: "🧸",
        title: "For you",
        paragraphs: [
          "My wish for you is that you feel deeply loved in every single moment. Take time to appreciate the incredible person you are, each and every day.",
          "Here's to your vibrant health and strength. May you always be surrounded by kind-hearted people who lift you up.",
          "Success is bound to follow as you build your career and your own brand. You deserve true joy in everything you touch."
        ],
        photos: [
          { src: "./assets/uploads/img_2434.jpg",        alt: "Nadia's prettiest smile", caption: "the prettiest smile ♡" },
          { src: "./assets/uploads/img_6306.jpg",        alt: "Nadia with soft flowers",  caption: "soft like flowers 🌸" }
        ]
      },
      {
        seal: "💌",
        sticker: "🎎",
        title: "For us",
        paragraphs: [
          "As for us, let's keep creating tiny, beautiful memories together. I love our everyday conversations that make us feel right at home.",
          "I can't wait to cross continents by your side. Let's explore every corner of this world and never stop chasing fun new adventures.",
          "Let's always choose love over any fear or doubt. No matter what comes our way, let's keep growing side by side for an eternity."
        ],
        photos: [
          { src: "./assets/uploads/couple_night_smile_1.jpg",       alt: "Nadia and Mac together",   caption: "together is home ♡" },
          { src: "./assets/uploads/couple_night_smile_2.jpg",       alt: "Nadia and Mac smiling",    caption: "my favorite face 🥰" }
        ]
      }
    ],

    /* Step 4 — write back section */
    writeBack: {
      eyebrow: "Write back ♡",
      title: "Leave a little note for Mac.",
      placeholder: "Write something sweet here... he'll see it next time he visits ♡",
      button: "Send my note 💕",
      savedMsg: "Saved! He'll see this next time ♡",
      storageKey: "nadiaWriteBackNotes"
    },

    /* Step 5 — the closing line at the very end. */
    closing: {
      text: "Happy birthday, my love. This little world is yours.",
      signature: "Mac",
      aliases: {
        dumby: "Dumby",
        king: "King BoBo"
      }
    }
  },

  /* ------------------------------ MUSIC ------------------------------- */
  /* Spotify playlist — songs show in a mini player, user can pick any track */
  music: {
    playlistId: "4B8CTHWuqeqJ68ZqqvEqNV",
    playlistName: "LinoLarny:) 🎵",
    defaultTrack: "6gkbtMtioHgtyGjrMel6ei",  /* drop dead — first song */
    emoji: "🎵",
    tracks: [
      { id: "6gkbtMtioHgtyGjrMel6ei", title: "drop dead",          artist: "Olivia Rodrigo" },
      { id: "74nEGIzIefJhJ5qX7NeIAz", title: "Beggin'",            artist: "Chris Lake, Aluna" },
      { id: "4MpketOLD5KhtgWWOBuk9w", title: "SexOnTheBeat",       artist: "Lino" },
      { id: "6AC9alC8qJ7cXuYifgAfQn", title: "DUVET",              artist: "bôa" },
      { id: "4A56h4B9xUuMMXoKuj18HT", title: "Edge of Desire",     artist: "The National" },
      { id: "1eDI5oU04SLsXl0TfxfwYf", title: "Love Me JeJe",       artist: "King Promise" },
      { id: "6w2rL0ut3mK7TBZmYx4oZK", title: "Kate Spade",         artist: "Lil Yachty" },
      { id: "7904wbV03rb4S0gGliqBk4", title: "HOMEWRECKED",        artist: "Lil Yachty" },
      { id: "1ZXGXdoQLz4GOnWMyipRjj", title: "BIRDS OF A FEATHER", artist: "Billie Eilish" },
      { id: "1U5Le5U3S1qUVOvO1orCtu", title: "Simple Things",      artist: "Lil Yachty" },
      { id: "2ZV2rFSeDr16cKMuSuXlGA", title: "UNDERDOGS",          artist: "Lil Yachty" },
      { id: "7tICCrK3CcyRFKza7yrR0z", title: "Homewrecker",        artist: "Olivia Rodrigo" },
      { id: "1UNEuG9DYOWiikf00ayr52", title: "Love Me Not",        artist: "Flo Milli" },
      { id: "7ogpGbKc4Io6NCU6ydxXwZ", title: "FEVER DREAM",        artist: "Lil Yachty" },
      { id: "17LuVd2gBc7UvcgZbm1cFV", title: "To Love Somebody",   artist: "Bee Gees" },
      { id: "4blARE63d5cQU3cdxCbrBa", title: "Turn The Page",      artist: "Metallica" },
      { id: "6XcyAXAYKQD7FqCG2F2xOu", title: "Hot & Sexy",         artist: "Lino" },
      { id: "7jXYuDIoG3mR4JEOzB9sXX", title: "DRENCH",             artist: "Lino" },
      { id: "0IoD88QDxy5GPip9IzlzyI", title: "Certified",          artist: "Lil Yachty" },
      { id: "3PkvYP6223QO3xlW2THd1x", title: "Would I Lie To You?",artist: "Eurythmics" },
      { id: "4nZi6XNe36Ut4Nij3IQ1yC", title: "Silver Springs",     artist: "Fleetwood Mac" },
      { id: "6ee04RfJraeyLWpKB4cgCZ", title: "No Gravity",         artist: "Lil Yachty" }
    ]
  }
};
