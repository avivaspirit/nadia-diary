// /api/closet.js — Vercel Serverless Function
// Calls Gemini to recommend an outfit/style for Nadia ♡
// Key order: same as movie.js (reversed to avoid FlowSoul clash)

const GEMINI_KEYS = [
  process.env.GEMINI_KEY_4,
  process.env.GEMINI_KEY_3,
  process.env.GEMINI_KEY_2,
  process.env.GEMINI_KEY_1,
  process.env.GEMINI_KEY_0,
].filter(Boolean);

function buildPrompt(mood, occasion) {
  const moods = [
    "sweet and cute", "bold and confident", "cozy and lazy", "glamorous and fancy",
    "sporty and active", "vintage and romantic", "playful and fun", "elegant and chic"
  ];
  const occasions = [
    "casual day out", "date night", "brunch with friends", "staying cozy at home",
    "a party", "work meeting", "weekend errands", "special anniversary dinner"
  ];
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const userMood = mood || pick(moods);
  const userOccasion = occasion || pick(occasions);

  return `You are a personal stylist for a sweet girl named Nadia. She loves fashion and wants a styled outfit recommendation.

Her vibe today: ${userMood}
Occasion: ${userOccasion}

IMPORTANT: Be creative and varied. Don't repeat the same pieces every time. Mix high-end with affordable. Think real wearable outfits, not costumes.

Respond ONLY with valid JSON (no markdown, no backticks). Use this exact shape:
{
  "style_name": "Short catchy style name (2-3 words)",
  "emoji": "one emoji that represents the vibe",
  "mood": "${userMood}",
  "occasion": "${userOccasion}",
  "color_palette": ["#hex1", "#hex2", "#hex3"],
  "pieces": [
    {"category": "Top", "item": "specific piece description"},
    {"category": "Bottom", "item": "specific piece description"},
    {"category": "Shoes", "item": "specific piece description"},
    {"category": "Accessories", "item": "specific piece description"},
    {"category": "Hair", "item": "hairstyle suggestion"}
  ],
  "why_it_works": "1 sentence why this outfit is perfect for her mood and occasion",
  "style_tip": "1 short styling tip to elevate the look",
  "sweet_note": "a short cute compliment, like 'You'll turn heads today ♡'"
}

Rules:
- Keep descriptions specific and real (mention colors, fabrics, fit)
- Color palette should be 3 colors that work together
- Vary styles: some days casual, some days glam, some days edgy
- Keep it wearable and fashionable`;
}

export default async function handler(req, res) {
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

  const mood = req.query.mood || '';
  const occasion = req.query.occasion || '';
  const prompt = buildPrompt(mood, occasion);

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
            temperature: 1.4,
            maxOutputTokens: 800,
          },
        }),
      });

      if (resp.status === 429) continue;
      if (!resp.ok) {
        console.error(`Key ${i} error:`, resp.status);
        continue;
      }

      const data = await resp.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      const outfit = JSON.parse(cleaned);

      res.status(200).json(outfit);
      return;
    } catch (err) {
      console.error(`Key ${i} exception:`, err.message);
      continue;
    }
  }

  // Fallback outfit
  res.status(200).json({
    style_name: "Cozy Cutie",
    emoji: "🧸",
    mood: mood || "cozy and warm",
    occasion: occasion || "staying cozy at home",
    color_palette: ["#F5E6D3", "#C4956C", "#8B6F47"],
    pieces: [
      { category: "Top", item: "Oversized cream knit sweater, soft and chunky" },
      { category: "Bottom", item: "Caramel wide-leg corduroy pants" },
      { category: "Shoes", item: "Fuzzy sock boots or platform UGGs" },
      { category: "Accessories", item: "Knit beanie, round glasses, canvas tote" },
      { category: "Hair", item: "Messy bun with face-framing pieces" }
    ],
    why_it_works: "Because being cozy never goes out of style",
    style_tip: "Cuff the sleeves to show off layered bracelets",
    sweet_note: "You look adorable even in a sweater ♡",
    _fallback: true
  });
}
