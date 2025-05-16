'use client'

import { useState, useEffect, useRef } from "react";
import { motion, useTransform, useScroll } from "motion/react";
import Link from "next/link";

const HeroSection = () => {
    const [showMainContent, setShowMainContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMainContent(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]); // parallax effect


    useEffect(() => {
        if (!showMainContent) {
                 document.body.style.overflow = 'hidden';
               } else {
                 document.body.style.overflow = 'auto';
              }
     },[showMainContent])

    

    return (
        <motion.div ref={ref} style={{ y }} className="relative w-full flex flex-col items-center justify-center h-screen overflow-hidden">
            {/* Intro Animation Layer */}
            {!showMainContent && (
                <motion.div
                    className="absolute inset-0 bg-black flex items-center justify-center z-50"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                >
                    <motion.svg
                        viewBox="0 0 1024 1024"
                        className="w-24 h-24 drop-shadow-[0_0_20px_rgba(2,81,239,0.7)]"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2.5, ease: 'easeInOut' }}
                    >
                        <motion.path
                            d="M877.685565 727.913127l-0.584863-0.365539a32.898541 32.898541 0 0 1-8.041866-46.423497 411.816631 411.816631 0 1 0-141.829267 145.777092c14.621574-8.992268 33.62962-5.117551 43.645398 8.772944l0.146216 0.073108a30.412874 30.412874 0 0 1-7.968758 43.206751l-6.141061 4.020933a475.201154 475.201154 0 1 1 163.615412-164.419599 29.974227 29.974227 0 0 1-42.841211 9.357807z m-537.342843-398.584106c7.164571-7.091463 24.71046-9.650239 33.26408 0 10.600641 11.185504 7.164571 29.462472 0 37.138798l-110.612207 107.468569L370.901811 576.14119c7.164571 7.091463 8.114974 27.342343 0 35.384209-9.796455 9.723347-29.828011 8.188081-36.480827 1.535265L208.309909 487.388236a18.423183 18.423183 0 0 1 0-25.953294l132.032813-132.032813z m343.314556 0l132.032813 132.032813a18.423183 18.423183 0 0 1 0 25.953294L689.652124 613.133772c-6.652816 6.579708-25.587754 10.746857-36.553935 0-10.30821-10.235102-7.091463-31.290168 0-38.381632l108.345863-100.669537-111.855041-108.638294c-7.164571-7.676326-9.504023-26.611265 0-36.04218 9.284699-9.138484 26.903696-7.091463 34.068267 0z m-135.54199-26.318833c3.582286-9.504023 21.347498-15.498868 32.679217-11.258612 10.819965 4.020933 17.180349 19.008046 14.256035 28.512069l-119.896906 329.716493c-3.509178 9.504023-20.616419 13.305632-30.193551 9.723347-10.161994-3.509178-21.201282-17.545889-17.545888-26.976804l120.627985-329.716493z"
                            stroke="#0251EF"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2.5, ease: 'easeInOut' }}
                        />
                    </motion.svg>
                </motion.div>
            )}

            {/* Slide out SVG once it's done */}
            {!showMainContent && (
                <motion.div
                    className="absolute inset-0 z-40"
                    initial={{ x: 0 }}
                    animate={{ x: '100%' }}
                    transition={{ delay: 2.6, duration: 0.8, ease: 'easeInOut' }}
                />
            )}

            {/* Hero Section Content */}
            {showMainContent && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{opacity:1,transition:{duration:0.7}}}
                        className="background relative min-h-screen flex flex-col items-center justify-center pl-10 "
                >
                    <div className="rounded-lg flex items-center gap-2 z-100 mb-5 bg-[#9999991f] p-1.5  border border-[#99999927]">
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
                        <button className="text-md font-semibold bg-white hover:bg-white/60 transition cursor-pointer rounded-md text-[#434343] py-2 px-3">Check the Tools</button>
                        <Link href='/about'>
                            <button className="learnmore text-md font-semibold  text-white rounded-md p-2">Learn More</button>
                        </Link>
                    </div>
                </motion.div>
                </>
            )}
        </motion.div>
    );
}

export default HeroSection;
