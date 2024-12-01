import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { AppRoute } from "@/app/router";
import { useAuthState } from "@/features/auth/hooks/useAuthState";
import { UserRole } from "@/types";

type ProtectedRouteProps = PropsWithChildren<{
    allowedRoles: UserRole[];
    redirectUnauthorizedTo: AppRoute;
}>;

export const ProtectedRoute = ({ allowedRoles, children, redirectUnauthorizedTo }: ProtectedRouteProps) => {
    const user = useAuthState((state) => state.user);

    if (!allowedRoles.find((allowedRole) => allowedRole === user?.role)) {
        return <Navigate to={redirectUnauthorizedTo} replace />;
    }

    return <>{children}</>;
};
