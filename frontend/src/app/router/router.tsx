import React from "react";
import { createBrowserRouter } from "react-router-dom";

const HomePage = React.lazy(() => import("@/app/pages/Home/Home").then((module) => ({ default: module.HomePage })));

const SignInPage = React.lazy(() =>
    import("@/app/pages/SignIn/SignInPage").then((module) => ({ default: module.SignInPage }))
);

const NotFoundPage = React.lazy(() => import("@/app/pages/404").then((module) => ({ default: module.NotFoundPage })));

import { AppRoute } from "@/app/router/AppRoute";
import { WithSuspense } from "@/app/router/components/WithSuspense";
import { Root } from "@/Root";

export const router = createBrowserRouter([
    {
        path: AppRoute.ROOT,
        element: <Root />,
        children: [
            {
                path: AppRoute.ROOT,
                element: WithSuspense(<HomePage />),
            },
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
]);
