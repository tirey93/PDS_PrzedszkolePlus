import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/features/auth/api/authService";
import { useUser } from "@/features/auth/hooks/useUser";

export const useSignIn = () => {
    const { login } = useUser();

    return useMutation({ mutationFn: AuthService.signIn, onSuccess: (data) => login(data) });
};
