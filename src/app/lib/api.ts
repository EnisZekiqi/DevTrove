'use server'

// lib/api.ts
export async function fetchArticles() {
    const res = await fetch('https://dev.to/api/articles?per_page=10');
    if (!res.ok) throw new Error('Failed to fetch articles');
    return res.json();
}
  
export async function fetchRepositories() {
    const res = await fetch('https://api.github.com/search/repositories?q=topic:react+stars:>1000&per_page=10')
    if (!res.ok) throw new Error('Failed to fetch articles')
    return res.json()
}

// lib/api.ts (client-side function)
export async function fetchResources() {
    const [articlesRes, reposRes] = await Promise.all([
      fetchArticles(),
      fetchRepositories()
    ]);
  
    return {
      articles: articlesRes,
      repositories: reposRes
    };
  }
  