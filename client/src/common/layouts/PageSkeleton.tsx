const PageSkeleton = () => {
  return (
    <main className="space-y-10 px-6 py-8 lg:px-8">
      {/* title */}
      <div className="bg-muted h-8 w-48 animate-pulse rounded-md" />

      {/* content */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="bg-background rounded-lg border p-2">
            <div className="bg-muted aspect-square animate-pulse rounded-md" />

            <div className="mt-4 space-y-2">
              <div className="bg-muted h-4 w-3/4 animate-pulse rounded" />
              <div className="bg-muted h-4 w-1/2 animate-pulse rounded" />
            </div>

            <div className="bg-muted mt-4 h-4 w-16 animate-pulse rounded" />
          </div>
        ))}
      </div>
    </main>
  );
};

export default PageSkeleton;
