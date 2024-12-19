import { Page } from "@/components/Page/Page";
import { Stat } from "@/components/Stat/Stat";
import { Box, Button, Heading } from "@radix-ui/themes";

import classes from "./GroupPage.module.scss";
import { onlyAsCaretaker } from "@/features/auth/hoc/withAuthorization";
import { GroupChildrenTable } from "@/features/children/components/GroupChildrenTable/GroupChildrenTable";
import { Child } from "@/features/children/types/Child";
import { MenuTable } from "@/features/menu/components/MenuTable/MenuTable";
import { AddChildDialog } from "@/features/children/components/AddChildDialog/AddChildDialog";
import { Plus } from "lucide-react";
import { DateRange } from "@/components/DateRange/DateRange";
import dayjs from "dayjs";
import { useDateRange } from "@/hooks/useDateRange/useDateRange";

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

const BaseGroupPage = () => {
    const {
        increment: incrementAttendanceDateRange,
        decrement: decrementAttendanceDateRange,
        start: attendanceDateRangeStart,
        reset: resetAttendanceDateRange,
    } = useDateRange({
        start: dayjs(new Date()).startOf("day").toDate(),
        length: 1,
    });

    const {
        increment: incrementMealsDateRange,
        decrement: decrementMealsDateRange,
        start: mealsDateRangeStart,
        end: mealsDateRangeEnd,
        reset: resetMealsDateRange,
    } = useDateRange({
        start: dayjs(new Date()).startOf("week").toDate(),
        length: 7,
    });

    return (
        <Page.Root>
            <Page.Header title="Moja grupa" />

            <Page.Content>
                <Box className={classes.section}>
                    <Heading as="h2">Statystyki</Heading>
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
                </Box>

                <Box className={classes.section}>
                    <Box className={classes.sectionHeader}>
                        <Heading as="h2">Dzieci</Heading>
                        <AddChildDialog
                            trigger={
                                <Button size="1" color="blue" variant="soft">
                                    Dodaj <Plus size={16} />
                                </Button>
                            }
                        />
                    </Box>
                    <GroupChildrenTable childrenList={mockChildren} />
                    <Box className={classes.sectionFooter}>
                        <DateRange
                            start={attendanceDateRangeStart}
                            onNext={incrementAttendanceDateRange}
                            onPrevious={decrementAttendanceDateRange}
                            onReset={resetAttendanceDateRange}
                        />
                    </Box>
                </Box>

                <Box className={classes.section}>
                    <Heading as="h2">Posiłki</Heading>
                    <MenuTable menu={mockMenu} />
                    <Box className={classes.sectionFooter}>
                        <DateRange
                            start={mealsDateRangeStart}
                            end={mealsDateRangeEnd}
                            onNext={incrementMealsDateRange}
                            onPrevious={decrementMealsDateRange}
                            onReset={resetMealsDateRange}
                        />
                    </Box>
                </Box>
            </Page.Content>
        </Page.Root>
    );
};

export const GroupPage = onlyAsCaretaker(BaseGroupPage);
