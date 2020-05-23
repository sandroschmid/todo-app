import { Component, Input } from '@angular/core';
import { TodoItem } from '../../../core/model/todo-item';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {

  @Input() public todoItems: TodoItem[];

}
