import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from '../../../core/model/todo-item';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {

  @Input() public readonly filter: string;

  @Output() public readonly toggleDone = new EventEmitter<TodoItem>();
  @Output() public readonly delete = new EventEmitter<TodoItem>();

  public openTodoItems: TodoItem[];
  public doneTodoItems: TodoItem[];

  @Input()
  public set todoItems(todoItems: TodoItem[]) {
    this.openTodoItems = [];
    this.doneTodoItems = [];

    for (const todoItem of todoItems) {
      if (todoItem.isDone) {
        this.doneTodoItems.push(todoItem);
      } else {
        this.openTodoItems.push(todoItem);
      }
    }
  }

  public onToggleDone(todoItem: TodoItem): void {
    this.toggleDone.next(todoItem);
  }

  public onDelete(todoItem: TodoItem): void {
    this.delete.next(todoItem);
  }

}
