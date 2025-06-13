'use client'

import { motion } from "motion/react";
import Link from "next/link";
const ResourceFeed = () => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.2,
          },
        },
    };
    
    const fadeInUp = {
        hidden: {
          opacity: 0,
          y: 10,
          filter: "blur(4px)",
        },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: 0.5,
            ease: "easeOut",
          },
        },
      };

   
    
    return ( 
        <div
           id="browse"
            className="relative  py-30 overflow-visible">
        {/* Left triangle */}
        <div
          className="trianglel absolute mask-b-from-10% bottom-0 left-0 w-[300px] sm:w-[400px] h-[160px] sm:h-[250px] blur-xl shadow-[0_0_40px_#0251EF80] z-0"
          style={{
            clipPath: 'polygon(0 100%, 0 0, 80% 100%)'
          }}
        />

        {/* Right triangle */}
        <div
          className="trianglel absolute mask-b-from-10% bottom-0 right-0 w-[300px] sm:w-[400px] h-[160px] sm:h-[250px] blur-xl shadow-[0_0_40px_#0251EF80] z-0"
          style={{
            clipPath: 'polygon(100% 100%, 100% 0, 20% 100%)'
          }}
        />

        {/* Content */}
            <div className="flex flex-col items-center gap-6">
            <motion.div
         variants={containerVariants}
         initial="hidden"
         whileInView="visible"
         viewport={{once:true}}
                className="relative z-10 text-center flex flex-col items-center gap-6 px-4">
          <span className="aboutdev border text-[#ededed] w-fit border-white/30 font-light p-1.5 flex items-center rounded-xl"
          >
            • Browse Resources
          </span>
                <motion.h1
                        variants={fadeInUp}

                    className="text-[#ededed] text-[32px] md:text-[50px] font-medium leading-tight ">
            Discover <span className="text">Developer Tools & Resources</span>
          </motion.h1>
                <motion.p
              variants={fadeInUp}

                    className="text-gray-400 mt-4 max-w-xl mx-auto">
DevTrove is your go-to hub for curated tools, libraries, and inspiration to supercharge your development workflow — whether you're building, debugging, or deploying.
</motion.p>
          <Link href="/resources">
          <motion.button
    variants={fadeInUp}
    className="explore mt-6 px-4 sm:px-6  py-2 sm:py-3 border border-white/40 bg-[#0251EF] cursor-pointer scale-100 hover:scale-105 text-white font-semibold rounded-xl transition-all duration-200"
  >
    Explore Features
                </motion.button>
          </Link>
                
                </motion.div>
           </div>
      </div>
      
     );
}
 
export default ResourceFeed;