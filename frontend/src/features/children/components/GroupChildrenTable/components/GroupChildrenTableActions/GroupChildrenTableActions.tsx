import { Box, Button } from "@radix-ui/themes";
import { BaseChild } from "@/features/children/types/Child";
import classes from "./GroupChildrenTableActions.module.scss";
import { RemoveChildDialog } from "@/features/children/components/RemoveChildDialog/RemoveChildDialog";
import { AssignChildToGroupDialog } from "@/features/children/components/AssignChildToGroupDialog/AssignChildToGroupDialog";

export const GroupChildrenTableActions = (child: BaseChild) => {
    return (
        <Box className={classes.container}>
            <Box className={classes.actions}>
                <AssignChildToGroupDialog
                    child={child}
                    trigger={
                        <Button variant="soft" size="1">
                            Przypisz do innej grupy
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
