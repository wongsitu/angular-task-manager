import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddTaskFormComponent } from './components/add-task-form/add-task-form.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CardComponent } from './components/card/card.component';
import { TaskService } from './services/task.service';
import { Task, TaskState } from './services/task.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddTaskFormComponent, CdkDropList, CdkDrag, CardComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'task-tracker';
  planned: Task[] = [];
  completed: Task[] = [];
  inProgress: Task[] = [];

  totalPlannedHours: number = 0;
  totalInProgressHours: number = 0;
  totalCompletedHours: number = 0;

  constructor(private taskService: TaskService) {
    this.taskService.tasksSubject$.subscribe((tasks) => {
      this.planned = tasks.filter((task) => task.state === 'Planned');
      this.inProgress = tasks.filter((task) => task.state === 'InProgress');
      this.completed = tasks.filter((task) => task.state === 'Completed');

      this.totalPlannedHours = this.planned.reduce((acc, task) => acc + task.estimate, 0);
      this.totalInProgressHours = this.inProgress.reduce((acc, task) => acc + task.estimate, 0);
      this.totalCompletedHours = this.completed.reduce((acc, task) => acc + task.estimate, 0);
    })
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
