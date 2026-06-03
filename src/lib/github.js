// src/lib/github.js
export const fetchRepos = async () => {
  try {
    // 1. Try our new secure Serverless Function first
    const response = await fetch("/api/github");
    
    if (response.ok) {
      const data = await response.json();
      return data;
    }

    // 2. If it fails (e.g. running 'npm run dev' locally without Vercel CLI), 
    // fallback to the direct public GitHub API just like before.
    console.warn("Falling back to direct GitHub API (Are you running locally?)");
    const fallbackResponse = await fetch(
      "https://api.github.com/users/TheLunatic1/repos?sort=updated&per_page=100"
    );
    
    if (!fallbackResponse.ok) throw new Error("Fallback GitHub API failed");

    const data = await fallbackResponse.json();

    const isFeatured = (repo) => repo.private || repo.stargazers_count > 5;

    return data
      .filter(repo => !repo.fork)                          
      .sort((a, b) => {
        const aFeatured = isFeatured(a);
        const bFeatured = isFeatured(b);

        // 1. Prioritize Featured Repositories
        if (aFeatured && !bFeatured) return -1;
        if (!aFeatured && bFeatured) return 1;

        // 2. Secondary: Highest stars first
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        
        // 3. Tertiary: Most recently updated
        return new Date(b.updated_at) - new Date(a.updated_at);
      })
      .slice(0, 100);

  } catch (err) {
    console.error("Failed to load repos:", err);
    return [];
  }
};