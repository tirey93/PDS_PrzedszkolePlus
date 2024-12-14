import { Dialog } from "@radix-ui/themes";
import { AddUserForm } from "@/features/users/components/AddUserForm/AddUserForm";
import { ReactNode, useState } from "react";
import classes from "./AddUserDialog.module.scss";
import { useAddUser } from "@/features/users/hooks/useAddUser";
import { UserRole } from "@/types/User";
import { AddUserFormInputs } from "@/features/users/components/AddUserForm/hooks/useAddUserForm";
import { toast } from "sonner";
import { Alert } from "@/components/Alert/Alert";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader";
import { DialogBody } from "@/components/Dialog/components/DialogBody/DialogBody";

type AddUserDialogProps = {
    role: UserRole;
    trigger: ReactNode;
};

export const AddUserDialog = ({ role, trigger }: AddUserDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync: createUser, isPending, error } = useAddUser();
    const label = role === "Caretaker" ? "Utwórz konto opiekuna" : "Utwórz konto rodzica";

    const handleOnSubmit = async (inputs: AddUserFormInputs) => {
        await createUser(mapAddUserFormInputsToCreateUserRequestBody(inputs, role));
        toast.success("Użytkownik został dodany.");
        setOpen(false);
    };

    const handleOnCancel = () => {
        setOpen(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>{trigger}</Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <DialogHeader>{label}</DialogHeader>
                <DialogBody>Użytkownik będzie mógł zmienić hasło zaraz po zalogowaniu.</DialogBody>
                <AddUserForm onSubmit={handleOnSubmit} onCancel={handleOnCancel} isLoading={isPending} />
                {error && <Alert className={classes.alert}>{error.message}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};

const mapAddUserFormInputsToCreateUserRequestBody = (
    { firstName, lastName, password, login }: AddUserFormInputs,
    role: UserRole
) => {
    const displayName = `${firstName} ${lastName}`;
    return { displayName, password, username: login, role };
};
