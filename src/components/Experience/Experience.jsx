import { useRef } from "react";
import { FiServer, FiCode, FiAward, FiCheckCircle, FiBriefcase } from "react-icons/fi";
import { gsap, useGSAP } from "../../lib/gsap";

const experiences = [
  {
    period: "April 15, 2024 — Present",
    category: "Professional Experience",
    badgeColor: "neo-badge-emerald",
    role: "Frontend Developer",
    company: "Pixelora Studio",
    subtitle: "A concern of Betopia Group • Dhaka, Bangladesh",
    description:
      "Developing high-performance, pixel-perfect frontend web solutions and interactive digital products under Betopia Group. Engineering modern React, Next.js, and TypeScript architectures with responsive UI systems, headless CMS integrations, and smooth GSAP/Framer animations.",
    highlights: [
      "Building client-facing applications and interactive digital products for global clients",
      "Engineering responsive, scalable web interfaces using React, Next.js, TypeScript & Tailwind CSS",
      "Integrating headless solutions (Wix Headless, Shopify Headless, REST/GraphQL APIs)",
      "Collaborating closely with cross-functional design, product, and QA teams under Betopia Group",
    ],
    icon: FiBriefcase,
    techStack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Wix Headless", "Shopify Headless"],
  },
  {
    period: "2023 — Present",
    category: "DevOps & Cloud",
    badgeColor: "neo-badge-cyan",
    role: "DevOps & Self-Hosted Infrastructure",
    company: "Custom HomeLab Server",
    subtitle: "Physical Server Lab • Docker • Cloudflare • CI/CD",
    description:
      "Engineered, wired, and maintaining a custom self-built physical homelab server running Linux & virtualization. Orchestrating multi-service Docker workloads, automated GitHub Actions CI/CD solutions, Nginx reverse proxies with SSL, zero-trust Cloudflare Tunnels, and private ZeroTier mesh networking.",
    highlights: [
      "Built and provisioned custom physical hardware server for self-hosting & cloud workloads",
      "Engineered automated GitHub Actions CI/CD deployment solutions for zero-downtime shipping",
      "Containerized multi-service microservices with Docker, Docker Compose, and PM2 process resilience",
      "Secured internal server access via Cloudflare Zero-Trust Tunnels & ZeroTier mesh VPN",
      "Configured high-performance Nginx reverse proxies with automated SSL certificate renewal",
    ],
    icon: FiServer,
    techStack: ["Custom HomeLab", "Docker", "GitHub Actions CI/CD", "Linux VPS", "Nginx", "PM2", "Cloudflare Tunnels", "ZeroTier"],
  },
  {
    period: "2022 — Present",
    category: "Full Stack & Mobile",
    badgeColor: "neo-badge-accent",
    role: "Full Stack & Mobile Developer",
    company: "Independent & Open Source",
    subtitle: "MERN Stack • React Native • Expo SDK • n8n Automation",
    description:
      "Designing and implementing scalable full-stack web and mobile applications. Building performant frontends in React/Next.js paired with robust Node.js/Express and MongoDB backends, as well as native mobile apps with Expo SDK and workflow automation with n8n.",
    highlights: [
      "Developed full-stack web apps with modern React, Next.js, Node.js, and MongoDB",
      "Built cross-platform iOS & Android mobile applications using React Native & Expo SDK",
      "Engineered secure JWT authentication, role-based access control, and payment flows",
      "Integrated workflow automation and self-hosted pipelines utilizing n8n and webhooks",
    ],
    icon: FiCode,
    techStack: ["React.js", "React Native", "Expo SDK", "Node.js", "Express.js", "MongoDB", "n8n", "JWT"],
  },
  {
    period: "2022 — 2026 (Expected)",
    category: "Education & Foundations",
    badgeColor: "neo-badge-amber",
    role: "BSc in Computer Science & Engineering",
    company: "Daffodil International University",
    subtitle: "4th Year Undergraduate • Dhaka, Bangladesh",
    description:
      "Final year computer science undergraduate with strong grounding in algorithms, data structures, computer networks, database systems, and software engineering methodologies. Maintained high academic standing with prior HSC GPA of 4.95 / 5.00.",
    highlights: [
      "Advanced coursework: Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks",
      "Active problem solver in C, C++, Python, and Java",
      "Collaborative project leadership and agile software engineering coursework",
    ],
    icon: FiAward,
    techStack: ["Algorithms", "Data Structures", "C++", "Python", "Java", "DBMS", "Computer Networks"],
  },
];

