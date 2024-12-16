import { useEffect } from "react";
import { useUser } from "@/features/auth/hooks/useUser";
import { AuthService } from "@/features/auth/api/authService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "@/app/router";

export const useSeamlessSignIn = () => {
    const { user, login } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            return;
        }

        const handleSeamlessSignIn = async () => {
            const myself = await AuthService.getMyself();
            login(myself);
            navigate(AppRoute.NEWS);
            toast.success(`Witaj ponownie, ${myself.firstName}!`);
        };

        void handleSeamlessSignIn();
    }, [login, navigate, user]);
};
