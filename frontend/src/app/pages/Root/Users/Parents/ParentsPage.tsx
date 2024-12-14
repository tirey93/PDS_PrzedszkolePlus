import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Header } from "@/components/Header/Header";
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

const Page = () => {
    return (
        <PageContainer>
            <Header title="Rodzice">
                <AddUserDialog
                    role="Parent"
                    trigger={
                        <Button color="jade">
                            Utwórz konto rodzica
                            <Plus />
                        </Button>
                    }
                />
            </Header>

            <ParentsTable parents={Array.from({ length: 100 }, () => [...defaultData]).flat()} />
        </PageContainer>
    );
};

export const ParentsPage = onlyAsCaretaker(Page);
