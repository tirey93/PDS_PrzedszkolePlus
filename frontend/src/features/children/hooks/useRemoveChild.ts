import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChildrenService } from "@/features/children/api/childrenService";
import { CHILDREN_QUERY_KEY } from "@/features/children/constants/queryKeys";

export const useRemoveChild = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ChildrenService.removeOne,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [CHILDREN_QUERY_KEY] }),
    });
};
