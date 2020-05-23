import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoItem } from '../../../core/model/todo-item';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent {

  @Output() public readonly itemCreated = new EventEmitter<TodoItem>();

  public readonly form: FormGroup;

  public constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      name: [undefined, Validators.required],
      description: undefined,
    });
  }

  public createItem(): void {
    const { name, description } = this.form.value;
    const todoItem: TodoItem = {
      id: `todo-${new Date().getTime()}`,
      name,
      description,
      isDone: false,
    };

    this.itemCreated.next(todoItem);
  }

}
