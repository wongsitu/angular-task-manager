import { z } from 'zod';
import { TaskListSchema, TaskSchema, TaskStateSchema } from './task.schemas'

export type TaskState = z.infer<typeof TaskStateSchema>;

export type Task = z.infer<typeof TaskSchema>;

export type TaskList = z.infer<typeof TaskListSchema>;
