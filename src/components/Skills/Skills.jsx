import { useRef, useState } from "react";
import Local3D from "../Local3D";
import {
  SiReact, SiNextdotjs, SiJavascript, SiTailwindcss, SiDaisyui,
  SiFramer, SiFirebase, SiMongodb, SiNodedotjs, SiExpress,
  SiReactrouter, SiReacthookform, SiSwiper, SiVercel, SiNetlify,
  SiJsonwebtokens, SiChartdotjs, SiGithub, SiGit, SiCss3,
  SiArduino, SiPython, SiC, SiCplusplus, SiTypescript, SiLinux,
  SiNginx, SiWix, SiPm2, SiThreedotjs, SiDocker,
  SiCloudflare, SiZerotier, SiGithubactions, SiGnubash, SiPostman,
  SiShopify, SiN8N, SiProxmox
} from "react-icons/si";
import { GiArtificialIntelligence } from "react-icons/gi";
import { DiResponsive } from "react-icons/di";
import { PiMathOperations } from "react-icons/pi";
import { TbRouteSquare } from "react-icons/tb";
import { FaHtml5, FaHeadset, FaMobileAlt, FaBox, FaGlobe, FaEnvelope, FaServer } from "react-icons/fa";
import { FcCollaboration } from "react-icons/fc";
import { CiTimer } from "react-icons/ci";
import { gsap, useGSAP } from "../../lib/gsap";

