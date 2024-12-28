import { Button } from "@radix-ui/themes";
import { Plus } from "lucide-react";
import { Page } from "@/components/Page/Page";
import { ThreadsTable } from "@/features/threads/components/ThreadsTable/ThreadsTable";
import { AddThreadDialog } from "@/features/threads/components/AddThreadDialog/AddThreadDialog";
import { useGetAllUsers } from "@/features/users/hooks/useGetAllUsers";
import { useGetAllThreads } from "@/features/threads/hooks/useGetAllThreads";

export const MessagesPage = () => {
    const { data, isLoading } = useGetAllUsers();
    const { data: threads, isLoading: areThreadsLoading } = useGetAllThreads(data ?? []);

    return (
        <Page.Root>
            <Page.Header title="Wiadomości">
                <AddThreadDialog
                    users={data ?? []}
                    trigger={
                        <Button color="jade">
                            Nowy wątek
                            <Plus />
                        </Button>
                    }
                />
            </Page.Header>

            <Page.Content>
                <ThreadsTable threads={threads ?? []} isLoading={isLoading || areThreadsLoading} />
            </Page.Content>
        </Page.Root>
    );
};
