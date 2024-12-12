import { PropsWithChildren } from "react";
import { AccessLevel } from "@/features/auth/types/Authorization";
import { AppRoute } from "@/app/router";
import { Navigate } from "react-router-dom";
import { useAccessValidation } from "@/features/auth/hooks/useAccessLevel";

type AccessGuardProps = PropsWithChildren<{
    requiredAccess: AccessLevel;
    redirectTo?: AppRoute;
}>;

export const AccessGuard = ({ children, requiredAccess, redirectTo }: AccessGuardProps) => {
    const { validate } = useAccessValidation();
    const isAllowed = validate(requiredAccess);

    if (!isAllowed && redirectTo) {
        return <Navigate to={redirectTo} replace />;
    }

    if (!isAllowed) {
        return null;
    }

    return <>{children}</>;
};
