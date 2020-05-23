import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { TodoItem } from '../../../core/model/todo-item';
import { TodoItemsService } from '../../../core/service/todo-items/todo-items.service';

@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss'],
})
export class TodoListPageComponent implements OnInit, OnDestroy {

  public isLoading = true;
  public todoItems: TodoItem[];

  private readonly ngDestroy = new Subject<void>();

  constructor(private readonly todoItemService: TodoItemsService) {
  }

  public ngOnInit(): void {
    this.todoItemService.getAll()
      .pipe(
        takeUntil(this.ngDestroy),
        finalize(() => this.isLoading = false),
      )
      .subscribe(payload => this.todoItems = payload);
  }

  public ngOnDestroy(): void {
    this.ngDestroy.next();
  }

}
