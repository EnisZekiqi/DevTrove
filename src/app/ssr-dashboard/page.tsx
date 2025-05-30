import { fetchArticles } from "../lib/api";

export default async function SSRDashboardPage() {
    const articles = await fetchArticles();
  
    return (
      <div className="p-6 mt-[5%]">
        <div className="grid grid-cols-1 gap-8 ml-[25%]">
          {articles.map((article: any) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    );
}
  
type Article = {
    id: number;
    title: string;
    description: string;
    url: string;
    cover_image: string | null;
    tag_list: string[];
    user: {
      name: string;
      profile_image: string;
    };
    public_reactions_count: number;
    public_comments_count: number;
  
  };

const ArticleCard = ({ article }: { article: Article }) => {
    return (
        <div className="flex flex-col gap-2 bg-[#080808] p-1.5">
            <div className="flex items-center gap-2">
                <img src={article.user.profile_image} className="w-6 h-6 " alt="" />
                {article.title}
            </div>
            {article.description}
        </div>
    )
}
  