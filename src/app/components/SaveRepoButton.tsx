"use client";

import { MdOutlineBookmarkBorder,MdBookmarkAdded  } from "react-icons/md";
import { useState, useEffect } from "react";

type Props = {
  repo: {
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
};

export default function SaveRepoButton({ repo }: Props) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("savedRepos");
    const savedRepos = saved ? JSON.parse(saved) : [];
    const found = savedRepos.find((r: any) => r.id === repo.id);
    setIsSaved(!!found);
  }, [repo.id]);

  const handleSave = () => {
    const saved = localStorage.getItem("savedRepos");
    const savedRepos = saved ? JSON.parse(saved) : [];

    const alreadySaved = savedRepos.some((r: any) => r.id === repo.id);
    if (!alreadySaved) {
      const newRepos = [...savedRepos, repo];
      localStorage.setItem("savedRepos", JSON.stringify(newRepos));
      setIsSaved(true);
    } else {
      const newRepos = savedRepos.filter((r: any) => r.id !== repo.id);
      localStorage.setItem("savedRepos", JSON.stringify(newRepos));
      setIsSaved(false);
    }
  };

  return (
    <div
      onClick={handleSave}
      className={`flex rounded p-2 border border-[#343434] ${
        isSaved ? "bg-[#343434]" : "hover:bg-[#343434]"
      } transition-all duration-300 cursor-pointer items-center gap-1 text-sm`}
    >
      {isSaved ? <MdBookmarkAdded size={22} className="text-white"/> : <MdOutlineBookmarkBorder size={22} className="text-white" />}
      {isSaved ? "Saved" : "Save"}
    </div>
  );
}
