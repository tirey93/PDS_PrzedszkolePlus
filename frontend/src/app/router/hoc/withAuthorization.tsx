import {FC} from "react";
import {UserRole} from "@/types";
import {AppRoute} from "@/app/router";
import {ProtectedRoute} from "@/app/router/hoc/ProtectedRoute";

export default function withAuthorization<T extends object>(Component: FC<T>) {
    return (roles: UserRole[], redirectTo: AppRoute) => {
        const WrappedComponent = (props: T) => (
            <ProtectedRoute allowedRoles={roles} redirectUnauthorizedTo={redirectTo}>
                <Component {...props} />
            </ProtectedRoute>
        );

        WrappedComponent.displayName = `withAuthorization(${Component.displayName || Component.name || "Component"})`;
        return WrappedComponent;
    };
}

export function onlyAsTeacher<T extends object>(Component: FC<T>) {
    return withAuthorization<T>(Component)(["Teacher"], AppRoute.LOGIN);
}

export function asAnyAuthenticated<T extends object>(Component: FC<T>) {
    return withAuthorization<T>(Component)(["Teacher", "Parent"], AppRoute.LOGIN);
}
