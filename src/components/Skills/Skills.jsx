import { GrTooltip } from "react-icons/gr";
import { MotionDiv } from "../MotionDiv";
import {
  SiReact, SiNextdotjs, SiJavascript, SiTailwindcss, SiDaisyui,
  SiFramer, SiFirebase, SiMongodb, SiNodedotjs, SiExpress,
  SiReactrouter, SiReacthookform, SiSwiper, SiVercel, SiNetlify,
  SiJsonwebtokens, SiChartdotjs, SiGithub, SiGit
} from "react-icons/si";
import { GiToaster } from "react-icons/gi";
import { DiResponsive } from "react-icons/di";
import { PiMathOperations } from "react-icons/pi";
import { TbRouteSquare } from "react-icons/tb";

const skills = [
  { name: "React.js", icon: SiReact, color: "text-cyan-400" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-black dark:text-white" },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-500" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-teal-500" },
  { name: "DaisyUI", icon: SiDaisyui, color: "text-purple-500" },
  { name: "Framer Motion", icon: SiFramer, color: "text-pink-500" },
  { name: "Firebase", icon: SiFirebase, color: "text-yellow-500" },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-600" },
  { name: "Express.js", icon: SiExpress, color: "text-gray-700" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-green-600" },
  { name: "React Router", icon: SiReactrouter, color: "text-red-600" },
  { name: "React Hook Form", icon: SiReacthookform, color: "text-pink-600" },
  { name: "Swiper Slider", icon: SiSwiper, color: "text-blue-600" },
  { name: "Vercel", icon: SiVercel, color: "text-black dark:text-white" },
  { name: "Netlify", icon: SiNetlify, color: "text-cyan-500" },
  { name: "JWT", icon: SiJsonwebtokens, color: "text-purple-600" },
  { name: "Chart.js", icon: SiChartdotjs, color: "text-red-500" },
  { name: "Git", icon: SiGit, color: "text-orange-600" },
  { name: "GitHub", icon: SiGithub, color: "text-gray-800" },
  { name: "React Hot Toast", icon: GiToaster, color: "text-orange-500" },
  { name: "React Tooltip", icon: GrTooltip, color: "text-blue-500" },
  { name: "Responsive Design", icon: DiResponsive, color: "text-green-500" },
  { name: "CRUD Operations", icon: PiMathOperations, color: "text-indigo-500" },
  { name: "Protected Routes", icon: TbRouteSquare, color: "text-red-600" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-gradient-to-br from-base-200 to-base-300">
      <div className="max-w-7xl mx-auto text-center">
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl pb-3 font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Skills
          </h2>
          <p className="text-xl text-base-content/70 mb-16">
            Real tools from Game Vault, Book Haven & Programming Hero projects
          </p>
        </MotionDiv>

        {/* PERFECT SQUARE GRID */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5">
          {skills.map((skill, i) => (
            <MotionDiv
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.15, y: -8 }}
              className="group"
            >
              <div className="aspect-square bg-base-100 rounded-2xl p-4 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-primary/20 group-hover:border-primary/60">
                {skill.icon ? (
                  <skill.icon className={`text-4xl mb-2 ${skill.color} group-hover:animate-pulse`} />
                ) : (
                  <div className={`w-12 h-12 rounded-full ${skill.color} bg-current opacity-20 mb-2`} />
                )}
                <p className="text-xs font-semibold text-center leading-tight px-1">{skill.name}</p>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}