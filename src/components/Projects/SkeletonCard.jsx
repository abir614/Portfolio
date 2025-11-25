export default function SkeletonCard() {
  return (
    <div className="card bg-base-200 shadow-xl animate-pulse">
      <div className="h-48 bg-base-300 rounded-t-xl" />
      <div className="card-body">
        <div className="h-6 bg-base-300 rounded w-3/4 mb-4" />
        <div className="h-4 bg-base-300 rounded w-full mb-2" />
        <div className="h-4 bg-base-300 rounded w-5/6" />
        <div className="flex gap-4 mt-6">
          <div className="h-8 bg-base-300 rounded-full w-20" />
          <div className="h-8 bg-base-300 rounded-full w-20" />
        </div>
      </div>
    </div>
  );
}