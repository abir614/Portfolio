import { MotionDiv } from "./MotionDiv";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />

      {[...Array(6)].map((_, i) => (
        <MotionDiv
          key={i}
          className="absolute w-2 h-2 bg-primary rounded-full opacity-50"
          animate={{
            y: [0, -40, 0],
            x: [0, 30, -20, 0],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            top: `${10 + i * 15}%`,
            left: `${5 + i * 18}%`,
          }}
        />
      ))}

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <MotionDiv initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Salman Toha
            </span>
          </h1>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-2xl md:text-4xl font-light mb-10 text-base-content/80"
        >
          <TypeAnimation
            sequence={[
              "Full-Stack Developer",
              2000,
              "React & Node.js Expert",
              2000,
              "UI/UX Enthusiast",
              2000,
            ]}
            repeat={Infinity}
          />
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <a href="#projects" className="btn btn-primary btn-lg">
            View Projects
          </a>
          <a href="#contact" className="btn btn-outline btn-lg">
            Contact Me
          </a>
        </MotionDiv>
      </div>

      <MotionDiv
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2" />
        </div>
      </MotionDiv>
    </section>
  );
}