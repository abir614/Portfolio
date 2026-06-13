import { MotionDiv } from "./MotionDiv";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-32 pb-24">
      {/* Modern Background Gradient */}
      <div className="absolute inset-0 bg-base-200 pointer-events-none" />
      
      {/* Animated Gradient Blobs */}
      <div className="absolute top-20 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <MotionDiv
          key={i}
          className="absolute w-2 h-2 bg-primary rounded-full opacity-30"
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

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Greeting, Bio, Education */}
          <div className="space-y-8">
            {/* Main Title */}
            <MotionDiv 
              initial={{ opacity: 0, y: 40 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                Hi, I'm{" "}
                <span className="bg-base-200 text-white">
                  Salman Toha
                </span>
              </h1>
            </MotionDiv>

            {/* Bio Subtitle */}
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl"
            >
              A <span className="font-bold text-primary">Full Stack Developer</span> from Dhaka, Bangladesh, skilled in <span className="font-semibold">MERN Stack</span>, <span className="font-semibold">Web & Mobile</span> development, and <span className="font-semibold">DevOps</span>. Passionate about building scalable, high-performance applications with cutting-edge technologies.
            </MotionDiv>

            {/* Dynamic Role */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-2xl md:text-3xl font-semibold mb-8 text-gray-200"
            >
              <span className="text-primary">Currently: </span>
              <TypeAnimation
                sequence={[
                  "MERN Stack + Web, Mobile & DevOps",
                  2000,
                  "AI Enthusiast",
                  2000,
                  "React & Next.js Specialist",
                  2000,
                  "Always Learning and Building",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </MotionDiv>

            {/* Education & Languages */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-base md:text-lg text-gray-400 space-y-2"
            >
              <p><span className="font-semibold text-primary">🎓</span> Daffodil International University (BSc CSE, 4th Year) - GPA: HSC 4.95/5.00</p>
              <p><span className="font-semibold text-primary">🌍</span> Languages: Bangla (Native) • English (IELTS 6.5) • Hindi (Conversational)</p>
            </MotionDiv>

            {/* CTA Buttons */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <a  
                href="https://drive.google.com/file/d/1UIIg4Ku7gEiFIh7uSycBlVrCzGkYHIbW/view" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 text-lg font-semibold rounded-xl bg-blue-600 text-white shadow-lg hover:bg-blue-500 hover:shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                See Resume
              </a>
              <a 
                href="https://github.com/TheLunatic1" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 text-lg font-semibold rounded-xl border-2 border-primary text-primary hover:bg-primary/10 transition-all hover:scale-105 active:scale-95"
              >
                GitHub Profile
              </a>
            </MotionDiv>
          </div>

          {/* Right Side - Profile Photo */}
          <MotionDiv
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            className="flex justify-center order-first lg:order-last"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-base-200 rounded-3xl blur-2xl opacity-40 group-hover:opacity-80 transition-all duration-500" />
              <div className="absolute -inset-0.5 bg-base-200 rounded-3xl blur opacity-30 group-hover:opacity-60 animate-pulse" />
              <img
                src="https://github.com/TheLunatic1.png"
                alt="Salman Toha"
                className="relative w-64 h-64 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] rounded-3xl border-2 border-primary/30 shadow-2xl object-cover"
              />
            </div>
          </MotionDiv>
        </div>
      </div>

      {/* Scroll Indicator */}
      <MotionDiv
        animate={{ y: [0, 12, 0] }}
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