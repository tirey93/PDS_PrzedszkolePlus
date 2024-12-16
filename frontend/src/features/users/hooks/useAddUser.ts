import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UsersService } from "@/features/users/api/usersService";
import { USERS_QUERY_KEY } from "@/features/users/constants/queryKeys";

export const useAddUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: UsersService.createOne,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] }),
    });
};
