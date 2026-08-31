import { FiArrowUp, FiTerminal } from "react-icons/fi";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const smoothScroll = (id) => {
    const element = id === "hero" ? document.documentElement : document.getElementById(id);
    if (element) {
      const yOffset = -85;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[var(--neo-surface)] border-t-2 border-[var(--neo-border)] py-10 sm:py-12 2xl:py-16 px-2.5 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto w-full space-y-6 sm:space-y-8">
        
        {/* Top Row: Brand & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 sm:pb-8 border-b-2 border-[var(--neo-border-subtle)]">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-indigo-600 text-white flex items-center justify-center font-mono font-bold text-sm sm:text-lg border-2 border-[var(--neo-border)] shadow-[2px_2px_0px_var(--neo-shadow)] flex-shrink-0">
              <FiTerminal />
            </div>
            <div>
              <span className="font-display font-black text-base sm:text-xl 2xl:text-2xl tracking-tight text-[var(--neo-text)] block leading-tight">
                Shahriar Mahmud Abir
              </span>
              <span className="text-[11px] sm:text-xs 2xl:text-sm font-mono text-[var(--neo-text-muted)]">
                Jr. Frontend Developer @ Pixelora Studio • Systems &amp; Networking Enthusiast
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs 2xl:text-sm font-mono font-bold text-[var(--neo-text-muted)]">
            {["hero", "experience", "projects", "skills", "contact"].map((id) => (
              <button
                key={id}
                onClick={() => smoothScroll(id)}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 capitalize transition-colors cursor-pointer"
              >
                {id}
              </button>
            ))}
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="neo-btn neo-btn-surface text-xs 2xl:text-sm py-2 px-3.5 rounded-xl flex items-center gap-1.5"
          >
            <span>Back to top</span>
            <FiArrowUp />
          </button>
        </div>

        {/* Bottom Row: Centered Copyright */}
        <div className="text-center text-xs 2xl:text-sm font-mono text-[var(--neo-text-muted)]">
          © {new Date().getFullYear()} Shahriar Mahmud Abir. Built with React 19, Tailwind CSS 4 &amp; GSAP.
        </div>

      </div>
    </footer>
  );
}
