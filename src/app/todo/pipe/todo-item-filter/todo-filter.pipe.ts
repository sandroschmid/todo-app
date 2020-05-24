import { Pipe, PipeTransform } from '@angular/core';
import { TodoItem } from '../../../core/model/todo-item';

@Pipe({
  name: 'todoFilter',
})
export class TodoFilterPipe implements PipeTransform {

  public transform(todoItems: TodoItem[], filter: string | undefined): TodoItem[] | undefined {
    let filteredList = todoItems;
    if (filter && filter.length > 0) {
      const transformedFilter = filter.toLowerCase();
      filteredList = todoItems.filter(t => t.name.toLowerCase().indexOf(transformedFilter) >= 0);
    }

    return filteredList.length > 0 ? filteredList : undefined;
  }

}
