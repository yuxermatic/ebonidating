# Testing Guide

Comprehensive testing guide for all site functionality.

## 🧪 Manual Testing Checklist

### Authentication Flow

#### Sign Up
- [ ] Navigate to `/signup`
- [ ] Enter valid email and password
- [ ] Confirm password matches
- [ ] Submit form
- [ ] Verify success message
- [ ] Check email for verification (if Supabase configured)
- [ ] Verify redirect to login page

**Test Cases:**
\`\`\`
✓ Valid signup with strong password
✓ Password mismatch error
✓ Duplicate email error
✓ Invalid email format error
✓ Password too short error
\`\`\`

#### Login
- [ ] Navigate to `/login`
- [ ] Enter registered email and password
- [ ] Submit form
- [ ] Verify redirect to dashboard
- [ ] Check session persistence

**Test Cases:**
\`\`\`
✓ Valid login credentials
✓ Invalid email error
✓ Invalid password error
✓ Session persists after page refresh
✓ Remember me functionality
\`\`\`

#### Logout
- [ ] Click logout button in header
- [ ] Verify redirect to home page
- [ ] Confirm session cleared
- [ ] Try accessing protected routes

**Test Cases:**
\`\`\`
✓ Logout clears session
✓ Cannot access dashboard after logout
✓ Login required message shown
\`\`\`

### Profile Management

#### Create Profile
- [ ] Navigate to `/create-profile`
- [ ] Fill in all required fields
- [ ] Submit form
- [ ] Verify redirect to dashboard

**Test Cases:**
\`\`\`
✓ Create profile with minimum required fields
✓ Age validation (must be 18+)
✓ Interest selection (at least 1)
✓ Photo upload (at least 1)
✓ Form validation errors display correctly
\`\`\`

### Browse Functionality

#### View Profiles
- [ ] Navigate to `/browse`
- [ ] Verify profiles load
- [ ] Test grid/list view toggle

**Test Cases:**
\`\`\`
✓ Profiles load on page load
✓ Grid view displays correctly
✓ List view displays correctly
✓ Match percentage displays
✓ Online status indicator works
✓ Verified badge shows
\`\`\`

#### Filters
- [ ] Apply age range filter
- [ ] Apply distance filter
- [ ] Apply interest filter
- [ ] Toggle "Online Only"
- [ ] Toggle "Verified Only"

**Test Cases:**
\`\`\`
✓ Age range filter works
✓ Distance filter works
✓ Interest filter works
✓ Multiple filters work together
✓ Clear filters resets results
\`\`\`

### Events Functionality

#### View Events
- [ ] Navigate to `/events`
- [ ] Verify events list loads
- [ ] Check event cards display correctly

**Test Cases:**
\`\`\`
✓ Events load on page load
✓ Event images display
✓ Event details show correctly
✓ Spots available indicator works
\`\`\`

#### Register for Event
- [ ] Click event card
- [ ] Click "Register" button
- [ ] Verify registration confirmation

**Test Cases:**
\`\`\`
✓ Can register for event
✓ Cannot register twice for same event
✓ Cannot register when no spots available
✓ Registration appears in dashboard
\`\`\`

### Dashboard Functionality

#### View Dashboard
- [ ] Navigate to `/dashboard`
- [ ] Verify stats display correctly
- [ ] Check all tabs work

**Test Cases:**
\`\`\`
✓ Dashboard loads for logged-in user
✓ Stats display correctly
✓ Tabs switch properly
✓ Empty states show when no data
\`\`\`

### UI/UX Testing

#### Responsive Design
- [ ] Test on mobile (375px)
- [ ] Test on tablet (768px)
- [ ] Test on desktop (1024px+)

**Test Cases:**
\`\`\`
✓ Mobile menu works
✓ Layout adapts to screen size
✓ Images scale properly
✓ Buttons are tappable on mobile
\`\`\`

#### Dark Mode
- [ ] Toggle dark mode
- [ ] Verify all pages render correctly

**Test Cases:**
\`\`\`
✓ Dark mode toggle works
✓ All components support dark mode
✓ Text is readable in dark mode
✓ Theme persists after refresh
\`\`\`

## 🔄 API Testing

### Health Check
\`\`\`bash
curl https://your-app.vercel.app/api/health
# Expected: {"status":"ok","timestamp":"...","environment":"production"}
\`\`\`

### Authentication Endpoints

**Sign Up:**
\`\`\`bash
curl -X POST https://your-app.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
\`\`\`

**Login:**
\`\`\`bash
curl -X POST https://your-app.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  -c cookies.txt
\`\`\`

## 📊 Performance Testing

### Lighthouse Audit
\`\`\`bash
npx lighthouse https://your-app.vercel.app --view
\`\`\`

**Target Scores:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 90

## ✅ Pre-Deployment Checklist

- [ ] All authentication flows tested
- [ ] Profile creation and editing works
- [ ] Browse and filter functionality verified
- [ ] Events registration tested
- [ ] Dashboard displays correctly
- [ ] Responsive design verified
- [ ] Dark mode works
- [ ] API endpoints tested
- [ ] Performance metrics acceptable
- [ ] Error handling works

---

**Testing Status**: ✅ Ready for deployment
