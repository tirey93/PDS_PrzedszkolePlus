import { Dialog, Text } from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader/DialogHeader.tsx";
import { Alert } from "@/components/Alert/Alert.tsx";
import { CreateClassFormInputs } from "@/features/classes/components/CreateClassForm/hooks/useCreateClassForm.ts";
import { toast } from "sonner";
import { useCreateClass } from "@/features/classes/hooks/useCreateClass.ts";
import { CreateClassForm } from "@/features/classes/components/CreateClassForm/CreateClassForm.tsx";

import classes from "./CreateClassDialog.module.scss";

type CreateClassDialogProps = {
    trigger: ReactNode;
};

export const CreateClassDialog = ({ trigger }: CreateClassDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync, isPending, error } = useCreateClass();

    const createClass = async ({ name }: CreateClassFormInputs) => {
        try {
            await mutateAsync({ name });
            toast.success("Klasa została utworzona.");
        } catch (e) {
            console.log(e);
            toast.error("Nie udało się dodać klasy.");
        }
    };

    const handleFormCancel = () => {
        setOpen(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>{trigger}</Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <DialogHeader>Dodaj klasę</DialogHeader>
                <Text as="p">Po utworzeniu klasy staniesz się jej skarbnikiem.</Text>

                <CreateClassForm onSubmit={createClass} isLoading={isPending} onCancel={handleFormCancel} />
                {error && <Alert className={classes.alert}>{error.message}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};
