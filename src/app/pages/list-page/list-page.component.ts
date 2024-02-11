import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ListCardComponent } from '../../components/list-card/list-card.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Task } from '../../services/task.model';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [ListCardComponent, CommonModule],
  templateUrl: './list-page.component.html',
})
export class ListPageComponent implements OnInit {
  items$: Observable<Task[]>;

  constructor(private taskService: TaskService) {
    this.items$ = this.taskService.tasksSubject$;
  }

  ngOnInit() {
    this.taskService.getTasks()
  }
}
