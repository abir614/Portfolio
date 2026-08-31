import { useRef, useState } from "react";
import Local3D from "../Local3D";
import {
  SiReact, SiNextdotjs, SiJavascript, SiTailwindcss, SiDaisyui,
  SiFramer, SiMongodb, SiNodedotjs, SiExpress, SiPostgresql, SiGraphql, SiSocketdotio,
  SiReactrouter, SiReacthookform, SiSwiper, SiVercel, SiNetlify,
  SiJsonwebtokens, SiGithub, SiCss3, SiWordpress,
  SiArduino, SiPython, SiTypescript, SiLinux,
  SiNginx, SiThreedotjs, SiDocker,
  SiCloudflare, SiZerotier, SiGithubactions, SiGnubash, SiPostman,
  SiShopify, SiGooglecolab
} from "react-icons/si";
import { GiArtificialIntelligence } from "react-icons/gi";
import { DiResponsive } from "react-icons/di";
import { PiMathOperations } from "react-icons/pi";
import { FaHtml5, FaGlobe, FaServer, FaNetworkWired } from "react-icons/fa";
import { FcCollaboration } from "react-icons/fc";
import { CiTimer } from "react-icons/ci";
import { gsap, useGSAP } from "../../lib/gsap";

const skillSections = [
  {
    id: "frontend",
    title: "Frontend Development",
    badge: "Core Expertise",
    badgeColor: "neo-badge-accent",
    description: "High-performance, pixel-perfect web interfaces and applications built with React, Next.js, TypeScript, and interactive animations.",
    skills: [
      { name: "React.js", type: "local", model: "/models/react.glb", glow: "#61dafb", scale: 0.5 },
      { name: "Next.js", icon: SiNextdotjs, color: "text-[var(--neo-text)]" },
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
      { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-teal-400" },
      { name: "Three.js", icon: SiThreedotjs, color: "text-[var(--neo-text)]" },
      { name: "HTML5", icon: FaHtml5, color: "text-orange-500" },
      { name: "CSS3", icon: SiCss3, color: "text-blue-500" },
      { name: "DaisyUI", icon: SiDaisyui, color: "text-teal-300" },
      { name: "GSAP & Motion", icon: SiFramer, color: "text-fuchsia-500" },
      { name: "React Router", icon: SiReactrouter, color: "text-red-500" },
      { name: "React Hook Form", icon: SiReacthookform, color: "text-pink-500" },
      { name: "Swiper Slider", icon: SiSwiper, color: "text-blue-400" },
      { name: "Responsive UI", icon: DiResponsive, color: "text-sky-400" },
    ]
  },
  {
    id: "networking",
    title: "Networking & Infrastructure",
    badge: "Specialized Stack",
    badgeColor: "neo-badge-cyan",
    description: "Linux systems administration, OpenWrt firewall routing, VLAN management, Serverless DNS (DoH), and NGINX load balancing.",
    skills: [
      { name: "Linux OS Admin", icon: SiLinux, color: "text-amber-500" },
      { name: "OpenWrt Routing", icon: FaNetworkWired, color: "text-cyan-500" },
      { name: "VLAN & Subnets", icon: FaServer, color: "text-emerald-400" },
      { name: "Serverless DNS", icon: SiCloudflare, color: "text-orange-400" },
      { name: "NGINX Balancing", icon: SiNginx, color: "text-emerald-500" },
      { name: "Cloudflare Tunnels", icon: SiCloudflare, color: "text-orange-500" },
      { name: "ZeroTier Mesh", icon: SiZerotier, color: "text-amber-400" },
      { name: "SSH Admin", icon: SiGnubash, color: "text-emerald-400" },
      { name: "VPS Hosting", icon: FaServer, color: "text-indigo-400" },
      { name: "Port Security", icon: SiGnubash, color: "text-rose-400" },
    ]
  },
  {
    id: "backend",
    title: "Backend & APIs",
    badge: "Full Stack & Edge",
    badgeColor: "neo-badge-accent",
    description: "Scalable server architectures, GraphQL & REST APIs, edge databases, WebSockets, and hardened cryptographic authentication.",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
      { name: "Express 5", icon: SiExpress, color: "text-slate-400" },
      { name: "MongoDB", icon: SiMongodb, color: "text-green-400" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-sky-500" },
      { name: "GraphQL", icon: SiGraphql, color: "text-pink-500" },
      { name: "REST APIs", icon: PiMathOperations, color: "text-blue-400" },
      { name: "JWT Auth", icon: SiJsonwebtokens, color: "text-purple-400" },
      { name: "Socket.IO", icon: SiSocketdotio, color: "text-[var(--neo-text)]" },
      { name: "Axios", icon: FaGlobe, color: "text-purple-500" },
    ]
  },
  {
    id: "devops",
    title: "DevOps & Automation",
    badge: "Cloud & Pipelines",
    badgeColor: "neo-badge-emerald",
    description: "Docker multi-layer builds, automated GitHub Actions CI/CD pipelines, and cloud platform deployment.",
    skills: [
      { name: "Docker", icon: SiDocker, color: "text-blue-500" },
      { name: "Docker Compose", icon: SiDocker, color: "text-sky-400" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "text-blue-400" },
      { name: "Fly.io", icon: FaServer, color: "text-violet-500" },
      { name: "Vercel", icon: SiVercel, color: "text-[var(--neo-text)]" },
      { name: "Netlify", icon: SiNetlify, color: "text-cyan-400" },
      { name: "Postman", icon: SiPostman, color: "text-orange-500" },
    ]
  },
  {
    id: "cms",
    title: "CMS & E-Commerce",
    badge: "Storefront Solutions",
    badgeColor: "neo-badge-amber",
    description: "Custom Shopify Liquid theme development, headless Shopify Storefront API integrations, and WordPress CMS.",
    skills: [
      { name: "Shopify", icon: SiShopify, color: "text-emerald-500" },
      { name: "Shopify Headless", icon: SiShopify, color: "text-teal-400" },
      { name: "Liquid Themes", icon: SiShopify, color: "text-emerald-400" },
      { name: "WordPress", icon: SiWordpress, color: "text-blue-500" },
    ]
  },
  {
    id: "tools_cs",
    title: "Tools, CS & Intelligence",
    badge: "Foundations & AI",
    badgeColor: "neo-badge-cyan",
    description: "Version control, Python data tooling, Edge AI/ML, and collaborative engineering workflows.",
    skills: [
      { name: "Git", type: "local", model: "/models/git.glb", glow: "#f05032", scale: 1.5 },
      { name: "GitHub", icon: SiGithub, color: "text-[var(--neo-text)]" },
      { name: "Python", type: "local", model: "/models/python.glb", glow: "#3776ab", scale: 0.05 },
      { name: "Google Colab", icon: SiGooglecolab, color: "text-amber-500" },
      { name: "IoT & Arduino", icon: SiArduino, color: "text-teal-500" },
      { name: "AI & ML", icon: GiArtificialIntelligence, color: "text-indigo-400" },
      { name: "Problem Solving", type: "local", model: "/models/problem-solving.glb", glow: "#a855f7", scale: 10 },
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
            A comprehensive overview of my technical stack — spanning React/Next.js frontend architectures, Linux & OpenWrt networking, and Docker-based infrastructure.
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