// Gemini API proxy for further reading links
// Place your Gemini API key in GEMINI_API_KEY env variable

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    if (!title || !content) {
      return new Response(JSON.stringify({ error: 'Missing title or content' }), { status: 400 });
    }

    // Use VITE_GEMINI_API_KEY for the API key (Vite exposes env vars with VITE_ prefix)
    const apiKey = process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Gemini API key not set' }), { status: 500 });
    }

    // Compose a prompt for Gemini to return 3-5 further reading links (title, url only)
    const prompt = `Suggest 3 links, up-to-date external links, THEY NEED TO EXIST AND NOT HAVE 404 ERRORS, REPUTABLE AND INTERACTIVE SITES for further reading on the following topic. For each, provide only a title and URL. Return as a JSON array of objects with keys: title, url.\n\nTitle: ${title}\nContent: ${content.slice(0, 1000)}`;

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
