import { Box, Button } from "@radix-ui/themes";
import classes from "./CaretakersTableActions.module.scss";
import { DisableUserDialog } from "@/features/users/components/DisableUserDialog/DisableUserDialog";
import { User } from "@/types/User";
import { EnableUserButton } from "@/features/users/components/EnableUserButton/EnableUserButton";

export const CaretakersTableActions = (user: User) => {
    return (
        <Box className={classes.container}>
            <Button variant="soft" size="1">
                Napisz wiadomość
            </Button>
            {user.isActive ? (
                <DisableUserDialog
                    user={user}
                    trigger={
                        <Button variant="soft" color="crimson" size="1">
                            Zablokuj dostęp
                        </Button>
                    }
                />
            ) : (
                <EnableUserButton userId={user.id} />
            )}
        </Box>
    );
};
