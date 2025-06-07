'use client'

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRepositoriesMultiPage } from "@/app/lib/api";
import Link from "next/link";
import { motion,AnimatePresence } from "motion/react";
import { keepPreviousData } from '@tanstack/react-query';
import { MdFilterAlt } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
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

    const [filterRepo, setFilterRepo] = useState(false)
    
    const { data, isLoading,error } = useQuery<Repo[]>({
      queryKey: ['repositories', repoFilter],
        queryFn: () => fetchRepositoriesMultiPage(3, repoFilter),
        placeholderData: keepPreviousData, // ✅ v5-compliant
    });
      
      

    if (isLoading) {
        return (
         <LoadingRepo  />
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
            <div className="h-full flex flex-col gap-4 mt-[15%] sm:mt-[13%] lg:mt-0 -ml-[0%] items-start justify-center z-[500]">
            <h1 className="text-start text-xl font-medium">{repoFilter === 'stars'? 'Most Stars': 'Newest Update'} </h1>

                <div className="mt-6 flex flex-col gap-4">
                {data?.filter((repo): repo is Repo => !!repo && typeof repo.id !== 'undefined').map((repo) => (
            <Link
                href={`/resources/${repo.id}?type=repo`}
                key={repo.id}
            >
                <div className="bg-[#080808] text-gray-300/90  flex flex-col items-start gap-1 w-[300px] lg:w-[600px] border border-[#343434] p-1.5 rounded-xl">
                <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-2 mb-0.5">
                    <img
                        src={repo.owner.avatar_url}
                        alt={repo.name}
                        className="w-6 h-6 rounded-full"
                    />
                    <p className="text-sm font-light text-white">{repo.name}</p>
                    </div>
                </div>
                {repo.description}
                </div>
            </Link>
                ))}
                </div> 
               <div className="empty opacity-0 h-[70px]"></div>
            </div>
             <button
                onClick={()=>setFilterRepo(true)}
                className="block sm:hidden h-fit items-start cursor-pointer  -ml-10 mt-[23%] sm:mt-[20%] z-[500] rounded p-1.5 bg-[#0251EF]"><MdFilterAlt size={23} /></button>
            <AnimatePresence>
  {filterRepo && (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3 } }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        onClick={() => setFilterRepo(false)}
        className="fixed top-0 left-0 w-full h-full bg-black/70 z-[1000]"
      />

      {/* Modal */}
      <motion.div
        initial={{ y: '-50%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1, transition: { duration: 0.3, delay: 0.1 } }}
        exit={{ y: '-50%', opacity: 0, transition: { duration: 0.3 } }}
        className="fixed top-[15%] left-1/2 transform -translate-x-1/2 bg-[#0e0e0e] border border-[#343434] rounded-xl p-5 w-[90%] max-w-[350px] z-[1100]"
      >
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-medium">Sort Repos</p>
          <IoMdClose className="cursor-pointer" size={22} onClick={() => setFilterRepo(false)} />
        </div>

        <div className="flex flex-col gap-3 text-gray-300/90">
          <label className="flex gap-2 items-center">
            <input
              type="radio"
              name="filter"
              value="stars"
              checked={repoFilter === 'stars'}
              onChange={
                  (e) => {
                    setFilterRepo(false)
                      setRepoFilter(e.target.value as 'stars' | 'updated')
                  }}
            />
            Most Stars
          </label>
          <label className="flex gap-2 items-center">
            <input
              type="radio"
              name="filter"
              value="updated"
              checked={repoFilter === 'updated'}
              onChange={
                (e) => {
                    setFilterRepo(false)
                      setRepoFilter(e.target.value as 'stars' | 'updated')
                  }}
            />
            Newest Update
          </label>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>

            <div className="hidden sm:flex flex-col fixed pr-6 gap-10 mt-[5%] ml-[0%] right-0 z-[500]">
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

    function LoadingRepo() {
      return (<div className="flex h-full w-screen mt-[5%] justify-center">
            <div className="h-full flex flex-col gap-4 mt-[0%] -ml-[5%] items-start justify-center z-[500]">
            <h1 className="text-start text-xl font-medium">Most Stars </h1>

                <div className="mt-6 flex flex-col gap-4">
                {[...Array(8)].map((_, i) => <div key={i} className="animate-pulse bg-[#080808] border border-[#343434] h-16 w-[300px] lg:w-[600px] p-1.5 rounded-md" />)}
                </div> 
               <div className="empty opacity-0 h-[70px]"></div>
            </div>
      </div>
      );
    }
  