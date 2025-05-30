'use client'

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRepositoriesMultiPage } from "@/app/lib/api";
import Link from "next/link";
import { motion } from "motion/react";

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
  

const GitHub = () => {

    const [repoFilter, setRepoFilter] = useState<'stars' | 'updated'>('stars');

    const { data, isLoading,error } = useQuery<Repo[]>({
      queryKey: ['repositories', repoFilter],
      queryFn: () => fetchRepositoriesMultiPage(3, repoFilter)
    });
      
      

    if (isLoading) {
        return (
          <div className="flex h-full w-screen mt-[5%] justify-center">
            <div className="h-full flex flex-col gap-4 mt-[0%] -ml-[5%] items-start justify-center z-[500]">
            <h1 className="text-start text-xl font-medium">{repoFilter === 'stars'? 'Most Stars': 'Newest Update'} </h1>

                <div className="mt-6 flex flex-col gap-4">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-[#080808] border border-[#343434] h-16 w-[600px] p-1.5 rounded-md" />
                  ))}
                </div> 
               <div className="empty opacity-0 h-[70px]"></div>
            </div>
            <div className=" flex flex-col fixed pr-6 gap-10 mt-[5%] ml-[0%] right-0 z-[500]">
                            <div className="flex flex-col bg-transparent gap-2 border border-[#343434] rounded-xl p-2 w-[200px] h-auto">
                <p className="text-sm font-medium mb-4">Sort by</p>
                <label className="flex gap-2 items-center">
                    <input
                    type="radio"
                    name="filter"
                    value="stars"
                    checked={repoFilter === 'stars'}
                    className="input"        
                    onChange={(e) => setRepoFilter(e.target.value as 'stars' | 'updated')}
                    />
                    Most Stars
                    </label>
                    
                <label className="flex gap-2 items-center">
                    <input
                    type="radio"
                    name="filter"
                    value="updated"
                    checked={repoFilter === 'updated'}
                    onChange={(e) => setRepoFilter(e.target.value as 'stars' | 'updated')}
                    />
                    Newest Update
                </label>
                
                </div>
                <div className="flex flex-col bg-transparent opacity-0 gap-2 border border-[#343434] rounded-xl p-2 w-[200px] h-auto">
                <p className="text-sm font-medium mb-4">Sort by</p>
                <label className="flex gap-2 items-center">
                    <input
                    type="radio"
                    name="filter"
                    value="stars"
                    checked={repoFilter === 'stars'}
                    className="input"        
                    onChange={(e) => setRepoFilter(e.target.value as 'stars' | 'updated')}
                    />
                    Most Stars
                    </label>
                    
                <label className="flex gap-2 items-center">
                    <input
                    type="radio"
                    name="filter"
                    value="updated"
                    checked={repoFilter === 'updated'}
                    onChange={(e) => setRepoFilter(e.target.value as 'stars' | 'updated')}
                    />
                    Newest Update
                </label>
                
                </div>
            </div>
    </div>
          );
    }

    if (error) {
        return(<div>Error</div>)
    }

    

    return ( 
      <motion.div
        initial={{opacity:0}}
        animate={{opacity:1,transition:{duration:0.7}}}
        className="flex h-full w-screen mt-[5%] justify-center">
            <div className="h-full flex flex-col gap-4 mt-[0%] -ml-[5%] items-start justify-center z-[500]">
            <h1 className="text-start text-xl font-medium">{repoFilter === 'stars'? 'Most Stars': 'Newest Update'} </h1>

                <div className="mt-6 flex flex-col gap-4">
                {data?.filter((repo): repo is Repo => !!repo && typeof repo.id !== 'undefined').map((repo) => (
            <Link
                href={`/resources/${repo.id}?type=repo`}
                key={repo.id}
            >
                <div className="bg-[#080808] flex flex-col items-start gap-1 w-[600px] border border-[#343434] p-1.5 rounded-xl">
                <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-2 mb-0.5">
                    <img
                        src={repo.owner.avatar_url}
                        alt={repo.name}
                        className="w-6 h-6 rounded-full"
                    />
                    <p className="text-sm font-light text-gray-300">{repo.name}</p>
                    </div>
                </div>
                {repo.description}
                </div>
            </Link>
                ))}
                </div> 
               <div className="empty opacity-0 h-[70px]"></div>
            </div>
            <div className=" flex flex-col fixed pr-6 gap-10 mt-[5%] ml-[0%] right-0 z-[500]">
                            <div className="flex flex-col bg-transparent gap-2 border border-[#343434] rounded-xl p-2 w-[200px] h-auto">
                <p className="text-sm font-medium mb-4">Sort by</p>
                <label className="flex gap-2 items-center">
                    <input
                    type="radio"
                    name="filter"
                    value="stars"
                    checked={repoFilter === 'stars'}
                    className="input"        
                    onChange={(e) => setRepoFilter(e.target.value as 'stars' | 'updated')}
                    />
                    Most Stars
                    </label>
                    
                <label className="flex gap-2 items-center">
                    <input
                    type="radio"
                    name="filter"
                    value="updated"
                    checked={repoFilter === 'updated'}
                    onChange={(e) => setRepoFilter(e.target.value as 'stars' | 'updated')}
                    />
                    Newest Update
                </label>
                
                </div>
                
            </div>
    </motion.div>
     );
}
 
export default GitHub;