import React from "react";
import { createBrowserRouter } from "react-router-dom";

const RootPage = React.lazy(() => import("@/app/pages/Root/Root").then((module) => ({ default: module.RootPage })));

const NewsPage = React.lazy(() =>
    import("@/app/pages/Root/News/NewsPage").then((module) => ({ default: module.NewsPage }))
);

const CaregiversPage = React.lazy(() =>
    import("@/app/pages/Root/Users/Caregivers/CaregiversPage").then((module) => ({ default: module.CaregiversPage }))
);

const ParentsPage = React.lazy(() =>
    import("@/app/pages/Root/Users/Parents/ParentsPage").then((module) => ({ default: module.ParentsPage }))
);

const MessagesPage = React.lazy(() =>
    import("@/app/pages/Root/Messages/MessagesPage").then((module) => ({ default: module.MessagesPage }))
);

const SettingsPage = React.lazy(() =>
    import("@/app/pages/Root/Settings/SettingsPage").then((module) => ({ default: module.SettingsPage }))
);

const ChildrenPage = React.lazy(() =>
    import("@/app/pages/Root/Children/ChildrenPage").then((module) => ({ default: module.ChildrenPage }))
);

const GroupPage = React.lazy(() =>
    import("@/app/pages/Root/Group/GroupPage").then((module) => ({ default: module.GroupPage }))
);

const AuthPage = React.lazy(() => import("@/app/pages/Auth/AuthPage").then((module) => ({ default: module.AuthPage })));

const SignInPage = React.lazy(() =>
    import("@/app/pages/Auth/SignIn/SignInPage").then((module) => ({ default: module.SignInPage }))
);

const NotFoundPage = React.lazy(() => import("@/app/pages/404").then((module) => ({ default: module.NotFoundPage })));

import { AppRoute } from "@/app/router/AppRoute";
import { WithSuspense } from "@/app/router/components/WithSuspense";

export const router = createBrowserRouter([
    {
        path: AppRoute.AUTH,
        element: WithSuspense(<AuthPage />),
        children: [
            {
                path: AppRoute.SIGN_IN,
                element: WithSuspense(<SignInPage />),
            },
            {
                path: "*",
                element: WithSuspense(<NotFoundPage />),
            },
        ],
    },
    {
        path: AppRoute.ROOT,
        element: WithSuspense(<RootPage />),
        children: [
            {
                path: AppRoute.NEWS,
                element: WithSuspense(<NewsPage />),
            },
            {
                path: AppRoute.SETTINGS,
                element: WithSuspense(<SettingsPage />),
            },
            {
                path: AppRoute.CAREGIVERS,
                element: WithSuspense(<CaregiversPage />),
            },
            {
                path: AppRoute.PARENTS,
                element: WithSuspense(<ParentsPage />),
            },
            {
                path: AppRoute.MESSAGES,
                element: WithSuspense(<MessagesPage />),
            },
            {
                path: AppRoute.CHILDREN,
                element: WithSuspense(<ChildrenPage />),
            },
            {
                path: AppRoute.GROUP,
                element: WithSuspense(<GroupPage />),
            },
            {
                path: "*",
                element: WithSuspense(<NotFoundPage />),
            },
        ],
    },
]);
