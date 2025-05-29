'use client';
import { usePathname } from 'next/navigation';

import Link from 'next/link';
import { motion,AnimatePresence } from 'motion/react';
import { useState,useEffect } from 'react';
import { IoMdClose,IoMdMenu ,IoMdArrowBack ,IoMdSearch  } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { fetchArticlesMultiPage } from '../lib/api';
import { QueryClient } from '@tanstack/react-query';

export default function Navbar() {

  const pathname = usePathname();
  const isHome = pathname === '/';
  const isResources = pathname.startsWith('/resources');
  
  const segments = pathname.split('/');
  const pageTitle = segments[2] ? segments[2].toUpperCase() : 'Dashboard';
  
  const [navSetting,setNavSetting]=useState(false)

  const OpenNav = ()=>{
    setNavSetting(prev => !prev)
  }


  // search functions with fetching then showing the written prompt

  const { data, isLoading, error } = useQuery({
      queryKey: ['resources'],
      queryFn: async () => fetchArticlesMultiPage(),
      staleTime: 1000 * 60 * 5, // 5 minutes fresh
    });

  
  const [searchQuery, setSearchQuery] = useState('')
  
  type Article = { id: string; [key: string]: any };
  const [searchResult, setSearchResult] = useState<Article[]>([])
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
    setSearchResult([])
    return
    }
    const filtered = data
      ? data.filter((article) =>
          String(article.id).toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];
    setSearchResult(filtered as any)
    console.log(searchResult)
},[searchQuery])
  
  return (
    <motion.nav
      initial={{ opacity: 0}}
      animate={{ opacity: 1, transition: { delay: 0.1,duration:0.5}}}
      className="w-full px-4 py-3 flex justify-between items-center z-[1000] bg-black/50 backdrop-blur-md border-b border-white/10 text-white fixed top-0 ">
      <div className="hidden w-screen sm:flex justify-between">
      <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-semibold text-[var(--primarytext)] border-r pr-2 border-[#9999993f]">
          <svg viewBox="0 0 1024 1024" className="w-6.5 h-6.5" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M877.685565 727.913127l-0.584863-0.365539a32.898541 32.898541 0 0 1-8.041866-46.423497 411.816631 411.816631 0 1 0-141.829267 145.777092c14.621574-8.992268 33.62962-5.117551 43.645398 8.772944l0.146216 0.073108a30.412874 30.412874 0 0 1-7.968758 43.206751l-6.141061 4.020933a475.201154 475.201154 0 1 1 163.615412-164.419599 29.974227 29.974227 0 0 1-42.841211 9.357807z m-537.342843-398.584106c7.164571-7.091463 24.71046-9.650239 33.26408 0 10.600641 11.185504 7.164571 29.462472 0 37.138798l-110.612207 107.468569L370.901811 576.14119c7.164571 7.091463 8.114974 27.342343 0 35.384209-9.796455 9.723347-29.828011 8.188081-36.480827 1.535265L208.309909 487.388236a18.423183 18.423183 0 0 1 0-25.953294l132.032813-132.032813z m343.314556 0l132.032813 132.032813a18.423183 18.423183 0 0 1 0 25.953294L689.652124 613.133772c-6.652816 6.579708-25.587754 10.746857-36.553935 0-10.30821-10.235102-7.091463-31.290168 0-38.381632l108.345863-100.669537-111.855041-108.638294c-7.164571-7.676326-9.504023-26.611265 0-36.04218 9.284699-9.138484 26.903696-7.091463 34.068267 0z m-135.54199-26.318833c3.582286-9.504023 21.347498-15.498868 32.679217-11.258612 10.819965 4.020933 17.180349 19.008046 14.256035 28.512069l-119.896906 329.716493c-3.509178 9.504023-20.616419 13.305632-30.193551 9.723347-10.161994-3.509178-21.201282-17.545889-17.545888-26.976804l120.627985-329.716493z" fill="#0251EF"></path></g></svg>
          </Link>
          {isResources && <p className="font-medium">{pageTitle}</p>}
          {isHome && (
            <div className="flex space-x-4 text-sm">
            <a  href="#browse" className="hover:text-[var(--secondarytext)] transition">
              Browse
            </a>
            <a href='#explore' className="hover:text-[var(--secondarytext)] transition">
              Explore
            </a>
            <a href='#about' className="hover:text-[var(--secondarytext)] transition">
              About
            </a>
          </div>
          )}
          </div>
        <div className="flex items-center gap-4">
          {!isHome && <> 
          <input type="text" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} className='focus:outline-0 rounded-md p-0.5 bg-transparent border border-[#343434]' /></>}
        <Link href={isResources ? '/resources':(isHome ? '/':'')}> <button className={`rounded-md ${isHome ? 'p-2.5 text-md font-semibold':'p-1 text-sm font-medium'}  border cursor-pointer hover:bg-[#0251EF] border-[#0251EF] transition duration-300`}>{isHome ? <p>Let's Start</p>: <IoMdArrowBack size={22}/>}</button></Link>
          {searchResult.length < 0 ? <p>search something</p> : 
            searchResult.map((data) => (
              <div key={data.id}>
                {data.title}
                {data.url}
              </div>
            ))
            }
          </div>
      </div>


      <AnimatePresence mode='wait'>
      <motion.nav
      initial={{height:'50px'}}
      animate={{height:navSetting  ? '240px':'50px'}}
      exit={{height:'50px'}}
       className='flex flex-col items-center w-full sm:hidden'>
      <div  className="flex justify-between items-center z-[1000] py-1.5 px-3 w-full">
      <Link href="/" className="text-xl font-semibold text-[var(--primarytext)] border-r pr-2 border-[#9999993f]">
          <svg viewBox="0 0 1024 1024" className="w-6.5 h-6.5" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M877.685565 727.913127l-0.584863-0.365539a32.898541 32.898541 0 0 1-8.041866-46.423497 411.816631 411.816631 0 1 0-141.829267 145.777092c14.621574-8.992268 33.62962-5.117551 43.645398 8.772944l0.146216 0.073108a30.412874 30.412874 0 0 1-7.968758 43.206751l-6.141061 4.020933a475.201154 475.201154 0 1 1 163.615412-164.419599 29.974227 29.974227 0 0 1-42.841211 9.357807z m-537.342843-398.584106c7.164571-7.091463 24.71046-9.650239 33.26408 0 10.600641 11.185504 7.164571 29.462472 0 37.138798l-110.612207 107.468569L370.901811 576.14119c7.164571 7.091463 8.114974 27.342343 0 35.384209-9.796455 9.723347-29.828011 8.188081-36.480827 1.535265L208.309909 487.388236a18.423183 18.423183 0 0 1 0-25.953294l132.032813-132.032813z m343.314556 0l132.032813 132.032813a18.423183 18.423183 0 0 1 0 25.953294L689.652124 613.133772c-6.652816 6.579708-25.587754 10.746857-36.553935 0-10.30821-10.235102-7.091463-31.290168 0-38.381632l108.345863-100.669537-111.855041-108.638294c-7.164571-7.676326-9.504023-26.611265 0-36.04218 9.284699-9.138484 26.903696-7.091463 34.068267 0z m-135.54199-26.318833c3.582286-9.504023 21.347498-15.498868 32.679217-11.258612 10.819965 4.020933 17.180349 19.008046 14.256035 28.512069l-119.896906 329.716493c-3.509178 9.504023-20.616419 13.305632-30.193551 9.723347-10.161994-3.509178-21.201282-17.545889-17.545888-26.976804l120.627985-329.716493z" fill="#0251EF"></path></g></svg>
          </Link>
        
       <span className='cursor-pointer' onClick={OpenNav}>{navSetting ? <IoMdClose size={20} /> : <IoMdMenu size={20}/>}</span>
        </div>
        {navSetting && 
          <>
          <motion.div
          initial={{opacity:0}}
          animate={{opacity:navSetting ? 1 : 0}}
              exit={{ opacity: 0 }}
              transition={{duration:0.5,delay:0.3}}
              className="flex flex-col items-start w-full gap-2 mt-8 text-sm px-3">
        <a  href="#browse" className="hover:text-[var(--secondarytext)] transition">
          Browse
        </a>
        <a href='#explore' className="hover:text-[var(--secondarytext)] transition mt-4">
          Explore
        </a>
        <a href='#about' className="hover:text-[var(--secondarytext)] transition mt-4">
          About
            </a>
            <button className='rounded-md p-2.5 text-md font-semibold border mt-4 cursor-pointer hover:bg-[#0251EF] border-[#0251EF] transition duration-300 w-full'>{isHome ? 'Lets Start':'Go Back'}</button>

      </motion.div>

        </>
        }
    </motion.nav>
     </AnimatePresence>
    </motion.nav>
  );
}
