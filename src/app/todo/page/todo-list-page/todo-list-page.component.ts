import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, take, takeUntil } from 'rxjs/operators';
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
  private readonly nextReload = new Subject<void>();

  constructor(private readonly todoItemService: TodoItemsService,
              private readonly utilityService: UtilityService) {
  }

  public ngOnInit(): void {
    this.reload();
  }

  public ngOnDestroy(): void {
    this.ngDestroy.next();
  }

  public onItemCreated(todoItem: TodoItem): void {
    this.todoItemService.create(todoItem)
      .pipe(
        take(1),
        takeUntil(this.ngDestroy),
      )
      .subscribe(
        () => {
          this.reload();
          this.utilityService.showMessage('TODO-item saved');
        },
        () => this.utilityService.showMessage('Could not save TODO-item'),
      );
  }

  public onItemDeleted(todoItem: TodoItem): void {
    this.todoItemService.delete(todoItem.id)
      .pipe(
        take(1),
        takeUntil(this.ngDestroy),
      )
      .subscribe(
        () => {
          this.reload();
          this.utilityService.showMessage('TODO-item deleted');
        },
        () => this.utilityService.showMessage('Could not delete TODO-item'),
      );
  }

  private reload(): void {
    this.nextReload.next();
    this.isLoading = true;
    this.todoItemService.getAll()
      .pipe(
        takeUntil(this.nextReload),
        takeUntil(this.ngDestroy),
        finalize(() => this.isLoading = false),
      )
      .subscribe(payload => this.todoItems = payload);
  }

}
