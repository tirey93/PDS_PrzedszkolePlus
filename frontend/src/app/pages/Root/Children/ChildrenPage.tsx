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
import { useGetMenuByChildren } from "@/features/menu/hooks/useGetMenuByChildren";
import { onlyAsParent } from "@/features/auth/hoc/withAuthorization";
import { useGetAttendanceForOwnChildren } from "@/features/children/hooks/useGetAttendanceForOwnChildren";
import { useMemo } from "react";
import { Group } from "@/features/groups/types/Group";
import { formatISODate } from "@/utils/dateFormat";
import { getAttendanceStats } from "@/features/children/utils/getAttendanceStats";

const BaseChildrenPage = () => {
    const now = dayjs();
    const { data: children, isLoading } = useGetOwnChildren();

    const groups = useMemo(
        (): Group[] => children?.map((child) => child.group).filter((group) => !!group) ?? [],
        [children]
    );

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

    const { data: menu, isLoading: areMealsLoading } = useGetMenuByChildren({
        children,
        from: mealsDateRangeStart,
        to: mealsDateRangeEnd,
    });

    const { data: dailyAttendance, isLoading: isAttendanceLoading } = useGetAttendanceForOwnChildren({
        from: attendanceDateRangeStart,
        to: attendanceDateRangeStart,
    });

    const { data: monthlyAttendance } = useGetAttendanceForOwnChildren({
        from: formatISODate(dayjs(now).subtract(30, "days")),
        to: formatISODate(now),
    });

    const monthlyAttendanceStats = monthlyAttendance ? getAttendanceStats(monthlyAttendance) : null;

    return (
        <Page.Root>
            <Page.Header title="Moje dzieci" />

            <Page.Content>
                <Box className={classes.section}>
                    <Heading as="h2">Statystyki</Heading>
                    <Box className={classes.statsContainer}>
                        <Stat
                            name="Dzisiejsza frekwencja"
                            description="Względem średniej z ostatnich 30 dni"
                            value={monthlyAttendanceStats?.averageAttendanceToday}
                            diff={monthlyAttendanceStats?.trend}
                            type="percentage"
                        />
                    </Box>
                </Box>

                <Box className={classes.section}>
                    <Heading as="h2">Dzieci</Heading>
                    <OwnChildrenTable
                        date={attendanceDateRangeStart}
                        childrenList={children ?? []}
                        attendance={dailyAttendance ?? []}
                        isLoading={isLoading || isAttendanceLoading}
                    />
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
                    <MenuTable menu={menu ?? []} groups={groups} isLoading={areMealsLoading || isLoading} />
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

export const ChildrenPage = onlyAsParent(BaseChildrenPage);
