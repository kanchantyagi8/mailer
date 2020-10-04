import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  unreadMails: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    this.unreadMails = parseInt(localStorage.getItem('unreadmails'));
  }

}
