
export interface Task {
    id: number;
    task: string;
    status: 'NS' | 'IP' | 'C'; 
    created_at: string;
  }
  