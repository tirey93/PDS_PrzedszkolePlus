import { Page } from "@/components/Page/Page";
import { Stat } from "@/components/Stat/Stat";
import { Box } from "@radix-ui/themes";

import classes from "./ChildrenPage.module.scss";
import { OwnChildrenTable } from "@/features/children/components/OwnChildrenTable/OwnChildrenTable";
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
            role: "Parent",
            firstName: "Anna",
            lastName: "Nowak",
            login: "anna-nowak-123",
        },
        caretaker: {
            id: "2",
            isActive: true,
            role: "Caretaker",
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
            role: "Parent",
            firstName: "Anna",
            lastName: "Nowak",
            login: "anna-nowak-123",
        },
        caretaker: {
            id: "3",
            isActive: true,
            role: "Caretaker",
            firstName: "Monika",
            lastName: "Nowacka",
            login: "monika-nowacka-123",
        },
        group: "Skrzaty",
    },
];

const BaseChildrenPage = () => {
    return (
        <Page.Root>
            <Page.Header title="Moje dzieci" />

            <Page.Content>
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

                <OwnChildrenTable childrenList={mockChildren} />
            </Page.Content>
        </Page.Root>
    );
};

// export const ChildrenPage = onlyAsParent(BaseChildrenPage);
export const ChildrenPage = BaseChildrenPage;
