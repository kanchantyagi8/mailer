import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterContentInit {
  loginForm: FormGroup;
  emailContainer: any = [];
  count: number = 0;

  constructor(
    private fb: FormBuilder, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: new FormControl('', Validators.required),
      username: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)])
    });
  }

  ngAfterContentInit() {
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');
    togglePassword.addEventListener('click', function (e) {
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      this.classList.toggle('fa-eye-slash');
    });
  }

  loginApp() {
    let unreadmails = 0;
    sessionStorage.setItem('username', this.loginForm.controls['username'].value);
    sessionStorage.setItem('name', this.loginForm.controls['name'].value);
    if(!localStorage.getItem('emailContainer')) {
      localStorage.setItem('emailContainer', JSON.stringify(this.emailContainer));
    } else {
      let x = JSON.parse(localStorage.getItem('emailContainer'));
      x.forEach((element) => {
        if(element.readMail) {
          element.readMail = false;
        }
        if(element.ccEmail === sessionStorage.getItem('username') || element.toEmail === sessionStorage.getItem('username')) {
          unreadmails++;
        }
      });
      localStorage.setItem('emailContainer', JSON.stringify(x));
      localStorage.setItem('unreadmails', JSON.stringify(unreadmails));
    }
    localStorage.setItem('count', JSON.stringify(this.count));
    localStorage.setItem('sendMails', JSON.stringify([]));
    this.router.navigate(['dashboard']);
  }
}
