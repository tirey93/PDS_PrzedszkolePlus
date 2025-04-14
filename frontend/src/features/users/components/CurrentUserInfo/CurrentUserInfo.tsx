import { useUser } from "@/features/auth/hooks/useUser";
import { Avatar, Box, Text } from "@radix-ui/themes";

import classes from "./CurrentUserInfo.module.scss";

export const CurrentUserInfo = () => {
    const { user } = useUser();

    if (!user) {
        return null;
    }

    return (
        <Box className={classes.container}>
            <Avatar color="orange" fallback={user.firstName.charAt(0).concat(user.lastName.charAt(0))} />
            <Box className={classes.details}>
                <Text className={classes.name}>
                    {user.firstName} {user.lastName}
                </Text>
                <Text className={classes.role}>{user.role === "Admin" ? "Admin" : "Rodzic"}</Text>
            </Box>
        </Box>
    );
};
