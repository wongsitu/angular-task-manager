import { factory, primaryKey, nullable  } from '@mswjs/data'

export const db = factory({
  task: {
    id: primaryKey(String),
    name: String,
    description: String,
    estimate: Number,
    state: String,
    inPlanningSince: nullable(Date),
    inProgressSince: nullable(Date),
    completedSince: nullable(Date),
    planningTime: Number,
    inProgressTime: Number,
    completedTime: Number,
  },
})

db.task.create({
  id: '1',
  name: 'First task',
  description: 'This is the first task',
  estimate: 5,
  state: 'Planned',
  inPlanningSince: new Date().toString(),
  inProgressSince: null,
  completedSince: null,
  planningTime: 0,
  inProgressTime: 0,
  completedTime: 0,
})
