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
    let nameIsWrong = false;
    sessionStorage.setItem('username', this.loginForm.controls['username'].value);
    sessionStorage.setItem('name', this.loginForm.controls['name'].value);
    let data = {
      name: sessionStorage.getItem('name'),
      emailId: sessionStorage.getItem('username'),
      inputMails: [],
      deleteMails: [],
      sendMails: [],
      draftMails: []
    };
    if(!localStorage.getItem('emailContainer')) {
      this.emailContainer.push(data);
      localStorage.setItem('emailContainer', JSON.stringify(this.emailContainer));
      localStorage.setItem('id', JSON.stringify(0));
    } else {
      let x = JSON.parse(localStorage.getItem('emailContainer'));
      let isUserAvailable = false;
      x.forEach((element) => {
        if(element.emailId === sessionStorage.getItem('username')) {
          isUserAvailable = true;
          if(isUserAvailable && (element.name.length === 0)) {
            element.name = sessionStorage.getItem('name');
          } else if(element.name.length > 0 && element.name !== sessionStorage.getItem('name')) {
            nameIsWrong = true;
          }
        }
      });
      if(!isUserAvailable && !nameIsWrong) {
        x.push(data);
      }
      localStorage.setItem('emailContainer', JSON.stringify(x));
    }
    if(nameIsWrong) {
      alert("Name is wrong");
    } else {
      this.router.navigate(['dashboard']);
    }
  }
}
