import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddTaskFormComponent } from '../../components/add-task-form/add-task-form.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CardComponent } from '../../components/card/card.component';
import { TaskService } from '../../services/task.service';
import { Task, TaskState } from '../../services/task.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board-page',
  standalone: true,
  imports: [RouterOutlet, AddTaskFormComponent, CdkDropList, CdkDrag, CardComponent, CommonModule],
  templateUrl: './board-page.component.html',
})
export class BoardPageComponent implements OnInit {
  planned: Task[] = [];
  completed: Task[] = [];
  inProgress: Task[] = [];

  plannedHours$: Observable<number>;
  inProgressHours$: Observable<number>;
  completedHours$: Observable<number>;

  constructor(private taskService: TaskService) {
    this.taskService.tasksSubject$.subscribe((tasks) => {
      this.planned = tasks.filter((task) => task.state === 'Planned');
      this.inProgress = tasks.filter((task) => task.state === 'InProgress');
      this.completed = tasks.filter((task) => task.state === 'Completed');
    })

    this.plannedHours$ = this.taskService.plannedHoursSubject$;
    this.inProgressHours$ = this.taskService.inProgressHoursSubject$;
    this.completedHours$ = this.taskService.completedHoursSubject$;
  }

  ngOnInit() {
    this.taskService.getTasks()
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const updatedTask = { ...event.previousContainer.data[event.previousIndex], state: event.container.id as TaskState }

      this.taskService.updateTask(updatedTask);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
