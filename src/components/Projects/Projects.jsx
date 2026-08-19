import { useState, useEffect, useRef, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import SkeletonCard from "./SkeletonCard";
import { fetchRepos } from "../../lib/github";
import { FiFolder } from "react-icons/fi";
import { gsap, useGSAP } from "../../lib/gsap";

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayedCount, setDisplayedCount] = useState(6);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const sectionRef = useRef(null);
  const LOAD_MORE_INCREMENT = 3;

  useEffect(() => {
    fetchRepos().then((data) => {
      setRepos(data);
      setLoading(false);
    });
  }, []);

  // Filter projects by tags/languages
  const filteredRepos = useMemo(() => {
    if (selectedFilter === "all") return repos;
    if (selectedFilter === "fullstack") {
      return repos.filter(
        (r) =>
          r.topics?.some((t) => ["react", "nextjs", "mern", "fullstack", "node", "express", "mongo"].includes(t.toLowerCase())) ||
          ["JavaScript", "TypeScript", "HTML"].includes(r.language)
      );
    }
    if (selectedFilter === "devops") {
      return repos.filter(
        (r) =>
          r.topics?.some((t) => ["docker", "devops", "nginx", "cloudflare", "linux", "homelab", "bash"].includes(t.toLowerCase())) ||
          ["Docker", "Shell"].includes(r.language) ||
          r.name.toLowerCase().includes("devops") ||
          r.name.toLowerCase().includes("server")
      );
    }
    if (selectedFilter === "mobile") {
      return repos.filter(
        (r) =>
          r.topics?.some((t) => ["react-native", "expo", "mobile", "ios", "android"].includes(t.toLowerCase())) ||
          r.name.toLowerCase().includes("mobile") ||
          r.name.toLowerCase().includes("native")
      );
    }
    if (selectedFilter === "featured") {
      return repos.filter(
        (r) => (r.private && r.stargazers_count > 0) || (!r.private && r.stargazers_count > 0) || r.topics?.includes("featured")
      );
    }
    return repos;
  }, [repos, selectedFilter]);

  const displayedRepos = filteredRepos.slice(0, displayedCount);
  const hasMore = displayedCount < filteredRepos.length;

  const handleLoadMore = () => {
    setDisplayedCount((prev) => prev + LOAD_MORE_INCREMENT);
  };

  // GSAP scroll trigger for projects section header and cards
  useGSAP(
    () => {
      if (!loading && displayedRepos.length > 0) {
        gsap.fromTo(
          ".project-card-item",
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.08,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".projects-grid",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [loading, displayedCount, selectedFilter] }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-16 sm:py-24 2xl:py-32 px-2.5 sm:px-6 lg:px-8 bg-[var(--neo-bg)] relative overflow-hidden"
    >
      {/* Neo-Brutalist Dot Grid */}
      <div className="absolute inset-0 bg-neo-grid opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl 2xl:max-w-[1600px] mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2.5 sm:space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="neo-badge neo-badge-amber rounded-full text-[9px] xs:text-[10px] sm:text-xs">
              // RECENT CREATIONS
            </span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-5xl 2xl:text-6xl font-black font-display text-[var(--neo-text)] tracking-tight">
            Featured Projects
          </h2>
          <p className="text-xs sm:text-base lg:text-lg 2xl:text-xl text-[var(--neo-text-muted)]">
            Auto-synced directly from GitHub repositories — featuring full-stack web apps, DevOps automation, and mobile systems.
          </p>
        </div>

        {/* Filter Tabs Bar */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12">
          {[
            { id: "all", label: "All Repositories" },
            { id: "featured", label: "★ Starred & Featured" },
            { id: "fullstack", label: "Web & Full Stack" },
            { id: "devops", label: "DevOps & Cloud" },
            { id: "mobile", label: "Mobile Apps" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedFilter(tab.id);
                setDisplayedCount(6);
              }}
              className={`px-3 py-1.5 rounded-lg sm:rounded-xl text-[10px] xs:text-[11px] sm:text-xs font-mono font-bold border-2 border-[var(--neo-border)] transition-all cursor-pointer ${
                selectedFilter === tab.id
                  ? "bg-indigo-600 text-white shadow-[2px_2px_0px_var(--neo-shadow)] sm:shadow-[3px_3px_0px_var(--neo-shadow)] -translate-y-0.5"
                  : "bg-[var(--neo-surface)] text-[var(--neo-text)] shadow-[1px_1px_0px_var(--neo-shadow)] sm:shadow-[2px_2px_0px_var(--neo-shadow)] hover:bg-[var(--neo-surface-subtle)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 2xl:gap-10 mb-10 sm:mb-12">
          {loading
            ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            : displayedRepos.map((repo) => (
                <div key={repo.id} className="project-card-item h-full">
                  <ProjectCard repo={repo} />
                </div>
              ))}
        </div>

        {/* Empty State */}
        {!loading && filteredRepos.length === 0 && (
          <div className="text-center py-16 neo-box rounded-2xl p-6 sm:p-8 max-w-md mx-auto">
            <FiFolder className="w-12 h-12 text-indigo-500 mx-auto mb-3" />
            <h3 className="text-lg sm:text-xl font-bold font-display text-[var(--neo-text)] mb-1">
              No projects found
            </h3>
            <p className="text-xs sm:text-sm text-[var(--neo-text-muted)] mb-4">
              Try switching back to "All Repositories" to explore all public code.
            </p>
            <button
              onClick={() => setSelectedFilter("all")}
              className="neo-btn neo-btn-primary text-xs py-2 px-4 rounded-xl"
            >
              Show All Projects
            </button>
          </div>
        )}

        {/* Load More Action Bar */}
        {!loading && hasMore && (
          <div className="flex flex-col items-center justify-center gap-2.5 pt-2">
            <button
              onClick={handleLoadMore}
              className="neo-btn neo-btn-primary rounded-xl px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-bold flex items-center gap-2"
            >
              <span>Load More Projects</span>
              <span className="font-mono text-xs opacity-80 bg-white/20 px-2 py-0.5 rounded">
                +{Math.min(LOAD_MORE_INCREMENT, filteredRepos.length - displayedCount)}
              </span>
            </button>
            <p className="font-mono text-[10px] sm:text-xs text-[var(--neo-text-muted)]">
              Showing {displayedRepos.length} of {filteredRepos.length} projects
            </p>
          </div>
        )}

        {/* End of results message */}
        {!loading && !hasMore && filteredRepos.length > 0 && (
          <div className="text-center py-4 sm:py-6">
            <div className="inline-flex items-center gap-2 neo-badge rounded-full bg-[var(--neo-surface)] py-1 sm:py-1.5 px-3.5 sm:px-4 text-[10px] sm:text-xs">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>All {filteredRepos.length} projects loaded</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}