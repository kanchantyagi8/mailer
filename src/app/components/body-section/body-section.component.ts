import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-body-section',
  templateUrl: './body-section.component.html',
  styleUrls: ['./body-section.component.scss']
})
export class BodySectionComponent implements OnInit {
  @Input() getNavigator: string;

  mailList: any = [];
  deleteItemList: any = [];
  showInnerMail: boolean = false;
  mailDetail: any;
  count: number = 0;
  totalUnreadMails: any = 0;

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
    this.getNavigator = 'inbox';
    let x = JSON.parse(localStorage.getItem('emailContainer'));
    if(this.mailList.length !== x.length) {
      for(let i = 0; i <= x.length - 1; i++) {
        let element = x[i];
        if(element.toEmail === sessionStorage.getItem('username') || 
          element.ccEmail === sessionStorage.getItem('username')) {
          this.mailList.push(element);
        }
      }
      this.totalUnreadMails = parseInt(localStorage.getItem('unreadmails'));
    }
  }

  refreshPage() {
    window.location.reload();
  }

  checkboxSelected(item, i) {
    let ele = document.getElementById(`id_${i}`);
    if(ele.classList.contains('li-selected') && !item.readMail) {
      ele.classList.remove('li-selected');
    } else {
      ele.classList.add('li-selected');
    }
    this.deleteItemList.push(item.id);
  }

  deleteItem() {
    if(this.deleteItemList.length > 0) {
      this.deleteItemList.sort();
      for(var i = 0; i <= this.mailList.length - 1; i++) {
        for(var j = 0; j <= this.deleteItemList.length - 1; j++) {
          if(this.deleteItemList[j] === this.mailList[i].id) {
            if(this.mailList[i].readMail !== true) {
              this.totalUnreadMails = this.totalUnreadMails !== 0 ? this.totalUnreadMails-- : 0 ;
              localStorage.setItem('unreadmails', this.totalUnreadMails);
            }
            this.mailList.splice(i,1);
            let id = this.deleteItemList[j];
            let localArr = JSON.parse(localStorage.getItem('emailContainer'));
            for(var k = 0; k <= localArr.length - 1; k++) {
              if(localArr[k].id === id) {
                localArr.splice(k,1);
                localStorage.setItem('emailContainer', JSON.stringify(localArr));
              }
            }
          }
        }
      }
    } else {
      alert("Please select an email for delete");
    }
  }

  openMail(item, i) {
    this.showInnerMail = true;
    this.mailDetail = item;
    let mailArr = JSON.parse(localStorage.getItem('emailContainer'));
    let unread = parseInt(localStorage.getItem('unreadmails'));
    for(let element of mailArr) {
      if(element.id === item.id && element.readMail === false) {
        element.readMail = true;
        unread !== 0 ? unread-- : 0;
      }
    }
    localStorage.setItem('emailContainer', JSON.stringify(mailArr));
    localStorage.setItem('selectedMailId', i);
    localStorage.setItem('unreadmails', JSON.stringify(unread));
    this.totalUnreadMails = unread;
  }

  returnMail() {
    this.showInnerMail = false;
    let selectId = localStorage.getItem('selectedMailId');
    setTimeout(function() {
      document.getElementById(`id_${selectId}`).classList.add('li-selected');
    }, 0);
  }
}
