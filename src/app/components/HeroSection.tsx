'use client';

import { useState, useEffect,useRef } from "react";
import Link from "next/link";
import { useAnimation, motion } from "framer-motion";
import { FaGithub,FaDev  } from "react-icons/fa";
import { SiFramer } from "react-icons/si";
import { VscJson } from "react-icons/vsc";



const HeroSection = () => {

  const controls = useAnimation();
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);


  useEffect(() => {
    if (marqueeRef.current) {
      setWidth(marqueeRef.current.scrollWidth);
    }
  }, []);


  const powered = [
    {name:'Dev.to',icon:<FaDev/>},
    {name:'Github',icon:<FaGithub/>},
    {name:'Framer',icon:<SiFramer/>},
    {name:'Tools',icon:<VscJson/>}
  ]
  
  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col md:flex-row items-center  justify-center md:justify-start  bg-black">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://framerusercontent.com/assets/lr4LSmXa1klevAvb0jf1i2zsDE.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="relative z-10 text-start flex flex-col items-start justify-center md:justify-start text-white pl-5 md:pl-10 mt-20 md:mt-0 max-w-4xl">
      <div className="rounded-lg flex items-center gap-2 z-100 mb-6 bg-[#9999991f] p-1.5 w-fit border border-[#99999927]">
                        <span className="rounded bg-[#0251EF] text-white p-1 text-sm">NEW</span>
                        <p className="text-sm font-light">No. 1 Resources of 2025</p>
                    </div>
                    <h1 className="text-balance text-[44px] sm:text-5xl md:text-[68px] font-medium text-[var(--primarytext)] z-100 leading-[43px] md:leading-none">
                      Discover Dev Tools for developers
                    </h1>
                    <p className="text-balance text-[var(--secondarytext)] mt-6 max-w-md z-100">
                      We specialize in developer tools . Explore APIs, libraries, templates, and more.
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-8 z-[100]">
          <Link href='/resources'>
          <button className="text-sm md:text-md font-semibold bg-white hover:bg-white/60 transition cursor-pointer rounded-md text-[#434343] py-2 px-3">Check the Tools</button>

          </Link>
          <a href='#about'>
                            <button className="learnmore text-sm md:text-md font-semibold cursor-pointer text-white rounded-md p-2">What is DevTrove ?</button>
                  </a>
                  </div>
      </div>
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />

      {/* Bottom Fade Mask */}
      <div className="flex flex-col">
      <div className="mt-[15%] relative  bottom-0 w-[200px] h-[200px] flex justify-end items-end  z-10" >
        <div className=" z-[100] hidden md:block">
          <img src="https://framerusercontent.com/images/QMirkdl4WPEe5bmSFhvVcssWj4.svg" alt="" />
        </div>
        <div className="bg-img absolute hidden md:block">
          <img width="250px" height="250px" src="https://framerusercontent.com/images/bnku6hnBSYZilgRI7DsDA3HpUw.jpg?scale-down-to=1024" alt="" />
        </div>
        </div>
        <div className="relative overflow-hidden -mt-[150px] mask-x-from-70% mask-x-to-100% w-full h-[60px] sm:h-[80px] md:mt-10">
  <motion.div
    initial={{ x: 0 }}
    animate={{
      x: [-width / 2, 0], // Move entire block from left to right
    }}
    transition={{
      duration: 20, // Slow and smooth
      repeat: Infinity,
      ease: "linear",
    }}
    className="flex absolute top-0 left-0 gap-10 whitespace-nowrap items-center text-xl text-white"
    ref={marqueeRef}
  >
    {[...powered, ...powered].map((txt, index) => (
      <div key={index} className="flex flex-row-reverse items-center gap-2 text-xl">
        <p>{txt.name}</p>
        {txt.icon}
      </div>
    ))}
  </motion.div>
</div>

     </div>
    
    </section>
  );
};

export default HeroSection;
