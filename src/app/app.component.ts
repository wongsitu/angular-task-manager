import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddTaskFormComponent } from './components/add-task-form/add-task-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddTaskFormComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private router: Router) {}

  navigateToHome(): void {
    // Navigate to the root/home page
    this.router.navigate(['']);
  }

  navigateToList(): void {
    // Navigate to the "list" page
    this.router.navigate(['/list']);
  }
}
