import { useState } from "react";
import { MotionDiv, MotionNav, MotionA } from "./MotionDiv";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = ["About", "Projects", "Skills", "Contact"];

  return (
    <MotionNav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-base-100/80 border-b border-base-300"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <MotionDiv whileHover={{ scale: 1.1 }}>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Salman Toha
            </h1>
          </MotionDiv>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link, i) => (
              <MotionA
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="hover:text-primary transition-colors font-medium"
              >
                {link}
              </MotionA>
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
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="block py-3 hover:text-primary font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link}
              </a>
            ))}
          </MotionDiv>
        )}
      </div>
    </MotionNav>
  );
}