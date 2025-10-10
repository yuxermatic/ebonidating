import express from "express"
import session from "express-session"
import { registerRoutes } from "../server/routes"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback-secret-for-development",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "lax",
      domain: process.env.VERCEL_URL ? `.${process.env.VERCEL_URL}` : undefined,
    },
  }),
)

app.use((req, res, next) => {
  const allowedOrigins = [
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
    "http://localhost:5173",
    "http://localhost:5000",
  ].filter(Boolean)

  const origin = req.headers.origin
  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin)
  }

  res.header("Access-Control-Allow-Credentials", "true")
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,UPDATE,OPTIONS,PATCH")
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept")

  if (req.method === "OPTIONS") {
    return res.sendStatus(200)
  }
  next()
})

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  })
})

// Register API routes
registerRoutes(app)

app.use((err: any, _req: any, res: any, _next: any) => {
  const status = err.status || err.statusCode || 500
  const message = err.message || "Internal Server Error"

  console.error("[API Error]", {
    status,
    message,
    url: _req.url,
    method: _req.method,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  })

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  })
})

export default app
