# Eboni Dating Platform

## Overview

Eboni Dating is a premium dating platform designed to celebrate Black culture and community. The application enables users to create profiles, browse potential matches, participate in exclusive events (speed dating, wine tasting, cultural events), and communicate with verified members. The platform offers tiered membership (Basic, Premium, VIP) with progressively enhanced features including advanced filtering, unlimited messaging, and priority event access.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript in a Single Page Application (SPA) architecture
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state with infinite stale time and disabled refetching
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Styling**: Tailwind CSS with custom design tokens following a premium purple/pink aesthetic inspired by Bumble and Hinge

**Design System**:
- Custom color palette with dark mode as default (purple/pink brand colors)
- Typography using Inter for body text and Plus Jakarta Sans for headings
- Card-based UI with hover and active elevation states
- Responsive grid layouts optimized for mobile-first experience

**Key Pages**:
- Public: Home, Browse Profiles, Events, Membership Tiers, Login/Signup
- Protected: Dashboard, Create Profile
- Profile browsing with advanced filtering (age, distance, interests, online status, verification)
- Event discovery and registration with category-based navigation

### Backend Architecture

**Server Framework**: Express.js with TypeScript running on Node.js
- **API Pattern**: RESTful API with session-based authentication
- **Session Management**: Express sessions with connect-pg-simple for PostgreSQL session store
- **Password Security**: Bcrypt for password hashing (10 rounds)
- **Development Mode**: Vite middleware integration for HMR and development experience

**Authentication Flow**:
- Session-based authentication using express-session
- RequireAuth middleware for protected routes
- Credentials included in all fetch requests for session persistence

**API Structure**:
- `/api/auth/*` - Authentication endpoints (signup, login, logout, me)
- `/api/profiles/*` - User profile CRUD operations with filtering capabilities
- `/api/events/*` - Event management and registration
- `/api/likes/*` - User interactions and matching
- `/api/matches/*` - Match retrieval based on mutual likes
- `/api/messages/*` - Messaging between matched users
- `/api/favorites/*` - User favorites/bookmarks

**Storage Layer**:
- Abstract IStorage interface defining all data operations
- In-memory implementation for development (mock data with UUID-based IDs)
- Designed for easy migration to database-backed storage (Drizzle ORM ready)

### Data Architecture

**ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` for type sharing between client and server
- **Migrations**: Managed through drizzle-kit in `migrations/` directory
- **Type Safety**: Zod schemas generated from Drizzle schemas for runtime validation

**Database Schema**:

**Users Table**: Authentication credentials
- id (UUID primary key), email (unique), password (hashed), createdAt

**Profiles Table**: Extended user information for dating profiles
- Linked to users via userId foreign key with cascade delete
- Fields: name, age, gender, bio, location, profession, interests[], photos[]
- Status indicators: isOnline, isVerified, membershipTier (basic/premium/vip)
- Timestamps for createdAt and updatedAt

**Events Table**: Dating events and social gatherings
- Fields: title, description, category, image, date, time, location
- Capacity management: price, spotsAvailable, totalSpots

**Event Registrations**: Many-to-many relationship between users and events
- Composite tracking with userId, eventId, status, and registration timestamp

**Interactions Tables**:
- **Likes**: Directional likes from one user to another with timestamps
- **Matches**: Created automatically when mutual likes exist (many-to-many with timestamps)
- **Messages**: Threaded conversations between matched users with read status
- **Favorites**: User bookmarks for profiles of interest

**Data Consistency**:
- Foreign key constraints with cascade deletes for data integrity
- Array types for interests and photos using PostgreSQL array syntax
- Default values using SQL functions (gen_random_uuid(), NOW())

### Development Architecture

**Build System**: Vite for fast development and optimized production builds
- **Client Build**: Vite bundles React app to `dist/public`
- **Server Build**: esbuild bundles Express server to `dist/index.js` in ESM format
- **Development**: tsx for TypeScript execution with hot reload
- **Path Aliases**: @ for client/src, @shared for shared code, @assets for static files

**Code Organization**:
- `/client` - React frontend with pages, components, hooks, and styles
- `/server` - Express backend with routes and storage layer
- `/shared` - Shared TypeScript types and Zod schemas
- `/attached_assets` - Stock images and static resources

**Type Safety**:
- Strict TypeScript configuration with ESNext modules
- Shared types between frontend and backend via schema definitions
- Runtime validation using Zod schemas derived from Drizzle

## External Dependencies

### Database
- **PostgreSQL** via Neon serverless driver (@neondatabase/serverless)
- Connection configured through DATABASE_URL environment variable
- Session store using connect-pg-simple for persistent sessions

### UI Component Library
- **Radix UI**: Comprehensive set of accessible, unstyled components
  - Dialog, Dropdown, Popover, Select, Tooltip, and 20+ other primitives
  - Full keyboard navigation and ARIA compliance
- **Shadcn/ui**: Pre-styled Radix components with Tailwind CSS
- **Lucide React**: Icon library for consistent iconography
- **CMDK**: Command menu component for search interfaces

### Styling & Theming
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Autoprefixer**: CSS vendor prefixing
- **Class Variance Authority**: Type-safe variant styling for components
- **clsx & tailwind-merge**: Conditional className composition

### Forms & Validation
- **React Hook Form**: Performant form state management
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Zod integration for React Hook Form

### State Management
- **TanStack Query**: Server state management with caching, refetching, and mutations
- Custom configuration: infinite stale time, disabled window refocus refetching

### Development Tools
- **Replit Plugins**: Development banner, cartographer, and runtime error overlay
- **Vite**: Build tool with HMR, optimized for React and TypeScript
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast JavaScript bundler for production builds

### Fonts
- **Google Fonts**: Inter and Plus Jakarta Sans loaded via CDN
- Additional fonts: Architects Daughter, DM Sans, Fira Code, Geist Mono

### Date Handling
- **date-fns**: Modern date utility library for formatting and manipulation

### Session Management
- **express-session**: Session middleware for Express
- **connect-pg-simple**: PostgreSQL session store adapter
- Session data includes userId for authentication state

### Security
- **bcryptjs**: Password hashing and verification (10 salt rounds)
- Session-based authentication with httpOnly cookies
- CORS and credential handling for API requests
