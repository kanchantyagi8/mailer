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

  sendMail() {
    let d = new Date();
    let date = this.monthList[d.getMonth()] + ' ' + d.getDate();
    let time = d.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
    let count = parseInt(localStorage.getItem('count'));
    let info = {
      id: count,
      toEmail: this.mailingForm.controls['toEmailId'].value,
      ccEmail: this.mailingForm.controls['ccEmailId'].value,
      subject: this.mailingForm.controls['subject'].value,
      message: this.mailingForm.controls['message'].value,
      readMail: false,
      from: sessionStorage.getItem('name'),
      sendDate: date,
      sendTime: time,
    }
    this.globalService.setData(info);
    count++;
    let x = JSON.parse(localStorage.getItem('emailContainer'));
    x.push(info);
    localStorage.setItem('emailContainer', JSON.stringify(x));
    localStorage.setItem('count', JSON.stringify(count));
    if(this.username === info.toEmail || this.username === info.ccEmail) {
      let y = parseInt(localStorage.getItem('unreadmails'));
      y++;
      localStorage.setItem('unreadmails', JSON.stringify(y));
    }
    this.mailingForm.reset();
  }
}
