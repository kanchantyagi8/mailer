import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-compose-mail',
  templateUrl: './compose-mail.component.html',
  styleUrls: ['./compose-mail.component.scss']
})
export class ComposeMailComponent implements OnInit {
  @Input() showComposeMail: boolean;
  @Output() closeComposeMail: EventEmitter<any> = new EventEmitter<any>();
  username: string;
  mailingForm: FormGroup;
  monthList = ['January','Febaury','March','April','May','June','July','August','September','October','November','December'];

  constructor(private fb: FormBuilder, private globalService: GlobalService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.mailingForm = this.fb.group({
      toEmailId: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
      ccEmailId: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });
  }

  closeCompose() {
    this.closeComposeMail.emit(true);
  }

  hideCompose() {
    document.getElementById('compose').style.height = '30px';
  }

  expendCompose() {
    document.getElementById('compose').style.height = 'auto';
  }

  draftMail() {
    let d = new Date();
    let date = this.monthList[d.getMonth()] + ' ' + d.getDate();
    let time = d.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
    let info = {
      id: JSON.parse(localStorage.getItem('id')),
      toEmail: this.mailingForm.controls['toEmailId'].value,
      ccEmail: this.mailingForm.controls['ccEmailId'].value,
      subject: this.mailingForm.controls['subject'].value,
      message: this.mailingForm.controls['message'].value,
      fromName: sessionStorage.getItem('name'),
      sendDate: date,
      sendTime: time,
      readMail: false
    };
    let x = JSON.parse(localStorage.getItem('emailContainer'));
    x.forEach((element) => {
      if(element.emailId === sessionStorage.getItem('username')) {
        info.id++;
        element.draftMails.unshift(info);
      }
    });
    localStorage.setItem('emailContainer', JSON.stringify(x));
    localStorage.setItem('id', JSON.stringify(info.id));
  }

  sendMail() {
    let d = new Date();
    let date = this.monthList[d.getMonth()] + ' ' + d.getDate();
    let time = d.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
    let info = {
      id: JSON.parse(localStorage.getItem('id')),
      toEmail: this.mailingForm.controls['toEmailId'].value,
      ccEmail: this.mailingForm.controls['ccEmailId'].value,
      subject: this.mailingForm.controls['subject'].value,
      message: this.mailingForm.controls['message'].value,
      fromName: sessionStorage.getItem('name'),
      sendDate: date,
      sendTime: time,
      readMail: false
    };
    let toMatchItem = false, ccMatchItem = false;
    let x = JSON.parse(localStorage.getItem('emailContainer'));
    x.forEach((element) => {
      if(element.emailId === sessionStorage.getItem('username')) {
        info.id++;
        element.sendMails.unshift(info);
      }
      if(element.emailId === info.toEmail) {
        toMatchItem = true;
        element.inputMails.unshift(info);
      }
      if(element.emailId === info.ccEmail) {
        ccMatchItem = true;
        element.inputMails.unshift(info);
      }
    })
    if(!toMatchItem) {
      if(info.toEmail !== info.ccEmail) {
        let data1 = {
          name: '',
          emailId: info.toEmail,
          inputMails: [].concat(info),
          deleteMails: [],
          sendMails: [],
          draftMails: []
        };
        x.unshift(data1);
      }
    }
    if(!ccMatchItem) {
      if(info.toEmail !== info.ccEmail) {
        let data2 = {
          name: '',
          emailId: info.ccEmail,
          inputMails: [].concat(info),
          deleteMails: [],
          sendMails: [],
          draftMails: []
        };
        x.unshift(data2);
      }
    }
    localStorage.setItem('emailContainer', JSON.stringify(x));
    localStorage.setItem('id', JSON.stringify(info.id));
    this.mailingForm.reset();
  }
}
