import { useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { FiGithub, FiFileText, FiArrowDown, FiTerminal, FiBriefcase, FiActivity, FiShoppingBag } from "react-icons/fi";
import { SiDocker, SiReact, SiLinux, SiShopify } from "react-icons/si";
import { gsap, useGSAP } from "../lib/gsap";

export default function Hero() {
  const heroRef = useRef(null);
  const textContentRef = useRef(null);
  const photoWrapperRef = useRef(null);
  const nameBadgeRef = useRef(null);

  // Subtle, smooth 3D Interactive Card & Floating Badges Mouse Parallax Tilt
  const handleMouseMove = (e) => {
    if (!photoWrapperRef.current) return;
    const rect = photoWrapperRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    gsap.to(photoWrapperRef.current, {
      rotationY: x * 7, // Subtle, gentle tilt
      rotationX: -y * 7,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.35,
    });
  };

  const handleMouseLeave = () => {
    if (!photoWrapperRef.current) return;
    gsap.to(photoWrapperRef.current, {
      rotationY: 0,
      rotationX: 0,
      ease: "elastic.out(1, 0.4)",
      duration: 0.8,
    });
  };

  // GSAP Entrance & Scroll-triggered reveals
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: 0.5,
      })
      .from(".hero-title", {
        opacity: 0,
        y: 35,
        duration: 0.7,
      }, "-=0.2")
      .from(".hero-typewriter-box", {
        opacity: 0,
        y: 20,
        scale: 0.98,
        duration: 0.5,
      }, "-=0.3")
      .from(".hero-bio", {
        opacity: 0,
        y: 25,
        duration: 0.6,
      }, "-=0.3")
      .from(".hero-credentials", {
        opacity: 0,
        y: 20,
        duration: 0.5,
      }, "-=0.3")
      .from(".hero-stats-item", {
        opacity: 0,
        y: 25,
        scale: 0.95,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.5)",
      }, "-=0.2")
      .from(".hero-cta-btn", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
      }, "-=0.3")
      .from(photoWrapperRef.current, {
        opacity: 0,
        scale: 0.92,
        rotation: 0,
        duration: 0.9,
        ease: "back.out(1.4)",
      }, "-=0.8")
      .from(".hero-float-badge", {
        opacity: 0,
        scale: 0.6,
        stagger: 0.12,
        duration: 0.6,
        ease: "back.out(2)",
      }, "-=0.4");

      // Continuous subtle floating micro-animation for the floating tech badges
      gsap.to(".hero-float-badge-1", {
        y: -6,
        rotation: 2,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".hero-float-badge-2", {
        y: 6,
        rotation: -2,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.4,
      });
      gsap.to(".hero-float-badge-3", {
        y: -5,
        rotation: 1.5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.8,
      });
      gsap.to(".hero-float-badge-4", {
        y: 5,
        rotation: -1.5,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.6,
      });

      // Ambient pulse for the Name Badge
      gsap.to(nameBadgeRef.current, {
        boxShadow: "5px 5px 0px var(--neo-shadow)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: heroRef }
  );

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -85;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[90vh] 2xl:min-h-[85vh] pt-16 xs:pt-20 sm:pt-26 2xl:pt-32 pb-14 sm:pb-24 2xl:pb-32 px-2.5 sm:px-6 lg:px-8 bg-neo-grid overflow-hidden flex items-center"
    >
      {/* Decorative Neo-Brutalist Ambient Glow Elements */}
      <div className="absolute -top-12 -left-12 w-48 h-48 2xl:w-96 2xl:h-96 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 -right-20 w-64 h-64 2xl:w-[450px] 2xl:h-[450px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="relative z-10 max-w-7xl 2xl:max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 2xl:gap-20 items-center">
          
          {/* Left Column: Bio & Core Info (7 Cols with explicit vertical margins) */}
          <div ref={textContentRef} className="lg:col-span-7">
            
            {/* Status Pill Badge & Current Role */}
            <div className="hero-badge flex flex-wrap items-center gap-1.5 sm:gap-3 mb-3 sm:mb-4">
              <span className="neo-badge neo-badge-emerald rounded-full text-[9px] xs:text-[10px] sm:text-xs 2xl:text-sm 2xl:px-4 2xl:py-1.5 hover:scale-105 transition-transform cursor-default">
                <span className="w-2 h-2 rounded-full bg-white animate-ping mr-1.5 inline-block"></span>
                Jr. Frontend Dev @ Pixelora Studio
              </span>
              <span className="neo-badge rounded-full bg-[var(--neo-surface-subtle)] text-[var(--neo-text-muted)] text-[9px] xs:text-[10px] sm:text-xs 2xl:text-sm 2xl:px-4 2xl:py-1.5 hover:scale-105 transition-transform cursor-default">
                Dhaka, Bangladesh
              </span>
            </div>

            {/* Main Headline with Animated Interactive Name Badge */}
            <div className="hero-title space-y-1 sm:space-y-1.5 mb-4 sm:mb-5">
              <p className="font-mono text-[11px] sm:text-sm 2xl:text-base font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                // JR. FRONTEND DEVELOPER & SYSTEMS ENTHUSIAST
              </p>
              <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-black text-[var(--neo-text)] tracking-tight leading-[1.16]">
                Hi, I'm{" "}
                <span className="relative inline-block group">
                  <span
                    ref={nameBadgeRef}
                    className="relative z-10 px-2.5 sm:px-3.5 2xl:px-5 py-0.5 bg-amber-400 dark:bg-amber-500 text-black border-2 sm:border-3 border-[var(--neo-border)] shadow-[3px_3px_0px_var(--neo-shadow)] 2xl:shadow-[5px_5px_0px_var(--neo-shadow)] rounded-lg sm:rounded-xl font-black inline-flex items-center gap-1.5 cursor-pointer transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-[-2deg] group-hover:shadow-[6px_6px_0px_var(--neo-shadow)] overflow-hidden"
                  >
                    <span className="relative z-10">Shahriar Mahmud Abir</span>
                    {/* Shimmer Light Flare */}
                    <span className="absolute top-0 left-0 w-1/2 h-full bg-white/30 skew-x-12 animate-neo-shimmer pointer-events-none" />
                  </span>
                </span>
              </h1>
            </div>

            {/* Dynamic Interactive Terminal Typewriter Box (Aligned flush left with extra breathing room below) */}
            <div className="hero-typewriter-box neo-box rounded-xl sm:rounded-2xl overflow-hidden bg-[var(--neo-surface)] hover:shadow-[7px_7px_0px_var(--neo-shadow)] hover:-translate-y-1.5 hover:-translate-x-0.5 hover:border-indigo-600 dark:hover:border-indigo-400 transition-all duration-300 group cursor-pointer w-full text-left mb-7 sm:mb-8 2xl:mb-9">
              {/* Terminal Window Header Bar */}
              <div className="bg-[var(--neo-surface-subtle)] group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/40 px-3 py-1.5 sm:px-4 sm:py-2 border-b-2 border-[var(--neo-border)] flex items-center justify-between transition-colors">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-[var(--neo-border)] group-hover:scale-125 transition-transform"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-[var(--neo-border)] group-hover:scale-125 transition-transform"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[var(--neo-border)] group-hover:scale-125 transition-transform animate-pulse"></span>
                </div>
                <span className="font-mono text-[9px] xs:text-[10px] sm:text-xs font-bold text-[var(--neo-text-muted)] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-1.5 transition-colors">
                  <FiTerminal className="text-indigo-500 group-hover:rotate-12 transition-transform" />
                  bash • abir@pixelora:~ (prod)
                </span>
              </div>

              {/* Terminal Content Body */}
              <div className="p-3 sm:p-4 2xl:p-4.5 flex items-center gap-2.5 text-xs xs:text-sm sm:text-lg md:text-xl 2xl:text-2xl font-bold font-mono text-[var(--neo-text)] overflow-hidden group-hover:bg-[var(--neo-surface-subtle)]/40 transition-colors text-left justify-start">
                <span className="text-emerald-500 font-bold select-none group-hover:translate-x-1 transition-transform inline-block flex-shrink-0">&gt;_</span>
                <TypeAnimation
                  sequence={[
                    "Jr. Frontend Dev @ Pixelora Studio",
                    2200,
                    "React.js, Next.js & TypeScript",
                    2200,
                    "Shopify Storefronts & Headless CMS",
                    2200,
                    "Linux SysAdmin & VPS Hosting",
                    2200,
                    "Docker & Load Balancing Infra",
                    2200,
                    "OpenWrt, VLANs & Serverless DNS",
                    2200,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-indigo-600 dark:text-indigo-400 font-semibold truncate group-hover:text-indigo-700 dark:group-hover:text-indigo-300 text-left"
                />
              </div>
            </div>

            {/* Bio Paragraph (With dedicated breathing room) */}
            <p className="hero-bio text-xs sm:text-base lg:text-lg 2xl:text-xl text-[var(--neo-text-muted)] leading-relaxed font-normal mb-5 sm:mb-6 text-left">
              Junior Frontend Developer at <strong className="text-[var(--neo-text)] font-semibold">Pixelora Studio (Betopia Group)</strong> building high-performance web applications with <strong className="text-[var(--neo-text)] font-semibold">React, Next.js, and TypeScript</strong>. Alongside frontend work, deeply experienced in Linux systems administration, networking (<strong className="text-[var(--neo-text)] font-semibold">OpenWrt, VLANs, DNS</strong>), and Docker-based infrastructure with load balancing.
            </p>

            {/* Education & Current Role Credentials */}
            <div className="hero-credentials space-y-1.5 sm:space-y-2 font-mono text-[11px] sm:text-sm 2xl:text-base text-[var(--neo-text)] mb-5 sm:mb-6">
              <div className="flex items-start gap-2 bg-[var(--neo-surface-subtle)] p-2.5 sm:p-3 2xl:p-3.5 rounded-xl border border-[var(--neo-border-subtle)] hover:border-[var(--neo-border)] transition-colors">
                <FiBriefcase className="text-emerald-500 text-sm sm:text-base 2xl:text-lg mt-0.5 flex-shrink-0" />
                <span className="leading-snug">
                  <strong>Pixelora Studio</strong> (Betopia Group) — <em>Jr. Frontend Dev</em> (April 2026 — Present)
                </span>
              </div>
              <div className="flex items-start gap-2 bg-[var(--neo-surface-subtle)] p-2.5 sm:p-3 2xl:p-3.5 rounded-xl border border-[var(--neo-border-subtle)] hover:border-[var(--neo-border)] transition-colors">
                <FiShoppingBag className="text-amber-500 text-sm sm:text-base 2xl:text-lg mt-0.5 flex-shrink-0" />
                <span className="leading-snug">
                  <strong>Shopify &amp; Headless CMS</strong> — Custom Liquid Themes &amp; Storefront API (GraphQL)
                </span>
              </div>
            </div>

            {/* Key Metric Cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 2xl:gap-4 mb-5 sm:mb-6">
              
              {/* Card 1: Pixelora Studio */}
              <div className="hero-stats-item neo-box-sm bg-[var(--neo-surface)] p-2 sm:p-3 2xl:p-4 rounded-xl text-center flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[4px_4px_0px_#4f46e5] hover:border-indigo-600 transition-all cursor-pointer group">
                <div className="flex items-center justify-between pb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform"></span>
                  <span className="text-[7px] xs:text-[8px] sm:text-[9px] font-mono font-bold uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-1 py-0.2 rounded border border-indigo-200 dark:border-indigo-800">
                    Active
                  </span>
                </div>
                <div className="text-base sm:text-2xl 2xl:text-3xl font-black font-display text-indigo-600 dark:text-indigo-400 leading-tight group-hover:scale-105 transition-transform">
                  Pixelora
                </div>
                <div className="text-[8px] xs:text-[9px] sm:text-xs 2xl:text-sm font-mono font-bold text-[var(--neo-text-muted)] uppercase tracking-tight mt-0.5">
                  Betopia Group
                </div>
              </div>

              {/* Card 2: Linux & Networking */}
              <div className="hero-stats-item neo-box-sm bg-[var(--neo-surface)] p-2 sm:p-3 2xl:p-4 rounded-xl text-center flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[4px_4px_0px_#10b981] hover:border-emerald-600 transition-all cursor-pointer group">
                <div className="flex items-center justify-between pb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-[7px] xs:text-[8px] sm:text-[9px] font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-1 py-0.2 rounded border border-emerald-200 dark:border-emerald-800 flex items-center gap-0.5">
                    <FiActivity className="animate-spin" /> Active
                  </span>
                </div>
                <div className="text-base sm:text-2xl 2xl:text-3xl font-black font-display text-emerald-600 dark:text-emerald-400 leading-tight group-hover:scale-105 transition-transform">
                  Networks
                </div>
                <div className="text-[8px] xs:text-[9px] sm:text-xs 2xl:text-sm font-mono font-bold text-[var(--neo-text-muted)] uppercase tracking-tight mt-0.5">
                  OpenWrt • Linux
                </div>
              </div>

              {/* Card 3: Cloud & Edge */}
              <div className="hero-stats-item neo-box-sm bg-[var(--neo-surface)] p-2 sm:p-3 2xl:p-4 rounded-xl text-center flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[4px_4px_0px_#f59e0b] hover:border-amber-500 transition-all cursor-pointer group">
                <div className="flex items-center justify-between pb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:scale-150 transition-transform"></span>
                  <span className="text-[7px] xs:text-[8px] sm:text-[9px] font-mono font-bold uppercase text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-1 py-0.2 rounded border border-amber-200 dark:border-amber-800">
                    Live
                  </span>
                </div>
                <div className="text-base sm:text-2xl 2xl:text-3xl font-black font-display text-amber-500 leading-tight group-hover:scale-105 transition-transform">
                  Cloudflare
                </div>
                <div className="text-[8px] xs:text-[9px] sm:text-xs 2xl:text-sm font-mono font-bold text-[var(--neo-text-muted)] uppercase tracking-tight mt-0.5">
                  DoH • Edge AI
                </div>
              </div>

            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 2xl:gap-4">
              <a
                href="https://drive.google.com/file/d/1obYzeaGVfZ-HkUJc5bjrhT9JEd0Z3pbu/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-btn neo-btn neo-btn-primary rounded-xl text-xs sm:text-sm 2xl:text-base py-2.5 sm:py-3 2xl:py-3.5 px-4 sm:px-6 2xl:px-8 text-center hover:scale-103 transition-transform"
              >
                <FiFileText className="text-base 2xl:text-lg" />
                <span>See Resume</span>
              </a>
              <a
                href="https://github.com/abir614"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-btn neo-btn neo-btn-surface rounded-xl text-xs sm:text-sm 2xl:text-base py-2.5 sm:py-3 2xl:py-3.5 px-4 sm:px-6 2xl:px-8 text-center hover:scale-103 transition-transform"
              >
                <FiGithub className="text-base 2xl:text-lg" />
                <span>GitHub Profile</span>
              </a>
              <button
                onClick={() => scrollToSection("projects")}
                className="hero-cta-btn neo-btn neo-btn-amber rounded-xl text-xs sm:text-sm 2xl:text-base py-2.5 sm:py-3 2xl:py-3.5 px-4 sm:px-6 2xl:px-8 text-center hover:scale-103 transition-transform"
              >
                <FiArrowDown className="text-base 2xl:text-lg" />
                <span>View Projects</span>
              </button>
            </div>
          </div>

          {/* Right Column: Subtle 3D Interactive Profile Visual & Floating Tech Badges (5 Cols) */}
          <div
            className="lg:col-span-5 flex justify-center relative mt-4 lg:mt-0 w-full overflow-visible neo-interactive-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Unified 3D-tilting container holding the photo card AND the 3 floating badges */}
            <div
              ref={photoWrapperRef}
              className="relative w-full max-w-[260px] xs:max-w-[300px] sm:max-w-sm md:max-w-md 2xl:max-w-lg mx-auto"
              style={{ transformStyle: "preserve-3d" }}
            >
              
              {/* Profile Card Container with Neo-Brutalist Frame */}
              <div
                className="neo-box-lg bg-[var(--neo-surface)] p-2.5 sm:p-4 2xl:p-5 rounded-2xl w-full relative z-10 hover:shadow-[8px_8px_0px_var(--neo-shadow)] transition-shadow duration-300"
              >
                {/* Header Window Bar */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-[var(--neo-border)]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500 border border-[var(--neo-border)] hover:scale-125 transition-transform cursor-pointer"></span>
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400 border border-[var(--neo-border)] hover:scale-125 transition-transform cursor-pointer"></span>
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 border border-[var(--neo-border)] hover:scale-125 transition-transform cursor-pointer animate-pulse"></span>
                  </div>
                  <span className="font-mono text-[10px] sm:text-xs 2xl:text-sm font-bold text-[var(--neo-text-muted)] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    abir_profile.sh
                  </span>
                </div>

                {/* Profile Image with Sharp Frame & Hover Zoom */}
                <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-[var(--neo-border)] bg-[var(--neo-surface-subtle)] group">
                  <img
                    src="/avatar-placeholder.svg"
                    alt="Shahriar Mahmud Abir - Jr. Frontend Developer"
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                  />
                  
                  {/* Status Overlay Footer Bar */}
                  <div className="absolute bottom-2 left-2 right-2 bg-[var(--neo-surface)]/95 backdrop-blur border-2 border-[var(--neo-border)] px-2 py-1 sm:px-2.5 sm:py-1.5 2xl:px-3 2xl:py-2 rounded-lg flex items-center justify-between shadow-[2px_2px_0px_var(--neo-shadow)] group-hover:shadow-[3px_3px_0px_var(--neo-shadow)] transition-all">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="font-mono text-[10px] sm:text-xs 2xl:text-sm font-bold text-[var(--neo-text)]">
                        @abir614
                      </span>
                    </div>
                    <span className="text-[8px] sm:text-[10px] 2xl:text-xs font-mono uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-black px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Pixelora Dev
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic Floating Neo-Brutalist Badges (Compact, Sleek, Subtle 3D Tilting) */}
              <div
                className="hero-float-badge hero-float-badge-1 absolute -top-2 -left-2 sm:-top-3 sm:-left-3 z-20 neo-badge neo-badge-cyan rounded-lg sm:rounded-xl px-2 sm:px-2.5 py-0.5 sm:py-1 flex items-center gap-1 sm:gap-1.5 text-[8px] xs:text-[9px] sm:text-[10px] shadow-[2px_2px_0px_var(--neo-shadow)] hover:scale-110 hover:rotate-3 transition-transform cursor-pointer"
                style={{ transform: "translateZ(30px)" }}
              >
                <SiDocker className="text-[10px] sm:text-xs text-blue-900" />
                <span className="font-bold font-mono">Docker & Cloudflare</span>
              </div>

              <div
                className="hero-float-badge hero-float-badge-2 absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 z-20 neo-badge neo-badge-accent rounded-lg sm:rounded-xl px-2 sm:px-2.5 py-0.5 sm:py-1 flex items-center gap-1 sm:gap-1.5 text-[8px] xs:text-[9px] sm:text-[10px] shadow-[2px_2px_0px_var(--neo-shadow)] hover:scale-110 hover:-rotate-3 transition-transform cursor-pointer"
                style={{ transform: "translateZ(35px)" }}
              >
                <SiReact className="text-[10px] sm:text-xs text-cyan-300 animate-spin" style={{ animationDuration: "12s" }} />
                <span className="font-bold font-mono">React.js & Next.js</span>
              </div>

              <div
                className="hero-float-badge hero-float-badge-3 absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-20 neo-badge neo-badge-amber rounded-lg sm:rounded-xl px-2 sm:px-2.5 py-0.5 sm:py-1 flex items-center gap-1 sm:gap-1.5 text-[8px] xs:text-[9px] sm:text-[10px] shadow-[2px_2px_0px_var(--neo-shadow)] hover:scale-110 hover:rotate-3 transition-transform cursor-pointer"
                style={{ transform: "translateZ(40px)" }}
              >
                <SiLinux className="text-[10px] sm:text-xs" />
                <span className="font-bold font-mono">Linux &amp; OpenWrt</span>
              </div>

              <div
                className="hero-float-badge hero-float-badge-4 absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 z-20 neo-badge neo-badge-emerald rounded-lg sm:rounded-xl px-2 sm:px-2.5 py-0.5 sm:py-1 flex items-center gap-1 sm:gap-1.5 text-[8px] xs:text-[9px] sm:text-[10px] shadow-[2px_2px_0px_var(--neo-shadow)] hover:scale-110 hover:-rotate-3 transition-transform cursor-pointer"
                style={{ transform: "translateZ(35px)" }}
              >
                <SiShopify className="text-[10px] sm:text-xs text-emerald-800 dark:text-emerald-300" />
                <span className="font-bold font-mono">Shopify &amp; Liquid</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}