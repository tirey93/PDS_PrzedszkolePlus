import { Box, Button } from "@radix-ui/themes";
import classes from "./ParentsTableActions.module.scss";
import { ChildrenList } from "@/features/users/components/ParentsTable/components/ChildrenList/ChildrenList";
import { DisableUserDialog } from "@/features/users/components/DisableUserDialog/DisableUserDialog";
import { User } from "@/types/User";
import { EnableUserButton } from "@/features/users/components/EnableUserButton/EnableUserButton";

export const ParentsTableActions = (user: User) => {
    return (
        <Box className={classes.container}>
            <Box className={classes.actions}>
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
            <ChildrenList />
        </Box>
    );
};