export default function Experience() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".exp-header", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".exp-header",
          start: "top 85%",
        },
      });

      gsap.from(".exp-card", {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".exp-timeline",
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-16 sm:py-24 2xl:py-32 px-2.5 sm:px-6 lg:px-8 bg-[var(--neo-bg)] relative border-t-2 border-b-2 border-[var(--neo-border)]"
    >
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto w-full">
        
        {/* Section Header */}
        <div className="exp-header text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2.5 sm:space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="neo-badge neo-badge-accent rounded-full text-[9px] xs:text-[10px] sm:text-xs">
              // CAREER & INFRASTRUCTURE
            </span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-5xl 2xl:text-6xl font-black font-display text-[var(--neo-text)] tracking-tight">
            Experience & Journey
          </h2>
          <p className="text-xs sm:text-base lg:text-lg 2xl:text-xl text-[var(--neo-text-muted)]">
            Professional industry experience, custom self-built homelab infrastructure, full-stack creations, and academic foundation.
          </p>
        </div>

        {/* Experience Timeline Grid */}
        <div className="exp-timeline grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 2xl:gap-10">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <div
                key={index}
                className="exp-card neo-box neo-hover-lift rounded-2xl p-4 sm:p-7 2xl:p-8 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Period & Category Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4 flex-wrap">
                    <span className="font-mono text-[10px] sm:text-xs 2xl:text-sm font-bold text-[var(--neo-text)] bg-[var(--neo-surface-subtle)] px-2.5 py-1 rounded-md border border-[var(--neo-border-subtle)]">
                      {exp.period}
                    </span>
                    <span className={`neo-badge ${exp.badgeColor} rounded-md text-[9px] sm:text-[11px] 2xl:text-xs`}>
                      {exp.category}
                    </span>
                  </div>

                  {/* Role Title, Company & Icon */}
                  <div className="flex items-start gap-3 sm:gap-3.5 mb-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 2xl:w-12 2xl:h-12 rounded-xl bg-[var(--neo-surface-subtle)] border-2 border-[var(--neo-border)] shadow-[2px_2px_0px_var(--neo-shadow)] flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0 text-xl sm:text-2xl">
                      <Icon />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-xl 2xl:text-2xl font-bold font-display text-[var(--neo-text)] leading-snug">
                        {exp.role}
                      </h3>
                      <p className="font-mono text-xs sm:text-sm 2xl:text-base font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
                        {exp.company}
                      </p>
                      <p className="font-mono text-[10px] sm:text-[11px] 2xl:text-xs text-[var(--neo-text-muted)]">
                        {exp.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm 2xl:text-base text-[var(--neo-text-muted)] leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5">
                    {exp.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm 2xl:text-base text-[var(--neo-text)]">
                        <FiCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0 text-sm 2xl:text-base" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="pt-3 sm:pt-3.5 border-t-2 border-[var(--neo-border-subtle)]">
                  <div className="flex flex-wrap gap-1.5 2xl:gap-2">
                    {exp.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] sm:text-[11px] 2xl:text-xs font-mono font-bold bg-[var(--neo-surface-subtle)] text-[var(--neo-text)] px-2 py-0.5 2xl:px-2.5 2xl:py-1 rounded border border-[var(--neo-border-subtle)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
