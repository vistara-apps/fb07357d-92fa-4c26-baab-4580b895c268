export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4 animate-pulse-glow mx-auto">
          <span className="text-white font-bold text-xl">G</span>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-surface rounded w-32 mx-auto animate-pulse"></div>
          <div className="h-3 bg-surface/60 rounded w-24 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
