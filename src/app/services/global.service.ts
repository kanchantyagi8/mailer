import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  totalData: any = [];
  navLink: string;

  constructor() { }

  setData(data: any) {
    if(data !== null) {
      let x = JSON.parse(localStorage.getItem('sendMails'));
      x.push(data);
      this.totalData.push(data);
      localStorage.setItem('sendMails', JSON.stringify(x));
    } else {
      this.totalData.length = 0;
    }
  }

  setNavigation(nav: any) {
    this.navLink = nav;
  }

  getData() {
    return this.totalData;
  }

  getNavigation() {
    return this.navLink;
  }
}
