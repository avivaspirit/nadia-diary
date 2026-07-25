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
      },
      {
        num: "08", emoji: "🌠", title: "Make a Wish",
        text: "Whisper a wish to the shooting stars. Every wish becomes a star in your own constellation.",
        href: "./wish.html"
      },
      {
        num: "09", emoji: "👗", title: "Nadia's Closet",
        text: "Style inspo for every mood — sweet, spicy, sporty, glam, princess, and more. Find your next look ♡",
        href: "./closet.html"
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
      { src: "./assets/uploads/doll-bunny.jpg",                 alt: "Bunny plushie in pink dress",         caption: "little bunny ♡", tags: ["moments"] },
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
      /* --- Added Jul 10: new photos from Nadia 🐰 Google Photos album --- */
      { src: "./assets/uploads/album-may21-shy-smile.jpg", alt: "Couple shy smile selfie", caption: "that shy smile tho 🌷", tags: ["us"] },
      { src: "./assets/uploads/album-may21-rooftof-couple.jpg", alt: "Couple rooftop selfie", caption: "rooftop cuddles 🌆", tags: ["us"] },
      { src: "./assets/uploads/album-may21-bench-together.jpg", alt: "Couple sitting close together", caption: "bench date vibes ♡", tags: ["us"] },
      { src: "./assets/uploads/album-may21-gift-flowers.jpg", alt: "Mac giving Nadia flowers", caption: "flowers for my girl 💐", tags: ["us"] },
      { src: "./assets/uploads/album-may21-playful.jpg", alt: "Couple playful with bouquet", caption: "playful and happy 🌸", tags: ["us"] },
      { src: "./assets/uploads/album-may21-radiant-bouquet.jpg", alt: "Nadia radiant with bouquet", caption: "radiant as always ✨💐", tags: ["us"] },
      /* --- Added Jul 10: 30 new photos from updated Nadia 🐰 album (full ZIP export) --- */
      { src: "./assets/uploads/2026-07-01(3).jpg", alt: "Nadia cheerful pose", caption: "summer vibes ☀️", tags: ["me"] },
      { src: "./assets/uploads/403518B2-57B4-46ED-BD82-19ED337E1D99.jpg", alt: "Celebration with balloons", caption: "party day vibes 🎈", tags: ["me"] },
      { src: "./assets/uploads/IMG_2344.JPG", alt: "Couple leaning for kiss", caption: "almost... 💋", tags: ["us"] },
      { src: "./assets/uploads/IMG_2425.JPG", alt: "Nadia elegant selfie", caption: "that elegant look ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_2426.JPG", alt: "Nadia stunning portrait", caption: "stunning as always 🌷", tags: ["me"] },
      { src: "./assets/uploads/IMG_6530.JPG", alt: "Sweet smile with companion", caption: "sweetest smile ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_7407.PNG", alt: "Mirror selfie smiling", caption: "mirror selfie queen 🤳", tags: ["me"] },
      { src: "./assets/uploads/IMG_7614.jpg", alt: "Finger heart smile", caption: "finger heart 💗", tags: ["me"] },
      { src: "./assets/uploads/IMG_7615.jpg", alt: "Radiant happy smile", caption: "pure happiness ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_7616.jpg", alt: "Lovely friendly smile", caption: "lovely smile 🌸", tags: ["me"] },
      { src: "./assets/uploads/IMG_7652.jpg", alt: "Couple selfie smiling", caption: "us smiling together 💑", tags: ["us"] },
      { src: "./assets/uploads/2026-07-01(1).jpg", alt: "Elegant formal portrait", caption: "dressed up night ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_2331.JPG", alt: "Selfie at restaurant", caption: "dinner selfie 🍽️", tags: ["me"] },
      { src: "./assets/uploads/IMG_2337.JPG", alt: "Peace sign with boyfriend", caption: "peace and love ✌️♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_2422.JPG", alt: "Candid romantic moment", caption: "candid romance 💕", tags: ["us"] },
      { src: "./assets/uploads/IMG_5429.JPG", alt: "Birthday cake smiles", caption: "birthday cake 🎂", tags: ["us"] },
      { src: "./assets/uploads/IMG_5434.JPG", alt: "Smiling affectionately", caption: "that look of love 🥰", tags: ["us"] },
      { src: "./assets/uploads/IMG_5438.JPG", alt: "Blue dress birthday", caption: "birthday blue dress 💙", tags: ["me"] },
      { src: "./assets/uploads/IMG_5490.JPG", alt: "Couple posing together", caption: "together as always ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_6282.jpg", alt: "Holding balloons with man", caption: "balloons and joy 🎈", tags: ["us"] },
      { src: "./assets/uploads/IMG_6283.jpg", alt: "Photo booth strip couple", caption: "booth strip fun 📸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6324.jpg", alt: "Holding flowers outdoors", caption: "flowers and sunshine 🌷", tags: ["me"] },
      { src: "./assets/uploads/IMG_6325.jpg", alt: "Smiling with flowers", caption: "blooming with joy 🌸", tags: ["me"] },
      { src: "./assets/uploads/IMG_6368.jpg", alt: "Selfie with flowers", caption: "flower selfie 🌺", tags: ["me"] },
      { src: "./assets/uploads/IMG_6517.JPG", alt: "Lovely outdoors", caption: "outdoor beauty 🌿", tags: ["me"] },
      { src: "./assets/uploads/IMG_6518.JPG", alt: "Long dark hair portrait", caption: "those gorgeous locks 💁‍♀️", tags: ["me"] },
      { src: "./assets/uploads/IMG_6531.JPG", alt: "Couple with flower bouquet", caption: "flowers for us 💐", tags: ["us"] },
      { src: "./assets/uploads/IMG_6532.JPG", alt: "Smiling holding flowers", caption: "happy with blooms 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6534.JPG", alt: "Intimate selfie flowers", caption: "soft moment with flowers ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_6559.JPG", alt: "Kissing on cheek outdoors", caption: "cheek kiss 💋", tags: ["us"] },

      
      /* --- Previously skipped (PNG versions + extra dates) --- */
      { src: "./assets/uploads/IMG_20260521_173612.jpg", alt: "Evening garden moment", caption: "garden evening 🌿", tags: ["us"] },
      { src: "./assets/uploads/IMG_20260607_141821.jpg", alt: "June afternoon together", caption: "june afternoon ☀️", tags: ["us"] },
      { src: "./assets/uploads/IMG_20260607_141823.jpg", alt: "June afternoon moment", caption: "june moments ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_6519.JPG", alt: "Nadia memory", caption: "sweet capture 🌸", tags: ["me"] },
      { src: "./assets/uploads/IMG_6544.JPG", alt: "Nadia lovely", caption: "lovely as always ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_6545.JPG", alt: "Nadia portrait", caption: "beautiful moment 🌷", tags: ["me"] },
      { src: "./assets/uploads/IMG_6546.JPG", alt: "Nadia candid", caption: "candid smile ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_6599.JPG", alt: "Nadia glowing", caption: "that glow ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_6600.JPG", alt: "Nadia stunning", caption: "stunning 🌹", tags: ["me"] },


      /* --- DNG RAW converted to JPG --- */
      { src: "./assets/uploads/IMG_6855.jpg", alt: "Nadia moment", caption: "golden beauty ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_6856.jpg", alt: "Nadia portrait", caption: "radiant portrait 🌹", tags: ["me"] },
      { src: "./assets/uploads/IMG_6857.jpg", alt: "Nadia stunning", caption: "stunning shot ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_6858.jpg", alt: "Nadia candid", caption: "candid beauty ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_6859.jpg", alt: "Nadia lovely", caption: "lovely as always 🌸", tags: ["me"] },
      { src: "./assets/uploads/IMG_6861.jpg", alt: "Nadia smiling", caption: "that smile tho 😊", tags: ["me"] },
      { src: "./assets/uploads/IMG_6862.jpg", alt: "Nadia moment", caption: "sweet capture 💕", tags: ["me"] },
      { src: "./assets/uploads/IMG_6863.jpg", alt: "Nadia pretty", caption: "pretty girl 🌷", tags: ["me"] },
      { src: "./assets/uploads/IMG_6864.jpg", alt: "Nadia candid", caption: "cute candid ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_6865.jpg", alt: "Nadia happy", caption: "happy girl 🌟", tags: ["me"] },
      { src: "./assets/uploads/IMG_6866.jpg", alt: "Nadia sweet", caption: "sweet moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_6867.jpg", alt: "Nadia elegant", caption: "elegant beauty ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_6868.jpg", alt: "Nadia gorgeous", caption: "gorgeous 💫", tags: ["me"] },
      { src: "./assets/uploads/IMG_6869.jpg", alt: "Nadia photo", caption: "photo worthy 📸", tags: ["me"] },
      { src: "./assets/uploads/IMG_6870.jpg", alt: "Nadia beauty", caption: "natural beauty 🌿", tags: ["me"] },
      { src: "./assets/uploads/IMG_6871.jpg", alt: "Nadia dreamy", caption: "dreamy ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_6872.jpg", alt: "Nadia cute", caption: "cute as always 🐰", tags: ["me"] },
      { src: "./assets/uploads/IMG_6873.jpg", alt: "Nadia lovely", caption: "lovely moment 🌸", tags: ["me"] },

      /* --- Video clips --- */
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/9a2eafce-3fbf-47be-b16e-4f379d9f4b01.mov", alt: "Video clip", caption: "cute video clip 🎬", tags: ["us"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_4166.MP4", alt: "Video clip", caption: "sweet moment 🎥", tags: ["me"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_4168.MP4", alt: "Video clip", caption: "fun times ✨", tags: ["us"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_4169.MP4", alt: "Video clip", caption: "memory video 💕", tags: ["me"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_4170.MP4", alt: "Video clip", caption: "adorable 🥰", tags: ["us"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_4171.MP4", alt: "Video clip", caption: "happy moment 🌟", tags: ["me"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_4192.MP4", alt: "Video clip", caption: "us together 💑", tags: ["us"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_4193.MP4", alt: "Video clip", caption: "smile and laugh 😊", tags: ["me"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_4194.MP4", alt: "Video clip", caption: "cute video clip 🎬", tags: ["us"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_4195.MP4", alt: "Video clip", caption: "sweet moment 🎥", tags: ["me"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_4196.MP4", alt: "Video clip", caption: "fun times ✨", tags: ["us"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_4197.MP4", alt: "Video clip", caption: "memory video 💕", tags: ["me"], isVideo: true },
      { src: "./assets/uploads/IMG_6520.MOV", alt: "Video clip", caption: "adorable 🥰", tags: ["us"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_6892.MOV", alt: "Video clip", caption: "happy moment 🌟", tags: ["me"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_6894.MOV", alt: "Video clip", caption: "us together 💑", tags: ["us"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7616.MP4", alt: "Video clip", caption: "smile and laugh 😊", tags: ["me"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7625.MOV", alt: "Video clip", caption: "cute video clip 🎬", tags: ["us"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7626.MP4", alt: "Video clip", caption: "sweet moment 🎥", tags: ["me"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7628.MP4", alt: "Video clip", caption: "fun times ✨", tags: ["us"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7631.MP4", alt: "Video clip", caption: "memory video 💕", tags: ["me"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7635.MP4", alt: "Video clip", caption: "adorable 🥰", tags: ["us"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7637.MP4", alt: "Video clip", caption: "happy moment 🌟", tags: ["me"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7641.MOV", alt: "Video clip", caption: "us together 💑", tags: ["us"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7645.MP4", alt: "Video clip", caption: "smile and laugh 😊", tags: ["me"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7646.MP4", alt: "Video clip", caption: "cute video clip 🎬", tags: ["us"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7647.MP4", alt: "Video clip", caption: "sweet moment 🎥", tags: ["me"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7649.MP4", alt: "Video clip", caption: "fun times ✨", tags: ["us"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7650.MP4", alt: "Video clip", caption: "memory video 💕", tags: ["me"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7655.MP4", alt: "Video clip", caption: "adorable 🥰", tags: ["us"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7658.MP4", alt: "Video clip", caption: "happy moment 🌟", tags: ["me"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7662.MP4", alt: "Video clip", caption: "us together 💑", tags: ["us"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7663.MP4", alt: "Video clip", caption: "smile and laugh 😊", tags: ["me"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7666.MP4", alt: "Video clip", caption: "cute video clip 🎬", tags: ["us"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7668.MP4", alt: "Video clip", caption: "sweet moment 🎥", tags: ["me"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7674.MP4", alt: "Video clip", caption: "fun times ✨", tags: ["us"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7678.MP4", alt: "Video clip", caption: "memory video 💕", tags: ["me"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7680.MP4", alt: "Video clip", caption: "adorable 🥰", tags: ["us"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7681.MP4", alt: "Video clip", caption: "happy moment 🌟", tags: ["me"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7683.MP4", alt: "Video clip", caption: "us together 💑", tags: ["us"], isVideo: true },
      { src: "https://raw.githubusercontent.com/avivaspirit/nadia-videos/main/IMG_7687.MOV", alt: "Video clip", caption: "smile and laugh 😊", tags: ["me"], isVideo: true },

/* --- Bulk add: remaining album photos --- */
      { src: "./assets/uploads/2026-07-01(4).jpg", alt: "Nadia memory 4", caption: "our favorite memory", tags: ["me"] },
      { src: "./assets/uploads/2026-07-01(5).jpg", alt: "Nadia memory 5", caption: "beautiful as always ✨", tags: ["us"] },
      { src: "./assets/uploads/2026-07-01.jpg", alt: "Nadia memory 6", caption: "together 💑", tags: ["us"] },
      { src: "./assets/uploads/403518B2-57B4-46ED-BD82-19ED337E1D99.jpg", alt: "Nadia memory 7", caption: "happy day 🌷", tags: ["me"] },
      { src: "./assets/uploads/684DE2CF-03A4-4A72-B3CD-3ED0467CAE88.jpg", alt: "Nadia memory 8", caption: "lovely smile ♡", tags: ["us"] },
      { src: "./assets/uploads/FBD371FE-A086-4377-853B-FB18142529D3.jpg", alt: "Nadia memory 9", caption: "golden moment ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_0708.JPG", alt: "Nadia memory 13", caption: "forever moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_0711.JPG", alt: "Nadia memory 16", caption: "soft and lovely ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_0714.JPG", alt: "Nadia memory 19", caption: "sweet moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_0715.JPG", alt: "Nadia memory 20", caption: "always smiling 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_0762.JPG", alt: "Nadia memory 21", caption: "candid and cute 🐰", tags: ["us"] },
      { src: "./assets/uploads/IMG_1407.JPG", alt: "Nadia memory 31", caption: "forever moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_1408.JPG", alt: "Nadia memory 32", caption: "that smile tho 🌷", tags: ["us"] },
      { src: "./assets/uploads/IMG_1516.jpg", alt: "Nadia memory 33", caption: "cute as always 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_2331.JPG", alt: "Nadia memory 45", caption: "golden moment ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_2332.JPG", alt: "Nadia memory 46", caption: "us being us 💕", tags: ["me"] },
      { src: "./assets/uploads/IMG_2336.JPG", alt: "Nadia memory 50", caption: "that smile tho 🌷", tags: ["us"] },
      { src: "./assets/uploads/IMG_2337.JPG", alt: "Nadia memory 51", caption: "cute as always 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_2338.JPG", alt: "Nadia memory 52", caption: "soft and lovely ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_2339.JPG", alt: "Nadia memory 53", caption: "a little moment ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_2340.JPG", alt: "Nadia memory 54", caption: "my favorite 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_2341.JPG", alt: "Nadia memory 55", caption: "sweet moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_2342.JPG", alt: "Nadia memory 56", caption: "always smiling 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_2343.JPG", alt: "Nadia memory 57", caption: "candid and cute 🐰", tags: ["us"] },
      { src: "./assets/uploads/IMG_2344.JPG", alt: "Nadia memory 58", caption: "our favorite memory", tags: ["me"] },
      { src: "./assets/uploads/IMG_2422.JPG", alt: "Nadia memory 59", caption: "beautiful as always ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_2423.JPG", alt: "Nadia memory 60", caption: "together 💑", tags: ["us"] },
      { src: "./assets/uploads/IMG_2424.JPG", alt: "Nadia memory 61", caption: "happy day 🌷", tags: ["me"] },
      { src: "./assets/uploads/IMG_2425.JPG", alt: "Nadia memory 62", caption: "lovely smile ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_2426.JPG", alt: "Nadia memory 63", caption: "golden moment ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_2427.JPG", alt: "Nadia memory 64", caption: "us being us 💕", tags: ["me"] },
      { src: "./assets/uploads/IMG_2428.JPG", alt: "Nadia memory 65", caption: "pure joy 🌟", tags: ["us"] },
      { src: "./assets/uploads/IMG_2429.JPG", alt: "Nadia memory 66", caption: "sweet capture 📸", tags: ["us"] },
      { src: "./assets/uploads/IMG_2430.JPG", alt: "Nadia memory 67", caption: "forever moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_2431.JPG", alt: "Nadia memory 68", caption: "that smile tho 🌷", tags: ["us"] },
      { src: "./assets/uploads/IMG_2432.JPG", alt: "Nadia memory 69", caption: "cute as always 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_2433.JPG", alt: "Nadia memory 70", caption: "soft and lovely ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_2446.JPG", alt: "Nadia memory 72", caption: "my favorite 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_2448.JPG", alt: "Nadia memory 74", caption: "always smiling 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_2452.JPG", alt: "Nadia memory 78", caption: "together 💑", tags: ["us"] },
      { src: "./assets/uploads/IMG_2453.JPG", alt: "Nadia memory 79", caption: "happy day 🌷", tags: ["me"] },
      { src: "./assets/uploads/IMG_2454.JPG", alt: "Nadia memory 80", caption: "lovely smile ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_2455.JPG", alt: "Nadia memory 81", caption: "golden moment ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_2456.JPG", alt: "Nadia memory 82", caption: "us being us 💕", tags: ["me"] },
      { src: "./assets/uploads/IMG_2457.JPG", alt: "Nadia memory 83", caption: "pure joy 🌟", tags: ["us"] },
      { src: "./assets/uploads/IMG_2458.JPG", alt: "Nadia memory 84", caption: "sweet capture 📸", tags: ["us"] },
      { src: "./assets/uploads/IMG_2459.JPG", alt: "Nadia memory 85", caption: "forever moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_2460.JPG", alt: "Nadia memory 86", caption: "that smile tho 🌷", tags: ["us"] },
      { src: "./assets/uploads/IMG_2461.JPG", alt: "Nadia memory 87", caption: "cute as always 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_2462.JPG", alt: "Nadia memory 88", caption: "soft and lovely ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_4166.JPG", alt: "Nadia memory 89", caption: "a little moment ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_4168.JPG", alt: "Nadia memory 90", caption: "my favorite 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_4169.JPG", alt: "Nadia memory 91", caption: "sweet moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_4170.JPG", alt: "Nadia memory 92", caption: "always smiling 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_4171.JPG", alt: "Nadia memory 93", caption: "candid and cute 🐰", tags: ["us"] },
      { src: "./assets/uploads/IMG_4192.JPG", alt: "Nadia memory 94", caption: "our favorite memory", tags: ["me"] },
      { src: "./assets/uploads/IMG_4193.JPG", alt: "Nadia memory 95", caption: "beautiful as always ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_4194.JPG", alt: "Nadia memory 96", caption: "together 💑", tags: ["us"] },
      { src: "./assets/uploads/IMG_4195.JPG", alt: "Nadia memory 97", caption: "happy day 🌷", tags: ["me"] },
      { src: "./assets/uploads/IMG_4196.JPG", alt: "Nadia memory 98", caption: "lovely smile ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_4197.JPG", alt: "Nadia memory 99", caption: "golden moment ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_4346.JPG", alt: "Nadia memory 100", caption: "us being us 💕", tags: ["me"] },
      { src: "./assets/uploads/IMG_5270.JPG", alt: "Nadia memory 101", caption: "pure joy 🌟", tags: ["us"] },
      { src: "./assets/uploads/IMG_5414.JPG", alt: "Nadia memory 102", caption: "sweet capture 📸", tags: ["us"] },
      { src: "./assets/uploads/IMG_5429.JPG", alt: "Nadia memory 103", caption: "forever moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_5434.JPG", alt: "Nadia memory 104", caption: "that smile tho 🌷", tags: ["us"] },
      { src: "./assets/uploads/IMG_5435.JPG", alt: "Nadia memory 105", caption: "cute as always 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_5436.JPG", alt: "Nadia memory 106", caption: "soft and lovely ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_5438.JPG", alt: "Nadia memory 107", caption: "a little moment ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_5456.JPG", alt: "Nadia memory 108", caption: "my favorite 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_5490.JPG", alt: "Nadia memory 109", caption: "sweet moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_6282.jpg", alt: "Nadia memory 110", caption: "always smiling 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6283.jpg", alt: "Nadia memory 111", caption: "candid and cute 🐰", tags: ["us"] },
      { src: "./assets/uploads/IMG_6284.jpg", alt: "Nadia memory 112", caption: "our favorite memory", tags: ["me"] },
      { src: "./assets/uploads/IMG_6287.jpg", alt: "Nadia memory 113", caption: "beautiful as always ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_6288.jpg", alt: "Nadia memory 114", caption: "together 💑", tags: ["us"] },
      { src: "./assets/uploads/IMG_6289.jpg", alt: "Nadia memory 115", caption: "happy day 🌷", tags: ["me"] },
      { src: "./assets/uploads/IMG_6290.jpg", alt: "Nadia memory 116", caption: "lovely smile ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_6292.jpg", alt: "Nadia memory 117", caption: "golden moment ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_6293.jpg", alt: "Nadia memory 118", caption: "us being us 💕", tags: ["me"] },
      { src: "./assets/uploads/IMG_6294.jpg", alt: "Nadia memory 119", caption: "pure joy 🌟", tags: ["us"] },
      { src: "./assets/uploads/IMG_6298.jpg", alt: "Nadia memory 120", caption: "sweet capture 📸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6301.jpg", alt: "Nadia memory 121", caption: "forever moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_6302.jpg", alt: "Nadia memory 122", caption: "that smile tho 🌷", tags: ["us"] },
      { src: "./assets/uploads/IMG_6324.jpg", alt: "Nadia memory 124", caption: "soft and lovely ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_6325.jpg", alt: "Nadia memory 125", caption: "a little moment ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_6368.jpg", alt: "Nadia memory 126", caption: "my favorite 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6369.jpg", alt: "Nadia memory 127", caption: "sweet moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_6370.jpg", alt: "Nadia memory 128", caption: "always smiling 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6371.jpg", alt: "Nadia memory 129", caption: "candid and cute 🐰", tags: ["us"] },
      { src: "./assets/uploads/IMG_6372.jpg", alt: "Nadia memory 130", caption: "our favorite memory", tags: ["me"] },
      { src: "./assets/uploads/IMG_6375.jpg", alt: "Nadia memory 132", caption: "together 💑", tags: ["us"] },
      { src: "./assets/uploads/IMG_6376.jpg", alt: "Nadia memory 133", caption: "happy day 🌷", tags: ["me"] },
      { src: "./assets/uploads/IMG_6506.JPG", alt: "Nadia memory 137", caption: "pure joy 🌟", tags: ["us"] },
      { src: "./assets/uploads/IMG_6508.JPG", alt: "Nadia memory 139", caption: "forever moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_6509.JPG", alt: "Nadia memory 140", caption: "that smile tho 🌷", tags: ["us"] },
      { src: "./assets/uploads/IMG_6511.JPG", alt: "Nadia memory 142", caption: "soft and lovely ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_6512.JPG", alt: "Nadia memory 143", caption: "a little moment ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_6513.JPG", alt: "Nadia memory 144", caption: "my favorite 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6514.JPG", alt: "Nadia memory 145", caption: "sweet moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_6515.JPG", alt: "Nadia memory 146", caption: "always smiling 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6516.JPG", alt: "Nadia memory 147", caption: "candid and cute 🐰", tags: ["us"] },
      { src: "./assets/uploads/IMG_6517.JPG", alt: "Nadia memory 148", caption: "our favorite memory", tags: ["me"] },
      { src: "./assets/uploads/IMG_6518.JPG", alt: "Nadia memory 149", caption: "beautiful as always ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_6519.JPG", alt: "Nadia memory 150", caption: "together 💑", tags: ["us"] },
      { src: "./assets/uploads/IMG_6520.jpg", alt: "Nadia memory 151", caption: "happy day 🌷", tags: ["me"] },
      { src: "./assets/uploads/IMG_6521.JPG", alt: "Nadia memory 152", caption: "lovely smile ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_6522.JPG", alt: "Nadia memory 153", caption: "golden moment ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_6525.JPG", alt: "Nadia memory 156", caption: "sweet capture 📸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6526.JPG", alt: "Nadia memory 157", caption: "forever moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_6527.JPG", alt: "Nadia memory 158", caption: "that smile tho 🌷", tags: ["us"] },
      { src: "./assets/uploads/IMG_6528.JPG", alt: "Nadia memory 159", caption: "cute as always 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6530.JPG", alt: "Nadia memory 161", caption: "a little moment ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_6531.JPG", alt: "Nadia memory 162", caption: "my favorite 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6532.JPG", alt: "Nadia memory 163", caption: "sweet moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_6534.JPG", alt: "Nadia memory 165", caption: "candid and cute 🐰", tags: ["us"] },
      { src: "./assets/uploads/IMG_6535.JPG", alt: "Nadia memory 166", caption: "our favorite memory", tags: ["me"] },
      { src: "./assets/uploads/IMG_6536.JPG", alt: "Nadia memory 167", caption: "beautiful as always ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_6537.JPG", alt: "Nadia memory 168", caption: "together 💑", tags: ["us"] },
      { src: "./assets/uploads/IMG_6538.JPG", alt: "Nadia memory 169", caption: "happy day 🌷", tags: ["me"] },
      { src: "./assets/uploads/IMG_6540.JPG", alt: "Nadia memory 171", caption: "golden moment ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_6544.JPG", alt: "Nadia memory 175", caption: "forever moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_6545.JPG", alt: "Nadia memory 176", caption: "that smile tho 🌷", tags: ["us"] },
      { src: "./assets/uploads/IMG_6546.JPG", alt: "Nadia memory 177", caption: "cute as always 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6547.jpg", alt: "Nadia memory 178", caption: "soft and lovely ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_6551.JPG", alt: "Nadia memory 181", caption: "sweet moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_6552.JPG", alt: "Nadia memory 182", caption: "always smiling 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6559.JPG", alt: "Nadia memory 185", caption: "beautiful as always ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_6562.JPG", alt: "Nadia memory 186", caption: "together 💑", tags: ["us"] },
      { src: "./assets/uploads/IMG_6569.jpg", alt: "Nadia memory 187", caption: "happy day 🌷", tags: ["me"] },
      { src: "./assets/uploads/IMG_6595.jpg", alt: "Nadia memory 188", caption: "lovely smile ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_6596.jpg", alt: "Nadia memory 189", caption: "golden moment ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_6597.jpg", alt: "Nadia memory 190", caption: "us being us 💕", tags: ["me"] },
      { src: "./assets/uploads/IMG_6598.jpg", alt: "Nadia memory 191", caption: "pure joy 🌟", tags: ["us"] },
      { src: "./assets/uploads/IMG_6599.JPG", alt: "Nadia memory 192", caption: "sweet capture 📸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6600.JPG", alt: "Nadia memory 193", caption: "forever moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_6601.JPG", alt: "Nadia memory 194", caption: "that smile tho 🌷", tags: ["us"] },
      { src: "./assets/uploads/IMG_6602.JPG", alt: "Nadia memory 195", caption: "cute as always 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6603.JPG", alt: "Nadia memory 196", caption: "soft and lovely ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_6605.jpg", alt: "Nadia memory 197", caption: "a little moment ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_6606.jpg", alt: "Nadia memory 198", caption: "my favorite 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6607.jpg", alt: "Nadia memory 199", caption: "sweet moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_6608.jpg", alt: "Nadia memory 200", caption: "always smiling 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6619.jpg", alt: "Nadia memory 201", caption: "candid and cute 🐰", tags: ["us"] },
      { src: "./assets/uploads/IMG_6620.jpg", alt: "Nadia memory 202", caption: "our favorite memory", tags: ["me"] },
      { src: "./assets/uploads/IMG_6621.jpg", alt: "Nadia memory 203", caption: "beautiful as always ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_6622.jpg", alt: "Nadia memory 204", caption: "together 💑", tags: ["us"] },
      { src: "./assets/uploads/IMG_6623.jpg", alt: "Nadia memory 205", caption: "happy day 🌷", tags: ["me"] },
      { src: "./assets/uploads/IMG_6624.jpg", alt: "Nadia memory 206", caption: "lovely smile ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_6626.jpg", alt: "Nadia memory 207", caption: "golden moment ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_6627.jpg", alt: "Nadia memory 208", caption: "us being us 💕", tags: ["me"] },
      { src: "./assets/uploads/IMG_6628.jpg", alt: "Nadia memory 209", caption: "pure joy 🌟", tags: ["us"] },
      { src: "./assets/uploads/IMG_6630.jpg", alt: "Nadia memory 210", caption: "sweet capture 📸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6632.jpg", alt: "Nadia memory 212", caption: "that smile tho 🌷", tags: ["us"] },
      { src: "./assets/uploads/IMG_6633.jpg", alt: "Nadia memory 213", caption: "cute as always 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6634.jpg", alt: "Nadia memory 214", caption: "soft and lovely ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_6635.jpg", alt: "Nadia memory 215", caption: "a little moment ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_6656.jpg", alt: "Nadia memory 216", caption: "my favorite 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6657.jpg", alt: "Nadia memory 217", caption: "sweet moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_6658.jpg", alt: "Nadia memory 218", caption: "always smiling 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6659.jpg", alt: "Nadia memory 219", caption: "candid and cute 🐰", tags: ["us"] },
      { src: "./assets/uploads/IMG_6660.jpg", alt: "Nadia memory 220", caption: "our favorite memory", tags: ["me"] },
      { src: "./assets/uploads/IMG_6661.jpg", alt: "Nadia memory 221", caption: "beautiful as always ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_6662.jpg", alt: "Nadia memory 222", caption: "together 💑", tags: ["us"] },
      { src: "./assets/uploads/IMG_6663.jpg", alt: "Nadia memory 223", caption: "happy day 🌷", tags: ["me"] },
      { src: "./assets/uploads/IMG_6664.jpg", alt: "Nadia memory 224", caption: "lovely smile ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_6665.jpg", alt: "Nadia memory 225", caption: "golden moment ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_6667.jpg", alt: "Nadia memory 226", caption: "us being us 💕", tags: ["me"] },
      { src: "./assets/uploads/IMG_6668.jpg", alt: "Nadia memory 227", caption: "pure joy 🌟", tags: ["us"] },
      { src: "./assets/uploads/IMG_6669.jpg", alt: "Nadia memory 228", caption: "sweet capture 📸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6673.jpg", alt: "Nadia memory 229", caption: "forever moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_6674.jpg", alt: "Nadia memory 230", caption: "that smile tho 🌷", tags: ["us"] },
      { src: "./assets/uploads/IMG_6675.jpg", alt: "Nadia memory 231", caption: "cute as always 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6676.jpg", alt: "Nadia memory 232", caption: "soft and lovely ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_6677.jpg", alt: "Nadia memory 233", caption: "a little moment ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_6678.jpg", alt: "Nadia memory 234", caption: "my favorite 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6759.jpg", alt: "Nadia memory 235", caption: "sweet moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_6760.jpg", alt: "Nadia memory 236", caption: "always smiling 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6788.jpg", alt: "Nadia memory 237", caption: "candid and cute 🐰", tags: ["us"] },
      { src: "./assets/uploads/IMG_6789.jpg", alt: "Nadia memory 238", caption: "our favorite memory", tags: ["me"] },
      { src: "./assets/uploads/IMG_6790.jpg", alt: "Nadia memory 239", caption: "beautiful as always ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_6792.jpg", alt: "Nadia memory 240", caption: "together 💑", tags: ["us"] },
      { src: "./assets/uploads/IMG_6793.jpg", alt: "Nadia memory 241", caption: "happy day 🌷", tags: ["me"] },
      { src: "./assets/uploads/IMG_6794.jpg", alt: "Nadia memory 242", caption: "lovely smile ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_6795.jpg", alt: "Nadia memory 243", caption: "golden moment ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_6796.jpg", alt: "Nadia memory 244", caption: "us being us 💕", tags: ["me"] },
      { src: "./assets/uploads/IMG_6797.jpg", alt: "Nadia memory 245", caption: "pure joy 🌟", tags: ["us"] },
      { src: "./assets/uploads/IMG_6798.jpg", alt: "Nadia memory 246", caption: "sweet capture 📸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6800.jpg", alt: "Nadia memory 247", caption: "forever moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_6852.JPG", alt: "Nadia memory 254", caption: "always smiling 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_6853.JPG", alt: "Nadia memory 255", caption: "candid and cute 🐰", tags: ["us"] },
      { src: "./assets/uploads/IMG_6854.JPG", alt: "Nadia memory 256", caption: "our favorite memory", tags: ["me"] },
      { src: "./assets/uploads/IMG_6996.jpg", alt: "Nadia memory 257", caption: "beautiful as always ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_7017.jpg", alt: "Nadia memory 258", caption: "together 💑", tags: ["us"] },
      { src: "./assets/uploads/IMG_7019.jpg", alt: "Nadia memory 259", caption: "happy day 🌷", tags: ["me"] },
      { src: "./assets/uploads/IMG_7024.jpg", alt: "Nadia memory 260", caption: "lovely smile ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_7032.jpg", alt: "Nadia memory 261", caption: "golden moment ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_7033.jpg", alt: "Nadia memory 262", caption: "us being us 💕", tags: ["me"] },
      { src: "./assets/uploads/IMG_7237.jpg", alt: "Nadia memory 263", caption: "pure joy 🌟", tags: ["us"] },
      { src: "./assets/uploads/IMG_7238.jpg", alt: "Nadia memory 264", caption: "sweet capture 📸", tags: ["us"] },
      { src: "./assets/uploads/IMG_7239.jpg", alt: "Nadia memory 265", caption: "forever moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_7240.jpg", alt: "Nadia memory 266", caption: "that smile tho 🌷", tags: ["us"] },
      { src: "./assets/uploads/IMG_7241.jpg", alt: "Nadia memory 267", caption: "cute as always 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_7242.jpg", alt: "Nadia memory 268", caption: "soft and lovely ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_7243.jpg", alt: "Nadia memory 269", caption: "a little moment ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_7348.jpg", alt: "Nadia memory 270", caption: "my favorite 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_7360.jpg", alt: "Nadia memory 271", caption: "sweet moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_7363.jpg", alt: "Nadia memory 272", caption: "always smiling 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_7364.jpg", alt: "Nadia memory 273", caption: "candid and cute 🐰", tags: ["us"] },
      { src: "./assets/uploads/IMG_7365.jpg", alt: "Nadia memory 274", caption: "our favorite memory", tags: ["me"] },
      { src: "./assets/uploads/IMG_7366.jpg", alt: "Nadia memory 275", caption: "beautiful as always ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_7367.jpg", alt: "Nadia memory 276", caption: "together 💑", tags: ["us"] },
      { src: "./assets/uploads/IMG_7368.jpg", alt: "Nadia memory 277", caption: "happy day 🌷", tags: ["me"] },
      { src: "./assets/uploads/IMG_7369.jpg", alt: "Nadia memory 278", caption: "lovely smile ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_7370.jpg", alt: "Nadia memory 279", caption: "golden moment ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_7371.jpg", alt: "Nadia memory 280", caption: "us being us 💕", tags: ["me"] },
      { src: "./assets/uploads/IMG_7372.jpg", alt: "Nadia memory 281", caption: "pure joy 🌟", tags: ["us"] },
      { src: "./assets/uploads/IMG_7373.jpg", alt: "Nadia memory 282", caption: "sweet capture 📸", tags: ["us"] },
      { src: "./assets/uploads/IMG_7374.jpg", alt: "Nadia memory 283", caption: "forever moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_7375.jpg", alt: "Nadia memory 284", caption: "that smile tho 🌷", tags: ["us"] },
      { src: "./assets/uploads/IMG_7376.jpg", alt: "Nadia memory 285", caption: "cute as always 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_7377.jpg", alt: "Nadia memory 286", caption: "soft and lovely ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_7378.jpg", alt: "Nadia memory 287", caption: "a little moment ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_7379.jpg", alt: "Nadia memory 288", caption: "my favorite 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_7405.PNG", alt: "Nadia memory 289", caption: "sweet moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_7406.PNG", alt: "Nadia memory 290", caption: "always smiling 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_7407.PNG", alt: "Nadia memory 291", caption: "candid and cute 🐰", tags: ["us"] },
      { src: "./assets/uploads/IMG_7408.PNG", alt: "Nadia memory 292", caption: "our favorite memory", tags: ["me"] },
      { src: "./assets/uploads/IMG_7409.PNG", alt: "Nadia memory 293", caption: "beautiful as always ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_7410.PNG", alt: "Nadia memory 294", caption: "together 💑", tags: ["us"] },
      { src: "./assets/uploads/IMG_7411.PNG", alt: "Nadia memory 295", caption: "happy day 🌷", tags: ["me"] },
      { src: "./assets/uploads/IMG_7494.jpg", alt: "Nadia memory 296", caption: "lovely smile ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_7495.jpg", alt: "Nadia memory 297", caption: "golden moment ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_7496.jpg", alt: "Nadia memory 298", caption: "us being us 💕", tags: ["me"] },
      { src: "./assets/uploads/IMG_7497.jpg", alt: "Nadia memory 299", caption: "pure joy 🌟", tags: ["us"] },
      { src: "./assets/uploads/IMG_7604.jpg", alt: "Nadia memory 300", caption: "sweet capture 📸", tags: ["us"] },
      { src: "./assets/uploads/IMG_7613.jpg", alt: "Nadia memory 301", caption: "forever moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_7614.jpg", alt: "Nadia memory 302", caption: "that smile tho 🌷", tags: ["us"] },
      { src: "./assets/uploads/IMG_7615.jpg", alt: "Nadia memory 303", caption: "cute as always 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_7616.jpg", alt: "Nadia memory 304", caption: "soft and lovely ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_7626.jpg", alt: "Nadia memory 305", caption: "a little moment ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_7628.jpg", alt: "Nadia memory 306", caption: "my favorite 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_7630.jpg", alt: "Nadia memory 307", caption: "sweet moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_7631.jpg", alt: "Nadia memory 308", caption: "always smiling 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_7633.jpg", alt: "Nadia memory 309", caption: "candid and cute 🐰", tags: ["us"] },
      { src: "./assets/uploads/IMG_7634.jpg", alt: "Nadia memory 310", caption: "our favorite memory", tags: ["me"] },
      { src: "./assets/uploads/IMG_7635.jpg", alt: "Nadia memory 311", caption: "beautiful as always ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_7637.jpg", alt: "Nadia memory 312", caption: "together 💑", tags: ["us"] },
      { src: "./assets/uploads/IMG_7640.jpg", alt: "Nadia memory 313", caption: "happy day 🌷", tags: ["me"] },
      { src: "./assets/uploads/IMG_7643.jpg", alt: "Nadia memory 314", caption: "lovely smile ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_7644.jpg", alt: "Nadia memory 315", caption: "golden moment ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_7645.jpg", alt: "Nadia memory 316", caption: "us being us 💕", tags: ["me"] },
      { src: "./assets/uploads/IMG_7646.jpg", alt: "Nadia memory 317", caption: "pure joy 🌟", tags: ["us"] },
      { src: "./assets/uploads/IMG_7647.jpg", alt: "Nadia memory 318", caption: "sweet capture 📸", tags: ["us"] },
      { src: "./assets/uploads/IMG_7648.jpg", alt: "Nadia memory 319", caption: "forever moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_7649.jpg", alt: "Nadia memory 320", caption: "that smile tho 🌷", tags: ["us"] },
      { src: "./assets/uploads/IMG_7650.jpg", alt: "Nadia memory 321", caption: "cute as always 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_7651.jpg", alt: "Nadia memory 322", caption: "soft and lovely ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_7652.jpg", alt: "Nadia memory 323", caption: "a little moment ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_7653.jpg", alt: "Nadia memory 324", caption: "my favorite 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_7654.jpg", alt: "Nadia memory 325", caption: "sweet moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_7655.jpg", alt: "Nadia memory 326", caption: "always smiling 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_7656.jpg", alt: "Nadia memory 327", caption: "candid and cute 🐰", tags: ["us"] },
      { src: "./assets/uploads/IMG_7657.jpg", alt: "Nadia memory 328", caption: "our favorite memory", tags: ["me"] },
      { src: "./assets/uploads/IMG_7658.jpg", alt: "Nadia memory 329", caption: "beautiful as always ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_7659.jpg", alt: "Nadia memory 330", caption: "together 💑", tags: ["us"] },
      { src: "./assets/uploads/IMG_7660.jpg", alt: "Nadia memory 331", caption: "happy day 🌷", tags: ["me"] },
      { src: "./assets/uploads/IMG_7661.jpg", alt: "Nadia memory 332", caption: "lovely smile ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_7662.jpg", alt: "Nadia memory 333", caption: "golden moment ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_7663.jpg", alt: "Nadia memory 334", caption: "us being us 💕", tags: ["me"] },
      { src: "./assets/uploads/IMG_7664.jpg", alt: "Nadia memory 335", caption: "pure joy 🌟", tags: ["us"] },
      { src: "./assets/uploads/IMG_7665.jpg", alt: "Nadia memory 336", caption: "sweet capture 📸", tags: ["us"] },
      { src: "./assets/uploads/IMG_7666.jpg", alt: "Nadia memory 337", caption: "forever moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_7667.jpg", alt: "Nadia memory 338", caption: "that smile tho 🌷", tags: ["us"] },
      { src: "./assets/uploads/IMG_7668.jpg", alt: "Nadia memory 339", caption: "cute as always 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_7669.jpg", alt: "Nadia memory 340", caption: "soft and lovely ✨", tags: ["me"] },
      { src: "./assets/uploads/IMG_7670.jpg", alt: "Nadia memory 341", caption: "a little moment ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_7671.jpg", alt: "Nadia memory 342", caption: "my favorite 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_7672.jpg", alt: "Nadia memory 343", caption: "sweet moment ♡", tags: ["me"] },
      { src: "./assets/uploads/IMG_7673.jpg", alt: "Nadia memory 344", caption: "always smiling 🌸", tags: ["us"] },
      { src: "./assets/uploads/IMG_7674.jpg", alt: "Nadia memory 345", caption: "candid and cute 🐰", tags: ["us"] },
      { src: "./assets/uploads/IMG_7675.jpg", alt: "Nadia memory 346", caption: "our favorite memory", tags: ["me"] },
      { src: "./assets/uploads/IMG_7676.jpg", alt: "Nadia memory 347", caption: "beautiful as always ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_7677.jpg", alt: "Nadia memory 348", caption: "together 💑", tags: ["us"] },
      { src: "./assets/uploads/IMG_7678.jpg", alt: "Nadia memory 349", caption: "happy day 🌷", tags: ["me"] },
      { src: "./assets/uploads/IMG_7679.jpg", alt: "Nadia memory 350", caption: "lovely smile ♡", tags: ["us"] },
      { src: "./assets/uploads/IMG_7680.jpg", alt: "Nadia memory 351", caption: "golden moment ✨", tags: ["us"] },
      { src: "./assets/uploads/IMG_7681.jpg", alt: "Nadia memory 352", caption: "us being us 💕", tags: ["me"] },
      { src: "./assets/uploads/IMG_7682.jpg", alt: "Nadia memory 353", caption: "pure joy 🌟", tags: ["us"] },
      { src: "./assets/uploads/IMG_7683.jpg", alt: "Nadia memory 354", caption: "sweet capture 📸", tags: ["us"] },    ]
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
        photo: "./assets/uploads/doll-bunny.jpg",
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
      { id: "1UNEuG9DYOWiikf00ayr52",     items: [
      /* --- THAI --- */
      {
        id: "t1",
        category: "thai",
        nameEn: "Tom Yum Goong Jumbo",
        nameTh: "ต้มยำกุ้งแม่น้ำน้ำข้น",
        emoji: "🍲",
        tags: ["Spicy", "Soup", "Signature"],
        spiceLevel: "🌶️🌶️🌶️",
        vibe: "Rich, aromatic, comforting spicy soup",
        pairing: "🧋 Thai Iced Milk Tea & Jasmine Rice",
        whyForNadia: "Hot, creamy, zesty soup with huge prawns — perfect for when Nadia wants something punchy & cozy! ♡"
      },
      {
        id: "t2",
        category: "thai",
        nameEn: "Khao Soi Gai Chiang Mai",
        nameTh: "ข้าวซอยไก่เชียงใหม่",
        emoji: "🍜",
        tags: ["Comforting", "Noodles", "Northern"],
        spiceLevel: "🌶️🌶️",
        vibe: "Crispy noodles, tender chicken & rich coconut curry broth",
        pairing: "🥤 Iced Lime Tea & Pickled Mustard Greens",
        whyForNadia: "Soft chicken leg that melts off the bone with rich Northern Thai curry spices!"
      },
      {
        id: "t3",
        category: "thai",
        nameEn: "Pad Thai Soft-Shell Crab",
        nameTh: "ผัดไทยปูนิ่มกรอบ",
        emoji: "🍝",
        tags: ["Sweet & Sour", "Street Food", "Seafood"],
        spiceLevel: "🌶️",
        vibe: "Chewy rice noodles, tamarind sauce & crunchy crab",
        pairing: "🥥 Fresh Young Coconut",
        whyForNadia: "Classic Pad Thai elevated with golden crispy soft-shell crab!"
      },
      {
        id: "t4",
        category: "thai",
        nameEn: "Som Tum Crab-Pla Ra & Gai Yang",
        nameTh: "ส้มตำปูปลาร้า & ไก่ย่างเขาสวนกวาง",
        emoji: "🥗",
        tags: ["Spicy & Zesty", "Isan", "Favorite"],
        spiceLevel: "🌶️🌶️🌶️🌶️",
        vibe: "Super fiery papaya salad with juicy grilled chicken & sticky rice",
        pairing: "🥤 Iced Chrysanthemum Tea",
        whyForNadia: "The ultimate Isan feast when Nadia craves max spice & bold flavors!"
      },
      {
        id: "t5",
        category: "thai",
        nameEn: "Massaman Beef Shank Curry",
        nameTh: "มัสมั่นเนื้อน่องแก้ว",
        emoji: "🥘",
        tags: ["Rich", "Royal Thai", "Aromatic"],
        spiceLevel: "🌶️",
        vibe: "Tender beef shank, potatoes, peanuts & mild aromatic cinnamon curry",
        pairing: "🍞 Roti Bread or Steamed Rice",
        whyForNadia: "Voted world's best food! Deeply rich, sweet-savory, and warm."
      },
      {
        id: "t6",
        category: "thai",
        nameEn: "Crab Meat Omelette & Seafood Sauce",
        nameTh: "ไข่เจียวปูปูแน่นๆ & น้ำจิ้มซีฟู้ด",
        emoji: "🍳",
        tags: ["Crispy", "Seafood", "Simple"],
        spiceLevel: "🌶️🌶️",
        vibe: "Fluffy 3D golden omelette packed with lump crab meat",
        pairing: "🍚 Jasmine Rice",
        whyForNadia: "Crispy outside, super fluffy inside and packed with premium crab!"
      },

      /* --- CHINESE --- */
      {
        id: "c1",
        category: "chinese",
        nameEn: "Truffle Xiao Long Bao",
        nameTh: "เสี่ยวหลงเปาทรัฟเฟิล",
        emoji: "🥟",
        tags: ["Dim Sum", "Soup Dumpling", "Luxury"],
        spiceLevel: "🌶️0",
        vibe: "Steaming hot pork & black truffle broth wrapped in delicate dough",
        pairing: "☕ Hot Jasmine Tea",
        whyForNadia: "Pop the hot soup dumpling into your spoon with ginger vinegar — pure bliss!"
      },
      {
        id: "c2",
        category: "chinese",
        nameEn: "Crispy Peking Duck Roll",
        nameTh: "เป็ดปักกิ่งหนังกรอบ",
        emoji: "🦆",
        tags: ["Crispy", "Festive", "Classic"],
        spiceLevel: "🌶️0",
        vibe: "Thin steamed pancake, sweet hoisin sauce, cucumber, scallions & glass-crisp duck skin",
        pairing: "🍵 Oolong Tea",
        whyForNadia: "Crispy, sweet, and incredibly satisfying pancake rolls!"
      },
      {
        id: "c3",
        category: "chinese",
        nameEn: "Sichuan Mapo Tofu & Wagyu",
        nameTh: "มาโปเต้าหู้หม่าล่าเนื้อวากิว",
        emoji: "🌶️",
        tags: ["Mala Spicy", "Sichuan", "Hot"],
        spiceLevel: "🌶️🌶️🌶️",
        vibe: "Silken tofu, minced wagyu, peppercorns & numbing mala oil",
        pairing: "🍺 Cold Beverage or Steamed Rice",
        whyForNadia: "Numbing mala heat with silky smooth tofu that goes so fast with rice!"
      },
      {
        id: "c4",
        category: "chinese",
        nameEn: "Hong Kong BBQ Combo Rice",
        nameTh: "ข้าวหน้าเฉโป (หมูกรอบ หมูแดง เป็ด่ย่าง)",
        emoji: "🍱",
        tags: ["BBQ", "Cantonese", "Crispy Pork"],
        spiceLevel: "🌶️0",
        vibe: "Crackling roast pork belly, honey-glazed char siu & roast duck over fragrant rice",
        pairing: "🍵 Hot Milk Tea (HK Style)",
        whyForNadia: "Crispy pork belly crackling sound with sweet glazed char siu!"
      },

      /* --- INDIAN --- */
      {
        id: "i1",
        category: "indian",
        nameEn: "Butter Chicken & Garlic Cheese Naan",
        nameTh: "บัตเตอร์ชีสชิกเก้น & แป้งนานกระเทียมชีส",
        emoji: "🥘",
        tags: ["Creamy", "Curry", "Must Try"],
        spiceLevel: "🌶️",
        vibe: "Velvety tomato-butter gravy, tandoori chicken chunks & fluffy melted cheese naan",
        pairing: "🥛 Mango Lassi",
        whyForNadia: "Dip warm garlic cheese naan into smooth velvety butter chicken gravy! So comforting! ♡"
      },
      {
        id: "i2",
        category: "indian",
        nameEn: "Lamb Shank Dum Biryani",
        nameTh: "ข้าวหมกขาแกะอินเดีย (Lamb Biryani)",
        emoji: "🍚",
        tags: ["Aromatic", "Basmati", "Rich"],
        spiceLevel: "🌶️🌶️",
        vibe: "Fragrant basmati rice layered with slow-cooked tender lamb shank & saffron",
        pairing: "🥛 Mint Raita & Masala Chai",
        whyForNadia: "Rich saffron basmati rice with fall-apart tender lamb!"
      },
      {
        id: "i3",
        category: "indian",
        nameEn: "Paneer Tikka & Samosa Chaat",
        nameTh: "ปาเนียร์ทิกก้า & ซาโมซ่าชาต",
        emoji: "🍢",
        tags: ["Vegetarian", "Street Snack", "Tangy"],
        spiceLevel: "🌶️🌶️",
        vibe: "Char-grilled cottage cheese cubes with tangy tamarind & mint chutney",
        pairing: "☕ Hot Masala Chai",
        whyForNadia: "Tangy, smoky grilled paneer with sweet & spicy chutney drizzle!"
      },

      /* --- WESTERN --- */
      {
        id: "w1",
        category: "western",
        nameEn: "Black Truffle Cream Fettuccine",
        nameTh: "เฟตตูชินี่ครีมซอสทรัฟเฟิลดำ",
        emoji: "🍝",
        tags: ["Truffle", "Pasta", "Romantic"],
        spiceLevel: "🌶️0",
        vibe: "Al dente egg pasta tossed in thick black truffle cream & parmigiano reggiano",
        pairing: "🍷 Sparkling Rosé or White Wine",
        whyForNadia: "Intense truffle aroma, super creamy, luxurious pasta night for Nadia! 🍝✨"
      },
      {
        id: "w2",
        category: "western",
        nameEn: "Wagyu Ribeye Steak & Truffle Fries",
        nameTh: "สเต๊กเนื้อวากิวริบอาย & เฟรนช์ฟรายส์ทรัฟเฟิล",
        emoji: "🥩",
        tags: ["Steak", "Wagyu", "Dinner Date"],
        spiceLevel: "🌶️0",
        vibe: "Seared medium-rare wagyu steak, red wine jus, garlic butter & crispy parmesan fries",
        pairing: "🍷 Cabernet Sauvignon",
        whyForNadia: "Juicy, tender wagyu beef that melts in your mouth with garlic butter finish!"
      },
      {
        id: "w3",
        category: "western",
        nameEn: "Wood-Fired Truffle & Burrata Pizza",
        nameTh: "พิซซ่าเตาถ่านบูร์ราต้าทรัฟเฟิล",
        emoji: "🍕",
        tags: ["Pizza", "Burrata", "Italian"],
        spiceLevel: "🌶️0",
        vibe: "Neapolitan leopard-spotted crust, fresh creamy burrata ball, prosciutto & truffle oil",
        pairing: "🥂 Italian Prosecco",
        whyForNadia: "Break open the creamy fresh burrata cheese right over warm wood-fired pizza!"
      },
      {
        id: "w4",
        category: "western",
        nameEn: "Lobster Bisque & Garlic Bread",
        nameTh: "ซุปล็อบสเตอร์บิสก์ & ขนมปังกระเทียม",
        emoji: "🥣",
        tags: ["Seafood", "Soup", "Cozy"],
        spiceLevel: "🌶️0",
        vibe: "Velvety roasted lobster cream soup served with toasted garlic sourdough",
        pairing: "🥂 Chardonnay",
        whyForNadia: "Warm, rich, seafood bisque to dip crunchy toasted garlic bread into!"
      },

      /* --- FUSION --- */
      {
        id: "f1",
        category: "fusion",
        nameEn: "Aburi Salmon Cheese & Foie Gras Roll",
        nameTh: "แซลมอนลนไฟฟัวกราส์ชีสโรลล์",
        emoji: "🍣",
        tags: ["Sushi", "Torched", "Japanese Fusion"],
        spiceLevel: "🌶️",
        vibe: "Torched fatty salmon, seared foie gras, spicy mayo, unagi sauce & crispy tempura flakes",
        pairing: "🍶 Cold Sake or Yuzu Soda",
        whyForNadia: "Smoky torched salmon with rich creamy foie gras — melts instantly on your tongue! 🍣"
      },
      {
        id: "f2",
        category: "fusion",
        nameEn: "Korean Bulgogi Tacos & Kimchi Slaw",
        nameTh: "ทาโก้เนื้อบูลโกกิเกาหลี & กิมจิสลอว์",
        emoji: "🌮",
        tags: ["Korean Mex", "Tacos", "Fun"],
        spiceLevel: "🌶️🌶️",
        vibe: "Sweet savory marinaded beef, warm tortillas, crunch kimchi slaw & gochujang crema",
        pairing: "🍹 Passionfruit Margarita or Yuzu Ale",
        whyForNadia: "Fun, messy, super flavorful blend of sweet Korean BBQ beef and spicy taco crunch!"
      },
      {
        id: "f3",
        category: "fusion",
        nameEn: "Spicy Tom Yum Carbonara Pasta",
        nameTh: "สปาเก็ตตี้คาโบนาร่าต้มยำกุ้งสด",
        emoji: "🍝",
        tags: ["Pasta Fusion", "Spicy Cream", "Popular"],
        spiceLevel: "🌶️🌶️",
        vibe: "Rich egg-cream carbonara infused with lemongrass, kaffir lime & jumbo prawns",
        pairing: "🥤 Iced Peach Tea",
        whyForNadia: "The best of both worlds — rich creamy Italian carbonara with zesty Thai Tom Yum kick!"
      },

      /* --- DESSERTS & DRINKS --- */
      {
        id: "d1",
        category: "desserts",
        nameEn: "Mango Sticky Rice & Coconut Cream",
        nameTh: "ข้าวเหนียวมะม่วงอกร่องทอง",
        emoji: "🥭",
        tags: ["Sweet", "Thai Dessert", "Iconic"],
        spiceLevel: "🌶️0",
        vibe: "Ripe sweet yellow mango slices, warm coconut butterfly pea sticky rice & crispy mung beans",
        pairing: "☕ Warm Jasmine Tea",
        whyForNadia: "Warm sweet coconut rice with ice-cold sweet ripe mango — Nadia's forever dessert! 🥭"
      },
      {
        id: "d2",
        category: "desserts",
        nameEn: "Fluffy Strawberry Soufflé Pancakes",
        nameTh: "ซูเฟล่แพนเค้กสตรอว์เบอร์รี่สด",
        emoji: "🥞",
        tags: ["Fluffy", "Japanese Dessert", "Cute"],
        spiceLevel: "🌶️0",
        vibe: "Jiggly souffle pancake stack, fresh strawberries, vanilla chantilly cream & maple drizzle",
        pairing: "🧋 Iced Matcha Latte",
        whyForNadia: "Soft, pillowy, fluffy cloud pancakes that melt in your mouth! So cute & sweet ♡"
      },
      {
        id: "d3",
        category: "desserts",
        nameEn: "Matcha Bingsu & Red Bean Mochi",
        nameTh: "บิงซูมัจฉะถั่วแดงโมจินุ่ม",
        emoji: "🍧",
        tags: ["Shaved Ice", "Korean", "Refreshing"],
        spiceLevel: "🌶️0",
        vibe: "Snowy milk shaved ice, premium Uji matcha sauce, chewy dango mochi & sweet red bean",
        pairing: "🍵 Hot Green Tea",
        whyForNadia: "Super refreshing, cool matcha shaved ice with chewy homemade mochi!"
      },

      /* --- OTHERS & HOTPOT --- */
      {
        id: "o1",
        category: "others",
        nameEn: "Haidilao Shabu-Shabu Hotpot",
        nameTh: "ชาบูหมาล่าไฮตี่เลา (Haidilao Hotpot)",
        emoji: "🍲",
        tags: ["Hotpot", "Mala & Bone Broth", "Social"],
        spiceLevel: "🌶️🌶️🌶️",
        vibe: "Split pot with Mala soup & Collagen Bone broth, sliced A5 Wagyu, shrimp paste & custom dipping sauce",
        pairing: "🧋 Plum Juice or Milk Tea",
        whyForNadia: "Dancing noodles, DIY sauce bar, and hot bubbling soup — fun dining night with Nadia! 🍲✨"
      },
      {
        id: "o2",
        category: "others",
        nameEn: "Korean Fried Chicken & Beer (Chimeg)",
        nameTh: "ไก่ทอดเกาหลีซอสซอยการ์ลิค & ช็องยัง",
        emoji: "🍗",
        tags: ["Korean", "Crispy", "Comfort Food"],
        spiceLevel: "🌶️🌶️",
        vibe: "Double-fried extra crispy chicken wings glazed in garlic soy & spicy honey mustard",
        pairing: "🍺 Cold Draft Beer or Pickled Radish",
        whyForNadia: "Extra crunch sound on every bite with sweet garlic glaze!"
      },
      {
        id: "o3",
        category: "others",
        nameEn: "Acai Berry Superfood Bowl",
        nameTh: "อะซาอิโบลว์ผลไม้สด & กราโนล่า",
        emoji: "🫐",
        tags: ["Healthy", "Cafe", "Fresh"],
        spiceLevel: "🌶️0",
        vibe: "Chilled organic acai smoothie base, fresh blueberries, kiwi, almond butter & cacao nibs",
        pairing: "☕ Cold Brew Coffee or Iced Oat Latte",
      }
    ]
  },

  /* -------------------------- COSMIC VOYAGE / SPACE 🚀🌌 ------------------- */
  space: {
    eyebrow: "✨ NADIA'S COSMIC VOYAGE THROUGH THE STARS ✨",
    headline: "Space Voyage 🚀",
    description: "Build Nadia's custom spaceship, explore magical planets, and catch falling shooting stars in the galaxy ♡",
    planets: [
      {
        id: "p1",
        nameEn: "Planet Pink Nebula",
        nameTh: "ดาวเคราะห์เนบิวล่าสีชมพู 🌸",
        icon: "🪐",
        color: "#ff75a0",
        tag: "ROMANTIC NEBULA",
        vibe: "A soft, glowing pink planet filled with stardust oceans and floating cloud islands.",
        secretNote: "If stars could count how much joy Nadia brings, the universe wouldn't have enough stars! ♡✨",
        sound: "✨ Stardust Resonance"
      },
      {
        id: "p2",
        nameEn: "Moon Cafe & Bakery",
        nameTh: "สถานีคาเฟ่บนดวงจันทร์ ☕",
        icon: "🌙",
        color: "#fde047",
        tag: "COZY ORBIT",
        vibe: "A lunar station serving hot matcha lattes, soufflé pancakes, and zero-gravity croissants.",
        secretNote: "Where Nadia sits by the crater window with her warm cup, watching Earth float by. ☕🥐",
        sound: "☕ Lunar Lo-Fi Beats"
      },
      {
        id: "p3",
        nameEn: "Constellation of Smiles",
        nameTh: "กลุ่มดาวแห่งรอยยิ้ม 🌠",
        icon: "✨",
        color: "#a855f7",
        tag: "MEMORY STARLIGHT",
        vibe: "A cluster of glowing stars where every star shines with a happy memory.",
        secretNote: "Her smile is brighter than a supernova! ✨",
        sound: "🎵 Starlight Chimes"
      },
      {
        id: "p4",
        nameEn: "Crystaloid Planet",
        nameTh: "ดาวเคราะห์คริสตัลนำโชค 🔮",
        icon: "🔮",
        color: "#38bdf8",
        tag: "LUCKY FORTUNE",
        vibe: "A sparkling planet made of pure quartz crystals that grant wishes to passing astronauts.",
        secretNote: "Wish granted: Unlimited happiness, sweet treats, and love for Nadia today! 🔮✨",
        sound: "💎 Crystal Resonance"
      },
      {
        id: "p5",
        nameEn: "Saturn's Golden Ring Station",
        nameTh: "สถานีวงแหวนดาวเสาร์ 🪐",
        icon: "🛸",
        color: "#fbbf24",
        tag: "STARGAZING LOUNGE",
        vibe: "A luxury orbital lounge built right on Saturn's golden ice rings.",
        secretNote: "The prettiest view in the entire solar system is right here with Nadia. 🪐💖",
        sound: "🌌 Ambient Solar Wind"
      }
    ],
    fortunes: [
      "✨ A shooting star just brought Nadia 10,000 points of pure luck today!",
      "💖 Supernova Blessing: Nadia will eat something insanely delicious today!",
      "🌌 Cosmic Secret: Nadia's smile makes the galaxy 100x brighter!",
      "⭐ Starlight Wish: Your next trip will be full of magic & unforgettable photos!",
      "🔮 Galaxy Fortune: Today is officially a 100/10 perfect day for Nadia!"
    ]
  }
};

