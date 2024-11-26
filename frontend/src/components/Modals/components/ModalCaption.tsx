import { Text } from "@mantine/core";

import classes from "./Modal.module.scss";

export const ModalCaption = ({ children }: { children: string }) => {
    return <Text className={classes.caption}>{children}</Text>;
};
