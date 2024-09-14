export interface Task {
    id?: number;
    user_id: number;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    due_date: Date;
  }
  