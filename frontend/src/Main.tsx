import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./styles/normalize.scss";
import "@radix-ui/themes/styles.css";
import "./styles/overrides.scss";
import "react-loading-skeleton/dist/skeleton.css";

import { router } from "./app/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
