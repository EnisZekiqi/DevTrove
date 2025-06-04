'use client';
import { usePathname } from 'next/navigation';

import Link from 'next/link';
import { motion,AnimatePresence } from 'motion/react';
import { useState,useMemo,useEffect } from 'react';
import { IoMdClose,IoMdMenu ,IoMdArrowBack ,IoMdSearch  } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { fetchArticlesMultiPage,fetchRepositories } from '../lib/api';
import { QueryClient } from '@tanstack/react-query';
import tools from '@/app/data/tools.json'
import { SideBar } from '../resources/page';



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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<typeof tools>([])
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['showresources'],
    queryFn: async () => fetchRepositories(),
    staleTime: 1000 * 60 * 5,
  });

  const filteredArticles = useMemo(() => {  /// memorise the data for the repositories
    if (!data || searchQuery.trim() === '') return [];
    return data.filter((article) =>
      article.name.includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const [chooseWhich,setChooseWhich]=useState('repo')

  useEffect(() => {
    const find = tools.filter((tool) => tool.name.includes(searchQuery.toLocaleLowerCase()))
    setSearchResult(find)
  }, [searchQuery])
  

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
  
    const isDesktop = windowWidth >= 1024; 
  
const [drawer,setDrawer]=useState(false)

  
  return (
    <motion.nav
      initial={{ opacity: 0}}
      animate={{ opacity: 1, transition: { delay: 0.1,duration:0.5}}}
      className="w-full px-4 py-3 flex justify-between items-center z-[1000] bg-black/50 backdrop-blur-md border-b border-white/10 text-white fixed top-0 ">
      <div className="hidden w-screen sm:flex justify-between">
        <div className="flex items-center gap-4">
          {!isDesktop && !isHome &&
            <>
            <button onClick={()=>setDrawer(prev => !prev)} className='p-0.5 rounded cursor-pointer border border-[#9999993f]'><IoMdMenu size={22}/></button>
          </>}
          <Link href="/" className={`text-xl font-semibold text-[var(--primarytext)] z-[10] ${drawer ? '-ml-4':'-ml-0'} border-r pr-2 border-[#9999993f]`}>
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
            {!isHome && (
            <div className="relative flex items-center">
              <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="focus:outline-0 rounded-md p-0.5 bg-transparent border border-[#343434] pr-7"
              />
              <span className="absolute right-2 text-gray-400 pointer-events-none">
              <IoMdSearch size={18} />
              </span>
            </div>
            )}
        <Link href={isResources ? '/resources':(isHome ? '/':'')}> <button className={`rounded-md ${isHome ? 'p-2.5 text-md font-semibold':'p-1 text-sm font-medium'}  border cursor-pointer hover:bg-[#0251EF] border-[#0251EF] transition duration-300`}>{isHome ? <p>Let's Start</p>: <IoMdArrowBack size={22}/>}</button></Link>
          {searchQuery.trim() !== '' && 
          <AnimatePresence mode="wait">
          <motion.ul
            initial={{ opacity: 0, y: -100 }}
            animate={{opacity:1,y:0,transition:{duration:0.3}}}
            exit={{opacity:0,y:-100,transition:{duration:0.3}}}
                className='fixed top-15 bg-[#080808] border border-[#343434] w-[300px] right-0 p-2 space-y-2 z-[500]'>
                <div className="flex relative items-center px-2 justify-around mt-2">
                  <button className='cursor-pointer text-start -ml-2' onClick={()=>setChooseWhich('repo')}>Repositories</button>
                  <button className='cursor-pointer' onClick={()=>setChooseWhich('tool')}>Tools</button>
                </div>
                <motion.span
                  layout
                  transition={{type:'spring',stiffness:250,damping:20}}
                  className="absolute h-0.5 bg-[#0251EF] rounded-full mb-6" style={{ width: '50%', left: chooseWhich === 'repo' ? '0%' : '50%' }}></motion.span>
                <div className='mt-8'>
                  {chooseWhich === 'repo' ? 
                  
                  filteredArticles.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center mt-4">No repositories found.</p>
                  ) : (
                    filteredArticles.map((article) => (
                      <Link href={article.html_url} target="_blank"
                      key={article.id}
                      >
                        <motion.li
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.3 } }}
                        className="mt-2 text-gray-300/80"
                      >
                        {article.name}
                      </motion.li>
                      </Link>
                    ))
                  )
                  

: 
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.3 } }}
                      className="mt-8 w-full">
                     {searchResult.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center mt-4">No tools found.</p>
                ) : (
                searchResult.slice(0, 8).map((tool) => (
                 <Link href={tool.url} key={tool.id}>
                <div className="mt-2 text-gray-300/80" >
                      {tool.name}
                    </div>
                    </Link>
                  ))
                )}

                   </motion.div> 
              }
         </div>
        </motion.ul>
          </AnimatePresence>

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
      <Link href="/" className="text-xl font-semibold text-[var(--primarytext)] border-r z-[500] pr-2 border-[#9999993f]">
          <svg viewBox="0 0 1024 1024" className="w-6.5 h-6.5" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M877.685565 727.913127l-0.584863-0.365539a32.898541 32.898541 0 0 1-8.041866-46.423497 411.816631 411.816631 0 1 0-141.829267 145.777092c14.621574-8.992268 33.62962-5.117551 43.645398 8.772944l0.146216 0.073108a30.412874 30.412874 0 0 1-7.968758 43.206751l-6.141061 4.020933a475.201154 475.201154 0 1 1 163.615412-164.419599 29.974227 29.974227 0 0 1-42.841211 9.357807z m-537.342843-398.584106c7.164571-7.091463 24.71046-9.650239 33.26408 0 10.600641 11.185504 7.164571 29.462472 0 37.138798l-110.612207 107.468569L370.901811 576.14119c7.164571 7.091463 8.114974 27.342343 0 35.384209-9.796455 9.723347-29.828011 8.188081-36.480827 1.535265L208.309909 487.388236a18.423183 18.423183 0 0 1 0-25.953294l132.032813-132.032813z m343.314556 0l132.032813 132.032813a18.423183 18.423183 0 0 1 0 25.953294L689.652124 613.133772c-6.652816 6.579708-25.587754 10.746857-36.553935 0-10.30821-10.235102-7.091463-31.290168 0-38.381632l108.345863-100.669537-111.855041-108.638294c-7.164571-7.676326-9.504023-26.611265 0-36.04218 9.284699-9.138484 26.903696-7.091463 34.068267 0z m-135.54199-26.318833c3.582286-9.504023 21.347498-15.498868 32.679217-11.258612 10.819965 4.020933 17.180349 19.008046 14.256035 28.512069l-119.896906 329.716493c-3.509178 9.504023-20.616419 13.305632-30.193551 9.723347-10.161994-3.509178-21.201282-17.545889-17.545888-26.976804l120.627985-329.716493z" fill="#0251EF"></path></g></svg>
            </Link>
            {!isDesktop && !isHome &&
            <>
            <button onClick={()=>setDrawer(prev => !prev)} className='p-0.5 rounded cursor-pointer border border-[#9999993f]'><IoMdMenu size={22}/></button>
          </>}
        {isHome && <span className='cursor-pointer' onClick={OpenNav}>{navSetting ? <IoMdClose size={20} /> : <IoMdMenu size={20}/>}</span>      }
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
      <AnimatePresence>
      {drawer && 
        <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{opacity:0}}  
          onClick={()=>setDrawer(false)}
          className="fixed bg-black/60 top-0 right-0 left-0 bottom-0 z-[400] w-full h-screen" />
         <motion.div
          initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.1 } }}
            exit={{opacity:0,x:-10,transition:{duration:0.3}}}
          className="fixed  top-[5%] flex flex-col items-start p-3 gap-4 left-0 bg-[#080808] w-[300px] border-r border-[#343434] h-screen z-[1100]">
          <div className="flex items-center justify-between w-full">
          <svg viewBox="0 0 1024 1024" className="w-6.5 h-6.5 opacity-100" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M877.685565 727.913127l-0.584863-0.365539a32.898541 32.898541 0 0 1-8.041866-46.423497 411.816631 411.816631 0 1 0-141.829267 145.777092c14.621574-8.992268 33.62962-5.117551 43.645398 8.772944l0.146216 0.073108a30.412874 30.412874 0 0 1-7.968758 43.206751l-6.141061 4.020933a475.201154 475.201154 0 1 1 163.615412-164.419599 29.974227 29.974227 0 0 1-42.841211 9.357807z m-537.342843-398.584106c7.164571-7.091463 24.71046-9.650239 33.26408 0 10.600641 11.185504 7.164571 29.462472 0 37.138798l-110.612207 107.468569L370.901811 576.14119c7.164571 7.091463 8.114974 27.342343 0 35.384209-9.796455 9.723347-29.828011 8.188081-36.480827 1.535265L208.309909 487.388236a18.423183 18.423183 0 0 1 0-25.953294l132.032813-132.032813z m343.314556 0l132.032813 132.032813a18.423183 18.423183 0 0 1 0 25.953294L689.652124 613.133772c-6.652816 6.579708-25.587754 10.746857-36.553935 0-10.30821-10.235102-7.091463-31.290168 0-38.381632l108.345863-100.669537-111.855041-108.638294c-7.164571-7.676326-9.504023-26.611265 0-36.04218 9.284699-9.138484 26.903696-7.091463 34.068267 0z m-135.54199-26.318833c3.582286-9.504023 21.347498-15.498868 32.679217-11.258612 10.819965 4.020933 17.180349 19.008046 14.256035 28.512069l-119.896906 329.716493c-3.509178 9.504023-20.616419 13.305632-30.193551 9.723347-10.161994-3.509178-21.201282-17.545889-17.545888-26.976804l120.627985-329.716493z" fill="#0251EF"></path></g></svg>
            <button onClick={()=>setDrawer(false)}><IoMdClose/></button>
          </div>
      <SideBar drawer={drawer} setDrawer={setDrawer} />
      </motion.div>
      
      </>
}
    </AnimatePresence>
    </motion.nav>
  );
}
