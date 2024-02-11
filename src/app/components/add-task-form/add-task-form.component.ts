import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../services/task.model';

@Component({
  selector: 'add-task-form',
  templateUrl: './add-task-form.component.html',
  imports: [CommonModule, ReactiveFormsModule ],
  standalone: true
})
export class AddTaskFormComponent {
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() estimate: number = 0;
  constructor(private taskService: TaskService, private formBuilder: FormBuilder) {}

  formState = this.formBuilder.group({
    id: [uuidv4()],
    name: [''],
    description: [''],
    estimate: [0],
    state: ['Planned'],
  });

  onSubmit() {
    this.taskService.createTask(this.formState.value as Task);
    this.formState.reset({
      id: uuidv4(),
      name: '',
      description: '',
      estimate: 0,
      state: 'Planned',
    });
  }
}
