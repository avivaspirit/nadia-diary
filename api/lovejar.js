// /api/lovejar.js — Vercel Serverless Function
// Calls Groq to generate a sweet reason "why I love Nadia" ♡

const GROQ_KEYS = [
  process.env.GROQ_KEY_0,
  process.env.GROQ_KEY_1,
].filter(Boolean);

const PROMPTS = [
  "Write one short, sweet sentence about why someone loves their girlfriend Nadia. She's funny, warm, loves cute things, yoga, and has the kindest heart. Make it feel personal and genuine, like a love note. Keep it under 20 words. No emojis in the sentence itself.",
  "Write one cozy reason why Nadia is loved. She has a soft heart, a pretty smile, and makes ordinary days feel special. Sound like a boyfriend writing in a journal. Under 20 words. No emojis.",
  "Write one tiny love note to Nadia. She brings warmth, laughter, and makes everything feel like home. Sound heartfelt and real. Under 20 words. No emojis.",
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (GROQ_KEYS.length === 0) {
    res.status(500).json({ error: 'No API keys configured' });
    return;
  }

  const prompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];

  for (let i = 0; i < GROQ_KEYS.length; i++) {
    const key = GROQ_KEYS[i];
    try {
      const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            { role: 'system', content: 'You are a sweet, genuine boyfriend writing tiny love notes. Respond with ONLY the love note sentence, no preamble, no quotes, no explanation.' },
            { role: 'user', content: prompt },
          ],
          temperature: 1.3,
          max_tokens: 60,
        }),
      });

      if (resp.status === 429 || resp.status === 403) continue;

      if (!resp.ok) continue;

      const data = await resp.json();
      let text = data?.choices?.[0]?.message?.content?.trim() || '';
      // Clean up: strip quotes, trim
      text = text.replace(/^["']|["']$/g, '').replace(/^["']|["']$/g, '').trim();
      // Remove any emoji that snuck in
      text = text.replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}]/gu, '').trim();

      if (text.length > 0 && text.length < 200) {
        res.status(200).json({ reason: text });
        return;
      }
    } catch (err) {
      console.error(`Groq key ${i} error:`, err.message);
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
