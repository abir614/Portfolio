// Fallback mock repositories in case of GitHub rate limiting or offline development
const fallbackMockRepos = [
  {
    id: 101,
    name: "DevOps-Homelab-Infra",
    description: "Multi-service self-hosted homelab infrastructure featuring Docker Compose, Nginx reverse proxy with SSL, Cloudflare Zero-Trust Tunnels, and PM2.",
    language: "Docker",
    stargazers_count: 8,
    forks_count: 3,
    html_url: "https://github.com/TheLunatic1",
    topics: ["docker", "devops", "nginx", "cloudflare", "linux"],
    private: false,
    updated_at: new Date().toISOString(),
  },
  {
    id: 102,
    name: "MERN-CarePlus-Portal",
    description: "Comprehensive medical appointment scheduling and healthcare management system built with React, Node.js, Express, MongoDB, and Tailwind CSS.",
    language: "TypeScript",
    stargazers_count: 12,
    forks_count: 5,
    html_url: "https://github.com/TheLunatic1",
    homepage: "https://salmantoha.vercel.app",
    topics: ["react", "nextjs", "fullstack", "mongodb", "tailwind"],
    private: false,
    updated_at: new Date().toISOString(),
  },
  {
    id: 103,
    name: "Expo-Pulse-MobileApp",
    description: "Cross-platform mobile fitness and daily routine tracking application engineered with React Native, Expo SDK 54, and offline-first state management.",
    language: "JavaScript",
    stargazers_count: 9,
    forks_count: 2,
    html_url: "https://github.com/TheLunatic1",
    topics: ["react-native", "expo", "mobile", "ios", "android"],
    private: false,
    updated_at: new Date().toISOString(),
  },
  {
    id: 104,
    name: "Smart-Agri-IoT-Hub",
    description: "Automated greenhouse monitoring system utilizing ESP32 sensors, C++, MQTT broker, Node.js backend, and a real-time React analytics dashboard.",
    language: "C++",
    stargazers_count: 15,
    forks_count: 4,
    html_url: "https://github.com/TheLunatic1",
    topics: ["iot", "arduino", "cplusplus", "react", "dashboard"],
    private: false,
    updated_at: new Date().toISOString(),
  },
  {
    id: 105,
    name: "NextGen-Ecommerce-Platform",
    description: "Modern, high-performance e-commerce platform built with Next.js App Router, Tailwind CSS, Stripe checkout integration, and JWT authentication.",
    language: "TypeScript",
    stargazers_count: 11,
    forks_count: 3,
    html_url: "https://github.com/TheLunatic1",
    homepage: "https://salmantoha.vercel.app",
    topics: ["nextjs", "react", "fullstack", "stripe", "tailwind"],
    private: false,
    updated_at: new Date().toISOString(),
  },
  {
    id: 106,
    name: "Linux-Server-Automation",
    description: "Automated bash scripts and configurations for rapid Ubuntu/Debian VPS deployment, SSH hardening, UFW firewall, and Nginx SSL certificates.",
    language: "Shell",
    stargazers_count: 7,
    forks_count: 1,
    html_url: "https://github.com/TheLunatic1",
    topics: ["devops", "linux", "bash", "security", "nginx"],
    private: false,
    updated_at: new Date().toISOString(),
  },
];

export const fetchRepos = async () => {
  try {
    // 1. Try secure Serverless Function first (production on Vercel)
    const response = await fetch("/api/github");
    
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }

    // 2. If it fails (e.g. running 'npm run dev' locally), fallback to direct public GitHub API
    const fallbackResponse = await fetch(
      "https://api.github.com/users/TheLunatic1/repos?sort=updated&per_page=100"
    );
    
    if (fallbackResponse.ok) {
      const data = await fallbackResponse.json();
      if (Array.isArray(data) && data.length > 0) {
        const isFeatured = (repo) => 
          (repo.private && repo.stargazers_count > 0) || 
          (!repo.private && repo.stargazers_count > 0);

        return data
          .filter(repo => !repo.fork)                          
          .sort((a, b) => {
            const aFeatured = isFeatured(a);
            const bFeatured = isFeatured(b);

            if (aFeatured && !bFeatured) return -1;
            if (!aFeatured && bFeatured) return 1;

            if (b.stargazers_count !== a.stargazers_count) {
              return b.stargazers_count - a.stargazers_count;
            }
            
            return new Date(b.updated_at) - new Date(a.updated_at);
          })
          .slice(0, 100);
      }
    }

    // 3. Fallback to curated project dataset if offline or rate limited
    return fallbackMockRepos;

  } catch (err) {
    console.warn("Using curated fallback repositories:", err);
    return fallbackMockRepos;
  }
};