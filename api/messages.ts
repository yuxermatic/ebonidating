import { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    res.status(200).json([{ from: 'Alice', to: 'Bob', text: 'Hey there!' }])
  } else if (req.method === 'POST') {
    const message = req.body
    res.status(201).json({ message: 'Message sent', data: message })
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
