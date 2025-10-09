import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertUserSchema,
  insertProfileSchema,
  insertEventSchema,
  insertEventRegistrationSchema,
  insertLikeSchema,
  insertMessageSchema,
  insertFavoriteSchema,
} from "@shared/schema";

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

      const user = await storage.createUser(userData);
      
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
      
      const user = await storage.getUserByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // ============= PROFILE ROUTES =============
  app.get("/api/profiles", async (req, res) => {
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

  app.get("/api/profiles/:id", async (req, res) => {
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

  app.get("/api/profiles/user/:userId", async (req, res) => {
    try {
      const profile = await storage.getProfileByUserId(req.params.userId);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json({ profile });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/profiles", async (req, res) => {
    try {
      const { userId, ...profileData } = req.body;
      const validatedData = insertProfileSchema.parse(profileData);
      
      const profile = await storage.createProfile({ ...validatedData, userId });
      res.json({ profile });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/profiles/:id", async (req, res) => {
    try {
      const profile = await storage.updateProfile(req.params.id, req.body);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
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
  app.get("/api/event-registrations/user/:userId", async (req, res) => {
    try {
      const registrations = await storage.getUserEventRegistrations(req.params.userId);
      res.json({ registrations });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/event-registrations", async (req, res) => {
    try {
      const registrationData = insertEventRegistrationSchema.parse(req.body);
      
      // Check if already registered
      const existing = await storage.getEventRegistration(
        registrationData.eventId, 
        registrationData.userId
      );
      if (existing) {
        return res.status(400).json({ error: "Already registered for this event" });
      }

      // Check if spots available
      const event = await storage.getEvent(registrationData.eventId);
      if (!event || event.spotsAvailable <= 0) {
        return res.status(400).json({ error: "No spots available" });
      }

      const registration = await storage.createEventRegistration(registrationData);
      
      // Update event spots
      await storage.updateEventSpots(registrationData.eventId, event.spotsAvailable - 1);
      
      res.json({ registration });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/event-registrations/:id", async (req, res) => {
    try {
      await storage.cancelEventRegistration(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ============= LIKE ROUTES =============
  app.get("/api/likes/user/:userId", async (req, res) => {
    try {
      const likes = await storage.getUserLikes(req.params.userId);
      res.json({ likes });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/likes/liked-by/:userId", async (req, res) => {
    try {
      const likes = await storage.getUserLikedBy(req.params.userId);
      res.json({ likes });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/likes", async (req, res) => {
    try {
      const likeData = insertLikeSchema.parse(req.body);
      
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

  app.delete("/api/likes/:id", async (req, res) => {
    try {
      await storage.deleteLike(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ============= MATCH ROUTES =============
  app.get("/api/matches/user/:userId", async (req, res) => {
    try {
      const matches = await storage.getUserMatches(req.params.userId);
      res.json({ matches });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/matches/:id", async (req, res) => {
    try {
      const match = await storage.getMatch(req.params.id);
      if (!match) {
        return res.status(404).json({ error: "Match not found" });
      }
      res.json({ match });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ============= MESSAGE ROUTES =============
  app.get("/api/messages/match/:matchId", async (req, res) => {
    try {
      const messages = await storage.getMatchMessages(req.params.matchId);
      res.json({ messages });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(messageData);
      res.json({ message });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/messages/:id/read", async (req, res) => {
    try {
      await storage.markMessageAsRead(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ============= FAVORITE ROUTES =============
  app.get("/api/favorites/user/:userId", async (req, res) => {
    try {
      const favorites = await storage.getUserFavorites(req.params.userId);
      res.json({ favorites });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/favorites", async (req, res) => {
    try {
      const favoriteData = insertFavoriteSchema.parse(req.body);
      
      // Check if already favorited
      const existing = await storage.getFavorite(favoriteData.userId, favoriteData.profileId);
      if (existing) {
        return res.status(400).json({ error: "Already favorited" });
      }

      const favorite = await storage.createFavorite(favoriteData);
      res.json({ favorite });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/favorites/:id", async (req, res) => {
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
