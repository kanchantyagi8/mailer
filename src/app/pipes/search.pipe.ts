import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arr: any[], value: string): unknown {
    console.log(value.length);
    let newArr = [];
    if(value.length > 0) {
      arr.forEach((element) => {
        if(value === element.ccEmail || value === element.toEmail) {
          newArr.push(element);
        }
      });
      return newArr;
    } else {
      return arr;
    }
  }

}
