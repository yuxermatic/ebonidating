import { 
  type User, type InsertUser,
  type Profile, type InsertProfile,
  type Event, type InsertEvent,
  type EventRegistration, type InsertEventRegistration,
  type Like, type InsertLike,
  type Match, type InsertMatch,
  type Message, type InsertMessage,
  type Favorite, type InsertFavorite
} from "@shared/schema";
import { randomUUID } from "crypto";
import { neon } from "@neondatabase/serverless";

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Profiles
  getProfile(id: string): Promise<Profile | undefined>;
  getProfileByUserId(userId: string): Promise<Profile | undefined>;
  getAllProfiles(): Promise<Profile[]>;
  getProfilesByFilters(filters: {
    minAge?: number;
    maxAge?: number;
    distance?: number;
    onlineOnly?: boolean;
    verifiedOnly?: boolean;
    interests?: string[];
  }): Promise<Profile[]>;
  createProfile(profile: InsertProfile & { userId: string }): Promise<Profile>;
  updateProfile(id: string, profile: Partial<InsertProfile>): Promise<Profile | undefined>;
  
  // Events
  getEvent(id: string): Promise<Event | undefined>;
  getAllEvents(): Promise<Event[]>;
  getEventsByCategory(category: string): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEventSpots(id: string, spotsAvailable: number): Promise<Event | undefined>;
  
  // Event Registrations
  getEventRegistration(eventId: string, userId: string): Promise<EventRegistration | undefined>;
  getUserEventRegistrations(userId: string): Promise<EventRegistration[]>;
  createEventRegistration(registration: InsertEventRegistration): Promise<EventRegistration>;
  cancelEventRegistration(id: string): Promise<void>;
  
  // Likes
  getLike(fromUserId: string, toUserId: string): Promise<Like | undefined>;
  getUserLikes(userId: string): Promise<Like[]>;
  getUserLikedBy(userId: string): Promise<Like[]>;
  createLike(like: InsertLike): Promise<Like>;
  deleteLike(id: string): Promise<void>;
  
  // Matches
  getMatch(id: string): Promise<Match | undefined>;
  getUserMatches(userId: string): Promise<Match[]>;
  checkIfMatched(user1Id: string, user2Id: string): Promise<Match | undefined>;
  createMatch(match: InsertMatch): Promise<Match>;
  
  // Messages
  getMessage(id: string): Promise<Message | undefined>;
  getMatchMessages(matchId: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: string): Promise<void>;
  
  // Favorites
  getFavorite(userId: string, profileId: string): Promise<Favorite | undefined>;
  getUserFavorites(userId: string): Promise<Favorite[]>;
  createFavorite(favorite: InsertFavorite): Promise<Favorite>;
  deleteFavorite(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private profiles: Map<string, Profile>;
  private events: Map<string, Event>;
  private eventRegistrations: Map<string, EventRegistration>;
  private likes: Map<string, Like>;
  private matches: Map<string, Match>;
  private messages: Map<string, Message>;
  private favorites: Map<string, Favorite>;

  constructor() {
    this.users = new Map();
    this.profiles = new Map();
    this.events = new Map();
    this.eventRegistrations = new Map();
    this.likes = new Map();
    this.matches = new Map();
    this.messages = new Map();
    this.favorites = new Map();
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Profiles
  async getProfile(id: string): Promise<Profile | undefined> {
    return this.profiles.get(id);
  }

  async getProfileByUserId(userId: string): Promise<Profile | undefined> {
    return Array.from(this.profiles.values()).find(profile => profile.userId === userId);
  }

  async getAllProfiles(): Promise<Profile[]> {
    return Array.from(this.profiles.values());
  }

  async getProfilesByFilters(filters: {
    minAge?: number;
    maxAge?: number;
    distance?: number;
    onlineOnly?: boolean;
    verifiedOnly?: boolean;
    interests?: string[];
  }): Promise<Profile[]> {
    let profiles = Array.from(this.profiles.values());

    if (filters.minAge) {
      profiles = profiles.filter(p => p.age >= filters.minAge!);
    }
    if (filters.maxAge) {
      profiles = profiles.filter(p => p.age <= filters.maxAge!);
    }
    if (filters.onlineOnly) {
      profiles = profiles.filter(p => p.isOnline);
    }
    if (filters.verifiedOnly) {
      profiles = profiles.filter(p => p.isVerified);
    }
    if (filters.interests && filters.interests.length > 0) {
      profiles = profiles.filter(p => 
        p.interests.some(interest => filters.interests!.includes(interest))
      );
    }

    return profiles;
  }

  async createProfile(insertProfile: InsertProfile & { userId: string }): Promise<Profile> {
    const id = randomUUID();
    const profile: Profile = {
      ...insertProfile,
      id,
      bio: insertProfile.bio ?? null,
      profession: insertProfile.profession ?? null,
      isOnline: insertProfile.isOnline ?? false,
      isVerified: insertProfile.isVerified ?? false,
      membershipTier: insertProfile.membershipTier ?? "basic",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.profiles.set(id, profile);
    return profile;
  }

  async updateProfile(id: string, update: Partial<InsertProfile>): Promise<Profile | undefined> {
    const profile = this.profiles.get(id);
    if (!profile) return undefined;

    const updatedProfile = {
      ...profile,
      ...update,
      updatedAt: new Date(),
    };
    this.profiles.set(id, updatedProfile);
    return updatedProfile;
  }

  // Events
  async getEvent(id: string): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEventsByCategory(category: string): Promise<Event[]> {
    return Array.from(this.events.values()).filter(e => e.category === category);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const event: Event = {
      ...insertEvent,
      id,
      createdAt: new Date(),
    };
    this.events.set(id, event);
    return event;
  }

  async updateEventSpots(id: string, spotsAvailable: number): Promise<Event | undefined> {
    const event = this.events.get(id);
    if (!event) return undefined;

    const updatedEvent = {
      ...event,
      spotsAvailable,
    };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }

  // Event Registrations
  async getEventRegistration(eventId: string, userId: string): Promise<EventRegistration | undefined> {
    return Array.from(this.eventRegistrations.values()).find(
      r => r.eventId === eventId && r.userId === userId
    );
  }

  async getUserEventRegistrations(userId: string): Promise<EventRegistration[]> {
    return Array.from(this.eventRegistrations.values()).filter(r => r.userId === userId);
  }

  async createEventRegistration(insertRegistration: InsertEventRegistration): Promise<EventRegistration> {
    const id = randomUUID();
    const registration: EventRegistration = {
      ...insertRegistration,
      id,
      status: "registered",
      createdAt: new Date(),
    };
    this.eventRegistrations.set(id, registration);
    return registration;
  }

  async cancelEventRegistration(id: string): Promise<void> {
    this.eventRegistrations.delete(id);
  }

  // Likes
  async getLike(fromUserId: string, toUserId: string): Promise<Like | undefined> {
    return Array.from(this.likes.values()).find(
      l => l.fromUserId === fromUserId && l.toUserId === toUserId
    );
  }

  async getUserLikes(userId: string): Promise<Like[]> {
    return Array.from(this.likes.values()).filter(l => l.fromUserId === userId);
  }

  async getUserLikedBy(userId: string): Promise<Like[]> {
    return Array.from(this.likes.values()).filter(l => l.toUserId === userId);
  }

  async createLike(insertLike: InsertLike): Promise<Like> {
    const id = randomUUID();
    const like: Like = {
      ...insertLike,
      id,
      createdAt: new Date(),
    };
    this.likes.set(id, like);
    return like;
  }

  async deleteLike(id: string): Promise<void> {
    this.likes.delete(id);
  }

  // Matches
  async getMatch(id: string): Promise<Match | undefined> {
    return this.matches.get(id);
  }

  async getUserMatches(userId: string): Promise<Match[]> {
    return Array.from(this.matches.values()).filter(
      m => m.user1Id === userId || m.user2Id === userId
    );
  }

  async checkIfMatched(user1Id: string, user2Id: string): Promise<Match | undefined> {
    return Array.from(this.matches.values()).find(
      m => (m.user1Id === user1Id && m.user2Id === user2Id) ||
           (m.user1Id === user2Id && m.user2Id === user1Id)
    );
  }

  async createMatch(insertMatch: InsertMatch): Promise<Match> {
    const id = randomUUID();
    const match: Match = {
      ...insertMatch,
      id,
      createdAt: new Date(),
    };
    this.matches.set(id, match);
    return match;
  }

  // Messages
  async getMessage(id: string): Promise<Message | undefined> {
    return this.messages.get(id);
  }

  async getMatchMessages(matchId: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(m => m.matchId === matchId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = {
      ...insertMessage,
      id,
      isRead: false,
      createdAt: new Date(),
    };
    this.messages.set(id, message);
    return message;
  }

  async markMessageAsRead(id: string): Promise<void> {
    const message = this.messages.get(id);
    if (message) {
      this.messages.set(id, { ...message, isRead: true });
    }
  }

  // Favorites
  async getFavorite(userId: string, profileId: string): Promise<Favorite | undefined> {
    return Array.from(this.favorites.values()).find(
      f => f.userId === userId && f.profileId === profileId
    );
  }

  async getUserFavorites(userId: string): Promise<Favorite[]> {
    return Array.from(this.favorites.values()).filter(f => f.userId === userId);
  }

  async createFavorite(insertFavorite: InsertFavorite): Promise<Favorite> {
    const id = randomUUID();
    const favorite: Favorite = {
      ...insertFavorite,
      id,
      createdAt: new Date(),
    };
    this.favorites.set(id, favorite);
    return favorite;
  }

  async deleteFavorite(id: string): Promise<void> {
    this.favorites.delete(id);
  }
}

// PostgreSQL Storage Implementation
export class PostgresStorage implements IStorage {
  private sql: ReturnType<typeof neon>;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    this.sql = neon(process.env.DATABASE_URL);
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    const result = await this.sql`SELECT * FROM users WHERE id = ${id}`;
    return result[0] as User | undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.sql`SELECT * FROM users WHERE email = ${email}`;
    return result[0] as User | undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const result = await this.sql`
      INSERT INTO users (id, email, password, created_at)
      VALUES (${id}, ${insertUser.email}, ${insertUser.password}, NOW())
      RETURNING *
    `;
    return result[0] as User;
  }

  // Profiles
  async getProfile(id: string): Promise<Profile | undefined> {
    const result = await this.sql`SELECT * FROM profiles WHERE id = ${id}`;
    return result[0] as Profile | undefined;
  }

  async getProfileByUserId(userId: string): Promise<Profile | undefined> {
    const result = await this.sql`SELECT * FROM profiles WHERE user_id = ${userId}`;
    return result[0] as Profile | undefined;
  }

  async getAllProfiles(): Promise<Profile[]> {
    const result = await this.sql`SELECT * FROM profiles`;
    return result as Profile[];
  }

  async getProfilesByFilters(filters: {
    minAge?: number;
    maxAge?: number;
    distance?: number;
    onlineOnly?: boolean;
    verifiedOnly?: boolean;
    interests?: string[];
  }): Promise<Profile[]> {
    let query = `SELECT * FROM profiles WHERE 1=1`;
    const params: any[] = [];

    if (filters.minAge) {
      params.push(filters.minAge);
      query += ` AND age >= $${params.length}`;
    }
    if (filters.maxAge) {
      params.push(filters.maxAge);
      query += ` AND age <= $${params.length}`;
    }
    if (filters.onlineOnly) {
      query += ` AND is_online = true`;
    }
    if (filters.verifiedOnly) {
      query += ` AND is_verified = true`;
    }
    if (filters.interests && filters.interests.length > 0) {
      params.push(filters.interests);
      query += ` AND interests && $${params.length}`;
    }

    const result = await this.sql(query, params);
    return result as Profile[];
  }

  async createProfile(insertProfile: InsertProfile & { userId: string }): Promise<Profile> {
    const id = randomUUID();
    const result = await this.sql`
      INSERT INTO profiles (
        id, user_id, name, age, gender, bio, location, profession, 
        interests, photos, is_online, is_verified, membership_tier, 
        created_at, updated_at
      )
      VALUES (
        ${id}, ${insertProfile.userId}, ${insertProfile.name}, ${insertProfile.age},
        ${insertProfile.gender}, ${insertProfile.bio || null}, ${insertProfile.location},
        ${insertProfile.profession || null}, ${insertProfile.interests}, ${insertProfile.photos},
        ${insertProfile.isOnline || false}, ${insertProfile.isVerified || false},
        ${insertProfile.membershipTier || 'basic'}, NOW(), NOW()
      )
      RETURNING *
    `;
    return result[0] as Profile;
  }

  async updateProfile(id: string, update: Partial<InsertProfile>): Promise<Profile | undefined> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    Object.entries(update).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    });

    if (fields.length === 0) return this.getProfile(id);

    fields.push(`updated_at = NOW()`);
    const query = `UPDATE profiles SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`;
    values.push(id);

    const result = await this.sql(query, values);
    return result[0] as Profile | undefined;
  }

  // Events
  async getEvent(id: string): Promise<Event | undefined> {
    const result = await this.sql`SELECT * FROM events WHERE id = ${id}`;
    return result[0] as Event | undefined;
  }

  async getAllEvents(): Promise<Event[]> {
    const result = await this.sql`SELECT * FROM events ORDER BY created_at DESC`;
    return result as Event[];
  }

  async getEventsByCategory(category: string): Promise<Event[]> {
    const result = await this.sql`SELECT * FROM events WHERE category = ${category} ORDER BY created_at DESC`;
    return result as Event[];
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const result = await this.sql`
      INSERT INTO events (
        id, title, description, category, image, date, time, location,
        price, spots_available, total_spots, created_at
      )
      VALUES (
        ${id}, ${insertEvent.title}, ${insertEvent.description}, ${insertEvent.category},
        ${insertEvent.image}, ${insertEvent.date}, ${insertEvent.time}, ${insertEvent.location},
        ${insertEvent.price}, ${insertEvent.spotsAvailable}, ${insertEvent.totalSpots}, NOW()
      )
      RETURNING *
    `;
    return result[0] as Event;
  }

  async updateEventSpots(id: string, spotsAvailable: number): Promise<Event | undefined> {
    const result = await this.sql`
      UPDATE events SET spots_available = ${spotsAvailable} WHERE id = ${id} RETURNING *
    `;
    return result[0] as Event | undefined;
  }

  // Event Registrations
  async getEventRegistration(eventId: string, userId: string): Promise<EventRegistration | undefined> {
    const result = await this.sql`
      SELECT * FROM event_registrations WHERE event_id = ${eventId} AND user_id = ${userId}
    `;
    return result[0] as EventRegistration | undefined;
  }

  async getUserEventRegistrations(userId: string): Promise<EventRegistration[]> {
    const result = await this.sql`SELECT * FROM event_registrations WHERE user_id = ${userId}`;
    return result as EventRegistration[];
  }

  async createEventRegistration(registration: InsertEventRegistration): Promise<EventRegistration> {
    const id = randomUUID();
    const result = await this.sql`
      INSERT INTO event_registrations (id, event_id, user_id, status, created_at)
      VALUES (${id}, ${registration.eventId}, ${registration.userId}, 'registered', NOW())
      RETURNING *
    `;
    return result[0] as EventRegistration;
  }

  async cancelEventRegistration(id: string): Promise<void> {
    await this.sql`DELETE FROM event_registrations WHERE id = ${id}`;
  }

  // Likes
  async getLike(fromUserId: string, toUserId: string): Promise<Like | undefined> {
    const result = await this.sql`
      SELECT * FROM likes WHERE from_user_id = ${fromUserId} AND to_user_id = ${toUserId}
    `;
    return result[0] as Like | undefined;
  }

  async getUserLikes(userId: string): Promise<Like[]> {
    const result = await this.sql`SELECT * FROM likes WHERE from_user_id = ${userId}`;
    return result as Like[];
  }

  async getUserLikedBy(userId: string): Promise<Like[]> {
    const result = await this.sql`SELECT * FROM likes WHERE to_user_id = ${userId}`;
    return result as Like[];
  }

  async createLike(like: InsertLike): Promise<Like> {
    const id = randomUUID();
    const result = await this.sql`
      INSERT INTO likes (id, from_user_id, to_user_id, created_at)
      VALUES (${id}, ${like.fromUserId}, ${like.toUserId}, NOW())
      RETURNING *
    `;
    return result[0] as Like;
  }

  async deleteLike(id: string): Promise<void> {
    await this.sql`DELETE FROM likes WHERE id = ${id}`;
  }

  // Matches
  async getMatch(id: string): Promise<Match | undefined> {
    const result = await this.sql`SELECT * FROM matches WHERE id = ${id}`;
    return result[0] as Match | undefined;
  }

  async getUserMatches(userId: string): Promise<Match[]> {
    const result = await this.sql`
      SELECT * FROM matches WHERE user1_id = ${userId} OR user2_id = ${userId}
    `;
    return result as Match[];
  }

  async checkIfMatched(user1Id: string, user2Id: string): Promise<Match | undefined> {
    const result = await this.sql`
      SELECT * FROM matches 
      WHERE (user1_id = ${user1Id} AND user2_id = ${user2Id})
         OR (user1_id = ${user2Id} AND user2_id = ${user1Id})
    `;
    return result[0] as Match | undefined;
  }

  async createMatch(match: InsertMatch): Promise<Match> {
    const id = randomUUID();
    const result = await this.sql`
      INSERT INTO matches (id, user1_id, user2_id, created_at)
      VALUES (${id}, ${match.user1Id}, ${match.user2Id}, NOW())
      RETURNING *
    `;
    return result[0] as Match;
  }

  // Messages
  async getMessage(id: string): Promise<Message | undefined> {
    const result = await this.sql`SELECT * FROM messages WHERE id = ${id}`;
    return result[0] as Message | undefined;
  }

  async getMatchMessages(matchId: string): Promise<Message[]> {
    const result = await this.sql`
      SELECT * FROM messages WHERE match_id = ${matchId} ORDER BY created_at ASC
    `;
    return result as Message[];
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const result = await this.sql`
      INSERT INTO messages (id, match_id, sender_id, content, is_read, created_at)
      VALUES (${id}, ${message.matchId}, ${message.senderId}, ${message.content}, false, NOW())
      RETURNING *
    `;
    return result[0] as Message;
  }

  async markMessageAsRead(id: string): Promise<void> {
    await this.sql`UPDATE messages SET is_read = true WHERE id = ${id}`;
  }

  // Favorites
  async getFavorite(userId: string, profileId: string): Promise<Favorite | undefined> {
    const result = await this.sql`
      SELECT * FROM favorites WHERE user_id = ${userId} AND profile_id = ${profileId}
    `;
    return result[0] as Favorite | undefined;
  }

  async getUserFavorites(userId: string): Promise<Favorite[]> {
    const result = await this.sql`SELECT * FROM favorites WHERE user_id = ${userId}`;
    return result as Favorite[];
  }

  async createFavorite(favorite: InsertFavorite): Promise<Favorite> {
    const id = randomUUID();
    const result = await this.sql`
      INSERT INTO favorites (id, user_id, profile_id, created_at)
      VALUES (${id}, ${favorite.userId}, ${favorite.profileId}, NOW())
      RETURNING *
    `;
    return result[0] as Favorite;
  }

  async deleteFavorite(id: string): Promise<void> {
    await this.sql`DELETE FROM favorites WHERE id = ${id}`;
  }
}

export const storage = process.env.DATABASE_URL 
  ? new PostgresStorage() 
  : new MemStorage();
