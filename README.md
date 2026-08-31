# Shahriar Mahmud Abir — Jr. Frontend Developer Portfolio

A modern, high-performance personal portfolio featuring a **Minimal Neo-Brutalism** design aesthetic, styled with **Tailwind CSS 4**, animated with **GSAP (GreenSock Animation Platform) + ScrollTrigger**, and enhanced with 3D models via **Three.js / React Three Fiber**.

**Live Demo** → [abir.fly.dev](https://abir.fly.dev/)

---

### Design System & Aesthetic: Minimal Neo-Brutalism
- **Philosophy**: Clean, structured layouts with subtle brutalist elements — sharp 2px dark borders, crisp hard shadows (`4px 4px 0px #000`), monospaced badge accents, and high-contrast typography (`Space Grotesk`, `Plus Jakarta Sans`, `JetBrains Mono`).
- **Color Palette**: Professional cream/off-white (`#F6F7F9`) and dark slate (`#0B0F17`) themes, paired with electric indigo (`#4F46E5`), sharp amber (`#F59E0B`), and cyber emerald (`#10B981`) accents.
- **Theme Support**: Built-in instant Light / Dark mode toggle with persistent state.

---

### Core Skill Categories
1. **Frontend Development**: React.js, Next.js, TypeScript, JavaScript, Three.js, Tailwind CSS 4, GSAP & Framer Motion, DaisyUI, Responsive UI.
2. **Backend & APIs**: Node.js, Python, MongoDB, PostgreSQL, JWT Auth, REST APIs, GraphQL, Socket.IO, Axios, Express 5.
3. **DevOps & Automation**: Docker, Docker Compose (Multi-Layer Builds & Port Forwarding), GitHub Actions, Fly.io, Vercel, Netlify.
4. **Networking & Infrastructure**: Linux OS Admin, OpenWrt (Firewall, DHCP, VLAN & Subnet Management, Per-User Port Access Control), SSH Admin, VPS Hosting, NGINX Setup & Load Balancing, Cloudflare Workers & Tunnels, Serverless DNS (DoH, DNSSEC), ZeroTier.
5. **CMS & Headless Storefronts**: Shopify, Shopify Headless, Liquid, WordPress.
6. **CS & Tools**: Git, GitHub, Python, Google Colab, IoT & Arduino, AI & ML, Problem Solving.

---

### Tech Stack
- **Framework**: Vite 7 + React 19
- **Styling**: Tailwind CSS 4 + Custom Minimal Neo-Brutalist CSS Tokens
- **Animations**: GSAP 3 (GreenSock) + ScrollTrigger + @gsap/react
- **3D Graphics**: Three.js + @react-three/fiber + @react-three/drei
- **Icons**: React Icons (`react-icons/si`, `react-icons/fa6`, `react-icons/fi`)
- **Typewriter**: `react-type-animation`
- **Deployment**: Vercel / Fly.io

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
git clone https://github.com/abir614/Portfolio-Shahriar-Abir.git
cd Portfolio-Shahriar-Abir

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

© Shahriar Mahmud Abir. Crafted with precision, high performance, and passion.
