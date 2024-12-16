import { onlyAsCaretaker } from "@/features/auth/hoc/withAuthorization";
import { AddUserDialog } from "@/features/users/components/AddUserDialog/AddUserDialog";
import { Plus } from "lucide-react";
import { Button } from "@radix-ui/themes";
import { CaretakersTable } from "@/features/users/components/CaretakersTable/CaretakersTable";
import { Page } from "@/components/Page/Page";
import { useGetAllUsers } from "@/features/users/hooks/useGetAllUsers";
import { User } from "@/types/User";

const BaseCaretakersPage = () => {
    // TODO: Handle loading state, handle error state
    const { data } = useGetAllUsers();
    const caretakers: User[] = data?.filter((u) => u.role === "Admin") ?? [];

    return (
        <Page.Root>
            <Page.Header title="Opiekunowie">
                <AddUserDialog
                    role="Admin"
                    trigger={
                        <Button color="jade">
                            Utwórz konto opiekuna
                            <Plus />
                        </Button>
                    }
                />
            </Page.Header>

            <Page.Content>
                <CaretakersTable caretakers={caretakers} />
            </Page.Content>
        </Page.Root>
    );
};

export const CaretakersPage = onlyAsCaretaker(BaseCaretakersPage);
