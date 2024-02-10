import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from './task.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    return this.http.delete<Task>(`/tasks/${task.id}`)
  }

  updateTask({ id, ...rest }: Task) {
    return this.http.put<Task>(`/tasks/${id}`, rest)
  }

  // public addTask(task: Task) {
  //   const prevState = this.tasksSubjectSource.getValue()
  //   this.tasksSubjectSource.next([...prevState, task]);
  // }

  // public removeTask(task: Task) {
  //   const prevState = this.tasksSubjectSource.getValue()
  //   this.tasksSubjectSource.next(prevState.filter((t) => t.id !== task.id));
  // }

  // public updateTask(task: Task) {
  //   const prevState = this.tasksSubjectSource.getValue()
  //   let newTask = { ...task };
  //   const prevTask = prevState.find((t) => t.id === task.id);

  //   if (prevTask?.state !== newTask.state) {
  //     const currentDate = new Date();
  //     if (newTask?.state === 'Planned') {
  //       newTask.inPlanningSince = currentDate.toDateString();

  //       // if (prevTask?.state === 'InProgress' && prevTask.inProgressSince) {
  //       //   newTask.inProgressTime += Math.round((currentDate.getTime() - prevTask.inProgressSince.getTime()) / 1000);
  //       // }
  //       // else if (prevTask?.state === 'Completed' && prevTask.completedSince) {
  //       //   newTask.completedTime += Math.round((currentDate.getTime() - prevTask.completedSince.getTime()) / 1000);
  //       // }
  //       // else if (prevTask?.state === 'Planned' && prevTask.inPlanningSince) {
  //       //   newTask.planningTime += Math.round((currentDate.getTime() - prevTask.inPlanningSince.getTime()) / 1000);
  //       // }

  //     } else if (newTask?.state === 'InProgress') {
  //       newTask.inProgressSince = currentDate.toDateString();

  //       // if (prevTask?.state === 'InProgress' && prevTask.inProgressSince) {
  //       //   newTask.inProgressTime += Math.round((currentDate.getTime() - prevTask.inProgressSince.getTime()) / 1000);
  //       // }
  //       // else if (prevTask?.state === 'Completed' && prevTask.completedSince) {
  //       //   newTask.completedTime += Math.round((currentDate.getTime() - prevTask.completedSince.getTime()) / 1000);
  //       // }
  //       // else if (prevTask?.state === 'Planned' && prevTask.inPlanningSince) {
  //       //   newTask.planningTime += Math.round((currentDate.getTime() - prevTask.inPlanningSince.getTime()) / 1000);
  //       // }

  //     } else {
  //       newTask.completedSince = currentDate.toDateString();

  //       // if (prevTask?.state === 'InProgress' && prevTask.inProgressSince) {
  //       //   newTask.inProgressTime += Math.round((currentDate.getTime() - prevTask.inProgressSince.getTime()) / 1000);
  //       // }
  //       // else if (prevTask?.state === 'Completed' && prevTask.completedSince) {
  //       //   newTask.completedTime += Math.round((currentDate.getTime() - prevTask.completedSince.getTime()) / 1000);
  //       // }
  //       // else if (prevTask?.state === 'Planned' && prevTask.inPlanningSince) {
  //       //   newTask.planningTime += Math.round((currentDate.getTime() - prevTask.inPlanningSince.getTime()) / 1000);
  //       // }
  //     }
  //   }

  //   this.tasksSubjectSource.next(prevState.map((t) => (t.id === task.id ? newTask : t)));

  //   // Do an http call to update the task in the backend

  // }
}
