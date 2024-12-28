import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NEWS_QUERY_KEY } from "@/features/news/constants/queryKeys";
import { NewsService } from "@/features/news/api/newsService";
import { News } from "@/features/news/types/News";

type SaveNewsOptions = Omit<News, "id" | "createdAt"> & { id?: string };

const saveNews = async (news: SaveNewsOptions): Promise<void> => {
    if (news.id) {
        return NewsService.update(news, news.id);
    } else {
        return NewsService.create(news);
    }
};

export const useSaveNews = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: saveNews,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [NEWS_QUERY_KEY] }),
    });
};
