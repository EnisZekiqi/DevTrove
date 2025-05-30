
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
  public_reactions_count: number;
  public_comments_count: number;

};

export type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
  forks_count: number;
  owner: {
    avatar_url: string;
    login: string;
  };
  license?: {
    name: string;
  };
  topics?: string[]; // Optional, fetched with extra header

};



export async function fetchResources(): Promise<{
  articles: Article[];
  repositories: Repo[];
}> {
  const [articlesData, repositoriesData] = await Promise.all([
    fetchArticles(),
    fetchRepositories()
  ]);

  return {
    articles: articlesData as Article[],
    repositories: repositoriesData as Repo[]
  };
}

/// fetch function for the articles section more than 1 page //

export type FullArticle = {
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
  published_at: string;
  public_reactions_count: number;
  
};


export async function fetchArticlesMultiPage(
  pages = 3,
  sortBy?: 'newest' | 'likes' | 'discussed' | 'oldest',
  tagFilter: Array<string> = []
) {
  const fetches = [];

  for (let i = 1; i <= pages; i++) {
    fetches.push(fetch(`https://dev.to/api/articles?per_page=10&page=${i}`));
  }

  const responses = await Promise.all(fetches);
  const articlesArrays = await Promise.all(responses.map(res => res.json()));
  let allArticles = articlesArrays.flat();

  // Remove duplicates by article id
  const uniqueMap = new Map();
  allArticles.forEach(article => uniqueMap.set(article.id, article));
  allArticles = Array.from(uniqueMap.values());

  // Filter by tag
  if (tagFilter.length > 0) {
    allArticles = allArticles.filter(article =>
      article.tag_list.some((tag: string) => tagFilter.includes(tag))
    );
  }

  // Sort
  if (sortBy === 'likes' || sortBy === 'discussed') {
    allArticles.sort((a, b) => b.public_reactions_count - a.public_reactions_count);
  } else if (sortBy === 'newest') {
    allArticles.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
  } else if (sortBy === 'oldest') {
    allArticles.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime());
  }

  return allArticles;
}


export async function fetchRepositoriesMultiPage(
  pages = 3,
  sortBy?: 'stars' | 'updated'
): Promise<Repo[]> {
  const fetches = [];

  for (let i = 1; i <= pages; i++) {
    fetches.push(
      fetch(`https://api.github.com/search/repositories?q=topic:react+stars:>1000&per_page=10&page=${i}`)
    );
  }

  const responses = await Promise.all(fetches);
  const jsons = await Promise.all(responses.map(res => res.json()));
  const allRepos = jsons.flatMap(data => data.items); // Combine all pages

  if (sortBy === 'stars') {
    return allRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
  }

  if (sortBy === 'updated') {
    return allRepos.sort(
      (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
  }

  return allRepos;
}



// app/lib/api.ts

export async function fetchArticleById(id: number):Promise<Article>{
  const res = await fetch(`https://dev.to/api/articles/${id}`);
  if (!res.ok) throw new Error("Failed to fetch article by ID");
  return res.json();
}

export async function fetchRepoById(id: number): Promise<Repo> {
  const res = await fetch(`https://api.github.com/repositories/${id}`);
  if (!res.ok) throw new Error("Failed to fetch repository by ID");
  const data = await res.json();
  return data;
}
