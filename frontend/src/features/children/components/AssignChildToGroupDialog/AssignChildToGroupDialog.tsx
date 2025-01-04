import { Dialog, Strong } from "@radix-ui/themes";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader";
import { ReactNode, useState } from "react";
import { Alert } from "@/components/Alert/Alert";
import classes from "./AssignChildToGroupDialog.module.scss";
import { toast } from "sonner";
import { BaseChild } from "@/features/children/types/Child";
import { DialogBody } from "@/components/Dialog/components/DialogBody/DialogBody";
import { AssignChildToGroupFormInputs } from "@/features/children/components/AssignChildToGroupForm/hooks/useAssignChildToGroupForm";
import { useAssignChildToGroup } from "@/features/children/hooks/useAssignChildToGroup";
import { AssignChildToGroupForm } from "@/features/children/components/AssignChildToGroupForm/AssignChildToGroupForm";
import { useGetAllGroups } from "@/features/groups/hooks/useGetAllGroups";

type AssignChildToGroupDialogProps = {
    trigger: ReactNode;
    child: BaseChild;
};

export const AssignChildToGroupDialog = ({ trigger, child }: AssignChildToGroupDialogProps) => {
    const [open, setOpen] = useState(false);
    const { data: groups } = useGetAllGroups();
    const { mutateAsync: assignChildToGroup, isPending, error } = useAssignChildToGroup();

    const handleFormSubmit = async ({ groupId }: AssignChildToGroupFormInputs) => {
        await assignChildToGroup({ childId: child.id, groupId });
        toast.success("Dziecko zostało przepisane do innej grupy.");
        setOpen(false);
    };

    const handleFormCancel = () => {
        setOpen(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>{trigger}</Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <DialogHeader>Przypisz dziecko do grupy</DialogHeader>
                <DialogBody>
                    Wybierz grupę, do której{" "}
                    <Strong>
                        {child?.firstName} {child?.lastName}
                    </Strong>{" "}
                    zostanie przypisany/a.
                </DialogBody>
                <AssignChildToGroupForm
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                    groups={groups ?? []}
                    isLoading={isPending}
                    initialValue={{ groupId: child?.groupId }}
                />
                {error && <Alert className={classes.alert}>{error.message}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};
