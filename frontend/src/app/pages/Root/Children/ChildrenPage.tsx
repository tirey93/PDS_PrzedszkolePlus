import { Page } from "@/components/Page/Page";
import { Stat } from "@/components/Stat/Stat";
import { Box, Heading } from "@radix-ui/themes";

import classes from "./ChildrenPage.module.scss";
import { OwnChildrenTable } from "@/features/children/components/OwnChildrenTable/OwnChildrenTable";
import { Child } from "@/features/children/types/Child";
import { MenuTable } from "@/features/menu/api/components/MenuTable/MenuTable";

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
        groupId: "Pszczółki",
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
        groupId: "Skrzaty",
    },
];

const mockMenu = [
    {
        id: "1",
        groupId: "1",
        date: new Date(),
        breakfast: "Owsianka",
        dinner: "Gofry",
        lunch: "Rosół",
    },
];

const BaseChildrenPage = () => {
    return (
        <Page.Root>
            <Page.Header title="Moje dzieci" />

            <Page.Content>
                <Box className={classes.section}>
                    <Heading as="h2">Statystyki</Heading>
                    <Box className={classes.statsContainer}>
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
                </Box>

                <Box className={classes.section}>
                    <Heading as="h2">Dzieci</Heading>
                    <OwnChildrenTable childrenList={mockChildren} />
                </Box>

                <Box className={classes.section}>
                    <Heading as="h2">Posiłki</Heading>
                    <MenuTable menu={mockMenu} />
                </Box>
            </Page.Content>
        </Page.Root>
    );
};

// export const ChildrenPage = onlyAsParent(BaseChildrenPage);
export const ChildrenPage = BaseChildrenPage;
