import { Box, Strong, Text } from "@radix-ui/themes";
import classes from "./Logo.module.scss";

export const Logo = () => {
    return (
        <Box className={classes.logo}>
            <Text>
                School<Strong className={classes.emphasis}>Money</Strong>
            </Text>
        </Box>
    );
};
