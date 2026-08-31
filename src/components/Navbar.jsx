import { useState, useRef, useEffect } from "react";
import { FiSun, FiMoon, FiMenu, FiX, FiFileText, FiTerminal } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { gsap, useGSAP } from "../lib/gsap";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const navRef = useRef(null);
  const lastScrollY = useRef(0);

  const links = [
    { label: "About", id: "hero" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Contact", id: "contact" },
  ];

  // GSAP Entrance animation for the Navbar
  useGSAP(
    () => {
      gsap.from(navRef.current, {
        y: -60,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    },
    { scope: navRef }
  );

  // Smart Hide-on-Scroll Animation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down -> hide navbar smoothly
        setIsVisible(false);
        setIsOpen(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up -> reveal navbar smoothly
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate Hide / Reveal with GSAP
  useEffect(() => {
    if (!navRef.current) return;
    if (isVisible) {
      gsap.to(navRef.current, {
        y: 0,
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.35,
        ease: "power2.out",
      });
    } else {
      gsap.to(navRef.current, {
        y: -90,
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isVisible]);

  const smoothScroll = (e, id) => {
    e.preventDefault();
    const element = id === "hero" ? document.documentElement : document.getElementById(id);

    if (element) {
      const yOffset = -85;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 w-full pt-2 sm:pt-4 px-2.5 sm:px-6 lg:px-8 transition-transform"
    >
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto w-full">
        <div className="neo-box bg-[var(--neo-surface)]/95 backdrop-blur-md px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl flex items-center justify-between w-full">
          
          {/* Brand Logo */}
          <button
            onClick={(e) => smoothScroll(e, "hero")}
            className="flex items-center gap-2 sm:gap-2.5 text-left group cursor-pointer flex-shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-indigo-600 text-white flex items-center justify-center font-mono font-bold text-xs sm:text-base border-2 border-[var(--neo-border)] shadow-[2px_2px_0px_var(--neo-shadow)] group-hover:bg-amber-400 group-hover:text-black transition-colors flex-shrink-0">
              <FiTerminal />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-display font-black text-sm xs:text-base sm:text-lg tracking-tight block text-[var(--neo-text)] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight whitespace-nowrap">
                Shahriar Abir
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono text-[var(--neo-text-muted)] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Jr. Frontend Developer
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links (Visible on lg: 1024px+ to avoid tablet 768px squishing) */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={(e) => smoothScroll(e, link.id)}
                className="px-3 py-1.5 text-xs xl:text-sm font-mono font-bold text-[var(--neo-text-muted)] hover:text-[var(--neo-text)] hover:bg-[var(--neo-surface-subtle)] rounded-lg border border-transparent hover:border-[var(--neo-border-subtle)] transition-all cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons: Resume + Theme Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            {/* Resume Button with responsive media query class */}
            <a
              href="https://drive.google.com/file/d/1obYzeaGVfZ-HkUJc5bjrhT9JEd0Z3pbu/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-resume-btn neo-btn neo-btn-amber rounded-lg sm:rounded-xl text-[11px] xs:text-xs sm:text-sm py-1.5 px-2.5 sm:px-3.5 flex items-center gap-1.5 whitespace-nowrap"
            >
              <FiFileText className="text-xs sm:text-sm" />
              <span>Resume</span>
            </a>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme mode"
              className="neo-btn neo-btn-surface rounded-lg sm:rounded-xl p-1.5 sm:p-2 text-xs sm:text-base flex items-center justify-center flex-shrink-0"
            >
              {theme === "dark" ? <FiSun className="text-amber-400" /> : <FiMoon className="text-indigo-600" />}
            </button>

            {/* Mobile / Tablet Drawer Toggle (Visible below lg: 1024px) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden neo-btn neo-btn-surface rounded-lg sm:rounded-xl p-1.5 sm:p-2 text-xs sm:text-base flex items-center justify-center flex-shrink-0"
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

        </div>

        {/* Mobile / Tablet Dropdown Menu Drawer */}
        {isOpen && (
          <div className="lg:hidden mt-2 neo-box bg-[var(--neo-surface)] p-3 sm:p-4 rounded-xl sm:rounded-2xl space-y-2 border-2 border-[var(--neo-border)] shadow-[4px_4px_0px_var(--neo-shadow)] animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-1">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={(e) => smoothScroll(e, link.id)}
                  className="px-3 py-2 text-xs sm:text-sm font-mono font-bold text-left text-[var(--neo-text)] hover:bg-[var(--neo-surface-subtle)] rounded-lg transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="pt-2 border-t border-[var(--neo-border-subtle)] flex flex-col gap-2">
              <a
                href="https://drive.google.com/file/d/1obYzeaGVfZ-HkUJc5bjrhT9JEd0Z3pbu/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn neo-btn-amber rounded-lg py-2 text-xs font-mono font-bold flex items-center justify-center gap-1.5"
              >
                <FiFileText />
                <span>View Full Resume</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}