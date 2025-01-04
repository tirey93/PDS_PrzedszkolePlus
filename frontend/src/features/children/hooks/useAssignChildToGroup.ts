import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChildrenService } from "@/features/children/api/childrenService";
import { ATTENDANCE_QUERY_KEY, CHILDREN_QUERY_KEY } from "@/features/children/constants/queryKeys";

export const useAssignChildToGroup = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ChildrenService.assignToGroup,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [CHILDREN_QUERY_KEY] });
            void queryClient.invalidateQueries({ queryKey: [ATTENDANCE_QUERY_KEY] });
        },
    });
};
