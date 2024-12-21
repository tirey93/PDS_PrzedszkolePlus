import { useQuery } from "@tanstack/react-query";
import { CAREGIVERS_QUERY_KEY, PARENTS_QUERY_KEY, USERS_QUERY_KEY } from "@/features/users/constants/queryKeys";
import { UsersService } from "@/features/users/api/usersService";
import { UserRole } from "@/types/User";

export const useGetUsersByRole = (role: UserRole) => {
    return useQuery({
        queryKey: [USERS_QUERY_KEY, role === "Admin" ? CAREGIVERS_QUERY_KEY : PARENTS_QUERY_KEY],
        queryFn: () => UsersService.getByRole(role),
    });
};
