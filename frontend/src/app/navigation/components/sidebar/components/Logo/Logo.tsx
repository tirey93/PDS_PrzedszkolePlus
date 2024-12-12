import { Box, Strong, Text } from "@radix-ui/themes";
import classes from "./Logo.module.scss";

export const Logo = () => {
    return (
        <Box className={classes.logo}>
            <Text>
                Przedszkole<Strong className={classes.emphasis}>+</Strong>
            </Text>
        </Box>
    );
};
