'use client'

import { useState } from "react";
import { motion } from "motion/react";

const HeroSection = () => {
    return ( 
        <motion.div
            initial={{ opacity: 0 }}
            animate={{opacity:1,transition:{delay:0.2,duration:0.6}}}
            className="background relative min-h-screen  flex flex-col items-start justify-center pl-10 ">
            <div className="rounded-lg flex items-center gap-2 z-100 mb-5 bg-[#9999991f] p-1.5">
                <span className="rounded bg-[#0251EF] text-white p-1 text-sm">NEW</span>
                <p className="text-sm font-light">No. 1 Studio of 2025</p>
                </div>
            <h1 className="text-6xl md:text-7xl font-bold text-[var(--primarytext)] z-100">
  Discover Dev Tools
</h1>
<p className="text-[var(--secondarytext)] mt-2 max-w-md z-100">
  Explore APIs, libraries, templates, and more.
            </p>
            <div className="flex items-center gap-4 mt-8 z-[100]">
                <button className="text-md font-semibold bg-white rounded-md text-[#434343] py-2 px-3">Check the Tools</button>
                <button className="learnmore text-md font-semibold  text-white rounded-md p-2">Learn More</button>
          </div>
        </motion.div>
     );
}
 
export default HeroSection;