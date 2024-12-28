import { Dialog } from "@radix-ui/themes";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader";
import { DialogBody } from "@/components/Dialog/components/DialogBody/DialogBody";
import { ReactNode, useState } from "react";
import { AddNewsForm } from "@/features/news/components/AddNewsForm/AddNewsForm";
import { useSaveNews } from "@/features/news/hooks/useSaveNews";
import { Alert } from "@/components/Alert/Alert";
import classes from "./AddNewsDialog.module.scss";
import { AddNewsFormInputs } from "@/features/news/components/AddNewsForm/hooks/useAddNewsForm";
import { toast } from "sonner";
import { News } from "@/features/news/types/News";

type AddNewsDialogProps = {
    news?: News;
    trigger: ReactNode;
};

export const AddNewsDialog = ({ trigger, news }: AddNewsDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync: saveNews, isPending, error } = useSaveNews();

    const handleFormSubmit = async (inputs: AddNewsFormInputs) => {
        await saveNews({ ...inputs, id: news?.id });
        toast.success("Ogłoszenie zapisane.");
        setOpen(false);
    };

    const handleFormCancel = () => {
        setOpen(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>{trigger}</Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <DialogHeader>{news ? "Edytuj ogłoszenie" : "Dodaj ogłoszenie"}</DialogHeader>
                <DialogBody>Ogłoszenie będą mogli zobaczyć wszyscy zalogowani użytkownicy.</DialogBody>
                <AddNewsForm
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                    isLoading={isPending}
                    initialValues={news}
                />
                {error && <Alert className={classes.alert}>{error.message}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};
