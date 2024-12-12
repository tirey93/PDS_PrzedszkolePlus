import { useUser } from "@/features/auth/hooks/useUser";
import { useCallback } from "react";
import { AccessLevel } from "@/features/auth/types/Authorization";

export const useAccessValidation = () => {
    const { user } = useUser();

    const validate = useCallback(
        (requiredAccessLevel: AccessLevel) => {
            switch (requiredAccessLevel) {
                case "unauthenticated":
                    return !user;

                case "authenticated":
                    return !!user;

                default:
                    return user?.role === requiredAccessLevel;
            }
        },
        [user]
    );

    return { validate };
};
