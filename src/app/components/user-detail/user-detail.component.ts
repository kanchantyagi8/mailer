import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  @Input() showIcon: boolean;
  language: string;
  name: string;

  constructor() { }

  ngOnInit(): void {
    this.language = navigator.languages[1].toUpperCase();
    this.name = sessionStorage.getItem('name').substring(0, 13).toUpperCase();
  }

}
