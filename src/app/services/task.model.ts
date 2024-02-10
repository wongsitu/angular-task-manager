export type TaskState = 'Planned' | 'InProgress' | 'Completed';

export interface Task {
  id: string;
  name: string;
  description: string;
  estimate: number;
  state: TaskState;
  inPlanningSince: string | undefined;
  inProgressSince: string | undefined;
  completedSince: string | undefined;
}
