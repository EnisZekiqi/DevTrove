'use client'

import { motion } from "motion/react";
import Link from "next/link";
const SecondSection = () => {

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
      
      
    const whytext = 'Built for Developers, Designed for Growth.'

    const goods = [
        {text:'Showcase your projects with stunning layout options'},{text:'Track progress and recive smart insights'},{text:'Tailored for freelancers , job seekers and indie hackers'}
    ]
    
    return ( 
        <div id="about" className="h-full">
            <div className="flex items-center sm:items-end flex-col-reverse md:flex-row justify-center gap-20 px-5 sm:px-10">
                <div className="custom-shadow shadow-[1px 10px 24px 4px rgba(2,81,239,0.65)] flex items-end justify-center px-2 pt-2 bg-[#040402] w-[320px] sm:w-[500px] h-[320px] sm:h-[525px] border rounded-2xl border-white/40 ">
                <img className="mt-4 object-contain" src="https://www.framer.com/creators-assets/_next/image/?url=%2Fcreators%2Flayout%2Fpivot.webp&w=640&q=90" alt="" />
          </div>
                <motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="flex flex-col items-start justify-start w-full md:w-2/4 gap-5"
>
  <motion.span
    variants={fadeInUp}
    className="aboutdev text-[#ededed] border border-white/30 font-light  p-1.5 flex items-center rounded-xl"
  >
    • About DevTrove
  </motion.span>

  <motion.div
    variants={fadeInUp}
    className="relative text-[32px] text-[#ededed] md:text-[50px] font-medium leading-tight  text-start w-full"
  >
    {whytext.split(" ").map((word, index) => (
      <motion.span
        key={index}
        className="inline-block mr-2"
        variants={fadeInUp}
      >
        {word}
      </motion.span>
    ))}
  </motion.div>

  <motion.p
    variants={fadeInUp}
    className="mt-4 text-gray-400 max-w-xl"
  >
    DevTrove gives you the tools to manage, showcase, and scale your developer portfolio like never before. Whether you're a beginner or pro, our platform adapts to your journey.
  </motion.p>

  <motion.div
    variants={fadeInUp}
    className="mt-6 space-y-4 text-sm text-gray-300"
  >
    {goods.map((example) => (
      <motion.div
        key={example.text}
        variants={fadeInUp}
        className="flex items-center gap-2"
      >
        <span className="text-blue-400">✔</span>
        {example.text}
      </motion.div>
    ))}
  </motion.div>

            <Link href="/resources">
            <motion.button
    variants={fadeInUp}
    className="explore mt-6 px-4 sm:px-6 py-2 sm:py-3 border border-white/40 bg-[#0251EF] cursor-pointer scale-100 hover:scale-105 text-white font-semibold rounded-xl transition-all duration-200"
  >
    Explore Features
  </motion.button>
            </Link>
</motion.div>

            </div>
        </div>
     );
}
 
export default SecondSection;