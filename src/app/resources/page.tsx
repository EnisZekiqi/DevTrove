'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles, fetchRepositories, fetchResources } from "../lib/api";
import tools from '../data/tools.json'

const Page = () => {


  const { data,isLoading,error } = useQuery({
    queryKey: ['resources'],
    queryFn:fetchResources
  })

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong: {error.message}</div>;
  

    return ( 
        <div className="h-screen w-screen flex items-center justify-center ">
            <div className="h-full flex flex-col items-start mt-[15%] justify-start w-full ml-[25%]">
            <h1 className="text-start text-xl font-medium">Articles</h1>
           <div className="flex flex-col items-start gap-4 mt-8">
           {data.articles.map((article) => (
            <div className="bg-[#080808] border border-[#343434] p-1.5 rounded-xl" key={article.id}>{article.title}</div>
          ))}
           </div>
           </div>
           <div className="flex flex-col items-start pr-6 mt-[15%] gap-10">
              <div className="flex flex-col bg-transparent gap-2 border border-[#343434] rounded-xl p-2 w-[300px] h-[300px]">
              <p className="text-sm font-medium mb-4">Latest Tools</p>
            {tools.map((tool) => (
              <div key={tool.id} className="text-sm font-light">
                {tool.name}
                  </div>
                ))}
              </div>
              <div className="flex flex-col bg-[#080808] gap-2 w-[300px] h-[330px] rounded-xl p-2 border border-[#343434]">
              <p className="text-sm font-medium mb-4">Explore Repositories</p>
            {data.repositories.items.map((repo) => (
                <div className="text-sm font-light" key={repo.id}>{repo.name}</div>
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