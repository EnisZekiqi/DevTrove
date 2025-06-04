// app/resources/[id]/page.tsx
import { fetchArticles,fetchRepositories,fetchArticlesMultiPage } from "@/app/lib/api";
import { notFound } from "next/navigation";
import { IoMdStar,IoMdStarOutline,IoMdCalendar,IoMdHeart   } from "react-icons/io";
import { AiOutlineFork } from "react-icons/ai";
import { MdOutlineBookmarkBorder, } from "react-icons/md";
import SaveRepoButton from "@/app/components/SaveRepoButton";
import { fetchArticleById, fetchRepoById } from "@/app/lib/api";
import tools from '@/app/data/tools.json'

type Props = {
  params: { id: string };
  searchParams: { type?: string };
};


export default async function ResourceDetail({ params, searchParams }: Props) {
  const id = Number(params.id);
  const type = searchParams.type;

  if (!type || !["article", "repo","tools"].includes(type)) {
    return notFound(); // 🧼 fail-safe
  }

  if (type === "article") {
    const article = await fetchArticleById(id);

    if (!type || !["article", "repo"].includes(type)) return notFound();
    if (!article) return notFound();
    

    return (
        <div className="p-10 h-full w-full mt-[15%] sm:mt-[5%] -ml-2 sm:ml-[25%]">
            <div className="flex items-center gap-4 mb-4">
            <img src={article.user.profile_image} alt={article.user.name} className="w-10 h-10 rounded-full" />
            <p className="text-sm">{article.user.name}</p>
            </div>
            
          <h1 className="text-xl sm:text-2xl font-bold">{article.title}</h1>
          <p className="mt-4 text-sm text-gray-400 w-full sm:w-2/3">{article.description}</p>
  
          <div className="flex gap-3 mt-2">
{typeof article.tag_list === 'string' && article.tag_list
  ? (article.tag_list as string).split(',').map((tag: string) => (
      <span key={tag} className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
        {tag.trim()}
      </span>
    ))
  : null}

          </div>
  
          
  
          {article.cover_image ? (
            <img src={article.cover_image} alt="Cover" className="mt-4 object-contain w-[700px]" />
            ) : (
            <div className="text-sm text-gray-400 mt-4">No cover image available.</div>
            )}
        <span className="mt-4 mb-4 flex items-center text-lg"><IoMdHeart size={22} />{article.public_reactions_count}</span> 
            <a href={article.url} className="mt-8 text-blue-400 underline w-fit">Visit full article</a>
        </div>
      );
  }

  if (type === "repo") {
    const repo = await fetchRepoById(id); // returns Repo

    if (!repo) return notFound();

    
    



     
      
   
    return (
      <div className=" h-full w-full flex flex-col mt-[25%] sm:mt-[8%] ml-7 sm:ml-[25%]">
        <div className="flex justify-between items-center w-[90%] sm:w-[50%]">
        <div className="flex items-center gap-3">
        <img className="w-10 h-10 border border-[#343434] rounded-full" src={repo.owner.avatar_url} alt="" />
          <h1 className="text-2xl font-bold">{repo.name}</h1>
        </div>
          <SaveRepoButton repo={repo}/>
        </div>
        <p className="mt-4 text-sm text-gray-300 w-full sm:w-[55%]">{repo.description}</p>
        <div className="flex flex-wrap w-[90%] sm:w-2/4 items-center gap-1.5 mt-4">
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
        <a href={repo.html_url} target="_blank" className="text-[#0251EF] underline mt-4 block w-fit">View on GitHub</a>
      </div>
    );
  }
  // Instead of checking type, check if the id exists in tools
  const tool = tools.find((tool) => Number(tool.id) === id);

  if (tool) {
    return (
      <div className="h-full w-full flex flex-col mt-[28%] sm:mt-[8%] ml-7 sm:ml-[25%] max-w-[700px]">
        <div className="flex items-center gap-3 mb-4">
          <img src={tool.icon} alt={tool.name} className="w-10 h-10" />
          <h1 className="text-2xl font-bold">{tool.name}</h1>
        </div>

        <p className="text-sm text-gray-300">{tool.description}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          {tool.tags?.map((tag: string) => (
            <span key={tag} className="bg-gray-800 text-white text-xs px-2 py-1 rounded">{tag.trim()}</span>
          ))}
        </div>

        <div className="mt-4">
          <h2 className="font-semibold">Category:</h2>
          <p className="text-sm text-gray-400">{tool.category}</p>
        </div>

        <div className="mt-2">
          <h2 className="font-semibold">Features:</h2>
          <p className="text-sm text-gray-400">{tool.features}</p>
        </div>

        <div className="mt-2">
          <h2 className="font-semibold">Pricing:</h2>
          <p className="text-sm text-gray-400">{tool.pricing}</p>
        </div>

        <div className="mt-2">
          <h2 className="font-semibold">Integration Support:</h2>
          <p className="text-sm text-gray-400">{tool.integrationSupport}</p>
        </div>

        <a
          href={tool.url}
          target="_blank"
          className="text-blue-400 underline mt-4 block w-fit"
        >
          Visit {tool.name}
        </a>
      </div>
    );
  }

}
