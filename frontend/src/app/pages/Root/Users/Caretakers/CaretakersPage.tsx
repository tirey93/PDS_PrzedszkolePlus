import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Header } from "@/components/Header/Header";
import { onlyAsCaretaker } from "@/features/auth/hoc/withAuthorization";
import { AddUserDialog } from "@/features/users/components/AddUserDialog/AddUserDialog";
import { Plus } from "lucide-react";
import { Button } from "@radix-ui/themes";

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
        </PageContainer>
    );
};

export const CaretakersPage = onlyAsCaretaker(Page);
