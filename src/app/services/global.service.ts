import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  totalData: any;
  navLink: string;
  index: number;
  unreadmails: number;

  constructor() { }

  setData(data: any) {
    this.totalData = data;
  }

  setNavigation(nav: any) {
    this.navLink = nav;
  }

  setIndex(e) {
    this.index = e;
  }

  setUnreadMails(e) {
    this.unreadmails = e;
  }

  getData() {
    return this.totalData;
  }

  getNavigation() {
    return this.navLink;
  }

  getIndex() {
    return this.index;
  }

  getUnreadMails() {
    return this.unreadmails;
  }

}
