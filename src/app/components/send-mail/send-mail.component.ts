import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.scss']
})
export class SendMailComponent implements OnInit {
  sendMailList: any;
  showInnerMail: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.sendMailList = JSON.parse(localStorage.getItem('sendMails'));
  }
}
