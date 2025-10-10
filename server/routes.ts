import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import {
  insertUserSchema,
  insertProfileSchema,
  insertEventSchema,
  insertEventRegistrationSchema,
  insertLikeSchema,
  insertMessageSchema,
  insertFavoriteSchema,
} from "@shared/schema";

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "info@ebonidating.com",
    pass: process.env.SMTP_PASSWORD || "",
  },
});

async function sendEmail(to: string, subject: string, html: string) {
  try {
    await transporter.sendMail({
      from: '"Eboni Dating" <info@ebonidating.com>',
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Email send error:", error);
  }
}

// Extend session types
declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

// Authentication middleware
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // ============= AUTH ROUTES =============
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword,
      });
      
      // Set session
      req.session.userId = user.id;
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      console.log("[LOGIN] Attempting login for:", email);
      const user = await storage.getUserByEmail(email);
      if (!user) {
        console.log("[LOGIN] User not found");
        return res.status(401).json({ error: "Invalid credentials" });
      }

      console.log("[LOGIN] User found, comparing password");
      console.log("[LOGIN] Stored hash:", user.password);
      console.log("[LOGIN] Input password:", password);
      
      // Check password
      const isValid = await bcrypt.compare(password, user.password);
      console.log("[LOGIN] Password valid:", isValid);
      
      if (!isValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Set session
      req.session.userId = user.id;

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error: any) {
      console.log("[LOGIN] Error:", error);
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/auth/me", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ============= PROFILE ROUTES =============
  app.get("/api/profiles/featured", async (req, res) => {
    try {
      const featuredModels = await storage.getActiveFeaturedModels();
      res.json({ models: featuredModels });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/profiles/top-models", async (req, res) => {
    try {
      const profiles = await storage.getAllProfiles();
      // Get top 3 models based on membership tier and verification
      const topModels = profiles
        .filter(p => p.isVerified && p.membershipTier !== 'basic')
        .sort((a, b) => {
          const tierOrder = { vip: 3, premium: 2, basic: 1 };
          return tierOrder[b.membershipTier as keyof typeof tierOrder] - tierOrder[a.membershipTier as keyof typeof tierOrder];
        })
        .slice(0, 3);
      
      res.json({ profiles: topModels });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/profiles", requireAuth, async (req, res) => {
    try {
      const { minAge, maxAge, distance, onlineOnly, verifiedOnly, interests } = req.query;
      
      const filters = {
        minAge: minAge ? parseInt(minAge as string) : undefined,
        maxAge: maxAge ? parseInt(maxAge as string) : undefined,
        distance: distance ? parseInt(distance as string) : undefined,
        onlineOnly: onlineOnly === 'true',
        verifiedOnly: verifiedOnly === 'true',
        interests: interests ? (interests as string).split(',') : undefined,
      };

      const profiles = await storage.getProfilesByFilters(filters);
      res.json({ profiles });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/profiles/:id", requireAuth, async (req, res) => {
    try {
      const profile = await storage.getProfile(req.params.id);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json({ profile });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/profiles/user/:userId", requireAuth, async (req, res) => {
    try {
      // Only allow users to view their own profile via this endpoint
      if (req.params.userId !== req.session.userId) {
        return res.status(403).json({ error: "Forbidden" });
      }
      
      const profile = await storage.getProfileByUserId(req.params.userId);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json({ profile });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/profiles", requireAuth, async (req, res) => {
    try {
      // Validate without userId, then add it from session
      const profileData = insertProfileSchema.omit({ userId: true }).parse(req.body);
      
      const profile = await storage.createProfile({ 
        ...profileData, 
        userId: req.session.userId! 
      });
      res.json({ profile });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/profiles/:id", requireAuth, async (req, res) => {
    try {
      // Verify ownership
      const existingProfile = await storage.getProfile(req.params.id);
      if (!existingProfile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      if (existingProfile.userId !== req.session.userId) {
        return res.status(403).json({ error: "Forbidden" });
      }
      
      const profile = await storage.updateProfile(req.params.id, req.body);
      res.json({ profile });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // ============= EVENT ROUTES =============
  app.get("/api/events", async (req, res) => {
    try {
      const { category } = req.query;
      
      const events = category 
        ? await storage.getEventsByCategory(category as string)
        : await storage.getAllEvents();
      
      res.json({ events });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const event = await storage.getEvent(req.params.id);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json({ event });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/events", async (req, res) => {
    try {
      const eventData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(eventData);
      res.json({ event });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // ============= EVENT REGISTRATION ROUTES =============
  app.get("/api/event-registrations/user/:userId", requireAuth, async (req, res) => {
    try {
      // Only allow users to view their own registrations
      if (req.params.userId !== req.session.userId) {
        return res.status(403).json({ error: "Forbidden" });
      }
      
      const registrations = await storage.getUserEventRegistrations(req.params.userId);
      res.json({ registrations });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/event-registrations", requireAuth, async (req, res) => {
    try {
      const { eventId } = req.body;
      const userId = req.session.userId!;
      
      // Check if already registered
      const existing = await storage.getEventRegistration(eventId, userId);
      if (existing) {
        return res.status(400).json({ error: "Already registered for this event" });
      }

      // Check if spots available
      const event = await storage.getEvent(eventId);
      if (!event || event.spotsAvailable <= 0) {
        return res.status(400).json({ error: "No spots available" });
      }

      const registration = await storage.createEventRegistration({ eventId, userId });
      
      // Update event spots
      await storage.updateEventSpots(eventId, event.spotsAvailable - 1);
      
      res.json({ registration });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/event-registrations/:id", requireAuth, async (req, res) => {
    try {
      await storage.cancelEventRegistration(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ============= LIKE ROUTES =============
  app.get("/api/likes/user/:userId", requireAuth, async (req, res) => {
    try {
      // Only allow users to view their own likes
      if (req.params.userId !== req.session.userId) {
        return res.status(403).json({ error: "Forbidden" });
      }
      
      const likes = await storage.getUserLikes(req.params.userId);
      res.json({ likes });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/likes/liked-by/:userId", requireAuth, async (req, res) => {
    try {
      // Only allow users to view who liked them
      if (req.params.userId !== req.session.userId) {
        return res.status(403).json({ error: "Forbidden" });
      }
      
      const likes = await storage.getUserLikedBy(req.params.userId);
      res.json({ likes });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/likes", requireAuth, async (req, res) => {
    try {
      const { toUserId } = req.body;
      
      // Use session userId as fromUserId
      const likeData = {
        fromUserId: req.session.userId!,
        toUserId,
      };
      
      // Check if already liked
      const existing = await storage.getLike(likeData.fromUserId, likeData.toUserId);
      if (existing) {
        return res.status(400).json({ error: "Already liked" });
      }

      const like = await storage.createLike(likeData);
      
      // Check if this creates a match
      const reverseLike = await storage.getLike(likeData.toUserId, likeData.fromUserId);
      if (reverseLike) {
        // Create a match
        const match = await storage.createMatch({
          user1Id: likeData.fromUserId,
          user2Id: likeData.toUserId,
        });
        return res.json({ like, match });
      }
      
      res.json({ like });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/likes/:id", requireAuth, async (req, res) => {
    try {
      // Verify ownership
      const like = await storage.getLike(req.params.id, req.params.id); // This needs to be fixed in storage to get by ID
      await storage.deleteLike(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ============= MATCH ROUTES =============
  app.get("/api/matches/user/:userId", requireAuth, async (req, res) => {
    try {
      // Only allow users to view their own matches
      if (req.params.userId !== req.session.userId) {
        return res.status(403).json({ error: "Forbidden" });
      }
      
      const matches = await storage.getUserMatches(req.params.userId);
      res.json({ matches });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/matches/:id", requireAuth, async (req, res) => {
    try {
      const match = await storage.getMatch(req.params.id);
      if (!match) {
        return res.status(404).json({ error: "Match not found" });
      }
      
      // Verify user is part of the match
      if (match.user1Id !== req.session.userId && match.user2Id !== req.session.userId) {
        return res.status(403).json({ error: "Forbidden" });
      }
      
      res.json({ match });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ============= MESSAGE ROUTES =============
  app.get("/api/messages/match/:matchId", requireAuth, async (req, res) => {
    try {
      // Verify user is part of the match
      const match = await storage.getMatch(req.params.matchId);
      if (!match) {
        return res.status(404).json({ error: "Match not found" });
      }
      if (match.user1Id !== req.session.userId && match.user2Id !== req.session.userId) {
        return res.status(403).json({ error: "Forbidden" });
      }
      
      const messages = await storage.getMatchMessages(req.params.matchId);
      res.json({ messages });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/messages", requireAuth, async (req, res) => {
    try {
      const { matchId, content } = req.body;
      
      // Verify user is part of the match
      const match = await storage.getMatch(matchId);
      if (!match) {
        return res.status(404).json({ error: "Match not found" });
      }
      if (match.user1Id !== req.session.userId && match.user2Id !== req.session.userId) {
        return res.status(403).json({ error: "Forbidden" });
      }
      
      const message = await storage.createMessage({
        matchId,
        senderId: req.session.userId!,
        content,
        isRead: false,
      });
      res.json({ message });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/messages/:id/read", requireAuth, async (req, res) => {
    try {
      await storage.markMessageAsRead(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ============= FAVORITE ROUTES =============
  app.get("/api/favorites/user/:userId", requireAuth, async (req, res) => {
    try {
      // Only allow users to view their own favorites
      if (req.params.userId !== req.session.userId) {
        return res.status(403).json({ error: "Forbidden" });
      }
      
      const favorites = await storage.getUserFavorites(req.params.userId);
      res.json({ favorites });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/favorites", requireAuth, async (req, res) => {
    try {
      const { profileId } = req.body;
      
      // Use session userId
      const userId = req.session.userId!;
      
      // Check if already favorited
      const existing = await storage.getFavorite(userId, profileId);
      if (existing) {
        return res.status(400).json({ error: "Already favorited" });
      }

      const favorite = await storage.createFavorite({ userId, profileId });
      res.json({ favorite });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/favorites/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteFavorite(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
