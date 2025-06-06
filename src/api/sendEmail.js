import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { subject, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'Birthday Tracker <onboarding@resend.dev>', // ✅ use real sender email
      to: ['articfinance2024@gmail.com'], // ✅ my destination
      subject,
      html: `<p>${message}</p>`,
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
