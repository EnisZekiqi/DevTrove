'use client'

import { usePathname } from 'next/navigation';
import { useState,useEffect } from 'react';

export default function Footer() {

  const pathname = usePathname();
  const isHome = pathname === '/';

 
  

    return (
      <footer className={`${isHome ?'s2 border-t border-white/10':''} py-6 mt-16 bg-black/90 text-white text-center `}>
        <p className="text-sm">
           © {new Date().getFullYear()} DevTrove. Built by Enis with 💙
        </p>
        <p className="text-xs text-[var(--secondarytext)] mt-1">
          Explore open-source tools, APIs, and templates.
        </p>
      </footer>
    );
  }
  