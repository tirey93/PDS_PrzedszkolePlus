import { Outlet } from "react-router-dom";
import { AppProvider } from "@/AppProvider";

import { Navigation } from "@/app/navigation/Navigation";
import { onlyAsAuthenticated } from "@/features/auth/hoc/withAuthorization";

const Page = () => {
    return (
        <AppProvider>
            <Navigation>
                <Outlet />
            </Navigation>
        </AppProvider>
    );
};

export const RootPage = onlyAsAuthenticated(Page);
