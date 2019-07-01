import { Pipe } from "@angular/core";
import { DecimalPipe } from "@angular/common";

@Pipe({
    name: 'ChartValues'
  })
  export class ChartValuesPipe extends DecimalPipe {
    transform(value: number): any {
      return super.transform(((value || 0)/ 1000000), "1.2-2");  
    }
  }