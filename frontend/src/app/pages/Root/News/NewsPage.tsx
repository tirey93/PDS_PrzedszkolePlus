import { Button } from "@radix-ui/themes";
import { Plus } from "lucide-react";
import { NewsItem } from "@/features/news/components/NewsItem/NewsItem";
import { NewsList } from "@/features/news/components/NewsList/NewsList";
import { AccessGuard } from "@/features/auth/components/AccessGuard/AccessGuard";
import { AddNewsDialog } from "@/features/news/components/AddNewsDialog/AddNewsDialog";
import { Page } from "@/components/Page/Page";
import { useGetAllNews } from "@/features/news/hooks/useGetAllNews";

export const NewsPage = () => {
    const { data: news } = useGetAllNews();

    return (
        <Page.Root>
            <Page.Header title="Aktualności">
                <AccessGuard requiredAccess="Admin">
                    <AddNewsDialog
                        trigger={
                            <Button color="jade">
                                Nowe ogłoszenie
                                <Plus />
                            </Button>
                        }
                    />
                </AccessGuard>
            </Page.Header>

            <Page.Content>
                <NewsList>{news?.map((newsItem) => <NewsItem key={newsItem.id} {...newsItem} />)}</NewsList>
            </Page.Content>
        </Page.Root>
    );
};
