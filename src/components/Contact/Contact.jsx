import { MotionDiv } from "../MotionDiv";
import { FaFacebook, FaTwitter, FaYoutube, FaGithub, FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5">
      <div className="max-w-5xl mx-auto text-center">
        <MotionDiv
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-7xl pb-3 font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Let's Build Together
          </h2>
          <p className="text-2xl text-base-content/70 mb-16 max-w-3xl mx-auto">
            React.js & Next.js Expert • AI Enthusiast • Ready for your next project
          </p>

          {/* PERFECTLY CENTERED SOCIAL ICONS */}
          <div className="flex justify-center gap-8 mb-16 flex-wrap">
            <a href="https://facebook.com/mac.ishrak.1846" target="_blank" className="btn btn-circle btn-ghost text-3xl hover:scale-110 transition">
              <FaFacebook className="text-blue-600" />
            </a>
            <a href="https://twitter.com" target="_blank" className="btn btn-circle btn-ghost text-3xl hover:scale-110 transition">
              <FaTwitter className="text-sky-500" />
            </a>
            <a href="https://youtube.com" target="_blank" className="btn btn-circle btn-ghost text-3xl hover:scale-110 transition">
              <FaYoutube className="text-red-600" />
            </a>
            <a href="https://github.com/TheLunatic1" target="_blank" className="btn btn-circle btn-ghost text-3xl hover:scale-110 transition">
              <FaGithub />
            </a>
            <a href="https://wa.me/8801780106916" target="_blank" className="btn btn-circle btn-success text-3xl hover:scale-110 transition">
              <FaWhatsapp />
            </a>
          </div>

          {/* CONTACT INFO — CLICKABLE TEXT ONLY */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            <div className="bg-base-200/50 backdrop-blur p-8 rounded-2xl border border-base-300">
              <FaEnvelope className="text-4xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <a href="mailto:ishrak1846@gmail.com" className="text-lg text-primary hover:underline">
                ishrak1846@gmail.com
              </a>
            </div>

            <div className="bg-base-200/50 backdrop-blur p-8 rounded-2xl border border-base-300">
              <FaPhone className="text-4xl text-success mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Mobile</h3>
              <a href="tel:+8801780106916" className="text-lg text-success hover:underline">
                +880 1780 106916
              </a>
            </div>

            <div className="bg-base-200/50 backdrop-blur p-8 rounded-2xl border border-base-300">
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className="text-lg">Aftabnagar, Badda<br />Dhaka, Bangladesh</p>
            </div>
          </div>

          {/* PERFECTLY CENTERED BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-16">
            <a href="mailto:ishrak1846@gmail.com" className="btn btn-primary btn-lg">
              Start a Project
            </a>
            <a href="/resume.pdf" download className="btn btn-outline btn-lg">
              Download Resume (PDF)
            </a>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}