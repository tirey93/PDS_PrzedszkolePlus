import { Dialog, Button, Strong } from "@radix-ui/themes";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader";
import { DialogFooter } from "@/components/Dialog/DialogFooter/DialogFooter";
import { DialogBody } from "@/components/Dialog/components/DialogBody/DialogBody";
import { ReactNode, useState } from "react";
import { Alert } from "@/components/Alert/Alert";
import classes from "./ReportAbsenceDialog.module.scss";
import { toast } from "sonner";
import { useReportAttendance } from "@/features/children/hooks/useReportAttendance";

type ReportAbsenceDialogProps = {
    childId: string;
    date: Date;
    trigger: ReactNode;
};

export const ReportAbsenceDialog = ({ childId, date, trigger }: ReportAbsenceDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync: reportAbsence, isPending, error } = useReportAttendance();

    const handleDelete = async () => {
        await reportAbsence({ childId, date: date.toISOString(), status: false });
        toast.success("Zgłoszono nieobecność dziecka.");
        setOpen(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>{trigger}</Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <DialogHeader>Zgłoś nieobecność dziecka</DialogHeader>
                <DialogBody>
                    Czy na pewno chcesz zgłosić zaplanowaną nieobecność dziecka w dniu{" "}
                    <Strong>{date.toLocaleDateString()}</Strong>? Tej akcji nie można cofnąć.
                </DialogBody>
                <DialogFooter>
                    <Dialog.Close>
                        <Button variant="soft">Anuluj</Button>
                    </Dialog.Close>
                    <Button color="crimson" loading={isPending} onClick={handleDelete}>
                        Zgłoś nieobecność
                    </Button>
                </DialogFooter>
                {error && <Alert className={classes.alert}>{error.message}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};
