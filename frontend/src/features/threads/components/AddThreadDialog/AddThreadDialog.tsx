import { Dialog } from "@radix-ui/themes";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader";
import { ReactNode, useMemo, useState } from "react";
import { Alert } from "@/components/Alert/Alert";
import classes from "./AddThreadDialog.module.scss";
import { toast } from "sonner";
import { useCreateThread } from "@/features/threads/hooks/useCreateThread";
import { AddThreadFormInputs } from "@/features/threads/components/AddThreadForm/hooks/useAddThreadForm";
import { AddThreadForm } from "@/features/threads/components/AddThreadForm/AddThreadForm";
import { User } from "@/types/User";
import { useUser } from "@/features/auth/hooks/useUser";

type AddThreadDialogProps = {
    users: User[];
    trigger: ReactNode;
};

export const AddThreadDialog = ({ trigger, users }: AddThreadDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync: threadThread, isPending, error } = useCreateThread();
    const { user } = useUser();

    const participants = useMemo(() => {
        if (!user) {
            return [];
        }

        return users.filter((u) => u.role !== user.role);
    }, [user, users]);

    const handleFormSubmit = async (inputs: AddThreadFormInputs) => {
        if (!user) {
            return;
        }

        const parentId = parseInt(user.role === "User" ? user.id : inputs.participantId);
        const caregiverId = parseInt(user.role === "Admin" ? user.id : inputs.participantId);

        await threadThread({ subject: inputs.subject, parentId, caregiverId });
        toast.success("Wątek utworzony. Możesz napisać pierwszą wiadomość.");
        setOpen(false);
    };

    const handleFormCancel = () => {
        setOpen(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>{trigger}</Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <DialogHeader>Utwórz nowy wątek</DialogHeader>
                <AddThreadForm
                    users={participants}
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                    isLoading={isPending}
                />
                {error && <Alert className={classes.alert}>{error.message}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};
