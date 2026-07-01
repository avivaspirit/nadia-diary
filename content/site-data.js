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
      { src: "./assets/uploads/nadia-mac-pov-collage.jpg", alt: "His and her POV collage", caption: "same moment, two views" },
      { src: "./assets/uploads/nadia-note-1.jpg",          alt: "Photo of Nadia",            caption: "the diary girl" },
      { src: "./assets/uploads/nadia-note-2.jpg",          alt: "Nadia by a blue door",      caption: "soft and bright" },
      { src: "./assets/uploads/nadia-note-3.jpg",          alt: "Nadia with dessert",        caption: "night sparkle" },
      { src: "./assets/uploads/nadia-note-4.jpg",          alt: "Nadia at dinner",           caption: "little bunny" },
      { src: "./assets/uploads/nadia-note-couple.jpg",     alt: "Nadia and Mac together",    caption: "little us moment" },
      { src: "./assets/uploads/nadia-cabinet-hero.jpg",    alt: "Nadia with flowers",        caption: "keeper of the cabinet" },
      { src: "./assets/uploads/nadia-date-night.jpg",      alt: "Nadia in a red dress",      caption: "date night energy" },
      { src: "./assets/uploads/birthday-solo-1.jpg",       alt: "A sweet memory",            caption: "birthday sparkle" },
      { src: "./assets/uploads/birthday-solo-2-web.jpg",   alt: "A sweet memory",            caption: "birthday glow" },
      { src: "./assets/uploads/birthday-couple-1.jpg",     alt: "Together",                  caption: "us, always" },
      { src: "./assets/uploads/birthday-couple-2.jpg",     alt: "Together",                  caption: "forever vibes" },
      { src: "./assets/uploads/birthday-wedding-left.jpg",  alt: "A sweet photo memory",      caption: "pretty in pink" },
      { src: "./assets/uploads/birthday-wedding-right.jpg", alt: "A sweet photo memory",      caption: "golden night" },
      { src: "./assets/uploads/doll-mimi.jpg",              alt: "Mimi the doll",             caption: "first little resident" }
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
  /* Spotify track ID — leave empty to disable music feature entirely */
  music: {
    spotifyId: "6gkbtMtioHgtyGjrMel6ei",
    emoji: "🎵"
  }
};
