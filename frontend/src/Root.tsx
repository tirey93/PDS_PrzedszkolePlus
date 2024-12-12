import { Outlet } from "react-router-dom";
import { AppProvider } from "@/AppProvider";

import "./styles/normalize.scss";
import "@radix-ui/themes/styles.css";
import "./styles/overrides.scss";
import { Navigation } from "@/app/navigation/Navigation";

export const Root = () => {
    return (
        <AppProvider>
            <Navigation>
                <Outlet />
            </Navigation>
        </AppProvider>
    );
};
