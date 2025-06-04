'use client'
import { useState } from "react";
import { motion } from "motion/react";
import tools from '@/app/data/tools.json'
import Link from "next/link";

const Tools = () => {

    const [filter, setFilter] = useState<'All'|'Free' | 'likes' | 'oldest'>('All')
     const [support,setSupport]=useState<'All'|'GitHub' | 'OpenAPI' | 'Node.js'|'Docker'>('All')



     const filteredTools = tools.filter((tool) => {
        // Pricing filter
        const matchesPricing =
          filter === 'All' || tool.pricing.toLowerCase().includes('free');
      
        // Support filter
        const matchesSupport =
          support === 'All' ||
          (Array.isArray(tool.integrationSupport)
            ? tool.integrationSupport.includes(support)
            : tool.integrationSupport === support);
      
        return matchesPricing && matchesSupport;
      });
      
    const supportTools = tools.filter((tool) => 
        support === 'All' ? true : Array.isArray(tool.integrationSupport) ? tool.integrationSupport.includes(support) : tool.integrationSupport === support
    );
    
    return ( 
        <motion.div
            initial={{ opacity: 0 }}
            animate={{opacity:1,transition:{duration:0.7,delay:0.2}}}
            className="h-full w-screen flex items-center justify-center mt-[5%]">
        <div className="h-full flex flex-col mt-[20%] sm:mt-0 gap-4 -ml-[0%] items-start justify-center">
        <h1 className="text-start text-xl font-medium mb-6">Tools </h1>

                {filter !== 'All' ?
filteredTools.map((tool) => (
  <Link href={`/resources/${tool.id}?type=tools`} key={tool.id} className="bg-[#080808]  flex flex-col items-start gap-1 w-[300px] lg:w-[600px] border border-[#343434] p-1.5 rounded-xl">
    <div className="flex items-center gap-1 mb-0.5">
      <img src={tool.icon} alt={tool.name} className="w-6 h-6 rounded-full" />
      <p className="text-sm font-light text-white">{tool.name}</p>
    </div>
    <p className="text-gray-300/90 text-md">{tool.description}</p>
  </Link>
))
                    : supportTools.length > 0 ? 
                        supportTools.map((tool) => (
<Link href={`/resources/${tool.id}?type=tools`} key={tool.id} className="bg-[#080808] flex flex-col items-start gap-1 w-[300px] lg:w-[600px] border border-[#343434] p-1.5 rounded-xl">
    <div className="flex items-center gap-1 mb-0.5">
      <img src={tool.icon} alt={tool.name} className="w-6 h-6 rounded-full" />
      <p className="text-sm font-light text-white">{tool.name}</p>
    </div>
    <p className="text-gray-300/90 text-md">{tool.description}</p>
  </Link>
                        ))
                        :
                        tools.map((tool) => (
                            <Link href={`/resources/${tool.id}?type=tools`} key={tool.id} className="bg-[#080808] flex flex-col items-start gap-1 w-[600px] border border-[#343434] p-1.5 rounded-xl">
                                <div className="flex items-center gap-1 mb-0.5">
                                    <img src={tool.icon} alt="" className="w-6 h-6 rounded-full" />
                                    <p className="text-sm font-light text-white">{tool.name}</p>
                                </div>
                                <p className="text-gray-300/90 text-md">  {tool.description} </p>
                            </Link>
                        ))
}
                
                
                <div className="empty h-[70px] opacity-0"></div>
            </div>
            <div className="flex flex-col fixed pr-6 gap-10 mt-[10%] ml-[0%] right-0 top-0 z-[500]">
        <div className=" bg-transparent gap-2 border border-[#343434] flex items-center justify-between rounded-xl p-2 w-[200px] h-auto">
        <p>Payment :</p>
            <select value={filter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value as any)} className="bg-[#1a1a1a] text-white focus:outline-0 p-1 rounded">
    <option value="All">All</option>
    <option value="Free">Free</option>
  </select>
          </div>
          <div className=" bg-transparent gap-2 border border-[#343434] flex items-center justify-between rounded-xl p-2 w-[200px] h-auto">
            <p>Tags :</p>
  <select value={support} onChange={(e) => setSupport(e.target.value as any)} className="bg-[#1a1a1a] text-white p-1 rounded focus:outline-0">
    <option value="All">All</option>
    <option value="GitHub">GitHub</option>
    <option value="OpenAPI">OpenAPI</option>
    <option value="Node.js">Node.js</option>
    <option value="Docker">Docker</option>
            </select>
            </div>
</div>

        </motion.div>
     );
}
 
export default Tools;