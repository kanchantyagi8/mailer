import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-body-section',
  templateUrl: './body-section.component.html',
  styleUrls: ['./body-section.component.scss']
})
export class BodySectionComponent implements OnInit {
  @Input() getNavigator: string;

  inputList: any = [];
  deleteItemList: any = [];
  showInnerMail: boolean = false;
  mailDetail: any;
  count: number = 0;
  totalUnreadMails: any = 0;
  localArr: any;
  searchItem: string = '';

  constructor(private globalService: GlobalService) { }

  searchText(e) {
    this.searchItem = e;
  }

  ngOnInit(): void {
    this.getNavigator = 'inbox';
    this.searchItem = "";
    this.localArr = JSON.parse(localStorage.getItem('emailContainer'));
    this.inputList = [];
    let unread = 0;
    for(let i = 0; i <= this.localArr.length - 1; i++) {
      let element = this.localArr[i];
      if(element.emailId === sessionStorage.getItem('username')) {
        this.inputList = element.inputMails;
        this.globalService.setIndex(i);
        this.globalService.setData(element);
        element.inputMails.forEach((item) => {
          if(!item.readMail) {
            unread++;
          }
        });
      }
      this.globalService.setUnreadMails(unread);
      this.totalUnreadMails = unread;
    }
  }

  refreshPage() {
    this.ngOnInit();
  }

  checkboxSelected(event, item, i) {
    let ele = document.getElementById(`id_${i}`);
    if(event.target.checked) {
      ele.classList.add('li-selected');
      this.deleteItemList.unshift(item.id);
    } else {
      this.deleteItemList.splice(this.deleteItemList.indexOf(item.id), 1);
      if(!item.readMail) {
        ele.classList.remove('li-selected');
      }
    }
  }

  deleteItem() {
    if(this.deleteItemList.length > 0) {
      this.deleteItemList.sort();
      let item = this.globalService.getData();
      for(var i = 0; i <= this.inputList.length - 1; i++) {
        for(var j = 0; j <= this.deleteItemList.length - 1; j++) {
          if(this.deleteItemList[j] === this.inputList[i].id) {
            item.deleteMails.unshift(this.inputList[i]);
            this.inputList.splice(i,1);
          }
        }
      }
      this.localArr[this.globalService.getIndex()] = item;
      localStorage.setItem('emailContainer', JSON.stringify(this.localArr));
      this.deleteItemList = [];
    } else {
      alert("Please select an email for delete");
    }
  }

  openMail(item) {
    this.showInnerMail = true;
    document.getElementById('body-outer').style.height = 'auto';
    this.mailDetail = item;
    let x = JSON.parse(localStorage.getItem('emailContainer'));
    let mailArr = this.globalService.getData();
    for(var element of mailArr.inputMails) {
      if(element.id === item.id && element.readMail === false) {
        element.readMail = true;
      }
    }
    x[this.globalService.getIndex()].inputMails = mailArr.inputMails;
    localStorage.setItem('emailContainer', JSON.stringify(x));
  }

  returnMail() {
    this.showInnerMail = false;
    document.getElementById('body-outer').style.height = 'inherit';
    this.ngOnInit();
  }
}
