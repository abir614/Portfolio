# Salman Toha — Full Stack & DevOps Engineer Portfolio

A modern, high-performance personal portfolio featuring a **Minimal Neo-Brutalism** design aesthetic, styled with **Tailwind CSS 4**, animated with **GSAP (GreenSock Animation Platform) + ScrollTrigger**, and enhanced with 3D models via **Three.js / React Three Fiber**.

**Live Demo** → [salmantoha.vercel.app](https://salmantoha.vercel.app/)

---

### Design System & Aesthetic: Minimal Neo-Brutalism
- **Philosophy**: Clean, structured layouts with subtle brutalist elements — sharp 2px dark borders, crisp hard shadows (`4px 4px 0px #000`), monospaced badge accents, and high-contrast typography (`Space Grotesk`, `Plus Jakarta Sans`, `JetBrains Mono`).
- **Color Palette**: Professional cream/off-white (`#F6F7F9`) and dark slate (`#0B0F17`) themes, paired with electric indigo (`#4F46E5`), sharp amber (`#F59E0B`), and cyber emerald (`#10B981`) accents.
- **Theme Support**: Built-in instant Light / Dark mode toggle with persistent state.

---

### Core Skill Categories
1. **DevOps & Infrastructure**: Docker, Docker Compose, Linux VPS (Ubuntu/Debian), Nginx Reverse Proxy, PM2 Process Manager, Cloudflare Tunnels, ZeroTier Mesh Network, GitHub Actions CI/CD, SSH Hardening, KVM / QEMU.
2. **Frontend Development**: React 19, Next.js, TypeScript, JavaScript, Tailwind CSS 4, GSAP & Framer Motion, Three.js, React Router, React Hook Form, Swiper Slider.
3. **Mobile Development**: React Native, Expo SDK, Android & iOS cross-platform.
4. **Backend & APIs**: Node.js, Express.js, MongoDB, Firebase, JWT Authentication, RESTful APIs, Axios, Resend.
5. **Tools & Platforms**: Git, GitHub, Vercel, Netlify, Postman, Wix CMS.
6. **Computer Science & Languages**: C, C++, Python, Java, Problem Solving / DSA, IoT & Arduino, AI & ML fundamentals.
7. **Soft Skills**: Technical Leadership, Team Collaboration, Agile Time Management.

---

### Tech Stack
- **Framework**: Vite 7 + React 19
- **Styling**: Tailwind CSS 4 + Custom Minimal Neo-Brutalist CSS Tokens
- **Animations**: GSAP 3 (GreenSock) + ScrollTrigger + @gsap/react
- **3D Graphics**: Three.js + @react-three/fiber + @react-three/drei
- **Icons**: React Icons (`react-icons/si`, `react-icons/fa6`, `react-icons/fi`)
- **Typewriter**: `react-type-animation`
- **Deployment**: Vercel Serverless Functions (`api/github.js`) + Edge Network

---

### Project Structure

```
src/
├── main.jsx                    Entry point
├── App.jsx                     Root layout & ThemeProvider
├── index.css                   Neo-Brutalist CSS design system & tokens
├── context/
│   └── ThemeContext.jsx        Light / Dark Neo-Brutalist theme context
├── lib/
│   ├── github.js               GitHub API fetcher with curated offline fallbacks
│   └── gsap.js                 GSAP & ScrollTrigger setup and helpers
└── components/
    ├── Navbar.jsx              Floating Neo-Brutalist header & theme switch
    ├── Hero.jsx                Greeting, typed roles, credentials, stats, avatar
    ├── Experience/
    │   └── Experience.jsx      Career & infrastructure journey timeline
    ├── Projects/
    │   ├── Projects.jsx        Filtered project grid + GSAP ScrollTrigger
    │   ├── ProjectCard.jsx     Interactive project cards with previews
    │   └── SkeletonCard.jsx    Neo-brutalist loading placeholder
    ├── Skills/
    │   └── Skills.jsx          DevOps, Web, Mobile, CS & Soft Skills showcase
    ├── Local3D.jsx             Three.js 3D model viewer in neo-brutalist container
    ├── Contact/
    │   └── Contact.jsx         Copy-to-clipboard, direct contact cards, socials
    └── Footer.jsx              Neo-brutalist footer, status ticker, back-to-top
```

---

### Getting Started

```bash
# Clone repository
git clone https://github.com/TheLunatic1/Portfolio-Salman-Toha.git
cd Portfolio-Salman-Toha

# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build

# Run linter
npm run lint
```

---

© Salman Toha. Crafted with precision, high performance, and passion.
