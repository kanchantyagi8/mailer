import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.scss']
})
export class SendMailComponent implements OnInit {
  sendMailList: any;
  showInnerMail: boolean = false;

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
    this.sendMailList = this.globalService.getData().sendMails;
  }
}
