import { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
        <head><meta charset="UTF-8"><title>Ebonidating</title></head>
        <body>
          <h1>Welcome to Ebonidating 💘</h1>
          <p>Vercel backend and frontend are now live!</p>
        </body>
      </html>
    `)
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
