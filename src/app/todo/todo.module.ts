import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import { TodoListPageComponent } from './page/todo-list-page/todo-list-page.component';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoFormComponent } from './component/todo-form/todo-form.component';

@NgModule({
  imports: [
    SharedModule,
    TodoRoutingModule,
  ],
  declarations: [
    TodoListPageComponent,
    TodoListComponent,
    TodoFormComponent,
  ],
})
export class TodoModule {
}
