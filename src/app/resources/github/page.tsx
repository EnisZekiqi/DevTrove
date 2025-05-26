'use client'

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRepositoriesMultiPage } from "@/app/lib/api";
import Link from "next/link";

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
      queryFn: () => fetchRepositoriesMultiPage(3, repoFilter),
    });
      
      

    if (isLoading) {
        return (
            <div className="h-full w-screen flex items-center justify-center">
              <div className="h-full flex flex-col items-start mt-[15%] justify-start w-full ml-[25%]">
                <h1 className="text-start text-xl font-medium">Articles</h1>
                <div className="flex flex-col items-start gap-4 mt-8">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-[#080808] border border-[#343434] h-16 w-[600px] p-1.5 rounded-md" />
                  ))}
                </div>
              </div>
              <div className="filters pr-6 mt-[5%] ml-[5%]">
                            <div className="flex flex-col bg-transparent gap-2 border border-[#343434] rounded-xl p-2 w-[200px] h-auto">
                <p className="text-sm font-medium mb-4">Sort by</p>
                <label className="flex gap-2 items-center">
                    <input
                    type="radio"
                    name="filter"
                    value="newest"
                    checked={repoFilter === 'stars'}
                    className="input"        
                    onChange={(e) => setRepoFilter(e.target.value as any)}
                    />
                    Newest
                    </label>
                    
                <label className="flex gap-2 items-center">
                    <input
                    type="radio"
                    name="filter"
                    value="likes"
                    checked={repoFilter === 'updated'}
                    onChange={(e) => setRepoFilter(e.target.value as any)}
                    />
                    Most Liked
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
        <div className="flex h-full w-screen mt-[5%] justify-center">
            <div className="h-full flex flex-col gap-4 mt-[0%] -ml-[5%] items-start justify-center z-[500]">

                <div className="mt-6 flex flex-col gap-4">
                {data?.map((repo) => (
            <Link
                href={`/resources/${repo.id}?type=article`}
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

            </div>
         
    </div>
     );
}
 
export default GitHub;