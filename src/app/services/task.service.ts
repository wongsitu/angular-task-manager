import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Task } from './task.model';
import { HttpClient } from '@angular/common/http';
import { TaskSchema, TaskListSchema } from './task.schemas';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasksSubjectSource = new BehaviorSubject<Task[]>([]);
  public tasksSubject$ = this._tasksSubjectSource.asObservable();

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get('/tasks')
      .pipe(map(response => TaskListSchema.parse(response)))
      .subscribe({
        next: (data) => {
          this._tasksSubjectSource.next(data);
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      })
  }

  createTask(task: Task) {
    const payload = TaskSchema.parse(task);
    return this.http.post('/tasks', payload)
      .pipe(map(response => TaskSchema.parse(response)))
      .subscribe({
        next: (data) => {
          const prevState = this._tasksSubjectSource.getValue()
          this._tasksSubjectSource.next([...prevState, data]);
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      })
  }

  deleteTask(task: Task) {
    return this.http.delete(`/tasks/${task.id}`)
      .pipe(map(response => TaskSchema.parse(response)))
      .subscribe({
        next: (data) => {
          const prevState = this._tasksSubjectSource.getValue()
          this._tasksSubjectSource.next(prevState.filter((t) => t.id !== data.id));
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      })
  }

  updateTask(task: Task) {
    const parsedTask = TaskSchema.parse(task);
    const { id, ...rest } = parsedTask

    return this.http.put(`/tasks/${id}`, rest)
      .pipe(map(response => TaskSchema.parse(response)))
      .subscribe({
        next: (data) => {
          const prevState = this._tasksSubjectSource.getValue()
          this._tasksSubjectSource.next(prevState.map((t) => t.id === data.id ? data : t));
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      })
  }
}
