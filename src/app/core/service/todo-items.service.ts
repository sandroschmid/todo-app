import { Injectable } from '@angular/core';
import { CollectionReference, QueryFn } from '@angular/fire/firestore/interfaces';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { AuthUser } from '../model/auth-user';
import { TodoItem } from '../model/todo-item';
import { StorageService } from './storage.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class TodoItemsService {

  private static readonly KEY = 'todo-items';

  private static readonly USER_FILTER = filter((user: AuthUser) => {
    if (!user.email || user.email.length <= 0) {
      throw new Error('Cannot access TODO-items without a valid user');
    }

    return true;
  });

  constructor(private readonly storageService: StorageService,
              private readonly utilityService: UtilityService) {
    // remove previous collections after user-changes in order to update queries as soon as needed again
    // this.utilityService.authUser$.forEach(() => this.storageService.resetQueries(TodoItemsService.KEY));
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
    return this.utilityService.authUser$.pipe(
      TodoItemsService.USER_FILTER,
      switchMap(user => this.storageService.getAll<TodoItem>(TodoItemsService.KEY, this.getUserQueryFn(user))),
      map(todoItems => todoItems.sort(this.compare.bind(this))),
    );
  }

  public create(todoItem: TodoItem): Observable<void> {
    return this.utilityService.authUser$.pipe(
      TodoItemsService.USER_FILTER,
      switchMap(user =>
        this.storageService.create(TodoItemsService.KEY, { ...todoItem, userEmail: user.email }, this.getUserQueryFn(user)),
      ));
  }

  public update(todoItem: TodoItem): Observable<void> {
    return this.utilityService.authUser$.pipe(
      TodoItemsService.USER_FILTER,
      switchMap(user =>
        this.storageService.update(TodoItemsService.KEY, todoItem, this.getUserQueryFn(user)),
      ));
  }

  public toggleDone(todoItem: TodoItem): Observable<void> {
    return this.utilityService.authUser$.pipe(
      TodoItemsService.USER_FILTER,
      switchMap(user =>
        this.storageService.partialUpdate(TodoItemsService.KEY,
          todoItem.id,
          { isDone: !todoItem.isDone },
          this.getUserQueryFn(user))),
    );
  }

  public delete(id: string): Observable<void> {
    return this.utilityService.authUser$.pipe(
      TodoItemsService.USER_FILTER,
      switchMap(user =>
        this.storageService.delete(TodoItemsService.KEY, id, this.getUserQueryFn(user)),
      ));
  }

  private getUserQueryFn(user: AuthUser): QueryFn {
    return (ref: CollectionReference) => ref.where('userEmail', '==', user ? user.email : 'invalid-user');
  }

}
