import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'subActivitySearchFilter'
})
export class SubActivitySearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = (val._id.toLocaleLowerCase().includes(args)) || (val.subTaskName.toLocaleLowerCase().includes(args));
      return rVal;
    })

  }

}