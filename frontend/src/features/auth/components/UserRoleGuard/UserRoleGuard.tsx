import { PropsWithChildren, useMemo } from "react";

import { useAuthState } from "@/features/auth/hooks/useAuthState";
import { UserRole } from "@/types";

type RoleGuardProps = PropsWithChildren<{ allowedRoles: UserRole[] }>;

export const UserRoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
    const user = useAuthState((state) => state.user);

    const shouldDisplayChildren = useMemo(() => {
        const role = user?.role;
        return role && allowedRoles.includes(role);
    }, [user?.role, allowedRoles]);

    return shouldDisplayChildren ? <>{children}</> : null;
};
