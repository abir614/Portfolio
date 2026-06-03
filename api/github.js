export default async function handler(req, res) {
  try {
    // If the token isn't set, we can still fall back to the public API
    const token = process.env.GITHUB_PAT;
    
    let url = "https://api.github.com/users/TheLunatic1/repos?sort=updated&per_page=100";
    const headers = {
      "Accept": "application/vnd.github.v3+json",
      "User-Agent": "Portfolio-App"
    };

    if (token) {
      // If we have a token, we can use the authenticated endpoint to get private repos too!
      // 'affiliation=owner' ensures we only get repos you own, not ones you just contribute to.
      url = "https://api.github.com/user/repos?sort=updated&per_page=100&affiliation=owner";
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("GitHub API error details:", errorText);
      return res.status(response.status).json({ error: "Failed to fetch from GitHub" });
    }

    const data = await response.json();

    // Do the filtering and sorting here on the server so the browser downloads less data
    const isFeatured = (repo) => repo.private || repo.stargazers_count > 5;

    const sortedRepos = data
      .filter(repo => !repo.fork) // Remove forks
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

    return res.status(200).json(sortedRepos);

  } catch (error) {
    console.error("API Route Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
