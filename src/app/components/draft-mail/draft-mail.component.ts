import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-draft-mail',
  templateUrl: './draft-mail.component.html',
  styleUrls: ['./draft-mail.component.scss']
})
export class DraftMailComponent implements OnInit {
  draftMailList: any;
  showInnerMail: boolean = false;

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
    this.draftMailList = this.globalService.getData().draftMails;
  }

}
