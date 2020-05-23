import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoItem } from '../../model/todo-item';
import { StorageService } from '../storage/storage.service';

const TODO_ITEMS: TodoItem[] = [
  {
    id: 'todo-1',
    name: 'TODO #1',
    description: 'First TODO-item',
    isDone: true,
  },
  {
    id: 'todo-2',
    name: 'TODO #2',
    description: 'Second TODO-item',
    isDone: false,
  },
  {
    id: 'todo-3',
    name: 'TODO #3',
    description: 'Third TODO-item',
    isDone: false,
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

  public compare(todoItem1: TodoItem, todoItem2: TodoItem): number {
    if (todoItem1.isDone && !todoItem2.isDone) {
      return 1;
    } else if (!todoItem1.isDone && todoItem2.isDone) {
      return -1;
    }

    return todoItem1.name.localeCompare(todoItem2.name);
  }

  public getAll(): Observable<TodoItem[]> {
    const todoItems = this.storageService.get(TodoItemsService.KEY, []);
    return of(todoItems.sort(this.compare.bind(this)));
  }

  public create(todoItem: TodoItem): Observable<void> {
    return this.getAll()
      .pipe(map(todoItems => {
        todoItems.unshift(todoItem);
        this.storageService.save(TodoItemsService.KEY, todoItems);
      }));
  }

  public update(todoItem: TodoItem): Observable<void> {
    return this.getAll()
      .pipe(map(todoItems => {
        const index = todoItems.findIndex(t => t.id === todoItem.id);
        if (index >= 0) {
          todoItems.splice(index, 1, todoItem);
          this.storageService.save(TodoItemsService.KEY, todoItems);
        }
      }));
  }

  public toggleDone(todoItem: TodoItem): Observable<void> {
    return this.update({
      ...todoItem,
      isDone: !todoItem.isDone,
    });
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
