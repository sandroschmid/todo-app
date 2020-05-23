import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TodoItem } from '../../model/todo-item';

@Injectable({
  providedIn: 'root',
})
export class TodoItemsService {

  public getAll(): Observable<TodoItem[]> {
    return of([
      {
        id: 'todo-1',
        name: 'TODO #1',
        description: 'First TODO-item',
      },
      {
        id: 'todo-2',
        name: 'TODO #2',
        description: 'Second TODO-item',
      },
      {
        id: 'todo-3',
        name: 'TODO #3',
        description: 'Third TODO-item',
      },
    ]);
  }

}
