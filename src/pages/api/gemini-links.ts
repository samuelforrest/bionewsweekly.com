// Gemini API proxy for further reading links
// Place your Gemini API key in GEMINI_API_KEY env variable

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    if (!title || !content) {
      return new Response(JSON.stringify({ error: 'Missing title or content' }), { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Gemini API key not set' }), { status: 500 });
    }

    // Compose a prompt for Gemini to return 3-5 further reading links (title, url, description)
    const prompt = `Suggest 3-5 reputable, up-to-date external links for further reading on the following topic. For each, provide a title, URL, and a short description. Return as a JSON array of objects with keys: title, url, description.\n\nTitle: ${title}\nContent: ${content.slice(0, 1000)}`;

    const geminiRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const geminiData = await geminiRes.json();
    const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    // Try to parse JSON from Gemini's response
    let links = [];
    try {
      links = JSON.parse(text);
    } catch {
      // fallback: try to extract JSON from text
      const match = text.match(/\[.*\]/s);
      if (match) {
        try { links = JSON.parse(match[0]); } catch {}
      }
    }
    if (!Array.isArray(links) || !links.length) {
      return new Response(JSON.stringify({ error: 'No links found', raw: text }), { status: 200 });
    }
    return new Response(JSON.stringify({ links }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
