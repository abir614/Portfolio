import { useState, useEffect } from "react";
import { MotionDiv } from "../MotionDiv";
import ProjectCard from "./ProjectCard";
import SkeletonCard from "./SkeletonCard";
import { fetchRepos } from "../../lib/github";

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayedCount, setDisplayedCount] = useState(6);
  const LOAD_MORE_INCREMENT = 3;

  useEffect(() => {
    fetchRepos().then(data => {
      setRepos(data);
      setLoading(false);
    });
  }, []);

  const displayedRepos = repos.slice(0, displayedCount);
  const hasMore = displayedCount < repos.length;

  const handleLoadMore = () => {
    setDisplayedCount(prev => prev + LOAD_MORE_INCREMENT);
  };

  return (
    <section id="projects" className="relative py-24 px-6 bg-base-200 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl pb-3 font-bold mb-6 text-white">
            My Projects
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Here are some of my latest works from GitHub — automatically updated!
          </p>
        </MotionDiv>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {loading
            ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            : displayedRepos.map((repo, index) => (
                <MotionDiv
                  key={repo.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.6 }}
                >
                  <ProjectCard repo={repo} />
                </MotionDiv>
              ))
          }
        </div>

        {/* Load More Button */}
        {!loading && hasMore && (
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 text-lg font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              Load More Projects
            </button>
          </MotionDiv>
        )}

        {/* No Projects Message */}
        {!loading && repos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400 font-semibold">No public repos found</p>
          </div>
        )}

        {/* All Loaded Message */}
        {!loading && !hasMore && repos.length > 0 && (
          <div className="text-center py-12">
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <p className="text-lg text-gray-400 font-medium">✨ You've reached the end!</p>
              <p className="text-gray-500">All {repos.length} projects are now visible</p>
            </MotionDiv>
          </div>
        )}
      </div>
    </section>
  );
}