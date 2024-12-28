import dayjs from "dayjs";

export const formatISODate = (date: Date | dayjs.Dayjs) => dayjs(date).startOf("day").format("YYYY-MM-DD");
