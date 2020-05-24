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
    if (this.form.invalid) {
      return;
    }

    const { name, description } = this.form.value;
    const todoItem: TodoItem = {
      id: undefined,
      userEmail: undefined,
      name,
      description,
      isDone: false,
    };

    this.itemCreated.next(todoItem);
    this.reset();
  }

  private reset(): void {
    this.form.reset({}, { emitEvent: false });
    for (const control of Object.values(this.form.controls)) {
      control.setErrors(null, { emitEvent: false });
    }
  }

}
