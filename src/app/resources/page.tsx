'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles, fetchRepositories, fetchResources } from "../lib/api";
import tools from '../data/tools.json'

const Page = () => {


  const { data,isLoading,error } = useQuery({
    queryKey: ['resources'],
    queryFn: fetchResources,
    staleTime: 1000 * 60 * 5, // 5 minutes fresh
  })

  if (isLoading) {
    return (
      <div className="h-full w-screen flex items-center justify-center">
        <div className="h-full flex flex-col items-start mt-[15%] justify-start w-full ml-[25%]">
          <h1 className="text-start text-xl font-medium">Articles</h1>
          <div className="flex flex-col items-start gap-4 mt-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse bg-[#1a1a1a] h-6 w-60 rounded-md" />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start pr-6 mt-[15%] gap-10">
          <div className="flex flex-col gap-2 border border-[#343434] rounded-xl p-2 w-[300px] h-[300px]">
            <p className="text-sm font-medium mb-4">Latest Tools</p>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse bg-[#1a1a1a] h-4 w-40 rounded-sm" />
            ))}
          </div>
          <div className="flex flex-col bg-[#080808] gap-2 w-[300px] h-[330px] rounded-xl p-2 border border-[#343434]">
            <p className="text-sm font-medium mb-4">Explore Repositories</p>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse bg-[#1a1a1a] h-4 w-48 rounded-sm" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (error) return <div>Something went wrong: {error.message}</div>;
  

    return ( 
        <div className="h-full w-screen flex items-center justify-center ">
            <div className="h-full flex flex-col items-start mt-[15%] justify-start w-full ml-[25%]">
            <h1 className="text-start text-xl font-medium">Articles</h1>
           <div className="flex flex-col items-start gap-4 mt-8">
           {data?.articles.map((article) => (
            <Link href={`/resources/${article.id}?type=article`} key={article.id}>
            <div className="bg-[#080808] flex flex-col items-start gap-1 w-[600px] border border-[#343434] p-1.5 rounded-xl">
               <div className="flex items-center gap-1.5">
               <div className="flex items-center gap-2 mb-0.5">
            <img src={article.user.profile_image} alt={article.user.name} className="w6 h-6 rounded-full" />
            <p className="text-sm font-light text-gray-300">{article.user.name}</p>
            </div>
              </div>
               {article.title}
              
             </div>
            </Link>
          ))}
           </div>
           </div>
           <div className="flex flex-col items-start pr-6 mt-[5%] gap-10">
              <div className="flex flex-col bg-transparent gap-2 border border-[#343434] rounded-xl p-2 w-[300px] h-[300px]">
              <p className="text-sm font-medium mb-4">Latest Tools</p>
            {tools.map((tool) => (
              <div key={tool.id} className="text-sm font-light">
                {tool.name}
                  </div>
                ))}
              </div>
              <div className="repo flex flex-col bg-[#080808] gap-2 w-[300px] h-[100%] overflow-y-auto rounded-xl p-2 border border-[#343434]">
              <p className="text-sm font-medium mb-4">Explore Repositories</p>
            {data?.repositories.map((repo) => (
              <Link href={`/resources/${repo.id}?type=repo`} key={repo.id}>
                 <div className="text-sm font-light flex flex-col items-start gap-2 border-b border-[#343434]">
                <h1 className="text-sm font-medium">{repo.name}</h1>
                <span className="flex items-center gap-1 text-gray-400"><p className="rounded-full h-2 w-2 "
                  style={{ backgroundColor: repo.language === 'JavaScript' ? '#fff': '#343434'}}
                />
                {repo.language || 'none'}
                </span>
              </div>
             </Link>
              ))}
          </div>
           </div>
        </div>
     );
}
 

  
    export function SideBar(){

       const [isClicked,setIsClicked]=useState('')

        const HomeFeed = [
            {text:'Articles',link:'/articles'},
            {text:'Tools',link:'/tools'},
            { text: 'Github Repositories', link: '/github' },
        ]
        return (
        <div className="mt-15 space-y-6 flex flex-col ">
            {HomeFeed.map((feed, index) =>
              <div key={index} className="flex flex-col"
                onMouseEnter={() => setIsClicked(feed.text)}
                onMouseLeave={()=>setIsClicked('')}
                >
                    <Link className={`${isClicked === feed.text ? 'text-white':'text-gray-300'} transition-all duration-300`} href={`/resources${feed.link}`}>{feed.text}</Link>
                </div>)}
                </div>);
    }
  export default Page;