import { useMutation } from "@tanstack/react-query";
import { ThreadsService } from "@/features/threads/api/threadsService";

export const useSendMessage = () => {
    return useMutation({
        mutationFn: ThreadsService.sendMessage,
    });
};
