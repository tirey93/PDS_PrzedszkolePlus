import { useQuery } from "@tanstack/react-query";
import { USERS_QUERY_KEY } from "@/features/users/constants/queryKeys";
import { UsersService } from "@/features/users/api/usersService";

export const useGetAllUsers = () => {
    return useQuery({ queryKey: [USERS_QUERY_KEY], queryFn: UsersService.getAll });
};
