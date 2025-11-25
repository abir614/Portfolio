import { useState, useEffect } from "react";
import { MotionDiv } from "../MotionDiv";
import ProjectCard from "./ProjectCard";
import SkeletonCard from "./SkeletonCard";
import { fetchRepos } from "../../lib/github";

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRepos().then(data => {
      setRepos(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="projects" className="py-20 px-6 bg-base-300/30">
      <div className="max-w-7xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            My <span className="text-primary">Projects</span>
          </h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Here are some of my latest works from GitHub — automatically updated!
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            : repos.map(repo => <ProjectCard key={repo.id} repo={repo} />)
          }
        </div>

        {!loading && repos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-base-content/50">No public repos found</p>
          </div>
        )}
      </div>
    </section>
  );
}