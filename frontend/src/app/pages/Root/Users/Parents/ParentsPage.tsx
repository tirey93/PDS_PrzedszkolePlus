import { Page } from "@/components/Page/Page";
import { onlyAsCaretaker } from "@/features/auth/hoc/withAuthorization";
import { AddUserDialog } from "@/features/users/components/AddUserDialog/AddUserDialog";
import { Button } from "@radix-ui/themes";
import { Plus } from "lucide-react";
import { ParentsTable } from "@/features/users/components/ParentsTable/ParentsTable";
import { User } from "@/types/User";
import { useGetAllUsers } from "@/features/users/hooks/useGetAllUsers";

const BaseParentsPage = () => {
    // TODO: Handle loading state, handle error state
    const { data } = useGetAllUsers();
    const parents: User[] = data?.filter((u) => u.role === "User") ?? [];

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
                <ParentsTable parents={parents} />
            </Page.Content>
        </Page.Root>
    );
};

export const ParentsPage = onlyAsCaretaker(BaseParentsPage);
