import { Outlet } from "react-router-dom";

import { AppNavigation } from "@/app/navigation";
import { AppOverlay } from "@/components/AppOverlay";

export const Root = () => {
    return (
        <AppNavigation>
            <AppOverlay />
            <Outlet />
        </AppNavigation>
    );
};
