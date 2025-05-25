// app/resources/[id]/page.tsx
import { fetchArticles,fetchRepositories,fetchArticlesMultiPage } from "@/app/lib/api";
import { notFound } from "next/navigation";
import { IoMdStar,IoMdStarOutline,IoMdCalendar,IoMdHeart   } from "react-icons/io";
import { AiOutlineFork } from "react-icons/ai";
import { MdOutlineBookmarkBorder, } from "react-icons/md";
import SaveRepoButton from "@/app/components/SaveRepoButton";
import { fetchArticleById } from "@/app/lib/api";
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
    const article = await fetchArticleById(id);

    if (!type || !["article", "repo"].includes(type)) return notFound();
    if (!article) return notFound();
    

    return (
        <div className="p-10 h-full w-full mt-[5%] ml-[25%]">
            <div className="flex items-center gap-4 mb-4">
            <img src={article.user.profile_image} alt={article.user.name} className="w-10 h-10 rounded-full" />
            <p className="text-sm">{article.user.name}</p>
            </div>
            
          <h1 className="text-2xl font-bold">{article.title}</h1>
          <p className="mt-4 text-sm text-gray-400 w-2/3">{article.description}</p>
  
          <div className="flex gap-3 mt-2">
          {Array.isArray(article.tag_list) && article.tag_list.map((tag: string) => (
          <span key={tag} className="bg-gray-800 text-white text-xs px-2 py-1 rounded">{tag}</span>
        ))}

          </div>
  
          
  
          {article.cover_image ? (
            <img src={article.cover_image} alt="Cover" className="mt-4 object-contain w-[700px]" />
            ) : (
            <div className="text-sm text-gray-400 mt-4">No cover image available.</div>
            )}
        <span className="mt-2 flex items-center text-lg"><IoMdHeart size={22} />{article.public_reactions_count}</span> 

        </div>
      );
  }

  if (type === "repo") {
    const repositories = await fetchRepositories(); // returns Repo[]
    const repo = repositories.find((r) => r.id === id);

    if (!repo) return notFound();

    
    



     
      
   
    return (
      <div className=" h-full w-full flex flex-col  mt-[8%] ml-[25%]">
        <div className="flex justify-between items-center w-[50%]">
        <div className="flex items-center gap-1">
        <img className="w-10 h-10 border border-[#343434]" src={repo.owner.avatar_url} alt="" />
          <h1 className="text-2xl font-bold">{repo.name}</h1>
        </div>
          <SaveRepoButton repo={repo}/>
        </div>
        <p className="mt-4 text-sm text-gray-300 w-2/3">{repo.description}</p>
        <div className="flex flex-wrap w-2/4 items-center gap-1.5 mt-4">
        {repo.topics?.map((tag: string) => (
              <span key={tag} className="bg-gray-800 text-white text-xs px-2 py-1 rounded">{tag}</span>
            ))}     
          </div>
        <p className="mt-4 ">Language: <span  style={{ color: repo.language === 'JavaScript' ? 'yellow': (repo.language === 'TypeScript' ? 'aqua':(repo.language === 'C++' ? 'blue':'#343434'))}}>{repo.language}</span></p>
        <p className="mt-2 flex items-center gap-1"><IoMdStarOutline size={23}/>: <span className="text-gray-400 flex items-center">{repo.stargazers_count} stars</span> </p>
        <p className="mt-2 flex items-center gap-1"><AiOutlineFork size={22}/>: <span className="text-gray-400 flex items-center">{repo.forks_count} forks</span> </p>
        <p className="mt-2 flex items-center gap-1"><IoMdCalendar size={23} />: <span className="text-gray-400">{repo.updated_at}</span></p>
        <p className="mt-2 flex items-center gap-1">License :<span className="text-gray-400">{repo.license?.name}</span></p>
        
        <p className="mt-2 flex items-center gap-1">Owner Repository: <span className="text-gray-400">{repo.owner.login}</span></p>
        <a href={repo.html_url} target="_blank" className="text-[#0251EF] underline mt-4 block">View on GitHub</a>
      </div>
    );
  }
}
