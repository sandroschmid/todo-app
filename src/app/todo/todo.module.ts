import { NgModule } from '@angular/core';
import { TodoListPageComponent } from './page/todo-list-page/todo-list-page.component';
import { SharedModule } from '../shared/shared.module';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import { TodoRoutingModule } from './todo-routing.module';

@NgModule({
  imports: [
    SharedModule,
    TodoRoutingModule,
  ],
  declarations: [
    TodoListPageComponent,
    TodoListComponent,
  ],
})
export class TodoModule {
}
