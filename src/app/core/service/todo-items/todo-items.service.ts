import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoItem } from '../../model/todo-item';
import { StorageService } from '../storage/storage.service';

const TODO_ITEMS: TodoItem[] = [
  {
    id: 'todo-3',
    name: 'TODO #3',
    description: 'Third TODO-item',
  },
  {
    id: 'todo-2',
    name: 'TODO #2',
    description: 'Second TODO-item',
  },
  {
    id: 'todo-1',
    name: 'TODO #1',
    description: 'First TODO-item',
  },
];

@Injectable({
  providedIn: 'root',
})
export class TodoItemsService {

  private static readonly KEY = 'todo-items';

  constructor(private readonly storageService: StorageService) {
    this.storageService.default(TodoItemsService.KEY, TODO_ITEMS);
  }

  public getAll(): Observable<TodoItem[]> {
    return of(this.storageService.get(TodoItemsService.KEY, []));
  }

  public create(todoItem: TodoItem): Observable<void> {
    return this.getAll()
      .pipe(map(todoItems => {
        todoItems.unshift(todoItem);
        this.storageService.save(TodoItemsService.KEY, todoItems);
      }));
  }

  public delete(id: string): Observable<void> {
    return this.getAll()
      .pipe(map(todoItems => {
        const index = todoItems.findIndex(t => t.id === id);
        if (index >= 0) {
          todoItems.splice(index, 1);
          this.storageService.save(TodoItemsService.KEY, todoItems);
        }
      }));
  }

}
