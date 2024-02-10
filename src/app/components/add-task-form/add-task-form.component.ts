import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../services/task.model';

@Component({
  selector: 'add-task-form',
  templateUrl: './add-task-form.component.html',
  imports: [FormsModule, CommonModule, ReactiveFormsModule ],
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
    let newTask: Task;
    if (this.formState.value.state === 'Planned') {
      newTask = {
        ...this.formState.value,
        inPlanningSince: new Date().toDateString(),
      } as Task
    } else if (this.formState.value.state === 'InProgress') {
      newTask = {
        ...this.formState.value,
        inProgressSince: new Date().toDateString(),
      } as Task
    } else {
      newTask = {
        ...this.formState.value,
        completedSince: new Date().toDateString(),
      } as Task
    }

    this.taskService.createTask(newTask).subscribe({
      next: (data) => {
        if (data) {
          const prevState = this.taskService.tasksSubjectSource.getValue()
          this.taskService.tasksSubjectSource.next([...prevState, data]);

          this.formState.reset({
            id: uuidv4(),
            name: '',
            description: '',
            estimate: 0,
            state: 'Planned',
          });
        }
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }
}
