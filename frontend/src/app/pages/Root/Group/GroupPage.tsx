import { Page } from "@/components/Page/Page";
import { Stat } from "@/components/Stat/Stat";
import { Box, Button, Card, Heading, Spinner, Text } from "@radix-ui/themes";

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
import { formatISODate } from "@/utils/dateFormat";
import { CreateGroupForm } from "@/features/groups/components/CreateGroupForm/CreateGroupForm";
import { useCreateGroup } from "@/features/groups/hooks/useCreateGroup";
import { CreateGroupFormInputs } from "@/features/groups/components/CreateGroupForm/hooks/useCreateGroupForm";
import { useUser } from "@/features/auth/hooks/useUser";
import { toast } from "sonner";
import { getAttendanceStats } from "@/features/children/utils/getAttendanceStats";

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

    const { data: dailyAttendance, isLoading: isAttendanceLoading } = useGetAttendanceForGroup({
        groupId: group?.id,
        from: attendanceDateRangeStart,
        to: attendanceDateRangeStart,
    });

    const now = dayjs();

    const { data: monthlyAttendance } = useGetAttendanceForGroup({
        groupId: group?.id,
        from: formatISODate(dayjs(now).subtract(30, "days")),
        to: formatISODate(now),
    });

    const monthlyAttendanceStatus = monthlyAttendance ? getAttendanceStats(monthlyAttendance) : null;

    const { mutateAsync, isPending } = useCreateGroup();
    const { user } = useUser();

    const createGroup = async (inputs: CreateGroupFormInputs) => {
        if (!user) {
            return;
        }

        try {
            await mutateAsync({ name: inputs.name, caregiverId: user.id });
            toast.success("Grupa została utworzona.");
        } catch (e) {
            toast.error("Nie udało się utworzyć grupy.");
        }
    };

    if (!group) {
        return (
            <Page.Root>
                <Page.Header title="Moja grupa" />
                <Page.Content>
                    <div className={classes.noContentWrapper}>
                        {isGroupLoading ? (
                            <Spinner />
                        ) : (
                            <Card className={classes.noGroupBanner}>
                                <Heading as="h2">Utwórz grupę</Heading>
                                <Text>
                                    Wygląda na to, że nie masz żadnej grupy. Możesz ją teraz utworzyć, wystarczy że
                                    podasz jej nazwę.
                                </Text>
                                <CreateGroupForm onSubmit={createGroup} isLoading={isPending} />
                            </Card>
                        )}
                    </div>
                </Page.Content>
            </Page.Root>
        );
    }

    return (
        <Page.Root>
            <Page.Header title={`Moja grupa - "${group.name}"`} />

            <Page.Content>
                <Box className={classes.section}>
                    <Heading as="h2">Statystyki</Heading>
                    <Box className={classes.statsContainer}>
                        <Stat
                            name="Dzisiejsza frekwencja"
                            description="Względem średniej z ostatnich 30 dni"
                            value={monthlyAttendanceStatus?.averageAttendanceToday}
                            diff={monthlyAttendanceStatus?.trend}
                            type="percentage"
                        />
                    </Box>
                </Box>

                <Box className={classes.section}>
                    <Box className={classes.sectionHeader}>
                        <Heading as="h2">Dzieci</Heading>
                        <AddChildDialog
                            groupId={group.id}
                            trigger={
                                <Button size="1" color="jade" variant="soft">
                                    Dodaj <Plus size={16} />
                                </Button>
                            }
                        />
                    </Box>
                    <GroupChildrenTable
                        childrenList={children ?? []}
                        attendance={dailyAttendance ?? []}
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
