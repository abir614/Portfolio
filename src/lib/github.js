export const fetchRepos = async () => {
  try {
    const response = await fetch(
      "https://api.github.com/users/TheLunatic1/repos?sort=updated&per_page=100"
    );
    if (!response.ok) throw new Error("Failed to fetch repos");
    const data = await response.json();

    // Filter out forks & your portfolio repo
    return data
      .filter(repo => !repo.fork && repo.name !== "Portfolio-Salman-Toha")
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  } catch (err) {
    console.error("GitHub API error:", err);
    return [];
  }
};