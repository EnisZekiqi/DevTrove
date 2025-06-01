'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchArticlesMultiPage } from "@/app/lib/api";
import { FullArticle } from "@/app/lib/api";
import { motion } from "motion/react";

const Articles = () => {


    const [filter, setFilter] = useState<'newest' | 'likes' | 'oldest'>('newest');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const { data, isLoading, error } = useQuery<FullArticle[]>({
        queryKey: ['articles', filter,selectedTags],
        queryFn: () => fetchArticlesMultiPage(3, filter,selectedTags),
        staleTime: 1000 * 60 * 5,
      });
      
      

    if (isLoading) {
        return (
            <div className="h-full w-screen flex items-center justify-center">
              <div className="h-full flex flex-col gap-4 mt-[6%] -ml-[5%] items-start justify-center z-[500]">
            <h1 className="text-start text-xl font-medium">{filter === 'likes' ? 'Most Liked' : filter === 'newest'? 'Newest':'Oldest'} / {selectedTags.length > 0 ? selectedTags.join(', ') : 'All'}</h1>

            <div className="mt-6 flex flex-col gap-4">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-[#080808] border border-[#343434] h-16 w-[600px] p-1.5 rounded-md" />
                  ))}
                </div> 
                <div className="empty opacity-0 h-[100px]"></div>

            </div>

            <div className=" flex flex-col fixed pr-6 gap-10 mt-[5%] ml-[0%] right-0 z-[500]">
                            <div className="flex flex-col bg-transparent gap-2 border border-[#343434] rounded-xl p-2 w-[200px] h-auto">
                <p className="text-sm font-medium mb-4">Sort by</p>
                <label className="flex gap-2 items-center">
                    <input
                    type="radio"
                    name="filter"
                    value="newest"
                    checked={filter === 'newest'}
                    className="input"        
                    onChange={(e) => setFilter(e.target.value as any)}
                    />
                    Newest
                    </label>
                    
                <label className="flex gap-2 items-center">
                    <input
                    type="radio"
                    name="filter"
                    value="likes"
                    checked={filter === 'likes'}
                    onChange={(e) => setFilter(e.target.value as any)}
                    />
                    Most Liked
                </label>
                <label className="flex gap-2 items-center">
                    <input
                    type="radio"
                    name="filter"
                    value="oldest"
                    checked={filter === 'oldest'}
                    onChange={(e) => setFilter(e.target.value as any)}
                    />
                    Oldest
                </label>
                </div>
                <div className="flex flex-col gap-2 border border-[#343434] rounded-xl p-2 w-[200px]">
                    <p className="text-sm font-medium mb-2">Filter by Tag</p>
                    <select
                    className="bg-[#121212] text-white border focus:outline-0 border-[#343434] rounded p-1"
                    onChange={(e) =>
                        setSelectedTags(e.target.value ? [e.target.value] : [])
                    }
                    defaultValue=""
                    >
                    <option value="">All</option>
                    <option value="javascript">JavaScript</option>
                    <option value="react">React</option>
                        <option value="typescript">TypeScript</option>
                        <option value="programming">programming</option>
                        <option value="webdev">webdev</option>
                        <option value="gamedev">gamedev</option>
                        <option value="discuss">discuss</option>

                    </select>
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
            initial={{ opacity: 0 }}
            animate={{opacity:1,transition:{duration:0.7}}}
            className="flex h-full w-screen mt-[5%] justify-center">
            <div className="h-full flex flex-col gap-4 mt-[0%] -ml-[0%] items-start justify-center z-[500]">
            <h1 className="text-start text-xl font-medium">{filter === 'likes' ? 'Most Liked' : filter === 'newest'? 'Newest':'Oldest'} / {selectedTags.length > 0 ? selectedTags.join(', ') : 'All'}</h1>

                <div className="mt-6 flex flex-col gap-4">
                {data?.map((article) => (
            <Link
                href={`/resources/${article.id}?type=article`}
                key={article.id}
            >
                <div className="bg-[#080808] flex flex-col items-start gap-1 w-[600px] border border-[#343434] p-1.5 rounded-xl">
                <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-2 mb-0.5">
                    <img
                        src={article.user.profile_image}
                        alt={article.user.name}
                        className="w-6 h-6 rounded-full"
                    />
                    <p className="text-sm font-light text-gray-300">{article.user.name}</p>
                    </div>
                </div>
                {article.title}
                </div>
            </Link>
                ))}
                </div> 
                <div className="empty opacity-0 h-[100px]"></div>

            </div>

            <div className=" flex flex-col fixed pr-6 gap-10 mt-[5%] ml-[0%] right-0 z-[500]">
                            <div className="flex flex-col bg-transparent gap-2 border border-[#343434] rounded-xl p-2 w-[200px] h-auto">
                <p className="text-sm font-medium mb-4">Sort by</p>
                <label className="flex gap-2 items-center">
                    <input
                    type="radio"
                    name="filter"
                    value="newest"
                    checked={filter === 'newest'}
                    className="input"        
                    onChange={(e) => setFilter(e.target.value as any)}
                    />
                    Newest
                    </label>
                    
                <label className="flex gap-2 items-center">
                    <input
                    type="radio"
                    name="filter"
                    value="likes"
                    checked={filter === 'likes'}
                    onChange={(e) => setFilter(e.target.value as any)}
                    />
                    Most Liked
                </label>
                <label className="flex gap-2 items-center">
                    <input
                    type="radio"
                    name="filter"
                    value="oldest"
                    checked={filter === 'oldest'}
                    onChange={(e) => setFilter(e.target.value as any)}
                    />
                    Oldest
                </label>
                </div>
                <div className="flex flex-col gap-2 border border-[#343434] rounded-xl p-2 w-[200px]">
                    <p className="text-sm font-medium mb-2">Filter by Tag</p>
                    <select
                    className="bg-[#121212] text-white border focus:outline-0 border-[#343434] rounded p-1"
                    onChange={(e) =>
                        setSelectedTags(e.target.value ? [e.target.value] : [])
                    }
                    defaultValue=""
                    >
                    <option value="">All</option>
                    <option value="javascript">JavaScript</option>
                    <option value="react">React</option>
                        <option value="typescript">TypeScript</option>
                        <option value="programming">programming</option>
                        <option value="webdev">webdev</option>
                        <option value="gamedev">gamedev</option>
                        <option value="discuss">discuss</option>

                    </select>
                </div>
            </div>
    </motion.div>
     );
}
 
export default Articles;