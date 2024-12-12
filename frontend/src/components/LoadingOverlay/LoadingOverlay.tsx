import { Loader } from "@/components/Loader/Loader";
import classes from "./LoadingOverlay.module.scss";
import { Box } from "@radix-ui/themes";

export const LoadingOverlay = () => {
    return (
        <Box className={classes.wrapper}>
            <Loader />
        </Box>
    );
};
