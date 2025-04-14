import { Page } from "@/components/Page/Page";
import { onlyAsAuthenticated } from "@/features/auth/hoc/withAuthorization";

import { CreateClassDialog } from "@/features/classes/components/CreateClassDialog/CreateClassDialog.tsx";
import { Button } from "@radix-ui/themes";

const BaseClassesPage = () => {
    return (
        <Page.Root>
            <Page.Header title="Klasy">
                <CreateClassDialog trigger={<Button color="jade">Dodaj klasę</Button>} />
            </Page.Header>

            <Page.Content></Page.Content>
        </Page.Root>
    );
};

export const ClassesPage = onlyAsAuthenticated(BaseClassesPage);
