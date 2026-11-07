import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from './models/task';
import { TaskService } from './services/task.service';
import { TruncatePipe } from './pipes/truncate.pipe';
import { PriorityHighlightDirective } from './directives/priority-highlight.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, TruncatePipe, PriorityHighlightDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularApp2 - Task Tracker';
  
  // Observable stream of tasks managed via TaskService
  tasks$: Observable<Task[]>;

  // Form input bindings
  newTitle = '';
  newDescription = '';
  newPriority: 'Low' | 'Medium' | 'High' = 'Medium';
  newDueDate = '';

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.getTasks();
  }

  // Submit handler to add a new task
  onSubmit(): void {
    if (!this.newTitle.trim()) return;
    
    this.taskService.addTask({
      title: this.newTitle,
      description: this.newDescription,
      priority: this.newPriority,
      dueDate: this.newDueDate || new Date().toISOString().split('T')[0],
      completed: false
    });

    // Reset form fields
    this.newTitle = '';
    this.newDescription = '';
    this.newPriority = 'Medium';
    this.newDueDate = '';
  }

  toggleComplete(id: number): void {
    this.taskService.toggleTaskCompletion(id);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }
}