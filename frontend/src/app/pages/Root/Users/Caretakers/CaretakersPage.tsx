import { onlyAsCaretaker } from "@/features/auth/hoc/withAuthorization";
import { AddUserDialog } from "@/features/users/components/AddUserDialog/AddUserDialog";
import { Plus } from "lucide-react";
import { Button } from "@radix-ui/themes";
import { CaretakersTable } from "@/features/users/components/CaretakersTable/CaretakersTable";
import { User } from "@/types/User";
import { Page } from "@/components/Page/Page";

const defaultData: User[] = [
    {
        isActive: false,
        id: "2",
        firstName: "Jan",
        lastName: "Kowalski",
        role: "Caretaker",
        login: "jan-kowalski-123",
    },
    {
        isActive: true,
        id: "1",
        firstName: "Anna",
        lastName: "Nowak",
        role: "Caretaker",
        login: "anna-nowak-987",
    },
];

const BaseCaretakersPage = () => {
    return (
        <Page.Root>
            <Page.Header title="Opiekunowie">
                <AddUserDialog
                    role="Caretaker"
                    trigger={
                        <Button color="jade">
                            Utwórz konto opiekuna
                            <Plus />
                        </Button>
                    }
                />
            </Page.Header>

            <Page.Content>
                <CaretakersTable caretakers={Array.from({ length: 100 }, () => [...defaultData]).flat()} />
            </Page.Content>
        </Page.Root>
    );
};

export const CaretakersPage = onlyAsCaretaker(BaseCaretakersPage);
