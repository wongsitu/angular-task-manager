import z from 'zod';

export const TaskStateSchema = z.union([z.literal('Planned'), z.literal('InProgress'), z.literal('Completed')]);

export const TaskSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  estimate: z.number(),
  state: TaskStateSchema,
});

export const TaskListSchema = z.array(TaskSchema);
