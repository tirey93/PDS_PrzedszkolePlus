import { Button } from "@radix-ui/themes";
import { Plus } from "lucide-react";
import { Page } from "@/components/Page/Page";
import { ThreadsTable } from "@/features/threads/components/ThreadsTable/ThreadsTable";
import { Thread } from "@/features/threads/types/Thread";
import { AddThreadDialog } from "@/features/threads/components/AddThreadDialog/AddThreadDialog";
import { useGetAllUsers } from "@/features/users/hooks/useGetAllUsers";

const mockThreads: Thread[] = [
    {
        id: "1",
        participant: {
            id: "1",
            role: "Admin",
            firstName: "Jan",
            lastName: "Kowalski",
            isActive: true,
            login: "jan-kowalski-123",
        },
        createdAt: new Date(),
        subject: "Prośba o przepisanie dziecka do innej grupy",
        messages: [
            {
                id: "1",
                createdAt: new Date(),
                threadId: "1",
                content:
                    "Dzień dobry, czy jest możliwość przepisania mojego dziecka do innej grupy? Pozdrawiam Pozdrawiam Pozdrawiam Pozdrawiam Pozdrawiam Pozdrawiam Pozdrawiam Pozdrawiam Pozdrawiam Pozdrawiam Pozdrawiam Pozdrawiam Pozdrawiam Pozdrawiam Pozdrawiam Pozdrawiam Pozdrawiam Pozdrawiam Pozdrawiam Pozdrawiam ",
                seen: true,
                sender: {
                    id: "1",
                    role: "Admin",
                    firstName: "Jan",
                    lastName: "Kowalski",
                    isActive: true,
                    login: "jan-kowalski-123",
                },
            },
            {
                id: "2",
                createdAt: new Date(),
                threadId: "1",
                content: "Dzień dobry, oczywiście. Zapraszam do placówki w celu podpisania dokumentów.",
                seen: false,
                sender: {
                    id: "1",
                    role: "Admin",
                    firstName: "Jan",
                    lastName: "Kowalski",
                    isActive: true,
                    login: "jan-kowalski-123",
                },
            },
        ],
    },
    {
        id: "1",
        participant: {
            id: "1",
            role: "Admin",
            firstName: "Jan",
            lastName: "Kowalski",
            isActive: true,
            login: "jan-kowalski-123",
        },
        createdAt: new Date(),
        subject: "Nieobecność",
        messages: [
            {
                id: "1",
                createdAt: new Date(),
                threadId: "1",
                content: "Dzień dobry, czy jest możliwość przepisania mojego dziecka do innej grupy? Pozdrawiam",
                seen: true,
                sender: {
                    id: "4",
                    role: "Admin",
                    firstName: "Jan",
                    lastName: "Kowalski",
                    isActive: true,
                    login: "jan-kowalski-123",
                },
            },
            {
                id: "2",
                createdAt: new Date(),
                threadId: "1",
                content: "Dzień dobry, oczywiście. Zapraszam do placówki w celu podpisania dokumentów.",
                seen: true,
                sender: {
                    id: "2",
                    role: "Admin",
                    firstName: "Jan",
                    lastName: "Kowalski",
                    isActive: true,
                    login: "jan-kowalski-123",
                },
            },
            {
                id: "4",
                createdAt: new Date(),
                threadId: "1",
                content: "Super, dziękuję",
                seen: true,
                sender: {
                    id: "4",
                    role: "Admin",
                    firstName: "Jan",
                    lastName: "Kowalski",
                    isActive: true,
                    login: "jan-kowalski-123",
                },
            },
        ],
    },
];

export const MessagesPage = () => {
    const { data } = useGetAllUsers();

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
                <ThreadsTable threads={mockThreads} />
            </Page.Content>
        </Page.Root>
    );
};
