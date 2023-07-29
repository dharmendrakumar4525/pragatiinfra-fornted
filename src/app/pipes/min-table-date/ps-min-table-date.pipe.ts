import { Pipe, PipeTransform } from '@angular/core';
import { isEmpty } from 'lodash';
import * as moment from 'moment';
@Pipe({
  name: 'psMinTableDate',
  pure: false
})
export class PsMinTableDatePipe implements PipeTransform {

  transform(value: any, type: any, key: any, order: any, ...args: unknown[]): any {
    let dateArray = [];
    if (value && value.length > 0) {
      if (type == 'structure') {

        value.forEach(element => {
          if (element[key]) dateArray.push(new Date(element[key]));
        });
      }
      if (type == 'location') {
        value.forEach(o => {
          o.activities.forEach(element => {
            if (element[key]) dateArray.push(new Date(element[key]));
          });
        });

      }
      var date: any;
      if (order == 'min' && dateArray.length > 0) date = new Date(Math.min.apply(null, dateArray));
      if (order == 'max' && dateArray.length > 0) date = new Date(Math.max.apply(null, dateArray));
      if (dateArray.length > 0) date = moment(date).format("MMM DD, YYYY");


      return date;
    }

  }
}
