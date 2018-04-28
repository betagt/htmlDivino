import { Pipe, PipeTransform } from '@angular/core';
import {UtilService} from "../services/util.service";

@Pipe({
  name: 'timer'
})
export class TimerPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return UtilService.dateDiff(Date.now(), new Date(value));
  }

}
