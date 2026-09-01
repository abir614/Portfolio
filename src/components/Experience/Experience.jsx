import { useRef } from "react";
import { FiServer, FiCode, FiShoppingBag, FiCheckCircle, FiBriefcase } from "react-icons/fi";
import { gsap, useGSAP } from "../../lib/gsap";

const experiences = [
  {
    period: "April 2026 — Present",
    category: "Professional Experience",
    badgeColor: "neo-badge-emerald",
    role: "Junior Frontend Developer",
    company: "Pixelora Studio",
    subtitle: "Betopia Group • Dhaka, Bangladesh",
    description:
      "Building client-facing web applications, responsive digital products, and interactive storefronts across global industries. Engineering high-performance React, Next.js, and TypeScript architectures with custom Liquid theme development and headless integrations.",
    highlights: [
      "Building client-facing web apps and interactive digital products for global clients across industries",
      "Engineering responsive, scalable web interfaces with React, Next.js, TypeScript & Tailwind CSS",
      "Integrating and customizing Shopify storefronts — headless (Storefront API) architecture, custom Liquid theme development, REST APIs & GraphQL",
      "Collaborating with cross-functional design, product, and QA teams across the Betopia Group",
    ],
    icon: FiBriefcase,
    techStack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Shopify Headless", "Liquid", "Storefront API", "GraphQL"],
  },
  {
    period: "2025 — Present",
    category: "Networking & DevOps",
    badgeColor: "neo-badge-cyan",
    role: "Networking & Systems Infrastructure",
    company: "Hands-on & Cloud Deployments",
    subtitle: "OpenWrt • Linux SysAdmin • Docker • Cloudflare",
    description:
      "Hands-on expertise in Linux systems administration, enterprise-grade OpenWrt network routing, serverless DNS, and Docker-based container infrastructure with load balancing.",
    highlights: [
      "Configured OpenWrt firewalls, DHCP, VLAN and subnet management, and per-user port access control",
      "Administered Linux OS, SSH access hardening, VPS hosting, domain & DNS management",
      "Configured NGINX setup & load balancing, Cloudflare Workers & Tunnels, and ZeroTier mesh networks",
      "Deployed Serverless DNS systems (DNS-over-HTTPS RFC 8484, DNSSEC) and Docker multi-layer builds",
    ],
    icon: FiServer,
    techStack: ["Linux OS", "OpenWrt", "NGINX", "Cloudflare Workers", "Docker", "Serverless DNS", "ZeroTier", "SSH"],
  },
  {
    period: "2024 — Present",
    category: "Full Stack & Edge",
    badgeColor: "neo-badge-accent",
    role: "Full Stack & Modern Web Engineering",
    company: "Independent & Open Source",
    subtitle: "Node.js • Express 5 • MongoDB • GraphQL • Edge AI",
    description:
      "Architecting full-stack serverless and edge applications with resilient backend architectures, hardened cryptographic security, and dynamic database integrations.",
    highlights: [
      "Engineered custom testimonial & submission engines syncing directly to Shopify Metaobjects",
      "Built media upload pipelines for images, videos & 3D models via Shopify Staged Uploads API",
      "Architected RFC 8484 compliant DoH resolvers with AI bandit routing (UCB, Kalman filters) and 40+ threat subsystems",
      "Implemented AES-256-GCM token encryption, Cloudflare Turnstile, and dual serverless runtimes",
    ],
    icon: FiCode,
    techStack: ["Node.js", "Express 5", "MongoDB", "Cloudflare D1 & KV", "JWT Auth", "GraphQL", "Edge AI", "Turnstile"],
  },
  {
    period: "2026 — Present",
    category: "E-Commerce & CMS Architecture",
    badgeColor: "neo-badge-amber",
    role: "Shopify & Headless Storefront Engineering",
    company: "Custom Themes & Headless Integrations",
    subtitle: "Shopify OS • Liquid • Storefront API • Metaobjects",
    description:
      "Engineering bespoke Shopify themes and high-speed headless storefronts with custom section rendering, dynamic metaobjects synchronization, and multi-tenant form pipelines.",
    highlights: [
      "Engineered custom streetwear storefronts built from scratch on Dawn with lookbooks, tabbed sliders, and rewards systems",
      "Developed custom form & testimonial engines syncing directly to Shopify Metaobjects with Staged Uploads API for media and 3D models",
      "Implemented high-conversion Ajax cart flows with free-shipping progress indicators, predictive search, and multi-currency localization",
      "Integrated headless Shopify architectures using Storefront API (GraphQL) with modern React & Next.js frontend layers",
    ],
    icon: FiShoppingBag,
    techStack: ["Shopify OS", "Liquid Themes", "Storefront API", "Shopify Metaobjects", "Ajax API", "GraphQL"],
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
        ease: "power2.out",
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
            Professional frontend engineering at Pixelora Studio, hands-on Linux & OpenWrt network infrastructure, and full-stack creations.
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
