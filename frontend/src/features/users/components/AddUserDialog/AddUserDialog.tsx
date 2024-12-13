import { Dialog, Button, IconButton, Box } from "@radix-ui/themes";
import { Plus, X } from "lucide-react";
import { AddUserForm } from "@/features/users/components/AddUserForm/AddUserForm";
import { useState } from "react";
import classes from "./AddUserDialog.module.scss";
import { useAddUser } from "@/features/users/hooks/useAddUser";
import { UserRole } from "@/types/User";
import { AddUserFormInputs } from "@/features/users/components/AddUserForm/hooks/useAddUserForm";
import { toast } from "sonner";
import { Alert } from "@/components/Alert/Alert";

type AddUserDialogProps = {
    role: UserRole;
};

export const AddUserDialog = ({ role }: AddUserDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync: createUser, isPending, error } = useAddUser();
    const label = role === "Caretaker" ? "Utwórz konto opiekuna" : "Utwórz konto rodzica";

    const handleOnSubmit = async (inputs: AddUserFormInputs) => {
        await createUser(mapAddUserFormInputsToCreateUserRequestBody(inputs, role));
        toast.success("Użytkownik został dodany.");
        setOpen(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>
                <Button color="jade">
                    {label}
                    <Plus />
                </Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Box className={classes.header}>
                    <Dialog.Title>{label}</Dialog.Title>
                    <Dialog.Close>
                        <IconButton size="1" variant="soft" color="gray">
                            <X />
                        </IconButton>
                    </Dialog.Close>
                </Box>

                <Dialog.Description size="2" mb="4">
                    Użytkownik będzie mógł zmienić hasło zaraz po zalogowaniu.
                </Dialog.Description>

                <AddUserForm onSubmit={handleOnSubmit} isLoading={isPending} />

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
