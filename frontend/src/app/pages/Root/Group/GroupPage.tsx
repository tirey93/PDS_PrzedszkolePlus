import { Page } from "@/components/Page/Page";
import { Stat } from "@/components/Stat/Stat";
import { Box, Button, Heading } from "@radix-ui/themes";

import classes from "./GroupPage.module.scss";
import { onlyAsCaregiver } from "@/features/auth/hoc/withAuthorization";
import { GroupChildrenTable } from "@/features/children/components/GroupChildrenTable/GroupChildrenTable";
import { MenuTable } from "@/features/menu/components/MenuTable/MenuTable";
import { AddChildDialog } from "@/features/children/components/AddChildDialog/AddChildDialog";
import { Plus } from "lucide-react";
import { DateRange } from "@/components/DateRange/DateRange";
import dayjs from "dayjs";
import { useDateRange } from "@/hooks/useDateRange/useDateRange";
import { useGetChildrenByGroup } from "@/features/children/hooks/useGetChildrenByGroup";
import { useGetOwnGroup } from "@/features/groups/hooks/useGetOwnGroup";
import { useGetMenuByGroup } from "@/features/menu/hooks/useGetMenuByGroup";
import { AddMenuDialog } from "@/features/menu/components/AddMenuDialog/AddMenuDialog";
import { useGetAttendanceForGroup } from "@/features/children/hooks/useGetAttendanceForGroup";

const BaseGroupPage = () => {
    const { data: group, isLoading: isGroupLoading } = useGetOwnGroup();
    const { data: children, isLoading } = useGetChildrenByGroup({ groupId: group?.id });

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

    const { data: menu, isLoading: areMealsLoading } = useGetMenuByGroup({
        groupId: group?.id,
        from: mealsDateRangeStart,
        to: mealsDateRangeEnd,
    });

    const { data: attendance, isLoading: isAttendanceLoading } = useGetAttendanceForGroup({
        groupId: group?.id,
        from: attendanceDateRangeStart,
        to: attendanceDateRangeStart,
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
                                <Button size="1" color="jade" variant="soft">
                                    Dodaj <Plus size={16} />
                                </Button>
                            }
                        />
                    </Box>
                    <GroupChildrenTable
                        childrenList={children ?? []}
                        attendance={attendance ?? []}
                        isLoading={isLoading || isAttendanceLoading}
                        date={attendanceDateRangeStart}
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
                    <Box className={classes.sectionHeader}>
                        <Heading as="h2">Posiłki</Heading>
                        <AddMenuDialog
                            groupId={group?.id ?? ""}
                            trigger={
                                <Button size="1" color="jade" variant="soft" disabled={!group?.id}>
                                    Dodaj <Plus size={16} />
                                </Button>
                            }
                        />
                    </Box>
                    <MenuTable
                        menu={menu ?? []}
                        groups={group ? [group] : []}
                        isLoading={areMealsLoading || isGroupLoading}
                    />
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

export const GroupPage = onlyAsCaregiver(BaseGroupPage);
