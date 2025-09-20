# GrooveSync - Sync Your Moves, Share Your Dance

![GrooveSync Logo](https://via.placeholder.com/150x50/FF6B6B/FFFFFF?text=GrooveSync)

A social dance practice app for Base users to access tutorials, practice with AI feedback, and connect with virtual dance partners.

## 🌟 Features

### Core Features
- **On-Demand Dance Tutorials**: Curated video tutorials for various dance styles
- **AI Practice Feedback**: Basic AI analysis for timing and form (paid feature)
- **Virtual Practice Sync**: Connect with others for synchronized practice sessions
- **Dance Challenges**: Create and participate in dance challenges with short clips

### Technical Features
- **Real-time Synchronization**: Socket.IO for live practice sessions
- **AI-Powered Analysis**: OpenAI integration for dance feedback
- **Decentralized Storage**: IPFS/Filecoin for video storage
- **Base Integration**: Wallet connectivity and micro-transactions
- **Farcaster Auth**: Seamless social authentication

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vistara-apps/fb07357d-92fa-4c26-baab-4580b895c268.git
   cd fb07357d-92fa-4c26-baab-4580b895c268
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your API keys and configuration.

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
groovesync/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── tutorials/           # Tutorial CRUD endpoints
│   │   ├── challenges/          # Challenge management
│   │   ├── practice-sessions/   # Practice session endpoints
│   │   ├── ai-feedback/         # AI analysis endpoints
│   │   └── socket/              # Socket.IO server setup
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── providers.tsx            # App providers
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   ├── features/                # Feature-specific components
│   ├── views/                   # Page-level components
│   └── layout/                  # Layout components
├── lib/                         # Utility libraries
│   ├── hooks/                   # Custom React hooks
│   ├── services/                # API service functions
│   ├── types.ts                 # TypeScript type definitions
│   ├── constants.ts             # App constants
│   └── utils.ts                 # Utility functions
├── prisma/                      # Database schema
│   └── schema.prisma            # Prisma schema definition
├── public/                      # Static assets
└── scripts/                     # Utility scripts
    └── seed.ts                  # Database seeding script
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI components

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Database ORM
- **SQLite** - Development database (easily switchable to PostgreSQL)

### Real-time & AI
- **Socket.IO** - Real-time communication
- **OpenAI API** - AI-powered dance analysis
- **IPFS/Filecoin** - Decentralized storage

### Blockchain
- **Base** - Ethereum Layer 2 network
- **OnchainKit** - Base integration toolkit
- **Farcaster** - Social authentication

## 📊 Database Schema

### Core Entities

#### User
```typescript
{
  userId: string;        // Farcaster FID
  username: string;
  profilePicUrl?: string;
  walletAddress: string;
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

#### DanceTutorial
```typescript
{
  tutorialId: string;
  title: string;
  description: string;
  videoUrl: string;
  danceStyle: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;      // in seconds
  instructor: string;
  tags: string[];
}
```

#### PracticeSession
```typescript
{
  sessionId: string;
  userId1: string;       // Creator
  userId2?: string;      // Partner (optional)
  tutorialId?: string;
  sessionType: 'solo' | 'partner' | 'group';
  startTime: DateTime;
  endTime?: DateTime;
  isLive: boolean;
}
```

#### Challenge
```typescript
{
  challengeId: string;
  title: string;
  description: string;
  startDate: DateTime;
  endDate: DateTime;
  creatorId: string;
  difficulty: string;
  prize?: string;
  participantCount: number;
}
```

#### Submission
```typescript
{
  submissionId: string;
  challengeId: string;
  userId: string;
  videoUrl: string;
  timestamp: DateTime;
  likes: number;
  views: number;
}
```

## 🔗 API Endpoints

### Tutorials
- `GET /api/tutorials` - Get all tutorials
- `POST /api/tutorials` - Create new tutorial
- `GET /api/tutorials/[id]` - Get tutorial by ID
- `PUT /api/tutorials/[id]` - Update tutorial
- `DELETE /api/tutorials/[id]` - Delete tutorial

### Challenges
- `GET /api/challenges` - Get all challenges
- `POST /api/challenges` - Create new challenge
- `GET /api/challenges/[id]` - Get challenge by ID

### Practice Sessions
- `GET /api/practice-sessions` - Get all sessions
- `POST /api/practice-sessions` - Create new session
- `PUT /api/practice-sessions/[id]` - Update session

### AI Feedback
- `POST /api/ai-feedback/analyze` - Analyze dance video

## 🎨 Design System

### Colors
- **Primary**: `hsl(240 90% 60%)` - Blue
- **Accent**: `hsl(30 90% 60%)` - Orange
- **Background**: `hsl(230 15% 8%)` - Dark blue-gray
- **Surface**: `hsl(230 15% 15%)` - Lighter blue-gray

### Typography
- **Display**: 3xl, bold
- **Heading**: xl, semibold
- **Body**: base, normal
- **Caption**: sm, medium

### Components
- Responsive grid layouts
- Smooth animations (cubic-bezier easing)
- Dark theme optimized
- Mobile-first design

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the Base ecosystem
- Inspired by social dance communities
- Powered by modern web technologies

## 📞 Support

For support, email support@groovesync.com or join our Discord community.

---

**Made with ❤️ for the dance community on Base**

