import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ListCardComponent } from '../../components/list-card/list-card.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Task } from '../../services/task.model';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [ListCardComponent, CommonModule, NgChartsModule],
  templateUrl: './list-page.component.html',
})
export class ListPageComponent implements OnInit {
  items$: Observable<Task[]>;

  plannedHours$: Observable<number>;
  inProgressHours$: Observable<number>;
  completedHours$: Observable<number>;

  constructor(private taskService: TaskService) {
    this.items$ = this.taskService.tasksSubject$;

    this.plannedHours$ = this.taskService.plannedHoursSubject$;
    this.inProgressHours$ = this.taskService.inProgressHoursSubject$;
    this.completedHours$ = this.taskService.completedHoursSubject$;
  }

  ngOnInit() {
    this.taskService.getTasks()
  }
}
