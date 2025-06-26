// pages/api/subscribe.ts
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY!;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID!;
  const DATACENTER = API_KEY.split('-')[1]; // e.g., us21

  const data = {
    email_address: email,
    status: 'subscribed',
  };

  const response = await fetch(`https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`, {
    method: 'POST',
    headers: {
      Authorization: `apikey ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.status === 200 || response.status === 201) {
    return res.status(200).json({ message: 'Success! Check your email.' });
  } else {
    const error = await response.json();
    return res.status(400).json({ error: error.detail || 'Something went wrong' });
  }
}