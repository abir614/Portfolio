import { useState } from "react";
import { MotionDiv } from "../MotionDiv";
import { FiGithub, FiExternalLink, FiStar, FiGitBranch, FiLock } from "react-icons/fi";

const languageColors = {
  JavaScript: "bg-base-300",
  TypeScript: "bg-base-300",
  HTML: "bg-base-300",
  CSS: "bg-base-300",
  Python: "bg-base-300",
  Java: "bg-base-300",
  React: "bg-base-300",
  Node: "bg-base-300",
  Tailwind: "bg-base-300",
};

export default function ProjectCard({ repo }) {
  const [imgError, setImgError] = useState(false);
  const langColor = languageColors[repo.language] || "bg-base-content/50";

  // Real GitHub OpenGraph preview (works 100% for public repos)
  const previewImage = `https://raw.githubusercontent.com/TheLunatic1/${repo.name}/main/preview.png`;
  
  const isPrivate = repo.private;
  // Make private repos featured if they have at least 1 star. Public if > 5 stars.
  const isFeatured = (isPrivate && repo.stargazers_count > 0) || (!isPrivate && repo.stargazers_count > 5);

  const handleCardClick = (e) => {
    // Don't navigate if clicking on action buttons
    if (e.target.closest('.action-button')) {
      e.stopPropagation();
      return;
    }
    window.open(repo.html_url, '_blank');
  };

  return (
    <MotionDiv
      whileHover={{ y: -12, scale: 1.03 }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group h-full"
    >
      <div
        onClick={handleCardClick}
        className="relative h-full flex flex-col rounded-2xl border-2 border-primary/10 hover:border-primary/30 bg-base-200 backdrop-blur shadow-lg hover:shadow-2xl transition-all duration-400 overflow-hidden group cursor-pointer"
      >
        {/* Gradient Overlay Effect */}
        <div className="absolute inset-0 bg-base-200 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

        {/* Preview Image or Fallback */}
        <figure className="relative h-56 bg-base-200 overflow-hidden flex items-center justify-center">
          {!isPrivate && !imgError ? (
            <img
              src={previewImage}
              alt={repo.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center opacity-50">
              {isPrivate ? <FiLock className="w-12 h-12 mb-3 text-primary" /> : <FiGithub className="w-12 h-12 mb-3" />}
              <span className="font-medium tracking-wide">
                {isPrivate ? "Private Repository" : "No Preview Available"}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-base-200 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
        </figure>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 transform translate-x-4 group-hover:translate-x-0 action-button">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-circle btn-sm bg-blue-600 hover:bg-blue-500 border-0 text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all"
            onClick={(e) => e.stopPropagation()}
            title="View Repository"
          >
            {isPrivate ? <FiLock className="text-lg" /> : <FiGithub className="text-lg" />}
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-sm bg-blue-600 hover:bg-blue-500 border-0 text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all"
              onClick={(e) => e.stopPropagation()}
              title="View Live Demo"
            >
              <FiExternalLink className="text-lg" />
            </a>
          )}
        </div>

        {/* Badges Container */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {isFeatured && (
            <div className="badge badge-lg bg-base-200 text-white border-0 font-semibold shadow-lg animate-pulse">
              <FiStar className="w-4 h-4 mr-1" /> Featured
            </div>
          )}
          {isPrivate && (
            <div className="badge badge-lg bg-base-300/90 text-base-content backdrop-blur border border-base-content/10 font-semibold shadow-lg">
              <FiLock className="w-4 h-4 mr-1" /> Private
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="relative z-5 flex-1 flex flex-col p-6 space-y-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-100 group-hover:text-primary transition-colors capitalize mb-2">
              {repo.name.replace(/-/g, " ")}
            </h2>
            <p className="text-slate-300 line-clamp-3 leading-relaxed text-sm md:text-base">
              {repo.description || "No description available"}
            </p>
          </div>

          {/* Tech Stack from Topics */}
          {repo.topics && repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {repo.topics.map((topic) => (
                <div key={topic} className="badge badge-outline badge-sm bg-primary/5 border-primary/20 text-primary/80 text-xs font-medium">
                  {topic}
                </div>
              ))}
            </div>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-xs md:text-sm pt-2 border-t border-base-300/50">
            {repo.language && (
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${langColor}`} />
                <span className="font-medium">{repo.language}</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-yellow-500 font-semibold">
              <FiStar className="w-4 h-4" />
              <span>{repo.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1 text-blue-500 font-semibold">
              <FiGitBranch className="w-4 h-4" />
              <span>{repo.forks_count}</span>
            </div>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}