import { PropsWithChildren } from "react";
import { Sidebar } from "@/app/navigation/components/sidebar/Sidebar";
import classes from "./Navigation.module.scss";
import { Box } from "@radix-ui/themes";

export const Navigation = ({ children }: PropsWithChildren) => {
    return (
        <Box className={classes.container}>
            <Sidebar />
            <Box className={classes.content}>{children}</Box>
        </Box>
    );
};
