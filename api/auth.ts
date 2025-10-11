import { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body || {}
    if (email === 'test@demo.com' && password === '12345') {
      res.status(200).json({ success: true, message: 'Logged in!' })
    } else {
      res.status(401).json({ success: false, error: 'Invalid credentials' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
