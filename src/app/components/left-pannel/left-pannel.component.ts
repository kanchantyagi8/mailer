import { Component, OnInit, DoCheck, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-left-pannel',
  templateUrl: './left-pannel.component.html',
  styleUrls: ['./left-pannel.component.scss']
})
export class LeftPannelComponent implements OnInit, DoCheck, AfterContentInit {
  @Output() navigateToPage: EventEmitter<any> = new EventEmitter<any>();

  showComposeMail: boolean = false;
  unreadMails: number = 0;
  draftMails: number = 0;
  trashMails: number = 0;
  sendMails: number = 0;
  folderItems = [
    {id: 'folder', value: 'Folders', items: [
      {id: 'inbox', value: 'Inbox', classList: 'fas fa-inbox'},
      {id: 'send', value: 'Send Mail', classList: 'fas fa-envelope'},
      {id: 'important', value: 'Important', classList: 'fas fa-exclamation-circle'},
      {id: 'draft', value: 'Drafts', classList: 'fas fa-sticky-note'},
      {id: 'trash', value: 'Trash', classList: 'fas fa-trash-alt'}
    ]},
    {id: 'category', value: 'Categories', items: [
      {id: 'work', value: 'Work', classList: 'fas fa-circle'},
      {id: 'document', value: 'Documents', classList: 'fas fa-circle'},
      {id: 'social', value: 'Social', classList: 'fas fa-circle'},
      {id: 'advertise', value: 'Advertising', classList: 'fas fa-circle'},
      {id: 'client', value: 'Clients', classList: 'fas fa-circle'}
    ]},
    {id: 'label', value: 'Labels', items: [
      {id: 'family', value: 'Family', classList: 'fas fa-tag'},
      {id: 'work', value: 'Work', classList: 'fas fa-tag'},
      {id: 'home', value: 'Home', classList: 'fas fa-tag'},
      {id: 'children', value: 'Children', classList: 'fas fa-tag'},
      {id: 'holiday', value: 'Holiday', classList: 'fas fa-tag'},
      {id: 'music', value: 'Music', classList: 'fas fa-tag'},
      {id: 'photography', value: 'Photography', classList: 'fas fa-tag'},
      {id: 'film', value: 'Films', classList: 'fas fa-tag'}
    ]}
  ]

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
  }

  gettingData() {
    let x = JSON.parse(localStorage.getItem('emailContainer'));
    for(let element of x) {
      if(element.emailId === sessionStorage.getItem('username')) {
        this.draftMails = element.draftMails.length;
        this.trashMails = element.deleteMails.length;
        this.sendMails = element.sendMails.length;
        break;
      }
    }
  }

  ngAfterContentInit() {
    this.unreadMails = this.globalService.getUnreadMails();
    this.gettingData();
  }

  ngDoCheck() {
    this.unreadMails = this.globalService.getUnreadMails();
    this.gettingData();
  }

  openComposeMail() {
    this.showComposeMail = true;
  }

  closeCompose() {
    this.showComposeMail = false;
  }

  navigate(item) {
    this.globalService.setNavigation(item);
    this.navigateToPage.emit(true);
  }
}
