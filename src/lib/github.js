// Fallback mock repositories in case of GitHub rate limiting or offline development
const fallbackMockRepos = [
  {
    id: 101,
    name: "AmarDNS",
    description: "RFC 8484 compliant DoH edge resolver with multi-upstream racing & hedge requests, self-learning AI brain using UCB bandit routing & Kalman filters, 40+ threat detection subsystems, and D1/KV caching.",
    language: "JavaScript",
    stargazers_count: 24,
    forks_count: 7,
    html_url: "https://github.com/abir614/amardns",
    homepage: "https://abir614.github.io/amardns.html",
    topics: ["cloudflare-workers", "doh", "dns-over-https", "edge-ai", "dnssec", "sqlite", "featured"],
    private: false,
    updated_at: new Date().toISOString(),
  },
  {
    id: 102,
    name: "Shopify-Custom-Testimonial",
    description: "Custom form & testimonial engine syncing submissions directly to Shopify Metaobjects, media upload pipeline via Staged Uploads API, dynamic field mapping, and AES-256-GCM encryption.",
    language: "JavaScript",
    stargazers_count: 19,
    forks_count: 4,
    html_url: "https://github.com/abir614/shopify-custom-testimonial",
    homepage: "https://custom-testimonial.vercel.app",
    topics: ["shopify", "nodejs", "express", "mongodb", "graphql", "vercel", "featured"],
    private: false,
    updated_at: new Date().toISOString(),
  },
  {
    id: 103,
    name: "DevStore",
    description: "Custom Turkish streetwear storefront built from scratch on Dawn inspired by Kalles. Featuring lookbooks, tabbed sliders, color swatches, zoom, wishlist, and Ajax cart with free-shipping progress.",
    language: "Liquid",
    stargazers_count: 16,
    forks_count: 5,
    html_url: "https://github.com/abir614/devstore",
    homepage: "https://089fzs-0z.myshopify.com",
    topics: ["shopify", "liquid", "javascript", "ecommerce", "custom-elements", "featured"],
    private: false,
    updated_at: new Date().toISOString(),
  },
  {
    id: 104,
    name: "OpenWrt-VLAN-Network-Lab",
    description: "Enterprise OpenWrt network architecture featuring firewall rules, DHCP server customization, VLAN subnet management, and per-user port access control.",
    language: "Shell",
    stargazers_count: 11,
    forks_count: 2,
    html_url: "https://github.com/abir614/openwrt-network-lab",
    topics: ["openwrt", "networking", "firewall", "vlan", "dhcp", "linux"],
    private: false,
    updated_at: new Date().toISOString(),
  },
  {
    id: 105,
    name: "Edge-DoH-Resolver",
    description: "Zero-dependency Serverless DNS edge resolver running on Cloudflare Workers with DNSSEC validation, D1 persistent state, and KV stale-while-revalidate caching.",
    language: "TypeScript",
    stargazers_count: 13,
    forks_count: 3,
    html_url: "https://github.com/abir614/edge-doh-resolver",
    topics: ["cloudflare", "dns", "serverless", "doh", "dnssec"],
    private: false,
    updated_at: new Date().toISOString(),
  },
  {
    id: 106,
    name: "React-Next-Shopify-Storefront",
    description: "Interactive modern headless e-commerce frontend built with React, Next.js, Tailwind CSS, and Shopify Storefront API GraphQL integrations.",
    language: "TypeScript",
    stargazers_count: 15,
    forks_count: 4,
    html_url: "https://github.com/abir614/react-next-shopify-storefront",
    homepage: "https://abir.fly.dev",
    topics: ["react", "nextjs", "typescript", "shopify-headless", "graphql"],
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
      "https://api.github.com/users/abir614/repos?sort=updated&per_page=100"
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