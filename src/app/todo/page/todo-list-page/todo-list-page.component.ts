import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { TodoItem } from '../../../core/model/todo-item';
import { TodoItemsService } from '../../../core/service/todo-items.service';
import { UtilityService } from '../../../core/service/utility.service';

@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss'],
})
export class TodoListPageComponent implements OnInit, OnDestroy {

  public isLoading = true;
  public todoItemFilter: string;
  public todoItems: TodoItem[];

  private readonly ngDestroy = new Subject<void>();

  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,
              private readonly todoItemService: TodoItemsService,
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

    this.activatedRoute.queryParams
      .pipe(
        takeUntil(this.ngDestroy),
        map(params => params.q ? decodeURIComponent(params.q) : ''),
      )
      .subscribe(payload => this.todoItemFilter = payload);
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

  public onFilterChange(filter: string): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { q: filter ? encodeURIComponent(filter) : null },
      queryParamsHandling: 'merge',
    });
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
