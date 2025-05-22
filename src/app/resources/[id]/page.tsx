// app/resources/[id]/page.tsx
import { fetchArticles,fetchRepositories } from "@/app/lib/api";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
  searchParams: { type?: string };
};

export default async function ResourceDetail({ params, searchParams }: Props) {
  const id = Number(params.id);
  const type = searchParams.type;

  if (!type || !["article", "repo"].includes(type)) {
    return notFound(); // 🧼 fail-safe
  }

  if (type === "article") {
    const articles = await fetchArticles();
    const article = articles.find((a: { id: number; title: string; description: string; url: string }) => a.id === id);

    if (!article) return notFound();

    return (
        <div className="p-10 h-screen w-screen mt-[5%] ml-[25%]">
            <div className="flex items-center gap-4 mb-4">
            <img src={article.user.profile_image} alt={article.user.name} className="w-10 h-10 rounded-full" />
            <p className="text-sm">{article.user.name}</p>
            </div>
            
          <h1 className="text-2xl font-bold">{article.title}</h1>
          <p className="mt-4 text-sm text-gray-400 w-2/3">{article.description}</p>
  
          <div className="flex gap-3 mt-2">
            {article.tag_list.map((tag: string) => (
              <span key={tag} className="bg-gray-800 text-white text-xs px-2 py-1 rounded">{tag}</span>
            ))}
          </div>
  
          
  
          {article.cover_image ? (
            <img src={article.cover_image} alt="Cover" className="mt-4 object-contain w-[700px]" />
            ) : (
            <div className="text-sm text-gray-400 mt-4">No cover image available.</div>
            )}

        </div>
      );
  }

  if (type === "repo") {
    const repositories = await fetchRepositories(); // returns Repo[]
    const repo = repositories.find((r) => r.id === id);

    if (!repo) return notFound();

    return (
      <div className=" h-screen w-screen flex flex-col  mt-[7%] ml-[25%]">
        <h1 className="text-2xl font-bold">{repo.name}</h1>
        <p className="mt-4 text-sm text-gray-400 w-2/4">{repo.description}</p>
        <p className="mt-2 text-yellow-500">Language: {repo.language}</p>
        <p className="mt-2">Stars: {repo.stargazers_count}</p>
        <a href={repo.html_url} target="_blank" className="text-blue-500 underline mt-4 block">View on GitHub</a>
      </div>
    );
  }
}
