import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-trash-mail',
  templateUrl: './trash-mail.component.html',
  styleUrls: ['./trash-mail.component.scss']
})
export class TrashMailComponent implements OnInit {
  trashMailList: any;
  showInnerMail: boolean = false;

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
    this.trashMailList = this.globalService.getData().deleteMails;
  }

}
