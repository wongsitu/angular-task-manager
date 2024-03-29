import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../services/task.model';
import { TaskService } from '../../services/task.service';
import { formFieldGreaterThan } from '../../utils/formFieldGreaterThan';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true
})

export class CardComponent implements OnChanges  {
  @Input() item: Task = {
    id: '',
    name: '',
    description: '',
    estimate: 0,
    state: 'Planned',
  };

  isEditing: boolean = false;

  constructor(private taskService: TaskService, private formBuilder: FormBuilder) {}

  startEditing(): void {
    this.isEditing = true;
  }

  stopEditing(): void {
    this.isEditing = false;
  }

  formState = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    estimate: [0, [Validators.required, formFieldGreaterThan]],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item']) {
      this.updateFormControls();
    }
  }

  updateFormControls(): void {
    this.formState.patchValue({
      name: this.item.name,
      description: this.item.description,
      estimate: this.item.estimate,
    });
  }

  deleteCard(): void {
    this.taskService.deleteTask(this.item);
  }

  onSubmit(): void {
    const updatedTask = {
      ...this.item,
      ...this.formState.value,
    } as Task;
    this.taskService.updateTask(updatedTask)
    this.stopEditing();
  }
}
