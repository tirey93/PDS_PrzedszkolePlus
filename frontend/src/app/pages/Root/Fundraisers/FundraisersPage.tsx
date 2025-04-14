import { Page } from "@/components/Page/Page";
import { onlyAsAuthenticated } from "@/features/auth/hoc/withAuthorization";
import { Button } from "@radix-ui/themes";
import { CreateFundraiserDialog } from "@/features/fundraisers/components/CreateFundraiserDialog/CreateFundraiserDialog.tsx";

const BaseFundraisersPage = () => {
    return (
        <Page.Root>
            <Page.Header title="Zbiórki">
                <CreateFundraiserDialog trigger={<Button color="jade">Utwórz zbiórkę</Button>} />
            </Page.Header>

            <Page.Content></Page.Content>
        </Page.Root>
    );
};

export const FundraisersPage = onlyAsAuthenticated(BaseFundraisersPage);
