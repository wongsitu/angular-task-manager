import { factory, primaryKey } from '@mswjs/data'
import { v4 as uuidv4 } from 'uuid';

export const db = factory({
  task: {
    id: primaryKey(String),
    name: String,
    description: String,
    estimate: Number,
    state: String,
  },
})

db.task.create({
  id: uuidv4(),
  name: 'First task',
  description: 'This is the first task',
  estimate: 5,
  state: 'Planned',
})
