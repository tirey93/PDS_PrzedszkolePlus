import { AppProvider } from "@/AppProvider";
import { Outlet } from "react-router-dom";
import { onlyAsUnauthenticated } from "@/features/auth/hoc/withAuthorization";

import classes from "./AuthPage.module.scss";

const Page = () => {
    return (
        <AppProvider>
            <div className={classes.container}>
                <div className={classes.content}>
                    <Outlet />
                </div>
            </div>
        </AppProvider>
    );
};

export const AuthPage = onlyAsUnauthenticated(Page);
