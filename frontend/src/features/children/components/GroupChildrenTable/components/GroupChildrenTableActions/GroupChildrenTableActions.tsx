import { Box, Button } from "@radix-ui/themes";
import { Child } from "@/features/children/types/Child";
import classes from "./GroupChildrenTableActions.module.scss";
import { RemoveChildDialog } from "@/features/children/components/RemoveChildDialog/RemoveChildDialog";
import { AddChildDialog } from "@/features/children/components/AddChildDialog/AddChildDialog";

export const GroupChildrenTableActions = (child: Child) => {
    return (
        <Box className={classes.container}>
            <Box className={classes.actions}>
                <AddChildDialog
                    child={child}
                    trigger={
                        <Button variant="soft" color="jade" size="1">
                            Edytuj
                        </Button>
                    }
                />
                <RemoveChildDialog
                    child={child}
                    trigger={
                        <Button variant="soft" color="crimson" size="1">
                            Usuń
                        </Button>
                    }
                />
            </Box>
        </Box>
    );
};
