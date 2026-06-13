import { MotionDiv } from "../MotionDiv";
import Local3D from "../Local3D";
import {
  SiReact, SiNextdotjs, SiJavascript, SiTailwindcss, SiDaisyui,
  SiFramer, SiFirebase, SiMongodb, SiNodedotjs, SiExpress,
  SiReactrouter, SiReacthookform, SiSwiper, SiVercel, SiNetlify,
  SiJsonwebtokens, SiChartdotjs, SiGithub, SiGit, SiCss3,
  SiArduino, SiPython, SiC, SiCplusplus, SiTypescript, SiLinux,
  SiNginx, SiWix, SiPm2, SiThreedotjs, SiQemu
} from "react-icons/si";
import { GiArtificialIntelligence, GiToaster, GiDiamondRing } from "react-icons/gi";
import { DiResponsive } from "react-icons/di";
import { PiMathOperations } from "react-icons/pi";
import { TbRouteSquare, TbDiamond } from "react-icons/tb";
import { FaHtml5, FaHeadset, FaMobileAlt, FaBox, FaGlobe, FaEnvelope } from "react-icons/fa";
import { FcCollaboration } from "react-icons/fc";
import { CiTimer } from "react-icons/ci";
import { GrTooltip } from "react-icons/gr";

const skillSections = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js",          type: "local", model: "/models/react.glb",           glow: "#61dafb", scale: 0.5 },
      { name: "Next.js",           icon: SiNextdotjs,        color: "text-white" },
      { name: "JavaScript",        icon: SiJavascript,       color: "text-yellow-400" },
      { name: "TypeScript",        icon: SiTypescript,       color: "text-blue-500" },
      { name: "HTML5",             icon: FaHtml5,            color: "text-orange-500" },
      { name: "CSS3",              icon: SiCss3,             color: "text-blue-500" },
      { name: "Tailwind CSS",      icon: SiTailwindcss,      color: "text-teal-400" },
      { name: "DaisyUI",           icon: SiDaisyui,          color: "text-teal-300" },
      { name: "Framer Motion",     icon: SiFramer,           color: "text-fuchsia-500" },
      { name: "React Router",      icon: SiReactrouter,      color: "text-red-500" },
      { name: "React Hook Form",   icon: SiReacthookform,    color: "text-pink-500" },
      { name: "Swiper Slider",     icon: SiSwiper,           color: "text-blue-400" },
      { name: "Responsive Design", icon: DiResponsive,       color: "text-blue-300" },
      { name: "React Hot Toast",   icon: GiToaster,          color: "text-amber-500" },
      { name: "React Tooltip",     icon: GrTooltip,          color: "text-gray-400" },
      { name: "Three.js",          icon: SiThreedotjs,       color: "text-white" },
    ]
  },
  {
    title: "Mobile Development",
    skills: [
      { name: "React Native",      icon: FaMobileAlt,        color: "text-blue-400" },
      { name: "Expo",              icon: FaBox,              color: "text-white" },
      { name: "Expo SDK 54",       icon: FaBox,              color: "text-white" },
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js",           icon: SiNodedotjs,        color: "text-green-500" },
      { name: "Express.js",        icon: SiExpress,          color: "text-gray-400" },
      { name: "MongoDB",           icon: SiMongodb,          color: "text-green-400" },
      { name: "Firebase",          icon: SiFirebase,         color: "text-yellow-500" },
      { name: "JWT",               icon: SiJsonwebtokens,    color: "text-pink-500" },
      { name: "CRUD Operations",   icon: PiMathOperations,   color: "text-blue-400" },
      { name: "Protected Routes",  icon: TbRouteSquare,      color: "text-orange-400" },
      { name: "Chart.js",          icon: SiChartdotjs,       color: "text-rose-400" },
      { name: "Axios",             icon: FaGlobe,            color: "text-purple-500" },
      { name: "Resend",            icon: FaEnvelope,         color: "text-red-400" },
    ]
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git",               type: "local", model: "/models/git.glb",              glow: "#f05032", scale: 1.5 },
      { name: "GitHub",            icon: SiGithub,           color: "text-white" },
      { name: "Vercel",            icon: SiVercel,           color: "text-white" },
      { name: "Nginx",             icon: SiNginx,            color: "text-green-500" },
      { name: "PM2",               icon: SiPm2,              color: "text-blue-500" },
      { name: "Linux",             icon: SiLinux,            color: "text-yellow-300" },
      { name: "VPS",               icon: SiLinux,            color: "text-yellow-300" },
      { name: "Server Config & Setup", icon: SiLinux,        color: "text-yellow-300" },
      { name: "KVM",               icon: SiQemu,             color: "text-orange-500" },
      { name: "QEMU",              icon: SiQemu,             color: "text-orange-500" },
      { name: "Libvirt",           icon: SiLinux,            color: "text-orange-400" },
      { name: "Netlify",           icon: SiNetlify,          color: "text-cyan-400" },
      { name: "Wix (CMS)",         icon: SiWix,              color: "text-white" },
    ]
  },
  {
    title: "Other",
    skills: [
      { name: "C",                 icon: SiC,                color: "text-blue-600" },
      { name: "C++",               type: "local", model: "/models/c.glb",                glow: "#004482", scale: 0.05 },
      { name: "Python",            type: "local", model: "/models/python.glb",           glow: "#3776ab", scale: 0.05 },
      { name: "Java",              type: "local", model: "/models/java.glb",             glow: "#ea2d2e", scale: 0.5 },
      { name: "Problem Solving",   type: "local", model: "/models/problem-solving.glb", glow: "#a855f7", scale: 10 },
      { name: "IoT Basics",        icon: SiArduino,          color: "text-teal-500" },
      { name: "AI & ML",           icon: GiArtificialIntelligence, color: "text-indigo-400" }
    ]
  },
  {
    title: "Soft Skills",
    skills: [
      { name: "Leadership",        icon: FaHeadset,          color: "text-blue-400" },
      { name: "Team Collaboration", icon: FcCollaboration,  color: "text-green-400" },
      { name: "Time Management",    icon: CiTimer,            color: "text-yellow-400" },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-6 bg-base-200 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl pb-3 font-bold mb-6 text-slate-100">
            My Skills
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Real tools I use — From GitHub projects and professional experience
          </p>
        </MotionDiv>

        {skillSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-20 last:mb-0">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-200 mb-8 sm:mb-10 md:mb-12 text-center tracking-tight">
              {section.title}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 md:gap-6 auto-rows-fr">
              {section.skills.map((skill, i) => (
                <MotionDiv
                  key={`${section.title}-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  className="group h-full"
                >
                  {skill.type === "local" ? (
                    <Local3D
                      model={skill.model}
                      glow={skill.glow}
                      name={skill.name}
                      scale={skill.scale || 1}
                    />
                  ) : (
                    <div className="h-full aspect-square bg-base-200 rounded-2xl p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center shadow-lg border-2 border-primary/10 group-hover:border-primary/40 group-hover:shadow-2xl group-hover:bg-base-300 transition-all duration-400 hover:scale-110">
                      <skill.icon
                        className={`text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 ${skill.color} group-hover:scale-125 group-hover:drop-shadow-lg transition-all duration-300`}
                      />
                      <p className="text-xs font-bold text-slate-300 group-hover:text-primary transition-colors tracking-tight text-center line-clamp-2">
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