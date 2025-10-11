import { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]

  if (req.method === 'GET') {
    res.status(200).json(users)
  } else if (req.method === 'POST') {
    const newUser = req.body
    res.status(201).json({ message: 'User added', data: newUser })
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
