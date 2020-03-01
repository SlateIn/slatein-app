export interface TaskReminderInfo {
    id?: number;
    title: string;
    description: string;
    image: string;
    status: string;
    startDate: string;
    endDate: string;
    repeat?: 'year' | 'month' | 'two-weeks' | 'week' | 'day'| 'never';
    path: string;
}