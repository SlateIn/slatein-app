export interface TaskReminderInfo {
  id?: number;
  title: string;
  desc: string;
  image: string;
  status: string;
  startTimePeriod: string;
  endTimePeriod?: string;
  repeat?: 'year' | 'month' | 'two-weeks' | 'week' | 'day' | 'never';
  favourite: boolean;
  onlyEndTime: string
  neverEnd: boolean;
}
