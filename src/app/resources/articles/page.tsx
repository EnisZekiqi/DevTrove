'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchArticlesMultiPage } from "@/app/lib/api";
import { FullArticle } from "@/app/lib/api";
import { motion,AnimatePresence } from "motion/react";
import { MdFilterAlt } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const Articles = () => {

     const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
      useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        // Listen to window resize
        window.addEventListener('resize', handleResize);
    
        // Set initial width
        handleResize();
    
        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
      const isDesktop = windowWidth >= 1124; 

    
    const [filterResponsive,setFilterResponsive]=useState(false)
    
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
              <div className={`h-full flex ${isDesktop ? 'flex-row' : 'flex-col'}  gap-4 mt-[6%] -ml-[5%] items-start justify-center z-[500]`}>
            <h1 className="text-start text-xl font-medium">{filter === 'likes' ? 'Most Liked' : filter === 'newest'? 'Newest':'Oldest'} / {selectedTags.length > 0 ? selectedTags.join(', ') : 'All'}</h1>

            <div className="mt-6 flex flex-col gap-4">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-[#080808] border border-[#343434] h-16 w-[300px] lg:w-[600px] p-1.5 rounded-md" />
                  ))}
                </div> 
                <div className="empty opacity-0 h-[100px]"></div>

            </div>

            <div className="hidden sm:flex flex-col fixed pr-6 gap-10 mt-[5%] ml-[0%] right-0 z-[500]">
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
            className={`flex h-full w-screen mt-[20%] sm:mt-[15%] md:mt-[10%] lg:mt-[5%] ${isDesktop ? 'justify-center' : 'justify-start pl-6 sm:pl-10'} `}>
            <div className="h-full flex flex-col gap-4 mt-[0%] -ml-[0%] items-start justify-center z-[500]">
            <h1 className="text-start text-xl font-medium">{filter === 'likes' ? 'Most Liked' : filter === 'newest'? 'Newest':'Oldest'} / {selectedTags.length > 0 ? selectedTags.join(', ') : 'All'}</h1>

                <div className="mt-6 flex flex-col gap-4">
                {data?.map((article) => (
            <Link
                href={`/resources/${article.id}?type=article`}
                key={article.id}
            >
                <div className="bg-[#080808] flex flex-col items-start gap-1 w-[300px] md:w-[380px] lg:w-[600px] border border-[#343434] p-1.5 rounded-xl">
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
            <button
            onClick={()=>setFilterResponsive(true)}
                className="block sm:hidden h-fit items-start cursor-pointer   -ml-10 mt-[10%] sm:mt-[20%] z-[500] rounded p-1.5 bg-[#0251EF]"><MdFilterAlt size={23} /></button>
           
          <AnimatePresence>
          {filterResponsive && (
                <>
                        <motion.div
                            initial={{opacity:0}}
                            animate={{ opacity: 1, transition: { duration: 0.3 } }}
                            exit={{opacity:0,transition:{duration:0.3}}}
                    onClick={()=>setFilterResponsive(false)}
                    className="fixed top-0 bottom-0 left-0 right-0 z-[1100] bg-black/70 w-full h-full"></motion.div>
                 <motion.div
                  initial={{opacity:0}}
                  animate={{ opacity: 1, transition: { duration: 0.3,delay:0.1 } }}
                  exit={{opacity:0,transition:{duration:0.3}}}
                            className="sm:hidden w-full h-fit fixed left-1 top-24 z-[1200] mb-4 p-3 rounded-xl border border-[#343434] bg-[#121212]">
            <div className="flex items-start justify-between">
            <p className="text-sm font-medium mb-4">Sort by</p>
            <button onClick={()=>setFilterResponsive(false)}><IoMdClose/></button>
            </div>
                        <label className="flex gap-2 items-center mb-2">
            <input
                type="radio"
                name="mobile-filter"
                value="newest"
                checked={filter === 'newest'}
                onChange={(e) => {
                    setFilter(e.target.value as any);
                    setFilterResponsive(false);
                }}
            />
            Newest
        </label>
        <label className="flex gap-2 items-center mb-2">
            <input
                type="radio"
                name="mobile-filter"
                value="likes"
                checked={filter === 'likes'}
                onChange={(e) => {
                    setFilter(e.target.value as any);
                    setFilterResponsive(false);
                }}
            />
            Most Liked
        </label>
        <label className="flex gap-2 items-center mb-2">
            <input
                type="radio"
                name="mobile-filter"
                value="oldest"
                checked={filter === 'oldest'}
                onChange={(e) => {
                    setFilter(e.target.value as any);
                    setFilterResponsive(false);
                }}
            />
            Oldest
        </label>
        <p className="text-sm font-medium mt-4 mb-2">Filter by Tag</p>
        <select
            className="bg-[#121212] text-white border border-[#343434] rounded p-1 w-full"
            onChange={(e) => {
            setSelectedTags(e.target.value ? [e.target.value] : []) 
                setFilterResponsive(false)
            }}
            defaultValue=""
        >
            <option value="">All</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React</option>
            <option value="typescript">TypeScript</option>
            <option value="programming">Programming</option>
            <option value="webdev">Web Dev</option>
            <option value="gamedev">Game Dev</option>
            <option value="discuss">Discuss</option>
        </select>
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