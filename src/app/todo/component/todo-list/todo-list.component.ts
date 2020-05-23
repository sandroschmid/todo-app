import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from '../../../core/model/todo-item';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {

  @Input() public todoItems: TodoItem[];

  @Output() public readonly delete = new EventEmitter<TodoItem>();

  public onDelete(todoItem: TodoItem): void {
    this.delete.next(todoItem);
  }

}
