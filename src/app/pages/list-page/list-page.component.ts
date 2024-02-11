import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ListCardComponent } from '../../components/list-card/list-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [ListCardComponent, CommonModule],
  templateUrl: './list-page.component.html',
})
export class ListPageComponent implements OnInit {
  items$: any[] = [];

  constructor(private taskService: TaskService) {
    this.taskService.tasksSubjectSource.subscribe((tasks) => {
      this.items$ = tasks;
    })
  }

  ngOnInit() {
    this.taskService.getTasks()
  }
}
