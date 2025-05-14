'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full px-4 py-3 flex justify-between items-center z-[1000] bg-black/50 backdrop-blur-md border-b border-white/10 text-white fixed top-0 ">
          <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-semibold text-[var(--primarytext)] border-r pr-2 border-[#9999993f]">
        DevTrove
      </Link>
      <div className="flex space-x-4 text-sm">
        <Link href="/explore" className="hover:text-[var(--secondarytext)] transition">
          Explore
        </Link>
        <Link href="/submit" className="hover:text-[var(--secondarytext)] transition">
          Submit
        </Link>
        <Link href="/about" className="hover:text-[var(--secondarytext)] transition">
          About
        </Link>
      </div>
          </div>
          <button className='rounded-md p-2.5 text-md font-semibold bg-[#0251EF]'>Let's Start</button>
    </nav>
  );
}
