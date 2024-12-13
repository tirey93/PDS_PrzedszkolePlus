import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Header } from "@/components/Header/Header";
import { Button } from "@radix-ui/themes";
import { Plus } from "lucide-react";

export const MessagesPage = () => {
    return (
        <PageContainer>
            <Header title="Wiadomości">
                <Button color="jade">
                    Nowy wątek
                    <Plus />
                </Button>
            </Header>
        </PageContainer>
    );
};
