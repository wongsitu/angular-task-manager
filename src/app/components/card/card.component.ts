import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../services/task.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class CardComponent {
  @Input() item: Task = {
    id: '',
    name: '',
    description: '',
    estimate: 0,
    state: 'Planned',
  };

  isEditing: boolean = false;

  startEditing(): void {
    this.isEditing = true;
  }

  stopEditing(): void {
    this.isEditing = false;
  }
}
