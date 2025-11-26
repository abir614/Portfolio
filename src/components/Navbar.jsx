import { useState } from "react";
import { MotionDiv, MotionNav } from "./MotionDiv";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = ["About", "Projects", "Skills", "Contact"];

  const smoothScroll = (e, id) => {
    e.preventDefault();
    
    const element = id === "root" 
      ? document.documentElement 
      : document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    
    setIsOpen(false);
  };

  return (
    <MotionNav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-base-100/80 border-b border-base-300"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* HOME BUTTON */}
          <MotionDiv whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={(e) => smoothScroll(e, "root")}
              className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent cursor-pointer"
            >
              Salman Toha
            </button>
          </MotionDiv>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link}
                onClick={(e) => smoothScroll(e, link.toLowerCase())}
                className="hover:text-primary transition-colors font-medium"
              >
                {link}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden btn btn-ghost text-xl"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden mt-4 pb-4"
          >
            {links.map((link) => (
              <button
                key={link}
                onClick={(e) => smoothScroll(e, link.toLowerCase())}
                className="block w-full text-left py-3 hover:text-primary font-medium"
              >
                {link}
              </button>
            ))}
          </MotionDiv>
        )}
      </div>
    </MotionNav>
  );
}