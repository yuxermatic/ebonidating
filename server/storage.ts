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

export const storage = new MemStorage();
