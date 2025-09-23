export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('OpenAI API key not found');
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that suggests relevant external links for further reading on scientific and educational topics. Always respond with valid JSON only, no markdown formatting or code blocks.'
          },
          {
            role: 'user',
            content: `Please suggest 3-5 reputable, up-to-date external links for further reading on the following topic. For each link, provide a title and URL.

Title: ${title}

Content: ${content.slice(0, 1000)}

Please respond with a JSON object containing a "links" array in this exact format:
{
  "links": [
    {
      "title": "Link title",
      "url": "https://example.com"
    }
  ]
}

Ensure all URLs are real, working links to reputable interesting sources on the topic; a mix of sources. They need to work and not have 404 errors.`
          }
        ],
        temperature: 0.3,
        max_tokens: 1024,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      return res.status(response.status).json({ 
        error: 'Failed to get response from OpenAI',
        details: errorData 
      });
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Unexpected OpenAI response structure:', data);
      return res.status(500).json({ error: 'Unexpected response structure from OpenAI' });
    }

    try {
      const generatedText = data.choices[0].message.content;
      const linksData = JSON.parse(generatedText);
      
      return res.status(200).json(linksData);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      return res.status(500).json({ error: 'Failed to parse AI response' });
    }

  } catch (error) {
    console.error('Links API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}