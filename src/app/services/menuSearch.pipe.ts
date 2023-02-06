import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'menuFilter'
})
export class MenuSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = (val.link_name.toLocaleLowerCase().includes(args)) || (val.link_name.toLocaleLowerCase().includes(args));
      return rVal;
    })

  }

}