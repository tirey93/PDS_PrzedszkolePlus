import { Dialog, Button, Strong } from "@radix-ui/themes";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader";
import { DialogFooter } from "@/components/Dialog/DialogFooter/DialogFooter";
import { DialogBody } from "@/components/Dialog/components/DialogBody/DialogBody";
import { ReactNode, useState } from "react";
import { Alert } from "@/components/Alert/Alert";
import classes from "@/features/news/components/AddNewsDialog/AddNewsDialog.module.scss";
import { toast } from "sonner";
import { useDeleteNews } from "@/features/news/hooks/useDeleteNews";

type DeleteNewsDialogProps = {
    news: {
        title: string;
        id: string;
    };
    trigger: ReactNode;
};

export const DeleteNewsDialog = ({ news, trigger }: DeleteNewsDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync: deleteNews, isPending, error } = useDeleteNews();

    const handleDelete = async () => {
        await deleteNews(news.id);
        toast.success("Ogłoszenie usunięte.");
        setOpen(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>{trigger}</Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <DialogHeader>Usuń ogłoszenie</DialogHeader>
                <DialogBody>Czy na pewno chcesz usunąć ogłoszenie {<Strong>{news.title}</Strong>}?</DialogBody>
                <DialogFooter>
                    <Dialog.Close>
                        <Button variant="soft">Anuluj</Button>
                    </Dialog.Close>
                    <Button color="crimson" loading={isPending} onClick={handleDelete}>
                        Usuń
                    </Button>
                </DialogFooter>
                {error && <Alert className={classes.alert}>{error.message}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};
