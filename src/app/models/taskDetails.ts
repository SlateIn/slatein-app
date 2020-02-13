export interface TaskReminderInfo {
    title: string;
    description: string;
    image: string;
    status: string;
    reminderdate: Date | string;
    repeat: string;
}