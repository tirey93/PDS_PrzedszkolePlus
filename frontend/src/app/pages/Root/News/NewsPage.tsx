import { Button } from "@radix-ui/themes";
import { Plus } from "lucide-react";
import { Header } from "@/components/Header/Header";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { NewsItem } from "@/features/news/components/NewsItem/NewsItem";
import { NewsList } from "@/features/news/components/NewsList/NewsList";
import { AccessGuard } from "@/features/auth/components/AccessGuard/AccessGuard";
import { AddNewsDialog } from "@/features/news/components/AddNewsDialog/AddNewsDialog";

export const NewsPage = () => {
    return (
        <PageContainer>
            <Header title="Aktualności">
                <AccessGuard requiredAccess="Caretaker">
                    <AddNewsDialog
                        trigger={
                            <Button color="jade">
                                Nowe ogłoszenie
                                <Plus />
                            </Button>
                        }
                    />
                </AccessGuard>
            </Header>

            <NewsList>
                <NewsItem {...mockNews} />
                <NewsItem {...mockNews2} />
                <NewsItem {...mockNews} />
                <NewsItem {...mockNews2} />
                <NewsItem {...mockNews} />
                <NewsItem {...mockNews2} />
                <NewsItem {...mockNews} />
                <NewsItem {...mockNews} />
                <NewsItem {...mockNews} />
                <NewsItem {...mockNews} />
                <NewsItem {...mockNews} />
                <NewsItem {...mockNews} />
                <NewsItem {...mockNews} />
                <NewsItem {...mockNews} />
                <NewsItem {...mockNews} />
                <NewsItem {...mockNews} />
                <NewsItem {...mockNews} />
                <NewsItem {...mockNews} />
                <NewsItem {...mockNews} />
                <NewsItem {...mockNews} />
                <NewsItem {...mockNews} />
                <NewsItem {...mockNews} />
                <NewsItem {...mockNews} />
                <NewsItem {...mockNews} />
            </NewsList>
        </PageContainer>
    );
};

const mockNews = {
    id: "1",
    title: "Zmiana godziny podawania obiadów",
    content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.",
    createdAt: new Date(),
    imageSrc:
        "https://images.unsplash.com/photo-1628191138144-a51eeee8e2c3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const mockNews2 = {
    id: "2",
    title: "Zapisy do nowej grupy",
    content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    createdAt: new Date(),
    imageSrc:
        "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};
