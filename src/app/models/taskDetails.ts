export interface TaskReminderInfo {
    id?: number;
    title: string;
    desc: string;
    image: string;
    status: string;
    startDate: string;
    endDate: string;
    repeat?: 'year' | 'month' | 'two-weeks' | 'week' | 'day'| 'never';
    path: string;
}