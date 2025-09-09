'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdRemove } from "react-icons/io";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { MdOutlineDashboard,MdOutlineVpnKey,MdOutlineArticle,MdOutlineFeed   } from "react-icons/md";

type DrawerProps = {
  drawer: boolean;
  setDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
  forks_count: number;
  owner: {
    avatar_url: string;
    login: string;
  };
  license?: {
    name: string;
  };
  topics?: string[];
};

export const SideBar: React.FC<DrawerProps> = ({ drawer, setDrawer }) => {
  const [isClicked, setIsClicked] = useState("");
  const [showRepo, setShowRepo] = useState<Repo[]>([]);

  const HomeFeed = [
    { text: "Dashboard", link: "/", icon:<MdOutlineDashboard size={25}/> },
    { text: "Articles", link: "/articles", icon:<MdOutlineArticle size={25}/> },
    { text: "Tools", link: "/tools", icon:<MdOutlineVpnKey size={25}/> },
    { text: "Github Repositories", link: "/github", icon:<MdOutlineFeed size={25}/> },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("savedRepos");
    if (saved) {
      setShowRepo(JSON.parse(saved));
    }
  }, []);

  const removeRepo = (id: number) => {
    const updateRepo = showRepo.filter((repo) => repo.id !== id);
    setShowRepo(updateRepo);
    localStorage.setItem("savedRepos", JSON.stringify(updateRepo));
  };


  const pathname = usePathname();
  
  

  return (
    <>
      <div className="mt-15 space-y-4 flex flex-col ">
  {HomeFeed.map((feed, index) => {
    // Check if this link matches current path
    const isActive = pathname === `/resources${feed.link}`;

    return (
      <div
        key={index}
        className="flex flex-col w-full"
        onMouseEnter={() => setIsClicked(feed.text)}
        onMouseLeave={() => setIsClicked("")}
        onClick={() => {
          setIsClicked(feed.text);
          setDrawer(false);
        }}
      >
        <Link
          className={`${
            isActive || isClicked === feed.text ? "text-white font-semibold bg-[#343434]/40 w-full" : "text-white/50 w-fit"
          } transition-all duration-300 flex items-center gap-4 text-[10.5x] p-1.5 rounded-2xl`}
          href={`/resources${feed.link}`}
        >
          {feed.icon}
          {feed.text}

        </Link>
      </div>
    );
  })}
</div>

      <hr className="w-full bg-gray-400/50 px-2" />
      <h1 className="text-md font-medium text-white">Saved Repositories</h1>
      <div className="flex flex-col mt-2 gap-4 w-full">
        {showRepo.length === 0 ? (
          <div className="text-gray-300 text-center mt-18 text-sm w-full flex flex-col justify-center items-center gap-2"><Image src="/nodata.svg" alt="Logo" width={55} height={55} /> <p>Nothing saved yet</p></div>
        ) : (
          showRepo.map((repo) => (
            <div
              className="flex items-center justify-between gap-24"
              key={repo.id}
            >
              <Link href={repo.html_url}>
                <div className="text-gray-300 flex items-center gap-1.5">
                  <img
                    className="w-6 h-6 border border-[#343434] flex items-center"
                    src={repo.owner.avatar_url}
                    alt=""
                  />
                  {repo.name}
                </div>
              </Link>
              <button
                className="p-0.5 cursor-pointer rounded-full bg-transparent border border-[#343434]"
                onClick={() => removeRepo(repo.id)}
              >
                <IoMdRemove size={22} />
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};
