import { Dialog } from "@radix-ui/themes";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader";
import { ReactNode, useState } from "react";
import { Alert } from "@/components/Alert/Alert";
import classes from "./AddChildDialog.module.scss";
import { toast } from "sonner";
import { Child } from "@/features/children/types/Child";
import { AddChildForm } from "@/features/children/components/AddChildForm/AddChildForm";
import { AddChildFormInputs } from "@/features/children/components/AddChildForm/hooks/useAddChildForm";
import { useSaveChild } from "@/features/children/hooks/useSaveChild";

type AddChildDialogProps = {
    trigger: ReactNode;
    child?: Child;
    groupId?: string;
    parentId?: string;
};

export const AddChildDialog = ({ trigger, child, parentId, groupId }: AddChildDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync: saveChild, isPending, error } = useSaveChild();

    const handleFormSubmit = async (inputs: AddChildFormInputs) => {
        await saveChild({ ...inputs, birthDate: inputs.birthDate.toISOString() });
        toast.success("Menu zapisane.");
        setOpen(false);
    };

    const handleFormCancel = () => {
        setOpen(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>{trigger}</Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <DialogHeader>{child ? "Edytuj dziecko" : "Dodaj dziecko"}</DialogHeader>
                <AddChildForm
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                    isLoading={isPending}
                    initialValue={{
                        ...child,
                        groupId: child?.groupId ?? groupId,
                        parentId: child?.parent?.id ?? parentId,
                    }}
                />
                {error && <Alert className={classes.alert}>{error.message}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};
