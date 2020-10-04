import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  unreadMails: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    this.unreadMails = parseInt(localStorage.getItem('unreadmails'));
  }

  logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('name');
    localStorage.setItem('count', JSON.stringify(0));
    localStorage.setItem('sendMails', JSON.stringify([]));
    localStorage.setItem('unreadmails', JSON.stringify(0));
    this.router.navigate(['']);
  }
}
