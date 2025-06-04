'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles, fetchRepositories, fetchResources } from "../lib/api";
import tools from '../data/tools.json'
import { queryClient } from "../lib/queryClient";
import { IoMdRemove } from "react-icons/io";

const Page = () => {
  const [windowWidth, setWindowWidth] = useState(0);

useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth);
  handleResize(); // set initial width
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  const isDesktop = windowWidth >= 1124; 

  const { data, isLoading, error } = useQuery({
    queryKey: ['resources','all'],
    queryFn: fetchResources,
    staleTime: 1000 * 60 * 5, // 5 minutes fresh
  });

  if (isLoading) {
    return (
      <div className="h-full w-screen flex items-center justify-center">
      <div
        className={`h-full w-full flex ${isDesktop ? 'flex-row' : 'flex-col'} mt-[55%] sm:mt-[40%] md:mt-[30%] lg:mt-[15%] items-start justify-start`}
      >
        {/* Left Section - Articles */}
        <div className={`flex flex-col items-start mt-[0%] justify-start w-full ${isDesktop ? 'ml-[25%]' : 'ml-[5%]'}`}>
          <h1 className="text-start text-xl font-medium">Articles</h1>
          <div className="flex flex-col items-start gap-4 mt-8">
          {[...Array(8)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-[#080808] border border-[#343434] h-16 w-[300px] lg:w-[600px] p-1.5 rounded-md" />
                  ))}
          </div>
        </div>
    
        {/* Right Section - Tools & Repos */}
        <div className={`flex  flex-col items-start ${isDesktop ? 'pr-6 mt-[5%]' : 'mt-10 ml-[5%]'} gap-10`}>
          {/* Tools */}
          <div className="flex flex-col bg-transparent gap-2.5 border border-[#343434] rounded-xl items-start p-2 w-[300px] h-[300px]">
            <p className="text-sm font-medium mb-4">Latest Tools</p>
            {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-[#080808] border border-[#343434] h-16 w-[300px] lg:w-[600px] p-1.5 rounded-md" />
                  ))}
          </div>
    
          {/* Repositories */}
          <div className="repo flex flex-col bg-[#080808] gap-2 w-[300px] h-[100%] overflow-y-auto rounded-xl p-2 border border-[#343434]">
            <p className="text-sm font-medium mb-4">Explore Repositories</p>
            {[...Array(8)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-[#080808] border border-[#343434] h-16 w-[300px] lg:w-[600px] p-1.5 rounded-md" />
                  ))}
          </div>
        </div>
      </div>
    </div>
    );
  }

  

  
  if (error) return <div>Something went wrong: {error.message}</div>;
  

  


    return ( 
      <div className="h-full w-screen flex items-center justify-center">
      <div
        className={`h-full w-full flex ${isDesktop ? 'flex-row' : 'flex-col'} mt-[55%] sm:mt-[40%] md:mt-[30%] lg:mt-[15%] items-start justify-start`}
      >
        {/* Left Section - Articles */}
        <div className={`flex flex-col items-start mt-[0%] justify-start w-full ${isDesktop ? 'ml-[25%]' : 'ml-[5%]'}`}>
          <h1 className="text-start text-xl font-medium">Articles</h1>
          <div className="flex flex-col items-start gap-4 mt-8">
            {data?.articles.map((article) => (
              <Link
                onMouseEnter={() => {
                  queryClient.prefetchQuery({
                    queryKey: ['resources', 'all'],
                    queryFn: fetchResources,
                    staleTime: 1000 * 60 * 5,
                  });
                }}
                href={`/resources/${article.id}?type=article`}
                key={article.id}
              >
                <div className="bg-[#080808] flex flex-col items-start gap-1 w-[300px] lg:w-[600px] border border-[#343434] p-1.5 rounded-xl">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-2 mb-0.5">
                      <img
                        src={article.user.profile_image}
                        alt={article.user.name}
                        className="w6 h-6 rounded-full"
                      />
                      <p className="text-sm font-light text-gray-300">
                        {article.user.name}
                      </p>
                    </div>
                  </div>
                  {article.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
    
        {/* Right Section - Tools & Repos */}
        <div className={`flex  flex-col items-start ${isDesktop ? 'pr-6 mt-[5%]' : 'mt-10 ml-[5%]'} gap-10`}>
          {/* Tools */}
          <div className="flex flex-col bg-transparent gap-2.5 border border-[#343434] rounded-xl items-start p-2 w-[300px] h-[300px]">
            <p className="text-sm font-medium mb-4">Latest Tools</p>
            {tools.slice(0, 7).map((tool) => (
              <Link href={`/resources/${tool.id}?type=tools`} key={tool.id}>
                <div className="text-sm font-light gap-1 flex-row-reverse flex items-center">
                  {tool.name}
                  <img src={tool.icon} alt="" className="w-6 h-6" />
                </div>
              </Link>
            ))}
          </div>
    
          {/* Repositories */}
          <div className="repo flex flex-col bg-[#080808] gap-2 w-[300px] h-[100%] overflow-y-auto rounded-xl p-2 border border-[#343434]">
            <p className="text-sm font-medium mb-4">Explore Repositories</p>
            {data?.repositories.slice(0, 7).map((repo) => (
              <Link href={`/resources/${repo.id}?type=repo`} key={repo.id}>
                <div className="text-sm font-light flex flex-col items-start gap-2 border-b pb-1 border-[#343434]">
                  <h1 className="text-sm font-medium">{repo.name}</h1>
                  <span className="flex items-center gap-1 text-gray-400">
                    <p
                      className="rounded-full h-2 w-2"
                      style={{
                        backgroundColor:
                          repo.language === 'JavaScript'
                            ? 'yellow'
                            : repo.language === 'TypeScript'
                            ? 'aqua'
                            : repo.language === 'C++'
                            ? 'blue'
                            : '#343434',
                      }}
                    />
                    {repo.language || 'none'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    
     );
}
 
type DrawerProps = {
  drawer: boolean;
  setDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

  
    export const SideBar: React.FC<DrawerProps> = ({ drawer, setDrawer }) => {

      const [isClicked, setIsClicked] = useState('')

      type Repo = {
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

      const [showRepo, setShowRepo] = useState<Repo[]>([])

      const HomeFeed = [
        {text:'Dashboard',link:'/'},
            {text:'Articles',link:'/articles'},
            {text:'Tools',link:'/tools'},
            { text: 'Github Repositories', link: '/github' },
      ]
      
      useEffect(() => {
        const saved = localStorage.getItem("savedRepos");
        if (saved) {
          setShowRepo(JSON.parse(saved))
        }
      }, [])
      
      const removeRepo = (id: number) => {
        const updateRepo = showRepo.filter((repo) => repo.id !== id)
        setShowRepo(updateRepo)
        localStorage.setItem('savedRepos',JSON.stringify(updateRepo))
      }

        return (
          <>
           <div className="mt-15 space-y-6 flex flex-col ">
            {HomeFeed.map((feed, index) =>
                <div
                key={index}
                className="flex flex-col"
                onMouseEnter={() => setIsClicked(feed.text)}
                onMouseLeave={() => setIsClicked('')}
                onClick={() => {
                  setIsClicked(feed.text);
                  setDrawer(false);
                }}
                >
                <Link
                  className={`${isClicked === feed.text ? 'text-white' : 'text-gray-300'} transition-all duration-300`}
                  href={`/resources${feed.link}`}
                >
                  {feed.text}
                </Link>
                </div>)}
            </div>
            <hr className="w-full bg-gray-400/50 px-2" />
            <h1 className="text-md font-medium text-white">Saved Repositories</h1>
            <div className="flex flex-col mt-2 gap-4">
              {showRepo.length < 0 ? <p>Nothing Saved</p> :
              showRepo.map((repo) => (
                <div className="flex items-center justify-between gap-18"key={repo.id}>
                   <Link href={repo.html_url}>
                  <div  className="text-gray-300 flex items-center gap-1.5">
                    <img className="w-6 h-6 border border-[#343434] flex items-center" src={repo.owner.avatar_url} alt="" />
                    {repo.name}
                  </div>
                  </Link>
                  <button className="p-0.5 cursor-pointer rounded-full bg-transparent border border-[#343434]" onClick={()=>removeRepo(repo.id)}><IoMdRemove size={22}/></button>
               </div>
                ))
             }
            </div>
          </>
        );
    }
  export default Page;