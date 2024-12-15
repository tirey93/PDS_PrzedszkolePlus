import { useMutation } from "@tanstack/react-query";
import { UsersService } from "@/features/users/api/usersService";

export const useChangePassword = () => {
    return useMutation({
        mutationFn: UsersService.changePassword,
    });
};
