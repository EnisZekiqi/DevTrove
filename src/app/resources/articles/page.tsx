'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchArticlesMultiPage } from "@/app/lib/api";
import { FullArticle } from "@/app/lib/api";

const Articles = () => {


    const [filter, setFilter] = useState<'newest' | 'likes'>('newest');

    const { data, isLoading, error } = useQuery<FullArticle[]>({
        queryKey: ['articles', filter],
        queryFn: () => fetchArticlesMultiPage(3, filter),
        staleTime: 1000 * 60 * 5,
      });
      
      

    if (isLoading) {
        return(<div>Loading..</div>)
    }

    if (error) {
        return(<div>Error</div>)
    }

    

    return ( 
        <div className="h-full w-full flex flex-col gap-4 mt-[5%] items-center justify-center z-[500]">
           {data?.map((article) => (
            <Link
                href={`/resources/${article.id}?type=article`}
                key={article.id}
            >
                <div className="bg-[#080808] flex flex-col items-start gap-1 w-[600px] border border-[#343434] p-1.5 rounded-xl">
                <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-2 mb-0.5">
                    <img
                        src={article.user.profile_image}
                        alt={article.user.name}
                        className="w-6 h-6 rounded-full"
                    />
                    <p className="text-sm font-light text-gray-300">{article.user.name}</p>
                    </div>
                </div>
                {article.title}
                </div>
            </Link>
            ))}

        </div>
     );
}
 
export default Articles;