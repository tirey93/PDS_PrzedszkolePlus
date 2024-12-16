import { Button } from "@radix-ui/themes";
import { Plus } from "lucide-react";
import { Page } from "@/components/Page/Page";

export const MessagesPage = () => {
    return (
        <Page.Root>
            <Page.Header title="Wiadomości">
                <Button color="jade">
                    Nowy wątek
                    <Plus />
                </Button>
            </Page.Header>
        </Page.Root>
    );
};
