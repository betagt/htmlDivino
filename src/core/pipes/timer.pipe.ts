import { Pipe, PipeTransform } from '@angular/core';
import {UtilService} from "../services/util.service";
import {isNullOrUndefined} from "util";

@Pipe({
  name: 'timer'
})
export class TimerPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return UtilService.dateDiff((isNullOrUndefined(args))?Date.now():new Date(args), new Date(value));
  }

}
