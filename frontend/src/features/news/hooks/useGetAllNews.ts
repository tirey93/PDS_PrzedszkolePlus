import { useQuery } from "@tanstack/react-query";
import { NewsService } from "@/features/news/api/newsService";
import { NEWS_QUERY_KEY } from "@/features/news/constants/queryKeys";

export const useGetAllNews = () => {
    return useQuery({ queryKey: [NEWS_QUERY_KEY], queryFn: NewsService.getAll });
};
