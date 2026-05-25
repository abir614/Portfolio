import { useState } from "react";
import { MotionDiv, MotionNav } from "./MotionDiv";
import FurryBall from "./FurryBall";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { label: "Home", id: "hero" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Contact", id: "contact" },
  ];

  const smoothScroll = (e, id) => {
    e.preventDefault();
    const element = id === "root" 
      ? document.documentElement 
      : document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  return (
    <MotionNav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-linear-to-b from-base-100/95 to-base-100/80 border-b border-primary/10 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* HOME + LOGO */}
          <MotionDiv whileHover={{ scale: 1.05 }} className="flex items-center gap-1">
            <button
              onClick={(e) => smoothScroll(e, "root")}
              className="text-2xl font-bold bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent cursor-pointer hover:drop-shadow-lg transition-all"
            >
              Salman Toha
            </button>
          </MotionDiv>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={(e) => smoothScroll(e, link.id)}
                className="px-4 py-2 rounded-lg hover:bg-primary/10 text-base-content/80 hover:text-primary transition-all duration-300 font-medium group relative"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-primary to-secondary group-hover:w-full transition-all duration-300 rounded-full" />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden btn btn-ghost btn-circle text-2xl hover:bg-primary/10"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 pb-4 space-y-2"
          >
            {links.map((link) => (
              <button
                key={link.id}
                onClick={(e) => smoothScroll(e, link.id)}
                className="block w-full text-left py-3 px-4 rounded-lg hover:bg-primary/10 text-base-content/80 hover:text-primary font-medium transition-all duration-300"
              >
                {link.label}
              </button>
            ))}
          </MotionDiv>
        )}
      </div>
    </MotionNav>
  );
}