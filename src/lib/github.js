// src/lib/github.js
export const fetchRepos = async () => {
  try {
    const response = await fetch(
      "https://api.github.com/users/TheLunatic1/repos?sort=updated&per_page=30"
    );
    if (!response.ok) throw new Error("GitHub API failed");

    const data = await response.json();

    return data
      .filter(repo => !repo.fork)                          // Remove forks
      // .filter(repo => repo.name !== "Portfolio-Salman-Toha") // Optional: hide this portfolio repo
      .sort((a, b) => {
        // Primary: Highest stars first
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        // Secondary: Most recently updated
        return new Date(b.updated_at) - new Date(a.updated_at);
      })
      .slice(0, 100);
  } catch (err) {
    console.error("Failed to load repos:", err);
    return [];
  }
};