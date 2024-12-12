import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/features/auth/api/authService";
import { useUser } from "@/features/auth/hooks/useUser";
import { User } from "@/features/auth/types/User";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "@/app/router";

export const useSignIn = () => {
    const { login } = useUser();
    const navigate = useNavigate();

    const onSuccess = (user: User) => {
        login(user);
        navigate(AppRoute.NEWS);
    };

    return useMutation({ mutationFn: AuthService.signIn, onSuccess });
};
