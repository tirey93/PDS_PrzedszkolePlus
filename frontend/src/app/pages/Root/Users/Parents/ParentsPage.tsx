import { Page } from "@/components/Page/Page";
import { onlyAsCaretaker } from "@/features/auth/hoc/withAuthorization";
import { AddUserDialog } from "@/features/users/components/AddUserDialog/AddUserDialog";
import { Button } from "@radix-ui/themes";
import { Plus } from "lucide-react";
import { ParentsTable } from "@/features/users/components/ParentsTable/ParentsTable";
import { User } from "@/types/User";

const defaultData: User[] = [
    {
        isActive: true,
        id: "2",
        firstName: "Jan",
        lastName: "Kowalski",
        role: "Parent",
        login: "jan-kowalski-123",
    },
    {
        isActive: true,
        id: "1",
        firstName: "Anna",
        lastName: "Nowak",
        role: "Parent",
        login: "anna-nowak-987",
    },
];

const BaseParentsPage = () => {
    return (
        <Page.Root>
            <Page.Header title="Rodzice">
                <AddUserDialog
                    role="Parent"
                    trigger={
                        <Button color="jade">
                            Utwórz konto rodzica
                            <Plus />
                        </Button>
                    }
                />
            </Page.Header>

            <Page.Content>
                <ParentsTable parents={Array.from({ length: 100 }, () => [...defaultData]).flat()} />
            </Page.Content>
        </Page.Root>
    );
};

export const ParentsPage = onlyAsCaretaker(BaseParentsPage);
