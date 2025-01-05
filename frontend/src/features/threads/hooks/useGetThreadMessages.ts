import { useQuery } from "@tanstack/react-query";
import { MESSAGES_QUERY_KEY } from "@/features/threads/constants/queryKeys";
import { ThreadsService } from "@/features/threads/api/threadsService";
import { useUser } from "@/features/auth/hooks/useUser";
import { Thread } from "@/features/threads/types/Thread";

export const useGetThreadMessages = (thread: Thread) => {
    const { user } = useUser();

    return useQuery({
        queryKey: [`${MESSAGES_QUERY_KEY}:${thread.id}}`],
        queryFn: () => ThreadsService.getThreadMessages(thread.id),
        select: (messages) =>
            messages.map((message) => {
                const sender = message.senderId === user?.id ? user : thread.participant;
                return { ...message, sender };
            }),
    });
};
