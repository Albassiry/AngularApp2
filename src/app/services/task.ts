import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root' // Proper use of dependency injection
})
export class TaskService {
  // Initial in-memory task data array
  private tasks: Task[] = [
    { id: 1, title: 'Complete Angular Assignment', description: 'Finish Ch.4-6 tasks including services, pipes, and directives.', priority: 'High', dueDate: '2026-06-01', completed: false },
    { id: 2, title: 'Review RxJS Observables', description: 'Understand BehaviorSubject and async pipe subscriptions.', priority: 'Medium', dueDate: '2026-06-03', completed: true }
  ];

  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);

  constructor() {}

  // Expose tasks as an Observable stream
  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  // Add a new task to the array and broadcast update
  addTask(taskData: Omit<Task, 'id'>): void {
    const newTask: Task = {
      ...taskData,
      id: this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1
    };
    this.tasks.push(newTask);
    this.tasksSubject.next([...this.tasks]);
  }

  // Toggle task completion status
  toggleTaskCompletion(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.tasksSubject.next([...this.tasks]);
    }
  }

  // Delete a task by ID
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.tasksSubject.next([...this.tasks]);
  }
}