import { Page } from "@/components/Page/Page";
import { onlyAsCaregiver } from "@/features/auth/hoc/withAuthorization";
import { AddUserDialog } from "@/features/users/components/AddUserDialog/AddUserDialog";
import { Button } from "@radix-ui/themes";
import { Plus } from "lucide-react";
import { ParentsTable } from "@/features/users/components/ParentsTable/ParentsTable";
import { useGetUsersByRole } from "@/features/users/hooks/useGetUsersByRole";

const BaseParentsPage = () => {
    const { data, isLoading } = useGetUsersByRole("User");

    return (
        <Page.Root>
            <Page.Header title="Rodzice">
                <AddUserDialog
                    role="User"
                    trigger={
                        <Button color="jade">
                            Utwórz konto rodzica
                            <Plus />
                        </Button>
                    }
                />
            </Page.Header>

            <Page.Content>
                <ParentsTable parents={data ?? []} isLoading={isLoading} />
            </Page.Content>
        </Page.Root>
    );
};

export const ParentsPage = onlyAsCaregiver(BaseParentsPage);
