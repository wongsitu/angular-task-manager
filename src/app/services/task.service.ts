import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from './task.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public tasksSubjectSource = new BehaviorSubject<Task[]>([]);
  public tasksSubject$ = this.tasksSubjectSource.asObservable();

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<Task[]>('/tasks').subscribe({
      next: (data) => {
        this.tasksSubjectSource.next(data);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    })
  }

  createTask(task: Task) {
    return this.http.post<Task>('/tasks', task)
  }

  deleteTask(task: Task) {
    return this.http.delete<Task>(`/tasks/${task.id}`).subscribe({
      next: (data) => {
        const prevState = this.tasksSubjectSource.getValue()
        this.tasksSubjectSource.next(prevState.filter((t) => t.id !== data.id));
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    })
  }

  updateTask({ id, ...rest }: Task) {
    return this.http.put<Task>(`/tasks/${id}`, rest).subscribe({
      next: (data) => {
        const prevState = this.tasksSubjectSource.getValue()
        this.tasksSubjectSource.next(prevState.map((t) => t.id === data.id ? data : t));
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    })
  }
}
