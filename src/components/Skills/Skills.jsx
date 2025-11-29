import { MotionDiv } from "../MotionDiv";
import Local3D from "../Local3D";
import {
  SiReact, SiNextdotjs, SiJavascript, SiTailwindcss, SiDaisyui,
  SiFramer, SiFirebase, SiMongodb, SiNodedotjs, SiExpress,
  SiReactrouter, SiReacthookform, SiSwiper, SiVercel, SiNetlify,
  SiJsonwebtokens, SiChartdotjs, SiGithub, SiGit, SiCss3,
  SiArduino, SiPython, SiC, SiCplusplus
} from "react-icons/si";
import { GiArtificialIntelligence, GiToaster } from "react-icons/gi";
import { DiResponsive } from "react-icons/di";
import { PiMathOperations } from "react-icons/pi";
import { TbRouteSquare } from "react-icons/tb";
import { FaHtml5 } from "react-icons/fa";
import { FcCollaboration } from "react-icons/fc";
import { CiTimer } from "react-icons/ci";
import { GrTooltip } from "react-icons/gr";

const skillSections = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js",          type: "local", model: "/models/react.glb",           glow: "#61dafb", scale: 0.5 },
      { name: "Next.js",           icon: SiNextdotjs,        color: "text-black dark:text-white" },
      { name: "JavaScript",        icon: SiJavascript,       color: "text-yellow-500" },
      { name: "HTML5",             icon: FaHtml5,            color: "text-orange-600" },
      { name: "CSS3",              icon: SiCss3,             color: "text-blue-600" },
      { name: "Tailwind CSS",      icon: SiTailwindcss,      color: "text-teal-500" },
      { name: "DaisyUI",           icon: SiDaisyui,          color: "text-purple-500" },
      { name: "Framer Motion",     icon: SiFramer,           color: "text-pink-500" },
      { name: "React Router",      icon: SiReactrouter,      color: "text-red-600" },
      { name: "React Hook Form",   icon: SiReacthookform,    color: "text-pink-600" },
      { name: "Swiper Slider",     icon: SiSwiper,           color: "text-blue-600" },
      { name: "Responsive Design", icon: DiResponsive,       color: "text-green-500" },
      { name: "React Hot Toast",   icon: GiToaster,          color: "text-orange-500" },
      { name: "React Tooltip",     icon: GrTooltip,          color: "text-blue-500" },
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js",           icon: SiNodedotjs,        color: "text-green-600" },
      { name: "Express.js",        icon: SiExpress,          color: "text-gray-700" },
      { name: "MongoDB",           icon: SiMongodb,          color: "text-green-600" },
      { name: "Firebase",          icon: SiFirebase,         color: "text-yellow-500" },
      { name: "JWT",               icon: SiJsonwebtokens,    color: "text-purple-600" },
      { name: "CRUD Operations",   icon: PiMathOperations,   color: "text-indigo-500" },
      { name: "Protected Routes",  icon: TbRouteSquare,      color: "text-red-600" },
      { name: "Chart.js",          icon: SiChartdotjs,       color: "text-red-500" },
    ]
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git",               type: "local", model: "/models/git.glb",              glow: "#f05032", scale: 1.5 },
      { name: "GitHub",            icon: SiGithub,           color: "text-gray-800" },
      { name: "Vercel",            icon: SiVercel,           color: "text-black dark:text-white" },
      { name: "Netlify",           icon: SiNetlify,          color: "text-cyan-500" },
    ]
  },
  {
    title: "Other",
    skills: [
      { name: "C",                 icon: SiC,                color: "text-blue-700" },
      { name: "C++",               type: "local", model: "/models/c.glb",                glow: "#004482", scale: 0.05 },
      { name: "Python",            type: "local", model: "/models/python.glb",           glow: "#3776ab", scale: 0.05 },
      { name: "Java",              type: "local", model: "/models/java.glb",             glow: "#ea2d2e", scale: 0.5 },
      { name: "Problem Solving",   type: "local", model: "/models/problem-solving.glb", glow: "#a855f7", scale: 10 },
      { name: "IoT Basics",        icon: SiArduino,          color: "text-cyan-500" },
      { name: "AI-Driven Solutions", icon: GiArtificialIntelligence, color: "text-purple-600" }
    ]
  },
  {
    title: "Soft Skills",
    skills: [
      { name: "Team Collaboration", icon: FcCollaboration,  color: "text-teal-500" },
      { name: "Time Management",    icon: CiTimer,            color: "text-pink-500" },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-gradient-to-br from-base-200 to-base-300">
      <div className="max-w-7xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl pb-3 font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Skills
          </h2>
          <p className="text-xl text-base-content/70">
            Real tools I use - From GitHub projects
          </p>
        </MotionDiv>

        {skillSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-20 last:mb-0">
            <h3 className="text-3xl font-bold text-primary mb-10 text-center tracking-tight">
              {section.title}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-6 auto-rows-fr">
              {section.skills.map((skill, i) => (
                <MotionDiv
                  key={`${section.title}-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group"
                >
                  {skill.type === "local" ? (
                    <Local3D
                      model={skill.model}
                      glow={skill.glow}
                      name={skill.name}
                      scale={skill.scale || 1}
                    />
                  ) : (
                    <div className="aspect-square bg-base-100 rounded-2xl p-6 flex flex-col items-center justify-center shadow-xl border border-primary/20 group-hover:border-purple-400 group-hover:shadow-2xl group-hover:drop-shadow-xl transition-all duration-400">
                      <skill.icon
                        className={`text-5xl mb-3 ${skill.color} group-hover:text-purple-400 group-hover:scale-110 group-hover:drop-shadow-lg transition-all duration-400`}
                      />
                      <p className="text-xs font-bold text-gray-700 group-hover:text-purple-400 transition-colors tracking-tight">
                        {skill.name}
                      </p>
                    </div>
                  )}
                </MotionDiv>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}