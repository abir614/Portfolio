import { MotionDiv } from "./MotionDiv";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-6 pb-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <MotionDiv
          key={i}
          className="absolute w-2 h-2 bg-primary rounded-full opacity-40"
          animate={{
            y: [0, -50, 0],
            x: [0, 40, -30, 0],
          }}
          transition={{
            duration: 18 + i * 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            top: `${15 + i * 14}%`,
            left: `${8 + i * 16}%`,
          }}
        />
      ))}

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Main Title */}
        <MotionDiv initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Salman Toha
            </span>
          </h1>
        </MotionDiv>

        
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl font-light mb-8 text-base-content/80 max-w-4xl mx-auto leading-relaxed"
        >
          Frontend-focused web developer passionate about building{" "}
          <span className="font-semibold text-primary">fast, beautiful, and scalable</span> applications
          using React, Next.js, TailwindCSS & DaisyUI. Always learning. Always improving.
        </MotionDiv>

        {/* Dynamic Role */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-2xl md:text-4xl font-medium mb-12 text-base-content/90"
        >
          <TypeAnimation
            sequence={[
              "MERN stack Developer",
              2000,
              "AI Enthusiast",
              2000,
              "React.js & Next.js Specialist",
              2000,
              "Always Learning",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </MotionDiv>

        {/* CTA Buttons */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <a href="#projects" className="btn btn-primary btn-lg">
            View My Projects
          </a>
          <a  href="https://drive.google.com/file/d/1UIIg4Ku7gEiFIh7uSycBlVrCzGkYHIbW/view" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg">
            Download Resume
          </a>
        </MotionDiv>
      </div>

      {/* Clean Scroll Indicator — No Overlap */}
      <MotionDiv
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center bg-base-100/60 backdrop-blur">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </MotionDiv>
    </section>
  );
}