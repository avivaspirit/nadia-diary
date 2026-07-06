export default async function handler(req, res) {
  // CORS + method
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages, context } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  const GROQ_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  // Build system prompt based on context
  let systemPrompt = `You are a warm, friendly personal stylist and movie advisor for Nadia's Diary — a romantic personal website.
Keep responses short, sweet, and conversational (2-4 sentences max).
Use occasional emoji naturally. Speak as if talking to a close friend.
If asked about fashion: give specific, actionable outfit suggestions.
If asked about movies: recommend based on mood, give 2-3 picks with brief reasons.
Be personal and caring — this is a gift website for someone special.`;

  if (context === 'fashion') {
    systemPrompt += `\n\nYou are a FASHION STYLIST. When suggesting outfits, include specific items (top, bottom, shoes, accessories, hair, makeup).
Consider: Sweet, Spicy, Sporty, Vintage, Glam/HiSo, Princess/Disney, Cozy, Y2K, and Street styles.
Mix and match across styles when asked. Always be encouraging!`;
  } else if (context === 'movies') {
    systemPrompt += `\n\nYou are a MOVIE BUDDY. Ask about mood (cozy, adventurous, romantic, thriller, fun) and recommend accordingly.
Consider both popular and lesser-known gems. Mention if something is perfect for a cozy date night.`;
  }

  try {
    const groqResp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        max_tokens: 400,
        temperature: 0.8
      })
    });

    if (!groqResp.ok) {
      const errText = await groqResp.text();
      return res.status(502).json({ error: 'AI service error', detail: errText.slice(0, 200) });
    }

    const data = await groqResp.json();
    const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not think of anything...';
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: 'Request failed', detail: err.message });
  }
}
