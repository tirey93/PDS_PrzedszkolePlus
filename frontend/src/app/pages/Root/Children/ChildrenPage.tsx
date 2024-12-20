import { Page } from "@/components/Page/Page";
import { Stat } from "@/components/Stat/Stat";
import { Box, Heading } from "@radix-ui/themes";

import classes from "./ChildrenPage.module.scss";
import { OwnChildrenTable } from "@/features/children/components/OwnChildrenTable/OwnChildrenTable";
import { MenuTable } from "@/features/menu/components/MenuTable/MenuTable";
import { DateRange } from "@/components/DateRange/DateRange";
import dayjs from "dayjs";
import { useDateRange } from "@/hooks/useDateRange/useDateRange";
import { useGetOwnChildren } from "@/features/children/hooks/useGetOwnChildren";

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
    const { data: children, isLoading } = useGetOwnChildren();

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
                    <OwnChildrenTable childrenList={children ?? []} isLoading={isLoading} />
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

// export const ChildrenPage = onlyAsParent(BaseChildrenPage);
export const ChildrenPage = BaseChildrenPage;
