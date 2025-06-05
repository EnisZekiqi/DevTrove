'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import { SideBar } from './SideBar';
import { useEffect, useState } from 'react';
export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';


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

  const isDesktop = windowWidth >= 1124; // You can adjust this breakpoint


  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {!isHome && isDesktop && (
          <div className="fixed top-[5%] flex flex-col items-start p-3 gap-4 left-0 bg-[#080808] w-[300px] border-r border-[#343434] h-screen z-[500]">
            <SideBar drawer={false} setDrawer={() => {}} />
          </div>
        )}
        <main className="overflow-hidden w-screen">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
