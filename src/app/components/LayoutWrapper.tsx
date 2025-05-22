'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import { SideBar } from '../resources/page';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {!isHome && (
          <div className="fixed top-[5%] flex flex-col items-start p-3 gap-4 left-0 bg-[#080808] w-[300px] border-r border-[#343434] h-screen z-[500]">
            <SideBar />
          </div>
        )}
        <main className="overflow-hidden">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
