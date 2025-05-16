'use client'

import { motion } from "motion/react";

const SecondSection = () => {

    const wordContainerVariants = {
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.5,
          },
        },
      };
      
      const wordVariants = {
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
          }
      }
      
const whytext ='Built for Developers, Designed for Growth.'
    
    return ( 
        <div className="h-full">
            <div className="flex items-center justify-center gap-20 px-10">
                <div className="imgcontainer flex items-center justify-center p-2 bg-[#040402] w-[500px] h-[500px] border rounded-2xl border-white/40 ">
                <svg viewBox="0 0 1024 1024" className="w-30 h-30" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M877.685565 727.913127l-0.584863-0.365539a32.898541 32.898541 0 0 1-8.041866-46.423497 411.816631 411.816631 0 1 0-141.829267 145.777092c14.621574-8.992268 33.62962-5.117551 43.645398 8.772944l0.146216 0.073108a30.412874 30.412874 0 0 1-7.968758 43.206751l-6.141061 4.020933a475.201154 475.201154 0 1 1 163.615412-164.419599 29.974227 29.974227 0 0 1-42.841211 9.357807z m-537.342843-398.584106c7.164571-7.091463 24.71046-9.650239 33.26408 0 10.600641 11.185504 7.164571 29.462472 0 37.138798l-110.612207 107.468569L370.901811 576.14119c7.164571 7.091463 8.114974 27.342343 0 35.384209-9.796455 9.723347-29.828011 8.188081-36.480827 1.535265L208.309909 487.388236a18.423183 18.423183 0 0 1 0-25.953294l132.032813-132.032813z m343.314556 0l132.032813 132.032813a18.423183 18.423183 0 0 1 0 25.953294L689.652124 613.133772c-6.652816 6.579708-25.587754 10.746857-36.553935 0-10.30821-10.235102-7.091463-31.290168 0-38.381632l108.345863-100.669537-111.855041-108.638294c-7.164571-7.676326-9.504023-26.611265 0-36.04218 9.284699-9.138484 26.903696-7.091463 34.068267 0z m-135.54199-26.318833c3.582286-9.504023 21.347498-15.498868 32.679217-11.258612 10.819965 4.020933 17.180349 19.008046 14.256035 28.512069l-119.896906 329.716493c-3.509178 9.504023-20.616419 13.305632-30.193551 9.723347-10.161994-3.509178-21.201282-17.545889-17.545888-26.976804l120.627985-329.716493z" fill="#0251EF"></path></g></svg>
                </div>
                <div className="flex flex-col items-start justify-start w-2/4 gap-6">
                    <span className="aboutdev border border-white/30 font-light p-1.5 flex items-center rounded-xl">• About DevTrove</span>
                    <motion.div
                    className="relative text-5xl text-start font-medium w-full"
                    variants={wordContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    >
                    {whytext.split(" ").map((word, index) => (
                        <motion.span
                        key={index}
                        className="inline-block mr-2"
                        variants={wordVariants}
                        >
                        {word}
                        </motion.span>
                    ))}
                    </motion.div>
                                        <p className="mt-4 text-gray-400 max-w-xl">
                    DevTrove gives you the tools to manage, showcase, and scale your developer portfolio like never before. Whether you're a beginner or pro, our platform adapts to your journey.
                    </p>
                    <div className="mt-6 space-y-4 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                        <span className="text-blue-400">✔</span>
                        Showcase your projects with stunning layout options
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-blue-400">✔</span>
                        Track progress and receive smart insights
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-blue-400">✔</span>
                        Tailored for freelancers, job seekers, and indie hackers
                    </div>
                    </div>
                    <button className="explore mt-6 px-6 py-3 border border-white/40 bg-[#0251EF] cursor-pointer scale-100 hover:scale-105 text-white font-semibold rounded-xl transition-all duration-200">
  Explore Features
</button>

                </div>
            </div>
        </div>
     );
}
 
export default SecondSection;