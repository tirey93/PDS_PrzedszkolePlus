import { useCallback, useMemo, useState } from "react";
import dayjs from "dayjs";

type UseDateRangeOptions = {
    start: Date;
    length: number;
};

export const useDateRange = ({ start, length }: UseDateRangeOptions) => {
    const [date, setDate] = useState(start);

    const increment = useCallback(() => {
        setDate((previous) => dayjs(previous).add(length, "days").startOf("day").toDate());
    }, [length]);

    const decrement = useCallback(() => {
        setDate((previous) => dayjs(previous).subtract(length, "days").startOf("day").toDate());
    }, [length]);

    const reset = useCallback(() => {
        setDate(start);
    }, [start]);

    const end = useMemo(
        () =>
            dayjs(date)
                .add(length - 1, "days")
                .endOf("day")
                .toDate(),
        [date, length]
    );

    return { increment, decrement, start: date, end, reset };
};
