import { Page } from "@/components/Page/Page";
import { Stat } from "@/components/Stat/Stat";
import { Box, Heading } from "@radix-ui/themes";

import classes from "./GroupPage.module.scss";
import { onlyAsCaretaker } from "@/features/auth/hoc/withAuthorization";
import { GroupChildrenTable } from "@/features/children/components/GroupChildrenTable/GroupChildrenTable";
import { Child } from "@/features/children/types/Child";

const mockChildren: Child[] = [
    {
        id: "1",
        birthDate: new Date(),
        firstName: "Dawid",
        lastName: "Nowak",
        parent: {
            id: "1",
            isActive: true,
            role: "User",
            firstName: "Anna",
            lastName: "Nowak",
            login: "anna-nowak-123",
        },
        caretaker: {
            id: "2",
            isActive: true,
            role: "Admin",
            firstName: "Jan",
            lastName: "Kowalski",
            login: "jan-kowalski-987",
        },
        group: "Pszczółki",
    },
    {
        id: "2",
        birthDate: new Date(),
        firstName: "Maja",
        lastName: "Nowak",
        parent: {
            id: "1",
            isActive: true,
            role: "User",
            firstName: "Anna",
            lastName: "Nowak",
            login: "anna-nowak-123",
        },
        caretaker: {
            id: "3",
            isActive: true,
            role: "Admin",
            firstName: "Monika",
            lastName: "Nowacka",
            login: "monika-nowacka-123",
        },
        group: "Skrzaty",
    },
];

const BaseGroupPage = () => {
    return (
        <Page.Root>
            <Page.Header title="Moja grupa" />

            <Page.Content>
                <Heading as="h2">Dzieci</Heading>
                <Box className={classes.statsContainer}>
                    <Stat
                        name="Łączna liczba dzieci"
                        description="Względem średniej z poprzedniego miesiąca"
                        value={20}
                        diff={10}
                        type="numerical"
                    />
                    <Stat
                        name="Frekwencja"
                        description="Względem średniej z poprzedniego miesiąca"
                        value={85}
                        diff={-10}
                        type="percentage"
                    />
                    <Stat
                        name="Nieobecności"
                        description="Względem poprzedniego dnia szkolnego"
                        value={3}
                        diff={-25}
                        type="numerical"
                    />
                </Box>

                <GroupChildrenTable childrenList={mockChildren} />
            </Page.Content>
        </Page.Root>
    );
};

export const GroupPage = onlyAsCaretaker(BaseGroupPage);
