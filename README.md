# GrooveSync - Base Mini App

A social dance practice app for Base users to access tutorials, practice with AI feedback, and connect with virtual dance partners.

## Features

- **On-Demand Dance Tutorials**: Curated library of video tutorials for various dance styles
- **AI Practice Feedback**: Basic AI analysis of practice clips with timing and form feedback
- **Virtual Practice Sync**: Connect with other dancers for synchronized practice sessions
- **Dance Challenges Showcase**: Create and participate in dance challenges

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Blockchain**: Base network integration via MiniKit
- **Identity**: OnchainKit for wallet and identity management
- **TypeScript**: Full type safety throughout the application

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Copy `.env.local` and add your API keys:
   ```bash
   NEXT_PUBLIC_MINIKIT_API_KEY=your_minikit_api_key_here
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key_here
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main application page
│   ├── providers.tsx      # MiniKit and OnchainKit providers
│   └── globals.css        # Global styles and Tailwind imports
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   ├── features/         # Feature-specific components
│   └── views/            # Page view components
├── lib/                  # Utilities and types
│   ├── types.ts          # TypeScript type definitions
│   ├── utils.ts          # Utility functions
│   └── constants.ts      # App constants and mock data
└── public/               # Static assets
```

## Key Components

### UI Components
- **Button**: Versatile button component with multiple variants
- **Card**: Container component for content sections
- **Avatar**: User profile image component with fallbacks
- **VideoPlayer**: Custom video player for tutorials
- **AvatarGroup**: Display multiple user avatars

### Feature Components
- **TutorialCard**: Display dance tutorial information
- **ChallengeCard**: Show challenge details and participation
- **PracticeSessionCard**: Live and recorded practice sessions

### Views
- **HomeView**: Main dashboard with featured content
- **TutorialsView**: Browse and filter dance tutorials
- **PracticeView**: Solo practice, partner finding, and AI feedback
- **ChallengesView**: Active, upcoming, and completed challenges
- **ProfileView**: User profile and statistics

## Design System

The app uses a custom design system with:

- **Colors**: Dark theme with purple/orange accent colors
- **Typography**: Clean, readable font hierarchy
- **Spacing**: Consistent spacing scale (sm: 4px, md: 8px, lg: 16px, xl: 24px)
- **Animations**: Smooth transitions and dance-themed animations
- **Mobile-first**: Responsive design optimized for mobile devices

## Business Model

- **Freemium**: Basic features free, premium AI feedback paid
- **Micro-transactions**: Pay per AI analysis session
- **Pricing**: 0.5 USDC for basic feedback, 2.0 USDC for premium analysis

## Development

### Adding New Features

1. Define types in `lib/types.ts`
2. Create components in appropriate directories
3. Add mock data to `lib/constants.ts`
4. Implement views and integrate with main app

### Styling Guidelines

- Use Tailwind CSS classes
- Follow the design system tokens
- Ensure mobile-first responsive design
- Use semantic color names (primary, accent, surface)

### State Management

Currently uses React's built-in state management. For complex state, consider adding:
- Zustand for client state
- React Query for server state
- Context for shared app state

## Deployment

The app is designed to be deployed as a Base Mini App:

1. Build the application: `npm run build`
2. Deploy to your hosting platform
3. Configure the Mini App manifest
4. Submit for Base App integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
