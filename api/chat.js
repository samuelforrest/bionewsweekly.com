export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, context } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('OpenAI API key not found');
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    const systemMessage = {
      role: 'system',
      content: `You are an expert biology tutor with access to a comprehensive database of biology articles from BioNewsWeekly. Your role is to:

1. Help students understand complex biology concepts
2. Provide clear, educational explanations
3. Reference relevant articles when appropriate
4. Adapt your teaching style to the student's level
5. Encourage curiosity and deeper learning

Available Articles Context:
${context || 'No specific articles available'}

Guidelines:
- Be encouraging and supportive
- Use analogies and examples to explain complex concepts
- Break down difficult topics into digestible parts
- Reference specific articles when they're relevant to the question
- Ask follow-up questions to ensure understanding
- Provide study tips and learning strategies when helpful

Keep responses conversational, informative, and educational. Aim for 2-3 paragraphs unless a longer explanation is needed.`
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [systemMessage, ...messages],
        max_tokens: 1500,
        temperature: 0.7,
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

    return res.status(200).json({
      message: data.choices[0].message.content
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}