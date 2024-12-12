import { PropsWithChildren } from "react";
import { Sidebar } from "@/app/navigation/components/sidebar/Sidebar";
import classes from "./Navigation.module.scss";

export const Navigation = ({ children }: PropsWithChildren) => {
    return (
        <div className={classes.container}>
            <Sidebar />
            <div className={classes.content}>{children}</div>
        </div>
    );
};
