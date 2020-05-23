import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { TodoItem } from '../../../core/model/todo-item';
import { TodoItemsService } from '../../../core/service/todo-items/todo-items.service';
import { UtilityService } from '../../../core/service/utility/utility.service';

@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss'],
})
export class TodoListPageComponent implements OnInit, OnDestroy {

  public isLoading = true;
  public todoItems: TodoItem[];

  private readonly ngDestroy = new Subject<void>();

  constructor(private readonly todoItemService: TodoItemsService,
              private readonly utilityService: UtilityService) {
  }

  public ngOnInit(): void {
    this.isLoading = true;
    this.todoItemService.getAll()
      .pipe(takeUntil(this.ngDestroy))
      .forEach(payload => {
        this.todoItems = payload;
        this.isLoading = false;
      });
  }

  public ngOnDestroy(): void {
    this.ngDestroy.next();
  }

  public onItemCreated(todoItem: TodoItem): void {
    this.todoItemService.create(todoItem)
      .pipe(take(1), takeUntil(this.ngDestroy))
      .subscribe(
        () => this.utilityService.showMessage('TODO-item saved'),
        () => this.utilityService.showMessage('Could not save TODO-item'),
      );
  }

  public onToggleDone(todoItem: TodoItem): void {
    this.todoItemService.toggleDone(todoItem)
      .pipe(take(1), takeUntil(this.ngDestroy))
      .subscribe(
        () => this.utilityService.showMessage('TODO-item updated'),
        () => this.utilityService.showMessage('Could not update TODO-item'),
      );
  }

  public onDeleteItem(todoItem: TodoItem): void {
    this.todoItemService.delete(todoItem.id)
      .pipe(take(1), takeUntil(this.ngDestroy))
      .subscribe(
        () => this.utilityService.showMessage('TODO-item deleted'),
        () => this.utilityService.showMessage('Could not delete TODO-item'),
      );
  }

}
