import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/features/auth/api/authService";
import { useUser } from "@/features/auth/hooks/useUser";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "@/app/router";

export const useLogout = () => {
    const { logout } = useUser();
    const navigate = useNavigate();

    const onSuccess = () => {
        logout();
        navigate(AppRoute.SIGN_IN);
    };

    return useMutation({ mutationFn: AuthService.logOut, onSuccess });
};
