import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Header } from "@/components/Header/Header";
import { onlyAsCaretaker } from "@/features/auth/hoc/withAuthorization";
import { AddUserDialog } from "@/features/users/components/AddUserDialog/AddUserDialog";
import { Plus } from "lucide-react";
import { Button } from "@radix-ui/themes";
import { CaretakersTable } from "@/features/users/components/CaretakersTable/CaretakersTable";
import { User } from "@/types/User";

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

const Page = () => {
    return (
        <PageContainer>
            <Header title="Opiekunowie">
                <AddUserDialog
                    role="Caretaker"
                    trigger={
                        <Button color="jade">
                            Utwórz konto opiekuna
                            <Plus />
                        </Button>
                    }
                />
            </Header>

            <CaretakersTable caretakers={Array.from({ length: 100 }, () => [...defaultData]).flat()} />
        </PageContainer>
    );
};

export const CaretakersPage = onlyAsCaretaker(Page);
