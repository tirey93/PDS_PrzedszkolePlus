import { Loader } from "@/components/Loader/Loader";
import classes from "./LoadingOverlay.module.scss";

export const LoadingOverlay = () => {
    return (
        <div className={classes.wrapper}>
            <Loader />
        </div>
    );
};
