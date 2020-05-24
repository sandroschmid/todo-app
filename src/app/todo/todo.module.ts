import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TodoFilterComponent } from './component/todo-filter/todo-filter.component';
import { TodoFormComponent } from './component/todo-form/todo-form.component';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import { TodoListPageComponent } from './page/todo-list-page/todo-list-page.component';
import { TodoFilterPipe } from './pipe/todo-item-filter/todo-filter.pipe';
import { TodoRoutingModule } from './todo-routing.module';

@NgModule({
  imports: [
    SharedModule,
    TodoRoutingModule,
  ],
  declarations: [
    TodoListPageComponent,
    TodoFormComponent,
    TodoFilterComponent,
    TodoListComponent,
    TodoFilterPipe,
  ],
})
export class TodoModule {
}
