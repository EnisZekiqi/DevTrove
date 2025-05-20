'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

const HeroSection = () => {

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
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
      <div className="relative z-10 text-center flex flex-col items-center justify-center text-white px-4 max-w-4xl">
      <div className="rounded-lg flex items-center gap-2 z-100 mb-5 bg-[#9999991f] p-1.5 w-fit border border-[#99999927]">
                        <span className="rounded bg-[#0251EF] text-white p-1 text-sm">NEW</span>
                        <p className="text-sm font-light">No. 1 Studio of 2025</p>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-[var(--primarytext)] z-100">
                        Discover Dev Tools
                    </h1>
                    <p className="text-[var(--secondarytext)] mt-2 max-w-md z-100">
                        Explore APIs, libraries, templates, and more.
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-8 z-[100]">
                        <button className="text-md font-semibold bg-white hover:bg-white/60 transition cursor-pointer rounded-md text-[#434343] py-2 px-3">Check the Tools</button>
                        <Link href='/resources'>
                            <button className="learnmore text-md font-semibold  text-white rounded-md p-2">Learn More</button>
                  </Link>
                  </div>
                    </div>
      {/* Bottom Fade Mask */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
