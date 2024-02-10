import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task, TaskState } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubjectSource = new BehaviorSubject<{
    planned: Task[];
    inProgress: Task[];
    completed: Task[];
  }>({
    planned: [],
    inProgress: [],
    completed: [],
  });
  public tasksSubject$ = this.tasksSubjectSource.asObservable();

  public addTask(task: Task) {
    const prevState = this.tasksSubjectSource.getValue()

    if (task.state === 'Planned') {
      this.tasksSubjectSource.next({
        ...prevState,
        planned: [...prevState.planned, task],
      });
    }
    if (task.state === 'InProgress') {
      this.tasksSubjectSource.next({
        ...prevState,
        inProgress: [...prevState.inProgress, task],
      });
    }
    if (task.state === 'Completed') {
      this.tasksSubjectSource.next({
        ...prevState,
        completed: [...prevState.completed, task],
      });
    }
  }

  public removeTask(task: Task) {
    const prevState = this.tasksSubjectSource.getValue()

    this.tasksSubjectSource.next({
      ...prevState,
      planned: prevState.planned.filter((t) => t.id !== task.id),
      inProgress: prevState.inProgress.filter((t) => t.id !== task.id),
      completed: prevState.completed.filter((t) => t.id !== task.id),
    });
  }

  public updateTaskState(task: Task) {
    this.removeTask(task)
    this.addTask(task);
  }
}
