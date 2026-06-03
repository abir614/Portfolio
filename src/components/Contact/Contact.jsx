import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MotionDiv } from "../MotionDiv";
import { FaFacebook, FaYoutube, FaGithub, FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden bg-linear-to-br from-base-100 via-primary/5 to-base-100">
      {/* Modern Background Blobs */}
      <div className="absolute top-0 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <MotionDiv
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-6xl md:text-7xl pb-3 font-bold mb-6 bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent leading-tight">
            Let's Build Together
          </h2>
          <p className="text-xl md:text-2xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
            React.js & Next.js Expert • AI Enthusiast • Ready for your next project
          </p>
        </MotionDiv>

        {/* Social Icons Grid */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center gap-4 mb-20 flex-wrap"
        >
          <a href="https://facebook.com/mac.ishrak.1846" target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-linear-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300">
            <FaFacebook className="text-xl md:text-2xl" />
          </a>
          <a href="https://x.com/SalmanToha_" target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-base-content/30 text-base-content hover:bg-base-content hover:text-base-100 hover:border-base-content hover:scale-110 transition-all duration-300 flex items-center justify-center">
            <FaXTwitter className="text-xl md:text-2xl" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-linear-to-br from-red-600 to-red-700 text-white flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300">
            <FaYoutube className="text-xl md:text-2xl" />
          </a>
          <a href="https://github.com/TheLunatic1" target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-base-content/30 text-base-content hover:bg-base-content hover:text-base-100 hover:border-base-content hover:scale-110 transition-all duration-300 flex items-center justify-center">
            <FaGithub className="text-xl md:text-2xl" />
          </a>
          <a href="https://wa.me/8801780106916" target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-linear-to-br from-green-500 to-green-600 text-white flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300">
            <FaWhatsapp className="text-xl md:text-2xl" />
          </a>
          <a href="https://www.linkedin.com/in/salman-toha/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-linear-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300">
            <FaLinkedinIn className="text-xl md:text-2xl" />
          </a>
        </MotionDiv>

        {/* Contact Info Cards */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16"
        >
          <div className="group bg-linear-to-br from-base-100 to-base-200/50 backdrop-blur p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="w-16 h-16 bg-linear-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaEnvelope className="text-3xl text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Email</h3>
            <a href="mailto:ishrak1846@gmail.com" className="text-lg text-primary hover:text-accent transition-colors font-semibold">
              ishrak1846@gmail.com
            </a>
          </div>

          <div className="group bg-linear-to-br from-base-100 to-base-200/50 backdrop-blur p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="w-16 h-16 bg-linear-to-br from-success/20 to-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaPhone className="text-3xl text-success" />
            </div>
            <h3 className="text-xl font-bold mb-3">Mobile</h3>
            <a href="tel:+8801780106916" className="text-lg text-success hover:text-accent transition-colors font-semibold">
              +880 1780 106916
            </a>
          </div>

          <div className="group bg-linear-to-br from-base-100 to-base-200/50 backdrop-blur p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="w-16 h-16 bg-linear-to-br from-warning/20 to-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">📍</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Location</h3>
            <p className="text-lg font-semibold">Aftabnagar, Badda<br />Dhaka, Bangladesh</p>
          </div>
        </MotionDiv>

        {/* CTA Buttons */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <a href="mailto:ishrak1846@gmail.com" className="inline-block px-8 py-3 text-lg font-semibold rounded-xl bg-linear-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer">
            Start a Project
          </a>
          <a href="https://drive.google.com/file/d/1UIIg4Ku7gEiFIh7uSycBlVrCzGkYHIbW/view" 
            target="_blank"
            rel="noopener noreferrer" 
            className="inline-block px-8 py-3 text-lg font-semibold rounded-xl border-2 border-primary text-primary hover:bg-primary/10 transition-all hover:scale-105 active:scale-95 cursor-pointer">
            Download Resume (PDF)
          </a>
        </MotionDiv>
      </div>
    </section>
  );
}