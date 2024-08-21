export interface TaskI {
  id: number;
  task_desc: string;
  status: 'NS' | 'IP' | 'C';
  created_at: string;
}

export enum StatusEnum {
  NotStarted = 'NS',
  InProgress = 'IP',
  Completed = 'C',
}