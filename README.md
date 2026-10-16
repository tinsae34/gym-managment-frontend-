# Gym Management Frontend - Reception Dashboard

A modern, high-performance reception and admin dashboard for gym management built with React, TypeScript, and Vite.

## 🎯 Features

### Quick Check-In Screen
- Fast member search via phone number or QR code token
- USB/Bluetooth barcode scanner support
- Real-time status display with visual animations
- Quick payment & renewal for expired members
- Live check-in activity feed

### Member Management
- Filterable member list (All, Active, Expired, Frozen)
- Advanced search by name or phone
- Payment recording with automatic membership extension
- QR code generation for member cards
- Printable/downloadable QR codes

### New Member Onboarding
- Simple registration form (name & phone)
- Automatic QR token generation
- Instant membership activation

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Notifications**: Sonner
- **QR Codes**: qrcode.react
- **Routing**: React Router v6

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The app will run on `http://localhost:3000` with API proxy to `http://localhost:5000`.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Layout.tsx
│   ├── MemberCard.tsx
│   ├── StatusBadge.tsx
│   ├── NewMemberModal.tsx
│   ├── PaymentModal.tsx
│   └── QRCodeModal.tsx
├── pages/             # Main screens
│   ├── CheckInScreen.tsx
│   └── MembersScreen.tsx
├── lib/               # API client
│   └── api.ts
├── types/             # TypeScript definitions
│   └── index.ts
├── utils/             # Helper functions
│   ├── cn.ts
│   └── dateUtils.ts
├── theme.ts           # Design system configuration
├── App.tsx
├── main.tsx
└── index.css
```

## 🎨 Theme & Design

The dashboard uses a dark, athletic design system optimized for high-speed operations:

- **Primary Color**: Indigo (`#4f46e5`)
- **Success Color**: Emerald (`#10b981`)
- **Background**: Dark slate (`#0f172a`)
- **Cards**: Slate 800 (`#1e293b`)

Theme configuration is centralized in `src/theme.ts`.

## 🔌 API Integration

The frontend expects these backend endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/members` | Get all members (optional `?status=` filter) |
| GET | `/api/members/search?q={query}` | Search members by phone/token |
| POST | `/api/members` | Create new member |
| POST | `/api/payments` | Record payment & extend membership |
| POST | `/api/checkin` | Check in member |

API client is configured in `src/lib/api.ts` with automatic error handling.

## ⌨️ Keyboard Shortcuts

- **Check-In Screen**: Input auto-focuses after each scan
- **Enter**: Trigger search/scan
- **Tab**: Navigate between fields
- **Esc**: Close modals

## 🖨️ Barcode Scanner Integration

The check-in input supports USB/Bluetooth barcode scanners that emulate keyboard input:

1. Scanner sends data to focused input
2. Scanner sends Enter key
3. App automatically processes check-in

## 📱 Responsive Design

Optimized for:
- Desktop reception stations (primary use case)
- Tablets for mobile check-in
- Large displays for lobby kiosks

## 🔒 Security

- API proxy prevents CORS issues
- Input validation on all forms
- Error handling with user-friendly messages
- No sensitive data in local storage

## 🎯 Performance

- Vite for instant HMR
- Code splitting with React Router
- Optimized re-renders with React hooks
- Debounced search inputs
- Lazy loading for modals

## 📄 License

Private - Gym Management System
