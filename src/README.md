# NeoNest Admin Dashboard

A fully responsive, feature-rich admin dashboard for the NeoNest platform - connecting mothers with verified caregivers.

## 🎨 Features

### Core Features
- **JWT Authentication** - Secure login system with mock authentication
- **Dark Mode** - Fully functional theme toggle with persistent preferences
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Real-time Notifications** - Bell icon with notification dropdown
- **Global Search** - Cmd/Ctrl+K keyboard shortcut for quick navigation

### Dashboard Pages

#### 1. Dashboard Overview
- Real-time statistics cards with animations
- Monthly bookings trend chart (Recharts)
- Quick action buttons
- Recent activity feed
- Responsive grid layout

#### 2. Analytics & Insights
- User growth over time (Area chart)
- Weekly booking trends (Line chart)
- City distribution (Pie chart)
- System status monitoring
- Multiple chart tabs

#### 3. Verification Management
- Tabbed interface (Women/Organizations/Caregivers)
- Search and filter functionality
- Approve/Reject actions
- Detailed profile modal
- Status badges
- Responsive table/card view

#### 4. Booking Management
- Status filtering (Pending/Confirmed/In-Progress/Completed/Cancelled)
- Status update actions
- Forward booking functionality
- Color-coded status badges
- Responsive table/card view

#### 5. Activity Logs
- Timeline view of all admin actions
- Color-coded by action type
- Real-time timestamps
- Scrollable feed
- Icon-based activity indicators

#### 6. Settings
- Dark mode toggle (integrated)
- Notification preferences
- Security settings
- System information
- Responsive cards layout

### UI Components
- **Header** - Sticky header with search, notifications, theme toggle, and user menu
- **Sidebar** - Collapsible navigation with active state indicators
- **Footer** - Branding and copyright information
- **Loading States** - Skeleton loaders for all pages
- **Error Boundary** - Graceful error handling
- **Search Dialog** - Quick navigation across dashboard
- **Responsive Tables** - Auto-switch to card view on mobile

### Design System
- **Colors**: Baby Blue (#A6DCEF), Peach (#F6C6C7), Mint (#C8E6C9), Lavender (#D1C4E9)
- **Typography**: System font stack with proper hierarchy
- **Border Radius**: 1rem for consistent rounded corners
- **Animations**: Motion (Framer Motion) for smooth transitions
- **Icons**: Lucide React

## 🚀 Getting Started

### Demo Credentials
```
Email: admin@neonest.in
Password: admin123
```

### Keyboard Shortcuts
- `Cmd/Ctrl + K` - Open search dialog
- `Esc` - Close dialogs/modals

## 📱 Responsive Breakpoints
- **Mobile**: < 768px (Card-based layouts, mobile menu)
- **Tablet**: 768px - 1024px (Optimized grid layouts)
- **Desktop**: > 1024px (Full table views, multi-column layouts)

## 🎯 Key Technologies
- React + TypeScript
- Tailwind CSS v4.0
- Motion (Framer Motion)
- Recharts for data visualization
- ShadCN UI components
- Lucide icons

## 🔐 Security Features
- JWT token storage
- Protected routes
- Auto-logout on token expiry
- Session management
- Mock API with realistic delays

## 📊 Data Management
- Mock API service with TypeScript interfaces
- Realistic data structures
- Simulated network delays
- CRUD operations for all entities

## 🎨 Customization
All colors are defined in `/styles/globals.css` using CSS custom properties for easy theming.

## 🏗️ Project Structure
```
├── components/         # Reusable UI components
│   ├── ui/            # ShadCN components
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── Footer.tsx
│   └── ...
├── pages/             # Main dashboard pages
├── hooks/             # Custom React hooks
├── services/          # API service layer
└── styles/            # Global styles & theme
```

## 💡 Future Enhancements (Phase 2)
- Payment management
- Feedback system
- AI-powered insights
- Incident reporting
- Export functionality
- Advanced filtering
- Real-time updates via WebSocket
- Multi-language support

---

Made with ❤️ for mothers and caregivers by NeoNest
