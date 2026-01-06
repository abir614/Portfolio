import { MotionDiv } from "../MotionDiv";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-base-100">
      <div className="max-w-7xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* YOUR PHOTO */}
          <MotionDiv
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-50 group-hover:opacity-100 transition-all" />
              <img
                src="https://github.com/TheLunatic1.png"
                alt="Salman Toha"
                className="relative w-72 h-72 rounded-full border-4 border-base-200 shadow-2xl object-cover ring-4 ring-primary/20"
              />
            </div>
          </MotionDiv>

          {/* ABOUT TEXT — FROM RESUME */}
          <div className="space-y-6">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About Salman
            </h2>
            <p className="text-xl text-base-content/80 leading-relaxed">
              A <span className="font-bold text-primary">Frontend-Focused Developer</span> from Dhaka, Bangladesh, passionate about building scalable, high-performance web apps with React, Next.js, TailwindCSS, and DaisyUI. Experienced in IoT & AI-driven solutions. Eager to learn and collaborate!
            </p>
            <p className="text-lg text-base-content/70">
              Currently at <span className="font-semibold">Daffodil International University</span> (BSc in CSE, 4th year). GPA: HSC 4.95/5.00, SSC 5.00/5.00. Languages: Bangla (Native), English (Strong, IELTS 6.5), Hindi (Conversational).
            </p>
            <div className="flex gap-6">
              <a href="https://github.com/TheLunatic1" target="_blank" className="btn btn-primary">
                GitHub
              </a>
              <a  
              href="https://drive.google.com/file/d/1UIIg4Ku7gEiFIh7uSycBlVrCzGkYHIbW/view" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline">
                Download Resume
              </a>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}