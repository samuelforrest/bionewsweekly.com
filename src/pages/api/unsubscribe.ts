import { NewsletterService } from '@/services/newsletterService'

interface UnsubscribeRequest {
  email: string
}

interface UnsubscribeResponse {
  message?: string
  error?: string
}

// API endpoint for newsletter unsubscription
export default async function handler(
  req: { method: string; body: UnsubscribeRequest }, 
  res: { 
    status: (code: number) => { json: (data: UnsubscribeResponse) => void } 
  }
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const result = await NewsletterService.unsubscribe(email);
    
    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(400).json({ error: result.message });
    }
  } catch (error) {
    console.error('Unsubscription error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
