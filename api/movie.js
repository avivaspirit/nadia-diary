// /api/movie.js — Vercel Serverless Function
// Calls Gemini to recommend a romantic movie/series for Nadia ♡

const GEMINI_KEYS = [
  process.env.GEMINI_KEY_0,
  process.env.GEMINI_KEY_1,
  process.env.GEMINI_KEY_2,
  process.env.GEMINI_KEY_3,
  process.env.GEMINI_KEY_4,
].filter(Boolean);

function buildPrompt() {
  const genres = [
    "romantic comedy", "classic romance", "K-drama romance", "anime romance",
    "feel-good adventure", "cozy slice-of-life", "musical romance", "period romance",
    "indie romance", "holiday romance", "friends-to-lovers", "enemies-to-lovers"
  ];
  const moods = [
    "cozy and warm", "funny and light", "emotional and beautiful",
    "adventurous and fun", "sweet and wholesome", "passionate and dramatic"
  ];
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  return `You are a cozy movie recommender for a sweet couple. Pick ONE ${pick(genres)} movie or series with a ${pick(moods)} vibe.

IMPORTANT: Be creative and varied. Don't pick obvious popular titles every time. Explore lesser-known gems, international films, K-dramas, and anime too. Each call should feel like a fresh discovery.

Respond ONLY with valid JSON (no markdown, no backticks). Use this exact shape:
{
  "title": "Movie/Series Name",
  "year": 2024,
  "type": "Movie" or "Series",
  "genre": "Romantic Comedy",
  "rating": "PG-13",
  "duration": "1h 48m",
  "mood": "warm & cozy",
  "where_to_watch": "Netflix",
  "synopsis": "2-3 sentence synopsis without spoilers",
  "why_for_them": "1 sentence why this couple would love it",
  "sweet_message": "a short cute note like 'Perfect for a cuddle night ♡'",
  "emoji": "🍿"
}

Rules:
- Pick from well-known, actually good titles (rating 6.5+ on IMDB)
- Vary genres: rom-com, classic romance, K-drama, anime romance, feel-good
- Don't repeat the same title often — be creative
- Keep synopsis spoiler-free
- Keep it concise and cute`;
}

export default async function handler(req, res) {
  // CORS + cache headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (GEMINI_KEYS.length === 0) {
    res.status(500).json({ error: 'No API keys configured' });
    return;
  }

  const prompt = buildPrompt();

  // Try each key until one works
  for (let i = 0; i < GEMINI_KEYS.length; i++) {
    const key = GEMINI_KEYS[i];
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            thinkingConfig: { thinkingBudget: 0 },
            temperature: 1.5,
            maxOutputTokens: 800,
          },
        }),
      });

      if (resp.status === 429) {
        continue; // rate limited, try next key
      }

      if (!resp.ok) {
        const errText = await resp.text();
        console.error(`Key ${i} error:`, resp.status, errText);
        continue;
      }

      const data = await resp.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

      // Parse JSON from response (strip any markdown wrapping)
      const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      const movie = JSON.parse(cleaned);

      res.status(200).json(movie);
      return;
    } catch (err) {
      console.error(`Key ${i} exception:`, err.message);
      continue;
    }
  }

  // All keys failed — return a fallback recommendation
  const fallbacks = [
    {
      title: "About Time", year: 2013, type: "Movie", genre: "Romance / Sci-Fi",
      rating: "R", duration: "2h 3m", mood: "warm & heartfelt",
      where_to_watch: "Netflix",
      synopsis: "A young man discovers he can time travel and uses it to win the heart of the girl of his dreams — but learns that the best moments are the ordinary ones.",
      why_for_them: "Because every ordinary day together is worth reliving ♡",
      sweet_message: "Perfect for a cozy night in together 🍿",
      emoji: "⏰"
    },
    {
      title: "Crash Landing on You", year: 2019, type: "Series", genre: "K-Drama / Romance",
      rating: "TV-14", duration: "16 episodes", mood: "epic & emotional",
      where_to_watch: "Netflix",
      synopsis: "A South Korean heiress crash-lands in North Korea and falls in love with the soldier who finds her.",
      why_for_them: "Because love has no borders — and neither does a good binge ♡",
      sweet_message: "Get the snacks ready, this one's a journey 💕",
      emoji: "🪂"
    },
    {
      title: "Your Name (君の名は)", year: 2016, type: "Movie", genre: "Anime / Romance",
      rating: "PG", duration: "1h 46m", mood: "magical & emotional",
      where_to_watch: "Crunchyroll / VOD",
      synopsis: "Two teenagers who have never met discover they are swapping bodies in their sleep, leading to a desperate search for each other.",
      why_for_them: "Because finding each other in this big world is magic ✨",
      sweet_message: "Have tissues ready — in the best way 🌸",
      emoji: "🌙"
    },
    {
      title: "Pride & Prejudice", year: 2005, type: "Movie", genre: "Period Romance",
      rating: "PG", duration: "2h 9m", mood: "swoon-worthy",
      where_to_watch: "Netflix / Prime",
      synopsis: "Elizabeth Bennet and Mr. Darcy navigate pride, prejudice, and undeniable chemistry in 19th-century England.",
      why_for_them: "Because the slow-burn romance never gets old ♡",
      sweet_message: "Cozy blanket, warm tea, Mr. Darcy — perfect 🫖",
      emoji: "💐"
    },
    {
      title: "To All the Boys I've Loved Before", year: 2018, type: "Movie", genre: "Romantic Comedy",
      rating: "PG-13", duration: "1h 39m", mood: "cute & fun",
      where_to_watch: "Netflix",
      synopsis: "A teenage girl's secret love letters are mailed out, leading to a fake romance that turns into something real.",
      why_for_them: "Because fake dating to real feelings is the best trope ♡",
      sweet_message: "Light, fluffy, and adorable — just like you two 🐰",
      emoji: "✉️"
    },
  ];

  const pick = fallbacks[Math.floor(Math.random() * fallbacks.length)];
  res.status(200).json({ ...pick, _fallback: true });
}
