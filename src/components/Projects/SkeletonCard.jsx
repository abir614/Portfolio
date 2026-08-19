export default function SkeletonCard() {
  return (
    <div className="neo-box rounded-2xl overflow-hidden h-full flex flex-col justify-between bg-[var(--neo-surface)] animate-pulse">
      <div>
        <div className="h-48 sm:h-52 bg-[var(--neo-surface-subtle)] border-b-2 border-[var(--neo-border)]" />
        <div className="p-5 sm:p-6 space-y-3">
          <div className="h-6 bg-[var(--neo-surface-subtle)] rounded w-3/4" />
          <div className="space-y-2">
            <div className="h-4 bg-[var(--neo-surface-subtle)] rounded w-full" />
            <div className="h-4 bg-[var(--neo-surface-subtle)] rounded w-5/6" />
          </div>
          <div className="flex gap-2 pt-2">
            <div className="h-5 bg-[var(--neo-surface-subtle)] rounded w-16" />
            <div className="h-5 bg-[var(--neo-surface-subtle)] rounded w-16" />
          </div>
        </div>
      </div>
      <div className="p-4 sm:px-6 sm:pb-6 pt-0">
        <div className="pt-3 border-t border-[var(--neo-border-subtle)] flex justify-between">
          <div className="h-4 bg-[var(--neo-surface-subtle)] rounded w-20" />
          <div className="h-4 bg-[var(--neo-surface-subtle)] rounded w-12" />
        </div>
      </div>
    </div>
  );
}