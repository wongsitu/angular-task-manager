import { http, HttpResponse } from 'msw'
import { db } from './db'
import { Task } from '../app/services/task.model'

export const handlers = [
  http.get('/tasks', () => {
    const response = db.task.getAll()

    return HttpResponse.json(response)
  }),
  http.post('/tasks', async ({ request }) => {
    const data = await request.json() as Task | null

    if (!data) {
      return new HttpResponse(null, { status: 400, statusText: 'Bad request' })
    }

    const task = db.task.create(data)

    return HttpResponse.json(task)
  }),
  http.delete('/tasks/:id', ({ params }) => {
    if (!params['id']) {
      return new HttpResponse(null, { status: 400, statusText: 'Bad request'})
    }

    const task = db.task.delete({
      where: {
        id: {
          equals: params['id'] as string
        }
      }
    })

    if (!task) {
      return new HttpResponse(null, { status: 404, statusText: 'Task not found'})
    }

    return HttpResponse.json(task)
  }),
  http.put('/tasks/:id', async ({ params, request }) => {
    if (!params['id']) {
      return new HttpResponse(null, { status: 400, statusText: 'Bad request'})
    }

    const task = await request.json() as Partial<Omit<Task, 'id'>> | null

    if (!task) {
      return new HttpResponse(null, { status: 400, statusText: 'Bad request' })
    }

    const prevTask = db.task.findFirst({
      where: {
        id: {
          equals: params['id'] as string
        }
      }
    })

    const newTask = db.task.update({
      where: {
        id: {
          equals: params['id'] as string
        }
      },
      data: {
        ...prevTask,
        ...task,
      }
    })

    return HttpResponse.json(newTask)
  }),
]
