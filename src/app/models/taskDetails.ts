export interface TaskReminderInfo {
    id?: number;
    title: string;
    description: string;
    image: string;
    status: string;
    reminderdate: Date | string;
    repeat: "year" | "month" | "two-weeks" | "week" | "day" | "hour" | "minute" | "second";
    path: string;
}