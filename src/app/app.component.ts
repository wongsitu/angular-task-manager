import { Component } from '@angular/core';
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
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'task-tracker';
  planned: Task[] = [];
  completed: Task[] = [];
  inProgress: Task[] = [];

  constructor(private taskService: TaskService) {
    this.taskService.tasksSubject$.subscribe((tasks) => {
      this.planned = tasks.planned;
      this.inProgress = tasks.inProgress;
      this.completed = tasks.completed;
    })
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const updatedTask = { ...event.previousContainer.data[event.currentIndex], state: event.container.id as TaskState }
      this.taskService.updateTaskState(updatedTask);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
