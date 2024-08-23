export interface TaskI {
  id: number;
  task_desc: string;
  status: 'NS' | 'IP' | 'C';
  created_at: string;
}

export interface TaskInputI {
  task_desc: string;
  status: 'NS' | 'IP' | 'C';
}

export enum StatusEnum {
  NotStarted = 'NS',
  InProgress = 'IP',
  Completed = 'C',
}

export type Status = 'NS' | 'IP' | 'C';
