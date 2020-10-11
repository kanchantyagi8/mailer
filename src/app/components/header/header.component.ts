import { Component, OnInit, DoCheck, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck, AfterContentInit {
  unreadMails: number = 0;

  constructor(private router: Router, private globalService: GlobalService) { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.unreadMails = this.globalService.getUnreadMails();
  }

  ngDoCheck() {
    this.unreadMails = this.globalService.getUnreadMails();
  }

  logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('name');
    this.router.navigate(['']);
  }
}
