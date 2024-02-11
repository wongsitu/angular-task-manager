import { Component, Input } from '@angular/core';
import { Task, TaskState } from '../../services/task.model';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-list-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-card.component.html',
})
export class ListCardComponent {
  @Input() item: Task = {
    id: '',
    name: '',
    description: '',
    estimate: 0,
    state: 'Planned',
  };

  constructor(private taskService: TaskService) {}

  onDelete() {
    this.taskService.deleteTask(this.item);
  }

  onStateChange(event: Event): void {
    const state = (event.target as HTMLSelectElement).value as TaskState;

    this.taskService.updateTask({ ...this.item, state });
  }
}
