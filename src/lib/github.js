// src/lib/github.js
export const fetchRepos = async () => {
  try {
    const response = await fetch(
      "https://api.github.com/users/TheLunatic1/repos?sort=updated&per_page=100"
    );
    if (!response.ok) throw new Error("Failed to fetch repos");
    const data = await response.json();

    const filtered = data
      .filter(repo => !repo.fork && repo.name !== "Portfolio-Salman-Toha")
      .map(repo => ({
        ...repo,
        stars: repo.stargazers_count,
      }));

    // STARRED FIRST → then by last updated
    return filtered.sort((a, b) => {
      if (a.stars !== b.stars) {
        return b.stars - a.stars; // Highest stars first
      }
      return new Date(b.updated_at) - new Date(a.updated_at);
    });
  } catch (err) {
    console.error("GitHub API error:", err);
    return [];
  }
};