import { useState, useRef } from "react";
import { FaLinkedinIn, FaXTwitter, FaFacebook, FaYoutube, FaGithub, FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa6";
import { FiCopy, FiCheck, FiSend, FiFileText, FiMapPin } from "react-icons/fi";
import { gsap, useGSAP } from "../../lib/gsap";

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const sectionRef = useRef(null);

  const email = "ishrak1846@gmail.com";
  const phone = "+8801780106916";
  const phoneFormatted = "+880 1780 106916";

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  useGSAP(
    () => {
      gsap.from(".contact-header", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: ".contact-header",
          start: "top 85%",
        },
      });

      gsap.from(".contact-card", {
        opacity: 0,
        y: 15,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: ".contact-cards-wrapper",
          start: "top 85%",
        },
      });

      gsap.from(".contact-social-btn", {
        opacity: 0,
        scale: 0.95,
        stagger: 0.03,
        duration: 0.35,
        ease: "back.out(1.4)",
        clearProps: "transform",
        scrollTrigger: {
          trigger: ".contact-socials-wrapper",
          start: "top 90%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 sm:py-24 2xl:py-32 px-3 sm:px-6 lg:px-8 bg-[var(--neo-bg)] relative border-t-2 border-[var(--neo-border)] overflow-hidden"
    >
      {/* Decorative Neo-Brutalist Dot Matrix */}
      <div className="absolute inset-0 bg-neo-grid opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl 2xl:max-w-[1600px] mx-auto w-full">
        
        {/* Section Header */}
        <div className="contact-header text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="neo-badge neo-badge-emerald rounded-full text-[9px] xs:text-[10px] sm:text-xs">
              // LET'S CONNECT
            </span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-5xl 2xl:text-6xl font-black font-display text-[var(--neo-text)] tracking-tight">
            Let's Build Something Resilient
          </h2>
          <p className="text-xs sm:text-base lg:text-lg 2xl:text-xl text-[var(--neo-text-muted)]">
            Open for frontend & full-stack development roles, self-hosted DevOps architectures, and engineering collaborations.
          </p>
        </div>

        {/* Contact Info Cards Wrapper with Generous Separation */}
        <div className="contact-cards-wrapper mb-14 sm:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 sm:gap-8">
            
            {/* Email Card */}
            <div className="contact-card neo-box neo-hover-lift rounded-2xl p-5 sm:p-7 bg-[var(--neo-surface)] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border-2 border-[var(--neo-border)] shadow-[2px_2px_0px_var(--neo-shadow)] flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-lg sm:text-2xl mb-3 sm:mb-4">
                  <FaEnvelope />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg 2xl:text-xl text-[var(--neo-text)] mb-1">
                  Direct Email
                </h3>
                <p className="text-[11px] sm:text-xs font-mono text-[var(--neo-text-muted)] mb-3">
                  Fastest response for inquiries & proposals
                </p>
                <a
                  href={`mailto:${email}`}
                  className="text-xs sm:text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400 hover:underline block break-all mb-4"
                >
                  {email}
                </a>
              </div>
              <button
                onClick={() => handleCopy(email, "email")}
                className="neo-btn neo-btn-surface text-xs py-2.5 w-full rounded-xl"
              >
                {copiedEmail ? (
                  <>
                    <FiCheck className="text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <FiCopy />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Mobile / WhatsApp Card */}
            <div className="contact-card neo-box neo-hover-lift rounded-2xl p-5 sm:p-7 bg-[var(--neo-surface)] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border-2 border-[var(--neo-border)] shadow-[2px_2px_0px_var(--neo-shadow)] flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-lg sm:text-2xl mb-3 sm:mb-4">
                  <FaPhone />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg 2xl:text-xl text-[var(--neo-text)] mb-1">
                  Phone & WhatsApp
                </h3>
                <p className="text-[11px] sm:text-xs font-mono text-[var(--neo-text-muted)] mb-3">
                  Available for calls, SMS & quick messaging
                </p>
                <a
                  href={`https://wa.me/${phone.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400 hover:underline block mb-4"
                >
                  {phoneFormatted}
                </a>
              </div>
              <div className="flex gap-2">
                <a
                  href={`https://wa.me/${phone.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn neo-btn-emerald flex-1 text-xs py-2.5 rounded-xl"
                >
                  <FaWhatsapp className="text-sm" />
                  <span>WhatsApp</span>
                </a>
                <button
                  onClick={() => handleCopy(phone, "phone")}
                  className="neo-btn neo-btn-surface px-3.5 py-2.5 text-xs rounded-xl"
                  title="Copy Phone Number"
                >
                  {copiedPhone ? <FiCheck className="text-emerald-500" /> : <FiCopy />}
                </button>
              </div>
            </div>

            {/* Location Card */}
            <div className="contact-card neo-box neo-hover-lift rounded-2xl p-5 sm:p-7 bg-[var(--neo-surface)] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 border-2 border-[var(--neo-border)] shadow-[2px_2px_0px_var(--neo-shadow)] flex items-center justify-center text-amber-500 text-lg sm:text-2xl mb-3 sm:mb-4">
                  <FiMapPin />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg 2xl:text-xl text-[var(--neo-text)] mb-1">
                  Based in Dhaka
                </h3>
                <p className="text-[11px] sm:text-xs font-mono text-[var(--neo-text-muted)] mb-3">
                  Aftabnagar, Badda, Dhaka, Bangladesh
                </p>
                <p className="text-[11px] sm:text-xs text-[var(--neo-text)] leading-relaxed bg-[var(--neo-surface-subtle)] p-3 rounded-xl border border-[var(--neo-border-subtle)] mb-4">
                  Available for Remote, On-Site, Hybrid, Full-Time &amp; Freelance roles worldwide.
                </p>
              </div>
              <div className="neo-badge neo-badge-amber rounded-lg py-1.5 text-center justify-center text-[10px]">
                Active & Responsive
              </div>
            </div>

          </div>
        </div>

        {/* Social Media Channels Grid (2 per line on mobile, 3 on tablet, 6 on desktop) */}
        <div className="contact-socials-wrapper mb-14 sm:mb-20">
          <div className="neo-box rounded-2xl p-5 sm:p-8 lg:p-10 bg-[var(--neo-surface)]">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="font-display font-bold text-base sm:text-xl 2xl:text-2xl text-[var(--neo-text)]">
                Find Me Across The Web
              </h3>
              <p className="text-xs sm:text-sm text-[var(--neo-text-muted)] mt-1.5">
                Connect with me on professional networks, code repos, and social channels.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {[
                { label: "LinkedIn", icon: FaLinkedinIn, href: "https://www.linkedin.com/in/salman-toha/", color: "hover:bg-blue-600 hover:text-white" },
                { label: "GitHub", icon: FaGithub, href: "https://github.com/TheLunatic1", color: "hover:bg-slate-900 hover:text-white" },
                { label: "WhatsApp", icon: FaWhatsapp, href: "https://wa.me/8801780106916", color: "hover:bg-green-600 hover:text-white" },
                { label: "X / Twitter", icon: FaXTwitter, href: "https://x.com/SalmanToha_", color: "hover:bg-black hover:text-white" },
                { label: "Facebook", icon: FaFacebook, href: "https://facebook.com/mac.ishrak.1846", color: "hover:bg-blue-700 hover:text-white" },
                { label: "YouTube", icon: FaYoutube, href: "https://youtube.com", color: "hover:bg-red-600 hover:text-white" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`contact-social-btn neo-btn neo-btn-surface rounded-xl text-xs sm:text-sm py-2.5 sm:py-3 px-2.5 sm:px-3.5 flex items-center justify-center gap-2 w-full text-center ${social.color}`}
                >
                  <social.icon className="text-sm sm:text-base flex-shrink-0" />
                  <span className="truncate">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Direct CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6 pt-2">
          <a
            href={`mailto:${email}?subject=Project%20Inquiry%20from%20Portfolio`}
            className="neo-btn neo-btn-primary rounded-xl px-7 sm:px-10 py-3.5 text-xs sm:text-base flex items-center justify-center gap-2.5 w-full sm:w-auto"
          >
            <FiSend />
            <span>Send An Email</span>
          </a>
          <a
            href="https://drive.google.com/file/d/1UIIg4Ku7gEiFIh7uSycBlVrCzGkYHIbW/view"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn neo-btn-amber rounded-xl px-7 sm:px-10 py-3.5 text-xs sm:text-base flex items-center justify-center gap-2.5 w-full sm:w-auto"
          >
            <FiFileText />
            <span>Download Resume (PDF)</span>
          </a>
        </div>

      </div>
    </section>
  );
}