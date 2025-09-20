import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        userId: 'user_1',
        username: 'dance_master',
        profilePicUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dance_master',
        walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      },
    }),
    prisma.user.create({
      data: {
        userId: 'user_2',
        username: 'groove_queen',
        profilePicUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=groove_queen',
        walletAddress: '0x1234567890123456789012345678901234567890',
      },
    }),
    prisma.user.create({
      data: {
        userId: 'user_3',
        username: 'rhythm_king',
        profilePicUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rhythm_king',
        walletAddress: '0x0987654321098765432109876543210987654321',
      },
    }),
  ]);

  console.log('✅ Created users:', users.length);

  // Create sample tutorials
  const tutorials = await Promise.all([
    prisma.danceTutorial.create({
      data: {
        tutorialId: 'tutorial_1',
        title: 'Hip-Hop Basics: Getting Started',
        description: 'Learn the fundamental moves of hip-hop dance including basic footwork and arm movements.',
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        danceStyle: 'Hip-Hop',
        difficulty: 'beginner',
        duration: 180, // 3 minutes
        instructor: 'DJ Spin',
        tags: ['hip-hop', 'basics', 'footwork', 'beginner'],
        thumbnailUrl: 'https://picsum.photos/400/225?random=1',
      },
    }),
    prisma.danceTutorial.create({
      data: {
        tutorialId: 'tutorial_2',
        title: 'Contemporary Flow: Emotional Expression',
        description: 'Explore fluid movements and emotional storytelling through contemporary dance.',
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
        danceStyle: 'Contemporary',
        difficulty: 'intermediate',
        duration: 240, // 4 minutes
        instructor: 'Luna Flow',
        tags: ['contemporary', 'flow', 'emotional', 'expression'],
        thumbnailUrl: 'https://picsum.photos/400/225?random=2',
      },
    }),
    prisma.danceTutorial.create({
      data: {
        tutorialId: 'tutorial_3',
        title: 'K-Pop Dance: Perfect Sync',
        description: 'Master the precise choreography and synchronization required for K-pop performances.',
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
        danceStyle: 'K-Pop',
        difficulty: 'advanced',
        duration: 300, // 5 minutes
        instructor: 'Star Sync',
        tags: ['k-pop', 'sync', 'choreography', 'advanced'],
        thumbnailUrl: 'https://picsum.photos/400/225?random=3',
      },
    }),
    prisma.danceTutorial.create({
      data: {
        tutorialId: 'tutorial_4',
        title: 'Breakdance: Power Moves',
        description: 'Learn explosive power moves and floor work techniques in breakdancing.',
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_10mb.mp4',
        danceStyle: 'Breakdance',
        difficulty: 'advanced',
        duration: 360, // 6 minutes
        instructor: 'Break King',
        tags: ['breakdance', 'power-moves', 'floor-work', 'advanced'],
        thumbnailUrl: 'https://picsum.photos/400/225?random=4',
      },
    }),
    prisma.danceTutorial.create({
      data: {
        tutorialId: 'tutorial_5',
        title: 'Salsa: Partner Connection',
        description: 'Build chemistry and connection with your dance partner through salsa fundamentals.',
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_20mb.mp4',
        danceStyle: 'Salsa',
        difficulty: 'intermediate',
        duration: 270, // 4.5 minutes
        instructor: 'Rhythm Partners',
        tags: ['salsa', 'partner-dance', 'connection', 'intermediate'],
        thumbnailUrl: 'https://picsum.photos/400/225?random=5',
      },
    }),
  ]);

  console.log('✅ Created tutorials:', tutorials.length);

  // Create sample challenges
  const challenges = await Promise.all([
    prisma.challenge.create({
      data: {
        challengeId: 'challenge_1',
        title: 'K-Pop Wave Challenge',
        description: 'Show off your best K-pop wave moves! Post a 15-second video of your most fluid arm waves and body rolls.',
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        creatorId: users[0].userId,
        difficulty: 'intermediate',
        prize: '5 USDC + Featured on Homepage',
        participantCount: 0,
        tags: ['k-pop', 'waves', 'fluidity', 'trending'],
      },
    }),
    prisma.challenge.create({
      data: {
        challengeId: 'challenge_2',
        title: 'Freestyle Friday',
        description: 'Express yourself! Create a 30-second freestyle routine showcasing your unique style and personality.',
        startDate: new Date(),
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        creatorId: users[1].userId,
        difficulty: 'advanced',
        prize: '10 USDC + Community Spotlight',
        participantCount: 0,
        tags: ['freestyle', 'expression', 'creativity', 'advanced'],
      },
    }),
    prisma.challenge.create({
      data: {
        challengeId: 'challenge_3',
        title: 'Sync & Flow',
        description: 'Find a practice partner and create a perfectly synchronized routine. Show the beauty of dance connection!',
        startDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        creatorId: users[2].userId,
        difficulty: 'intermediate',
        prize: '8 USDC + Partner Dance Feature',
        participantCount: 0,
        tags: ['sync', 'partner-dance', 'connection', 'intermediate'],
      },
    }),
  ]);

  console.log('✅ Created challenges:', challenges.length);

  // Create sample practice sessions
  const sessions = await Promise.all([
    prisma.practiceSession.create({
      data: {
        sessionId: 'session_1',
        userId1: users[0].userId,
        tutorialId: tutorials[0].tutorialId,
        sessionType: 'solo',
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        endTime: new Date(Date.now() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
        isLive: false,
      },
    }),
    prisma.practiceSession.create({
      data: {
        sessionId: 'session_2',
        userId1: users[1].userId,
        userId2: users[2].userId,
        tutorialId: tutorials[4].tutorialId,
        sessionType: 'partner',
        startTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        isLive: true,
      },
    }),
  ]);

  console.log('✅ Created practice sessions:', sessions.length);

  // Create sample submissions
  const submissions = await Promise.all([
    prisma.submission.create({
      data: {
        submissionId: 'submission_1',
        challengeId: challenges[0].challengeId,
        userId: users[0].userId,
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        likes: 42,
        views: 156,
        title: 'My K-Pop Wave Flow',
        description: 'Practiced this for 2 weeks! Hope you like it 💃',
      },
    }),
    prisma.submission.create({
      data: {
        submissionId: 'submission_2',
        challengeId: challenges[1].challengeId,
        userId: users[1].userId,
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_2mb.mp4',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
        likes: 28,
        views: 89,
        title: 'Friday Freestyle Vibes',
        description: 'Let the music guide me! 🎵',
      },
    }),
  ]);

  console.log('✅ Created submissions:', submissions.length);

  // Create sample AI feedback
  const feedbacks = await Promise.all([
    prisma.aIFeedback.create({
      data: {
        sessionId: sessions[0].sessionId,
        userId: users[0].userId,
        overallScore: 8.5,
        rhythmScore: 9.0,
        formScore: 8.0,
        energyScore: 8.5,
        suggestions: [
          'Great rhythm! Try to maintain consistent energy throughout the routine.',
          'Your form is solid, but focus on smoother transitions between moves.',
          'Consider adding more dynamic arm movements to enhance expression.'
        ],
        timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
        isPremium: false,
      },
    }),
  ]);

  console.log('✅ Created AI feedback:', feedbacks.length);

  console.log('🎉 Database seeded successfully!');
  console.log('📊 Summary:');
  console.log(`   Users: ${users.length}`);
  console.log(`   Tutorials: ${tutorials.length}`);
  console.log(`   Challenges: ${challenges.length}`);
  console.log(`   Practice Sessions: ${sessions.length}`);
  console.log(`   Submissions: ${submissions.length}`);
  console.log(`   AI Feedback: ${feedbacks.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