const skillSections = [
  {
    id: "devops",
    title: "DevOps & Infrastructure",
    badge: "Specialized Stack",
    badgeColor: "neo-badge-cyan",
    description: "Custom physical server, Docker containers, Linux orchestration, automated CI/CD, and zero-trust private networking.",
    skills: [
      { name: "Docker", icon: SiDocker, color: "text-blue-500" },
      { name: "Docker Compose", icon: SiDocker, color: "text-sky-400" },
      { name: "HomeLab Server", icon: FaServer, color: "text-emerald-500" },
      { name: "Linux VPS", icon: SiLinux, color: "text-amber-500" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "text-blue-400" },
      { name: "Nginx Proxy", icon: SiNginx, color: "text-emerald-500" },
      { name: "PM2 Manager", icon: SiPm2, color: "text-indigo-500" },
      { name: "Cloudflare Tunnels", icon: SiCloudflare, color: "text-orange-500" },
      { name: "ZeroTier Mesh", icon: SiZerotier, color: "text-amber-400" },
      { name: "n8n Automation", icon: SiN8N, color: "text-rose-500" },
      { name: "SSH Hardening", icon: SiGnubash, color: "text-emerald-400" },
      { name: "Proxmox / KVM", icon: SiProxmox, color: "text-orange-600" },
    ]
  },
  {
    id: "frontend",
    title: "Frontend Development",
    badge: "Core Expertise",
    badgeColor: "neo-badge-accent",
    description: "Modern, dynamic, and responsive user interfaces built with React, Next.js, and interactive animations.",
    skills: [
      { name: "React.js", type: "local", model: "/models/react.glb", glow: "#61dafb", scale: 0.5 },
      { name: "Next.js", icon: SiNextdotjs, color: "text-[var(--neo-text)]" },
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
      { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
      { name: "HTML5", icon: FaHtml5, color: "text-orange-500" },
      { name: "CSS3", icon: SiCss3, color: "text-blue-500" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-teal-400" },
      { name: "DaisyUI", icon: SiDaisyui, color: "text-teal-300" },
      { name: "GSAP & Motion", icon: SiFramer, color: "text-fuchsia-500" },
      { name: "Three.js", icon: SiThreedotjs, color: "text-[var(--neo-text)]" },
      { name: "React Router", icon: SiReactrouter, color: "text-red-500" },
      { name: "React Hook Form", icon: SiReacthookform, color: "text-pink-500" },
      { name: "Swiper Slider", icon: SiSwiper, color: "text-blue-400" },
      { name: "Responsive UI", icon: DiResponsive, color: "text-sky-400" },
    ]
  },
  {
    id: "cms",
    title: "CMS & Headless E-Commerce",
    badge: "Headless & Studio",
    badgeColor: "neo-badge-emerald",
    description: "Modern headless content management systems, custom Wix Studio / Velo development, and Shopify headless storefronts.",
    skills: [
      { name: "Wix Studio", icon: SiWix, color: "text-[var(--neo-text)]" },
      { name: "Wix Headless", icon: SiWix, color: "text-indigo-400" },
      { name: "Wix Velo", icon: SiWix, color: "text-amber-400" },
      { name: "Shopify Headless", icon: SiShopify, color: "text-emerald-500" },
      { name: "Headless CMS", icon: SiNextdotjs, color: "text-sky-400" },
    ]
  },
  {
    id: "mobile",
    title: "Mobile Development",
    badge: "Cross-Platform",
    badgeColor: "neo-badge-amber",
    description: "Native cross-platform mobile applications for iOS and Android with fast performance and offline sync.",
    skills: [
      { name: "React Native", icon: FaMobileAlt, color: "text-blue-400" },
      { name: "Expo SDK", icon: FaBox, color: "text-indigo-400" },
      { name: "Expo SDK 54", icon: FaBox, color: "text-emerald-400" },
    ]
  },
  {
    id: "backend",
    title: "Backend & APIs",
    badge: "High Performance",
    badgeColor: "neo-badge-cyan",
    description: "Robust, secure backend architectures, RESTful API design, and database persistence.",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
      { name: "Express.js", icon: SiExpress, color: "text-slate-400" },
      { name: "MongoDB", icon: SiMongodb, color: "text-green-400" },
      { name: "Firebase", icon: SiFirebase, color: "text-yellow-500" },
      { name: "JWT Auth", icon: SiJsonwebtokens, color: "text-pink-500" },
      { name: "REST APIs", icon: PiMathOperations, color: "text-blue-400" },
      { name: "Protected Routes", icon: TbRouteSquare, color: "text-orange-400" },
      { name: "Chart.js", icon: SiChartdotjs, color: "text-rose-400" },
      { name: "Axios", icon: FaGlobe, color: "text-purple-500" },
      { name: "Resend", icon: FaEnvelope, color: "text-red-400" },
    ]
  },
  {
    id: "tools",
    title: "Tools, Workflow & Automation",
    badge: "Productivity",
    badgeColor: "neo-badge-accent",
    description: "Version control, automated pipelines, cloud platforms, and developer tooling.",
    skills: [
      { name: "n8n Pipelines", icon: SiN8N, color: "text-rose-500" },
      { name: "Git", type: "local", model: "/models/git.glb", glow: "#f05032", scale: 1.5 },
      { name: "GitHub", icon: SiGithub, color: "text-[var(--neo-text)]" },
      { name: "Vercel", icon: SiVercel, color: "text-[var(--neo-text)]" },
      { name: "Netlify", icon: SiNetlify, color: "text-cyan-400" },
      { name: "Postman", icon: SiPostman, color: "text-orange-500" },
    ]
  },
  {
    id: "cs",
    title: "CS Fundamentals & Languages",
    badge: "Computer Science",
    badgeColor: "neo-badge-amber",
    description: "Core algorithms, data structures, and foundational programming languages.",
    skills: [
      { name: "C++", type: "local", model: "/models/c.glb", glow: "#004482", scale: 0.05 },
      { name: "Python", type: "local", model: "/models/python.glb", glow: "#3776ab", scale: 0.05 },
      { name: "Java", type: "local", model: "/models/java.glb", glow: "#ea2d2e", scale: 0.5 },
      { name: "Problem Solving", type: "local", model: "/models/problem-solving.glb", glow: "#a855f7", scale: 10 },
      { name: "C Language", icon: SiC, color: "text-blue-600" },
      { name: "IoT & Arduino", icon: SiArduino, color: "text-teal-500" },
      { name: "AI & ML", icon: GiArtificialIntelligence, color: "text-indigo-400" },
    ]
  },
  {
    id: "soft",
    title: "Soft Skills",
    badge: "Leadership & Collaboration",
    badgeColor: "neo-badge-emerald",
    description: "Communication, engineering collaboration, and agile problem solving.",
    skills: [
      { name: "Leadership", icon: FaHeadset, color: "text-blue-400" },
      { name: "Collaboration", icon: FcCollaboration, color: "text-green-400" },
      { name: "Time Management", icon: CiTimer, color: "text-yellow-400" },
    ]
  }
];

export default function Skills() {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("all");

  useGSAP(
    () => {
      gsap.from(".skills-header", {
        opacity: 0,
        y: 35,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".skills-header",
          start: "top 85%",
        },
      });

      const categories = document.querySelectorAll(".skill-category-block");
      categories.forEach((cat) => {
        gsap.from(cat.querySelectorAll(".skill-card-item"), {
          opacity: 0,
          y: 20,
          scale: 0.95,
          stagger: 0.02,
          duration: 0.35,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cat,
            start: "top 85%",
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [activeCategory] }
  );

  const displayedSections = activeCategory === "all"
    ? skillSections
    : skillSections.filter((s) => s.id === activeCategory);

  const totalSkillsCount = skillSections.reduce((acc, s) => acc + s.skills.length, 0);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-16 sm:py-24 px-2.5 sm:px-6 lg:px-8 bg-[var(--neo-bg)] relative border-t-2 border-[var(--neo-border)]"
    >
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto w-full">
        
        {/* Header */}
        <div className="skills-header text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2.5 sm:space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="neo-badge neo-badge-cyan rounded-full text-[9px] xs:text-[10px] sm:text-xs">
              // TECHNICAL ARSENAL
            </span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-5xl font-black font-display text-[var(--neo-text)] tracking-tight">
            Skills & Infrastructure
          </h2>
          <p className="text-xs sm:text-base lg:text-lg text-[var(--neo-text-muted)]">
            A comprehensive overview of my technical stack — spanning Full Stack Web & Mobile, CMS & Headless E-Commerce, and Self-Hosted HomeLab DevOps.
          </p>
        </div>

        {/* Category Tabs Filter */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] xs:text-[11px] sm:text-xs font-mono font-bold border-2 border-[var(--neo-border)] transition-all cursor-pointer ${
              activeCategory === "all"
                ? "bg-indigo-600 text-white shadow-[2px_2px_0px_var(--neo-shadow)] -translate-y-0.5"
                : "bg-[var(--neo-surface)] text-[var(--neo-text)] shadow-[1px_1px_0px_var(--neo-shadow)] hover:bg-[var(--neo-surface-subtle)]"
            }`}
          >
            All Skills ({totalSkillsCount})
          </button>
          {skillSections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveCategory(sec.id)}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] xs:text-[11px] sm:text-xs font-mono font-bold border-2 border-[var(--neo-border)] transition-all cursor-pointer ${
                activeCategory === sec.id
                  ? "bg-indigo-600 text-white shadow-[2px_2px_0px_var(--neo-shadow)] -translate-y-0.5"
                  : "bg-[var(--neo-surface)] text-[var(--neo-text)] shadow-[1px_1px_0px_var(--neo-shadow)] hover:bg-[var(--neo-surface-subtle)]"
              }`}
            >
              {sec.title}
            </button>
          ))}
        </div>

        {/* Skill Category Blocks */}
        <div className="space-y-8 sm:space-y-10">
          {displayedSections.map((section) => (
            <div
              key={section.id}
              className="skill-category-block neo-box rounded-2xl p-3.5 sm:p-5 lg:p-6 bg-[var(--neo-surface)]"
            >
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-3 sm:pb-4 mb-4 sm:mb-5 border-b-2 border-[var(--neo-border)]">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-xl font-bold font-display text-[var(--neo-text)]">
                      {section.title}
                    </h3>
                    <span className={`neo-badge ${section.badgeColor} rounded-md text-[9px] sm:text-[10px]`}>
                      {section.badge}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[var(--neo-text-muted)] mt-0.5">
                    {section.description}
                  </p>
                </div>
                <div className="font-mono text-[10px] sm:text-xs font-bold text-[var(--neo-text-subtle)]">
                  {section.skills.length} Tools
                </div>
              </div>

              {/* Skills Grid: Proportional, Compact & Uniform Squares on ALL screens */}
              <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9 gap-2 xs:gap-2.5 sm:gap-3">
                {section.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-card-item aspect-square w-full">
                    {skill.type === "local" ? (
                      <Local3D
                        model={skill.model}
                        glow={skill.glow}
                        name={skill.name}
                        scale={skill.scale || 1}
                      />
                    ) : (
                      <div className="aspect-square w-full neo-box-sm neo-hover-lift rounded-xl p-1.5 xs:p-2 sm:p-2.5 flex flex-col items-center justify-between text-center bg-[var(--neo-surface-subtle)] group cursor-pointer">
                        <div className="flex-1 w-full flex items-center justify-center">
                          <skill.icon
                            className={`text-2xl xs:text-3xl sm:text-3xl md:text-4xl ${skill.color} transition-transform duration-300 group-hover:scale-115 group-hover:-rotate-3`}
                          />
                        </div>
                        <p className="font-display font-bold text-[10px] xs:text-[11px] sm:text-xs text-[var(--neo-text)] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1 w-full text-center pt-0.5">
                          {skill.name}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}