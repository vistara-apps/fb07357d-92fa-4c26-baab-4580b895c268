// Static constants and configuration

// Dance styles with metadata
export const DANCE_STYLES = [
  { name: 'Hip-Hop', emoji: '🎤', color: 'from-orange-500 to-red-500' },
  { name: 'Contemporary', emoji: '🌊', color: 'from-blue-500 to-purple-500' },
  { name: 'K-Pop', emoji: '🌟', color: 'from-pink-500 to-purple-500' },
  { name: 'Breakdance', emoji: '🔥', color: 'from-red-500 to-yellow-500' },
  { name: 'Salsa', emoji: '💃', color: 'from-yellow-500 to-orange-500' },
  { name: 'Ballet', emoji: '🩰', color: 'from-purple-500 to-pink-500' },
  { name: 'Jazz', emoji: '🎷', color: 'from-green-500 to-blue-500' },
  { name: 'Freestyle', emoji: '⚡', color: 'from-cyan-500 to-blue-500' },
];

// App navigation items
export const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: 'Home' },
  { id: 'tutorials', label: 'Tutorials', icon: 'Play' },
  { id: 'practice', label: 'Practice', icon: 'Users' },
  { id: 'challenges', label: 'Challenges', icon: 'Trophy' },
  { id: 'profile', label: 'Profile', icon: 'User' },
];

// Pricing tiers for micro-transactions
export const PRICING_TIERS = {
  AI_FEEDBACK_BASIC: { price: 0.5, currency: 'USDC', description: 'Basic AI feedback' },
  AI_FEEDBACK_PREMIUM: { price: 2.0, currency: 'USDC', description: 'Detailed AI analysis' },
  TUTORIAL_PACK: { price: 5.0, currency: 'USDC', description: 'Premium tutorial pack' },
  PRACTICE_ROOM_HOUR: { price: 1.0, currency: 'USDC', description: '1 hour practice room' },
};
