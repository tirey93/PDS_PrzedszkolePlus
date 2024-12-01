import { Center, Loader, Overlay } from "@mantine/core";

import { useAppOverlayStore } from "./hooks/useAppOverlayStore";

import classes from "./AppOverlay.module.scss";

export const AppOverlay = () => {
    const isLoading = useAppOverlayStore((state) => state.isLoading);

    return isLoading ? (
        <Overlay fixed blur={2} backgroundOpacity={0.5}>
            <Center className={classes.overlayLoaderWrapper}>
                <Loader size="xl" type="dots" />
            </Center>
        </Overlay>
    ) : null;
};
