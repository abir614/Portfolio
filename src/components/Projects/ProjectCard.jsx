import { MotionDiv } from "../MotionDiv";
import { FiGithub, FiExternalLink, FiStar, FiGitBranch } from "react-icons/fi";

const languageColors = {
  JavaScript: "bg-yellow-400",
  TypeScript: "bg-blue-600",
  HTML: "bg-orange-600",
  CSS: "bg-purple-600",
  Python: "bg-green-600",
  Java: "bg-red-600",
};

export default function ProjectCard({ repo }) {
  const langColor = languageColors[repo.language] || "bg-gray-500";

  return (
    <MotionDiv
      whileHover={{ y: -10, scale: 1.02 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group"
    >
      <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
        <figure className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
          <div className="absolute bottom-4 left-4 flex gap-3">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-primary btn-sm"
            >
              <FiGithub className="text-xl" />
            </a>
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-circle btn-secondary btn-sm"
              >
                <FiExternalLink className="text-xl" />
              </a>
            )}
          </div>
        </figure>

        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-primary">
            {repo.name.replace(/-/g, " ")}
          </h2>
          <p className="text-base-content/70 line-clamp-3">
            {repo.description || "No description available"}
          </p>

          <div className="flex items-center gap-4 mt-4 text-sm">
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

          <div className="card-actions mt-6">
            <div className="badge badge-outline">{new Date(repo.updated_at).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}