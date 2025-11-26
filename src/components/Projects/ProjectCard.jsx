import { MotionDiv } from "../MotionDiv";
import { FiGithub, FiExternalLink, FiStar, FiGitBranch } from "react-icons/fi";

const languageColors = {
  JavaScript: "bg-yellow-400",
  TypeScript: "bg-blue-600",
  HTML: "bg-orange-600",
  CSS: "bg-purple-600",
  Python: "bg-green-600",
  Java: "bg-red-600",
  React: "bg-cyan-500",
  Node: "bg-green-600",
  Tailwind: "bg-teal-500",
};

export default function ProjectCard({ repo }) {
  const langColor = languageColors[repo.language] || "bg-gray-500";

  // Real GitHub OpenGraph preview (works 100%)
  const previewImage = `https://raw.githubusercontent.com/TheLunatic1/${repo.name}/main/preview.png`;
  const fallbackImage = "https://via.placeholder.com/600x400/1e293b/94a3b8?text=No+Preview";

  return (
    <MotionDiv
      whileHover={{ y: -12, scale: 1.03 }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group h-full"
    >
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col cursor-pointer border border-base-300 relative overflow-hidden">
          {/* Preview Image */}
          <figure className="relative h-56 bg-gray-900">
            <img
              src={previewImage}
              alt={fallbackImage}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextElementSibling.style.display = "block";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/30 to-transparent hidden" />
          </figure>

          {/* Action Buttons (Round & Beautiful) */}
          <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-primary btn-sm shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <FiGithub className="text-lg" />
            </a>
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-circle btn-secondary btn-sm shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <FiExternalLink className="text-lg" />
              </a>
            )}
          </div>

          {/* Featured Badge */}
          {repo.stargazers_count > 5 && (
            <div className="absolute top-4 left-4 z-10">
              <div className="badge badge-primary badge-lg animate-pulse">
                <FiStar className="w-4 h-4 mr-1" /> Featured
              </div>
            </div>
          )}

          <div className="card-body flex-1 flex flex-col p-6">
            <h2 className="card-title text-2xl font-bold text-primary group-hover:text-primary-focus transition-colors capitalize">
              {repo.name.replace(/-/g, " ")}
            </h2>
            <p className="text-base-content/70 line-clamp-3 flex-1">
              {repo.description || "No description available"}
            </p>

            {/* Tech Stack from Topics */}
            {repo.topics && repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {repo.topics.map((topic) => (
                  <div key={topic} className="badge badge-outline badge-sm">
                    {topic}
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-4 underline-offset-4 mt-4 text-sm">
              {repo.language && (
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${langColor}`} />
                  <span>{repo.language}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <FiStar className="text-yellow-500" />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <FiGitBranch />
                <span>{repo.forks_count}</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </MotionDiv>
  );
}