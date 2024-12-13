import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Header } from "@/components/Header/Header";
import { onlyAsCaretaker } from "@/features/auth/hoc/withAuthorization";
import { AddUserDialog } from "@/features/users/components/AddUserDialog/AddUserDialog";

const Page = () => {
    return (
        <PageContainer>
            <Header title="Opiekunowie">
                <AddUserDialog role="Caretaker" />
            </Header>
        </PageContainer>
    );
};

export const CaretakersPage = onlyAsCaretaker(Page);
