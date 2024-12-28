import { useQuery } from "@tanstack/react-query";
import { THREADS_QUERY_KEY } from "@/features/threads/constants/queryKeys";
import { ThreadsService } from "@/features/threads/api/threadsService";
import { User } from "@/types/User";

export const useGetAllThreads = (users: User[]) => {
    return useQuery({
        queryKey: [THREADS_QUERY_KEY],
        queryFn: ThreadsService.getAll,
        select: (threads) =>
            threads.map((thread) => {
                const participant = users.find((user) => user.id === thread.participantId);
                return { ...thread, participant };
            }),
    });
};
