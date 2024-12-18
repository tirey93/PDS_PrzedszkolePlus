import { Dialog } from "@radix-ui/themes";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader";
import { ReactNode, useState } from "react";
import { Alert } from "@/components/Alert/Alert";
import classes from "./AddMenuDialog.module.scss";
import { toast } from "sonner";
import { useSaveMenu } from "@/features/menu/hooks/useSaveMenu";
import { AddMenuFormInputs } from "@/features/menu/components/AddMenuForm/hooks/useAddMenuForm";
import { Menu } from "@/features/menu/types/Menu";
import { AddMenuForm } from "@/features/menu/components/AddMenuForm/AddMenuForm";

type AddMenuDialogProps = {
    menu?: Menu;
    date: Date;
    groupId: string;
    trigger: ReactNode;
};

export const AddMenuDialog = ({ trigger, menu, date, groupId }: AddMenuDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync: saveMenu, isPending, error } = useSaveMenu();

    const handleFormSubmit = async ({ breakfast, lunch, dinner }: AddMenuFormInputs) => {
        await saveMenu({ breakfast: breakfast ?? "", lunch: lunch ?? "", dinner: dinner ?? "", date, groupId });
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
                <DialogHeader>{menu ? "Edytuj menu" : "Dodaj menu"}</DialogHeader>
                <AddMenuForm
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                    isLoading={isPending}
                    initialValue={menu}
                />
                {error && <Alert className={classes.alert}>{error.message}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};
