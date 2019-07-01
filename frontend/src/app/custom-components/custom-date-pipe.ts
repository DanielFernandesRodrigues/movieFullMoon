import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'customDate'
})

export class CustomDatePipe implements PipeTransform {
    transform(value: string, format: string = ""): string {
        if (!value || value==="") return "";
        return moment(value).format(format);
    }
}