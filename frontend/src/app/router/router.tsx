import React from "react";
import { createBrowserRouter } from "react-router-dom";

const RootPage = React.lazy(() => import("@/app/pages/Root/Root").then((module) => ({ default: module.RootPage })));

const NewsPage = React.lazy(() =>
    import("@/app/pages/Root/News/NewsPage").then((module) => ({ default: module.NewsPage }))
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
                path: "*",
                element: WithSuspense(<NotFoundPage />),
            },
        ],
    },
]);
