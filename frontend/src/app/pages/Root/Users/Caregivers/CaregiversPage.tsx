import { onlyAsCaregiver } from "@/features/auth/hoc/withAuthorization";
import { AddUserDialog } from "@/features/users/components/AddUserDialog/AddUserDialog";
import { Plus } from "lucide-react";
import { Button } from "@radix-ui/themes";
import { CaregiversTable } from "@/features/users/components/CaretakersTable/CaregiversTable";
import { Page } from "@/components/Page/Page";
import { useGetUsersByRole } from "@/features/users/hooks/useGetUsersByRole";

const BaseCaregiversPage = () => {
    const { data, isLoading } = useGetUsersByRole("Admin");

    return (
        <Page.Root>
            <Page.Header title="Opiekunowie">
                <AddUserDialog
                    role="Admin"
                    trigger={
                        <Button color="jade">
                            Utwórz konto opiekuna
                            <Plus />
                        </Button>
                    }
                />
            </Page.Header>

            <Page.Content>
                <CaregiversTable caregivers={data ?? []} isLoading={isLoading} />
            </Page.Content>
        </Page.Root>
    );
};

export const CaregiversPage = onlyAsCaregiver(BaseCaregiversPage);
