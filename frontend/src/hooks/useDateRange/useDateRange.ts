import { useCallback, useMemo, useState } from "react";
import dayjs from "dayjs";
import { formatISODate } from "@/utils/dateFormat";

type UseDateRangeOptions = {
    start: Date;
    length: number;
};

export const useDateRange = ({ start, length }: UseDateRangeOptions) => {
    const [date, setDate] = useState(formatISODate(start));

    const increment = useCallback(() => {
        setDate((previous) => formatISODate(dayjs(previous).add(length, "days").toDate()));
    }, [length]);

    const decrement = useCallback(() => {
        setDate((previous) => formatISODate(dayjs(previous).subtract(length, "days").toDate()));
    }, [length]);

    const reset = useCallback(() => {
        setDate(formatISODate(start));
    }, [start]);

    const end = useMemo(
        () =>
            formatISODate(
                dayjs(date)
                    .add(length - 1, "days")
                    .toDate()
            ),
        [date, length]
    );

    return { increment, decrement, start: date, end, reset };
};
