export type TaskState = 'Planned' | 'InProgress' | 'Completed';

export interface Task {
  id: string;
  name: string;
  description: string;
  estimate: number;
  state: TaskState;
}
