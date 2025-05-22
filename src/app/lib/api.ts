'use server'

// lib/api.ts
export async function fetchArticles() {
    const res = await fetch('https://dev.to/api/articles?per_page=10');
    if (!res.ok) throw new Error('Failed to fetch articles');
    return res.json();
}
  
export async function fetchRepositories(): Promise<Repo[]> {
  const res = await fetch('https://api.github.com/search/repositories?q=topic:react+stars:>1000&per_page=10');
  if (!res.ok) throw new Error('Failed to fetch repositories');
  const data = await res.json();
  return data.items; // ✅ Now the shape matches Repo[]
}


// lib/api.ts (client-side function)

export type Article = {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  tag_list: string[];
  user: {
    name: string;
    profile_image: string;
  };
};

export type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  language: string;
};

export async function fetchResources(): Promise<{
  articles: Article[];
  repositories: Repo[];
}> {
  const [articles, repositories] = await Promise.all([
    fetchArticles(),
    fetchRepositories()
  ]);

  return { articles, repositories };
}


  