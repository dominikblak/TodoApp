import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task';

@Pipe({
  name: 'sortName',

})
export class SortNamePipe implements PipeTransform {
  transform(value: Task[], args?: Task[]): Task[] {
    return value.sort((a: Task, b: Task) => {
      return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
 });
  }

}
