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
      photo: { src: "./assets/uploads/nadia-note-1.jpg", alt: "Photo of Nadia", caption: "the diary girl" }
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
        src: "./assets/uploads/nadia-note-2.jpg",
        alt: "Nadia by a blue decorated door",
        caption: "soft and bright"
      }
    },

    moments: {
      eyebrow: "Little moments ♡",
      title: "Small memories with their own sparkle.",
      /* Polaroids on the scrapbook wall. Tap any photo to open the gallery. */
      items: [
        { src: "./assets/uploads/nadia-note-couple.jpg", alt: "Nadia and Mac together",        caption: "little us moment" },
        { src: "./assets/uploads/nadia-note-3.jpg",      alt: "Nadia with a birthday dessert", caption: "night sparkle" },
        { src: "./assets/uploads/nadia-note-4.jpg",      alt: "Nadia at dinner",               caption: "little bunny" }
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
        num: "04", emoji: "📖", title: "Our Story",
        text: "A little timeline of the moments that brought us here, one chapter at a time.",
        href: "./story.html"
      },
      {
        num: "05", emoji: "📸", title: "Photo Gallery",
        text: "Every little moment, captured together in one cozy scrapbook wall.",
        href: "./gallery.html"
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
    eyebrow: "Our Story 📖",
    title: "Every little chapter that led us here.",
    intro: "A growing timeline of the moments that made us, us. From day one to forever.",
    milestones: [
      {
        date: "May 21, 2026",
        emoji: "💕",
        title: "Day One",
        text: "The day everything started. The first hello, the first smile, the moment our story began.",
        photo: ""
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
      { src: "./assets/uploads/nadia-date-night.jpg",      alt: "Nadia in a red dress",      caption: "date night energy", tags: ["me"] },
      { src: "./assets/uploads/nadia-with-friends.jpg",    alt: "Nadia with friends",        caption: "good company", tags: ["me"] },
      { src: "./assets/uploads/nadia-marble-showroom.jpg", alt: "Nadia at marble showroom",  caption: "business energy", tags: ["me"] },
      { src: "./assets/uploads/birthday-solo-1.jpg",       alt: "A sweet memory",            caption: "birthday sparkle", tags: ["birthday"] },
      { src: "./assets/uploads/birthday-solo-2-web.jpg",   alt: "A sweet memory",            caption: "birthday glow", tags: ["birthday"] },
      { src: "./assets/uploads/birthday-couple-1.jpg",     alt: "Together",                  caption: "us, always", tags: ["birthday","us"] },
      { src: "./assets/uploads/birthday-couple-2.jpg",     alt: "Together",                  caption: "forever vibes", tags: ["birthday","us"] }
    ]
  },

  /* ------------------------------ NADIA'S DOLLS ------------------------- */
  dolls: {
    eyebrow: "Nadia's tiny cabinet 🧸",
    title: "A tiny cabinet of soft treasures.",
    intro: "Plushies, charms, and little finds sit together like a private mini museum. Tap a cabinet door to peek inside each tiny story 🗝️.",
    heroPhoto: {
      src: "./assets/uploads/nadia-cabinet-hero.jpg",
      alt: "Nadia holding flowers with a night city view",
      caption: "keeper of the cabinet"
    },
    shelfEyebrow: "Tiny cabinet stories",
    shelfTitle: "Open a little treasure door",
    /* Each item is one cabinet door. Add more by copying a block. */
    items: [
      {
        name: "Mimi",
        tag: "first little resident",
        photo: "./assets/uploads/doll-mimi.jpg",
        caption: "Mimi sits in the middle of a soft birthday shelf, surrounded by tiny keepsakes and warm pink light. She looks like the first page of a very loved collection."
      },
      {
        name: "Bunny 🎀",
        tag: "เด็กหญิงบันนี่",
        photo: "./assets/uploads/doll-bunny.png",
        caption: "Bunny 🎀 (บันนี่) — เด็กหญิงบันนี่"
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
      { src: "./assets/uploads/birthday-wedding-left.jpg",  alt: "A sweet photo memory together" },
      { src: "./assets/uploads/birthday-wedding-right.jpg", alt: "A sweet photo memory together" }
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
          { src: "./assets/uploads/birthday-solo-1.jpg",     alt: "Photo memory of Nadia", caption: "" },
          { src: "./assets/uploads/birthday-solo-2-web.jpg", alt: "Photo memory of Nadia", caption: "" }
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
          { src: "./assets/uploads/birthday-couple-1.jpg", alt: "Photo memory together", caption: "" },
          { src: "./assets/uploads/birthday-couple-2.jpg", alt: "Photo memory together", caption: "" }
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
    defaultTrack: "6gkbtMtioHgtyGjrMel6ei",
    emoji: "🎵",
    tracks: [
      { id: "74nEGIzIefJhJ5qX7NeIAz", title: "Beggin'",            artist: "Chris Lake, Aluna" },
      { id: "4MpketOLD5KhtgWWOBuk9w", title: "SexOnTheBeat",       artist: "Lino" },
      { id: "6AC9alC8qJ7cXuYifgAfQn", title: "DUVET",              artist: "bôa" },
      { id: "4A56h4B9xUuMMXoKuj18HT", title: "Edge of Desire",     artist: "The National" },
      { id: "1eDI5oU04SLsXl0TfxfwYf", title: "Love Me JeJe",       artist: "King Promise" },
      { id: "6w2rL0ut3mK7TBZmYx4oZK", title: "Kate Spade",         artist: "Lil Yachty" },
      { id: "7904wbV03rb4S0gGliqBk4", title: "HOMEWRECKED",        artist: "Lil Yachty" },
      { id: "1ZXGXdoQLz4GOnWMyipRjj", title: "BIRDS OF A FEATHER", artist: "Billie Eilish" },
      { id: "6gkbtMtioHgtyGjrMel6ei", title: "drop dead",          artist: "Olivia Rodrigo" },
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
