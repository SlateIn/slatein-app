export interface TaskReminderInfo {
  id?: number;
  title: string;
  desc: string;
  image: string;
  status: string;
  startTimePeriod: string;
  endTimePeriod?: string;
  repeat?: string;
  favourite: boolean;
  onlyEndTime: string;
  neverEnd: boolean;
}
