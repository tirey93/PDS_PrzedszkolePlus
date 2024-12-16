import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UsersService } from "@/features/users/api/usersService";
import { USERS_QUERY_KEY } from "@/features/users/constants/queryKeys";

export const useEnableUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: UsersService.enableOne,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] }),
    });
};
