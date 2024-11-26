import React from "react";
import {createBrowserRouter, RouteObject} from "react-router-dom";
const NotFoundPage = React.lazy(() => import("@/app/pages/404").then((module) => ({ default: module.NotFoundPage })));

import { AppRoute } from "@/app/router/AppRoute";
import { AppProvider } from "@/AppProvider";
import { Root } from "@/Root";
import { withSuspense } from "@/app/router/hoc/withSuspense";

const APP_PAGES: RouteObject[] = [

];

export const router = createBrowserRouter([
    {
        path: AppRoute.ROOT,
        element: <AppProvider />,
        children: [
            {
                path: AppRoute.ROOT,
                element: <Root />,
                children: APP_PAGES,
            },
            {
                path: "*",
                element: withSuspense(<NotFoundPage />),
            },
        ],
    },
]);
