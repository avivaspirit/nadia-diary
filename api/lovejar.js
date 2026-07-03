// /api/lovejar.js — Vercel Serverless Function
// Calls Gemini to generate a sweet reason "why I love Nadia" ♡
// Key order: REVERSED (Key 4 first) to spread load across different keys than FlowSoul

const GEMINI_KEYS = [
  process.env.GEMINI_KEY_4,
  process.env.GEMINI_KEY_3,
  process.env.GEMINI_KEY_2,
  process.env.GEMINI_KEY_1,
  process.env.GEMINI_KEY_0,
].filter(Boolean);

const PROMPTS = [
  "Write one short, sweet sentence about why someone loves their girlfriend Nadia. She's funny, warm, loves cute things, yoga, and has the kindest heart. Make it feel personal and genuine, like a love note. Keep it under 20 words. No emojis in the sentence itself.",
  "Write one cozy reason why Nadia is loved. She has a soft heart, a pretty smile, and makes ordinary days feel special. Sound like a boyfriend writing in a journal. Under 20 words. No emojis.",
  "Write one tiny love note to Nadia. She brings warmth, laughter, and makes everything feel like home. Sound heartfelt and real. Under 20 words. No emojis.",
  "Write one sentence about the little things that make Nadia special. Her laugh, her warmth, her gentle way of caring. Sound authentic and romantic. Under 20 words. No emojis.",
  "Write one loving sentence to Nadia as if whispering it to her. She is the warmth in cold days, the smile in hard moments. Sound intimate and true. Under 20 words. No emojis.",
];

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

  const prompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];

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
            maxOutputTokens: 100,
          },
        }),
      });

      if (resp.status === 429) continue;

      if (!resp.ok) {
        const errText = await resp.text();
        console.error(`Gemini key ${i} error:`, resp.status, errText);
        continue;
      }

      const data = await resp.json();
      let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      // Clean up: strip quotes, trim
      text = text.replace(/^["']|["']$/g, '').replace(/^["']|["']$/g, '').trim();
      // Remove any emoji that snuck in
      text = text.replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}]/gu, '').trim();

      if (text.length > 0 && text.length < 200) {
        res.status(200).json({ reason: text });
        return;
      }
    } catch (err) {
      console.error(`Gemini key ${i} exception:`, err.message);
      continue;
    }
  }

  // Fallback reasons
  const fallbacks = [
    "She makes ordinary days feel like adventures worth remembering.",
    "Her laugh is the soundtrack to every happy moment.",
    "She turns the simplest moments into something worth keeping.",
    "She has the kindest heart, even in the smallest things.",
    "She makes everything feel warm, easy, and like home.",
    "Her smile is the best part of every single day.",
    "She makes love feel like home, adventure, and forever.",
    "She brings warmth and light into every room she walks into.",
    "She is the calm in the chaos and the joy in the quiet.",
    "She makes me smile without even trying.",
  ];

  const pick = fallbacks[Math.floor(Math.random() * fallbacks.length)];
  res.status(200).json({ reason: pick, _fallback: true });
}
