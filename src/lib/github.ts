const GH_USER = "Alex-Xandre";

export type GithubStats = {
  repos: number | null;
  lastPush: string | null;
};

const ago = (iso: string) => {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (d === 0) return "today";
  if (d === 1) return "1d ago";
  return `${d}d ago`;
};
export async function getGithubStats(): Promise<GithubStats> {
  try {
    const opts = { next: { revalidate: 3600 } };
    const [user, repos] = await Promise.all([
      fetch(`https://api.github.com/users/${GH_USER}`, opts).then((r) =>
        r.json(),
      ),
      fetch(
        `https://api.github.com/users/${GH_USER}/repos?sort=pushed&per_page=1`,
        opts,
      ).then((r) => r.json()),
    ]);
    const pushedAt = Array.isArray(repos) ? repos[0]?.pushed_at : null;
    return {
      repos:
        typeof user?.public_repos === "number" ? user.public_repos : null,
      lastPush: pushedAt ? ago(pushedAt) : null,
    };
  } catch {
    return { repos: null, lastPush: null };
  }
}