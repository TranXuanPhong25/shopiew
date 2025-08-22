export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <h2 className="text-2xl font-semibold text-primary">Shopiew</h2>
      </div>
      <p className="text-muted-foreground">Loading your experience...</p>
    </div>
  );
}
