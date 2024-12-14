import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewsService } from "@/features/news/api/newsService";
import { NEWS_QUERY_KEY } from "@/features/news/constants/queryKeys";

export const useDeleteNews = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: NewsService.delete,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [NEWS_QUERY_KEY] }),
    });
};
