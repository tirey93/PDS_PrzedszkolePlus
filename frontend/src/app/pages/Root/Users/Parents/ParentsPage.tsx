import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Header } from "@/components/Header/Header";
import { onlyAsCaretaker } from "@/features/auth/hoc/withAuthorization";
import { AddUserDialog } from "@/features/users/components/AddUserDialog/AddUserDialog";
import { Button } from "@radix-ui/themes";
import { Plus } from "lucide-react";

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
        </PageContainer>
    );
};

export const ParentsPage = onlyAsCaretaker(Page);
