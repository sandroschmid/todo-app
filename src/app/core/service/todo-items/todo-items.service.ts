import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoItem } from '../../model/todo-item';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class TodoItemsService {

  private static readonly KEY = 'todo-items';

  constructor(private readonly storageService: StorageService) {
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
    return this.storageService.getAll<TodoItem>(TodoItemsService.KEY)
      .pipe(map(todoItems => todoItems.sort(this.compare.bind(this))));
  }

  public create(todoItem: TodoItem): Observable<void> {
    return this.storageService.create(TodoItemsService.KEY, todoItem);
  }

  public update(todoItem: TodoItem): Observable<void> {
    return this.storageService.update(TodoItemsService.KEY, todoItem);
  }

  public toggleDone(todoItem: TodoItem): Observable<void> {
    return this.storageService.partialUpdate(TodoItemsService.KEY, todoItem.id, { isDone: !todoItem.isDone });
  }

  public delete(id: string): Observable<void> {
    return this.storageService.delete(TodoItemsService.KEY, id);
  }

}
