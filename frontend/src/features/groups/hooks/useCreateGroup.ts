import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GroupsService } from "@/features/groups/api/groupsService";
import { GROUPS_QUERY_KEY } from "@/features/groups/constants/queryKeys";

export const useCreateGroup = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: GroupsService.create,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [GROUPS_QUERY_KEY] }),
    });
};
