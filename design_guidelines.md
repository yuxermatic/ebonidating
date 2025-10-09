# ebpni Dating Platform - Design Guidelines

## Design Approach: Reference-Based Premium Dating Experience

**Selected References**: Bumble's card-based UI + Hinge's profile depth + the provided ebpni purple/pink aesthetic

**Core Principle**: Create an emotionally engaging, premium dating experience that celebrates Black culture and community while maintaining modern sophistication.

---

## Color Palette

### Primary Colors (Dark Mode Default)
- **Background**: 240 15% 8% (deep charcoal with purple undertone)
- **Surface**: 250 20% 12% (elevated card backgrounds)
- **Brand Purple**: 270 70% 60% (vibrant primary actions)
- **Accent Pink**: 330 75% 65% (highlights, online status, love reactions)
- **Coral**: 350 85% 70% (CTAs, premium features)

### Light Mode
- **Background**: 270 30% 98%
- **Surface**: 0 0% 100%
- **Brand Purple**: 270 65% 55%
- **Accent Pink**: 330 70% 60%

### Semantic Colors
- **Success/Online**: 160 70% 55% (green for online status)
- **Verified Badge**: 200 90% 60% (trust indicator)
- **Text Primary**: 0 0% 95% (dark mode) / 0 0% 10% (light)
- **Text Secondary**: 0 0% 70% (dark) / 0 0% 50% (light)

---

## Typography

**Primary Font**: Inter (Google Fonts) - modern, highly legible
**Accent Font**: Plus Jakarta Sans - softer, more friendly for headings

### Hierarchy
- **Hero/Display**: Plus Jakarta Sans, 48-72px, Bold (600-700)
- **Section Headers**: Plus Jakarta Sans, 32-40px, Semibold (600)
- **Card Titles/Names**: Inter, 20-24px, Semibold (600)
- **Body Text**: Inter, 16px, Regular (400)
- **Metadata/Labels**: Inter, 13-14px, Medium (500)
- **Micro-copy**: Inter, 12px, Regular (400)

---

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16 (maintaining rhythm)

### Grid Structure
- **Profile Cards Grid**: 2 columns (md), 3 columns (lg), 4 columns (xl)
- **Event Cards**: 1 column (mobile), 2 columns (md), 3 columns (lg)
- **Container Max-Width**: max-w-7xl (1280px)
- **Content Padding**: px-4 (mobile), px-6 (tablet), px-8 (desktop)

### Vertical Rhythm
- **Section Spacing**: py-12 (mobile), py-16 (tablet), py-20 (desktop)
- **Card Padding**: p-4 to p-6
- **Component Gaps**: gap-4 to gap-8

---

## Component Library

### Navigation
- **Top Nav**: Fixed header with gradient backdrop blur, logo left, primary actions right
- **Mobile Nav**: Bottom tab bar with active state indicators (purple glow)
- **Search**: Prominent with purple focus ring and dropdown suggestions

### Profile Cards
- **Structure**: Large photo (16:9 aspect), name overlay with gradient fade, quick stats row (age, distance, profession)
- **Interaction**: Hover lift effect (subtle scale 1.02), heart icon appears top-right
- **Match Badge**: Circular percentage indicator (0-100%) in top-left corner
- **Status Indicators**: Green dot for online (pulsing glow), blue checkmark for verified

### Filter System
- **Layout**: Collapsible sidebar (desktop), bottom sheet (mobile)
- **Controls**: Range sliders with purple fill, toggle switches with pink active state, checkbox groups with rounded corners
- **Quick Filters**: Pill-shaped buttons (Online Now, Verified, New Members) with active purple background

### Event Cards
- **Design**: Horizontal layout with event image left (200px), details right
- **Badge System**: Category badges (Speed Dating, Wine Tasting, etc.) with color coding
- **CTA**: "Register" button with available spots counter
- **Pricing**: Prominent display with member/non-member distinction

### Membership Tiers
- **Layout**: 3-column comparison table with center tier highlighted
- **Styling**: Purple gradient border for VIP tier, pink glow effect
- **Features List**: Checkmarks with purple fill, strikethrough for unavailable features
- **CTA**: Gradient buttons matching tier color intensity

### Forms & Inputs
- **Text Inputs**: Purple border on focus, rounded-lg, placeholder with 70% opacity
- **Dropdowns**: Custom styled with purple caret and option hover states
- **Photo Upload**: Drag-and-drop zone with dashed purple border, preview thumbnails
- **Multi-Select**: Tag-style chips with pink/purple alternating colors

### Buttons
- **Primary**: Gradient purple-to-pink, white text, rounded-full, shadow-lg
- **Secondary**: Outline with purple border, purple text, transparent background
- **Ghost**: No border, purple text, hover background purple/10
- **Icon Buttons**: Circular, 40-48px, subtle background, purple icon

### Modal & Overlays
- **Profile View Modal**: Full-screen on mobile, centered large modal on desktop, swipe gestures for next/previous
- **Filter Drawer**: Slide from left (desktop), bottom sheet (mobile)
- **Success States**: Confetti animation with pink/purple particles for matches

---

## Animations

**Principle**: Subtle, purposeful motion that enhances without distracting

- **Card Entrance**: Stagger fade-in with slight upward movement (50ms delay between cards)
- **Filter Apply**: Smooth height transition with fade
- **Match Notification**: Scale bounce (1.1x) with pink glow pulse
- **Heart Reaction**: Scale up with particle burst (pink hearts)
- **Loading States**: Skeleton screens with purple shimmer gradient
- **Transitions**: 200-300ms cubic-bezier easing

---

## Images

### Hero Section
**Large Hero Image**: Yes - full-width hero showcasing diverse Black couples/individuals in warm, authentic moments (dating, laughing, connecting). Gradient overlay (purple-to-transparent) from bottom to ensure text readability.

### Profile Images
- **Grid Display**: Circular or rounded-2xl thumbnails with aspect ratio enforcement
- **Modal View**: Full-size with carousel navigation
- **Placeholder**: Purple gradient with user initials in white

### Event Images
- **Format**: 16:9 horizontal thumbnails, professionally shot venues/activities
- **Treatment**: Subtle purple overlay on hover with "View Details" text

### Background Elements
- **Gradient Mesh**: Soft purple-pink gradient mesh as decorative background for pricing/membership sections
- **Pattern Overlays**: Subtle dot grid or geometric patterns at 5% opacity for visual interest

---

## Key Differentiators

1. **Cultural Celebration**: Incorporate imagery and language that authentically represents Black culture and experiences
2. **Safety First**: Prominent verification badges, trust indicators, and safety tips
3. **Community Focus**: Events and meetups as core feature, not afterthought
4. **Premium Feel**: High-quality imagery, polished animations, sophisticated color palette
5. **Personality Showcase**: Rich profile sections beyond photos (voice prompts, video intros, personality traits)

This design creates a warm, inviting, yet sophisticated dating experience that stands apart from generic dating apps through its cultural focus and premium execution.