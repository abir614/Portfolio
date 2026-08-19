import { useState } from "react";
import { FiGithub, FiExternalLink, FiStar, FiGitBranch, FiLock, FiCode } from "react-icons/fi";

const languageColors = {
  JavaScript: "bg-amber-400 text-black",
  TypeScript: "bg-blue-600 text-white",
  HTML: "bg-orange-500 text-white",
  CSS: "bg-blue-500 text-white",
  Python: "bg-emerald-600 text-white",
  Java: "bg-rose-600 text-white",
  C: "bg-slate-700 text-white",
  "C++": "bg-indigo-700 text-white",
};

export default function ProjectCard({ repo }) {
  const [imgError, setImgError] = useState(false);

  // GitHub preview image attempt
  const previewImage = `https://raw.githubusercontent.com/TheLunatic1/${repo.name}/main/preview.png`;

  const isPrivate = repo.private;
  const isFeatured =
    (isPrivate && repo.stargazers_count > 0) ||
    (!isPrivate && repo.stargazers_count > 0) ||
    repo.topics?.includes("featured");

  const handleCardClick = (e) => {
    if (e.target.closest(".action-btn")) {
      return;
    }
    window.open(repo.html_url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      onClick={handleCardClick}
      className="neo-box neo-hover-lift rounded-2xl overflow-hidden h-full flex flex-col justify-between cursor-pointer group bg-[var(--neo-surface)]"
    >
      <div>
        {/* Card Header Media & Badges */}
        <div className="relative h-48 sm:h-52 bg-[var(--neo-surface-subtle)] border-b-2 border-[var(--neo-border)] overflow-hidden flex items-center justify-center">
          {!isPrivate && !imgError ? (
            <img
              src={previewImage}
              alt={repo.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-[var(--neo-surface)] border-2 border-[var(--neo-border)] shadow-[2px_2px_0px_var(--neo-shadow)] flex items-center justify-center mb-2 text-indigo-600 dark:text-indigo-400 text-2xl group-hover:rotate-6 transition-transform">
                {isPrivate ? <FiLock /> : <FiCode />}
              </div>
              <span className="font-mono text-xs font-bold text-[var(--neo-text-muted)]">
                {isPrivate ? "Private Repository" : "Repository Workspace"}
              </span>
            </div>
          )}

          {/* Top Left Status Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {isFeatured && (
              <span className="neo-badge neo-badge-amber text-[10px] py-0.5 px-2 rounded">
                <FiStar className="inline mr-1 text-xs" /> Featured
              </span>
            )}
            {isPrivate && (
              <span className="neo-badge text-[10px] py-0.5 px-2 rounded bg-slate-900 text-white">
                <FiLock className="inline mr-1 text-xs" /> Private
              </span>
            )}
          </div>

          {/* Top Right Action Button */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10 action-btn">
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Open Live Preview"
                className="w-8 h-8 rounded-lg bg-emerald-500 text-white border-2 border-[var(--neo-border)] shadow-[2px_2px_0px_var(--neo-shadow)] hover:bg-emerald-600 flex items-center justify-center transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <FiExternalLink className="text-sm" />
              </a>
            )}
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="View on GitHub"
              className="w-8 h-8 rounded-lg bg-[var(--neo-surface)] text-[var(--neo-text)] border-2 border-[var(--neo-border)] shadow-[2px_2px_0px_var(--neo-shadow)] hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-colors"
            >
              <FiGithub className="text-sm" />
            </a>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-3">
          
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold font-display text-[var(--neo-text)] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors capitalize leading-snug">
            {repo.name.replace(/[-_]/g, " ")}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[var(--neo-text-muted)] line-clamp-3 leading-relaxed">
            {repo.description || "Scalable full-stack application built with modern architecture and clean codebase."}
          </p>

          {/* Topics Badges */}
          {repo.topics && repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {repo.topics.slice(0, 4).map((topic) => (
                <span
                  key={topic}
                  className="font-mono text-[10px] font-semibold bg-[var(--neo-surface-subtle)] text-[var(--neo-text-muted)] px-2 py-0.5 rounded border border-[var(--neo-border-subtle)]"
                >
                  #{topic}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Metadata & Quick View */}
      <div className="p-4 sm:px-6 sm:pb-6 pt-0">
        <div className="flex items-center justify-between pt-3 border-t border-[var(--neo-border-subtle)] text-xs font-mono text-[var(--neo-text-muted)]">
          
          {/* Language Badge */}
          {repo.language ? (
            <div className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full border border-[var(--neo-border)] ${languageColors[repo.language] || "bg-indigo-500"}`} />
              <span className="font-bold text-[var(--neo-text)]">{repo.language}</span>
            </div>
          ) : (
            <span className="font-medium text-[var(--neo-text-subtle)]">Repository</span>
          )}

          {/* Stars & Forks Stats */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-bold text-amber-500">
              <FiStar className="text-xs" />
              {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1 text-[var(--neo-text-muted)]">
              <FiGitBranch className="text-xs" />
              {repo.forks_count}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}