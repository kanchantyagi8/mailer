import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class AuthguardService implements CanActivate {

    constructor( public router: Router) { }

    canActivate(): boolean {
      return sessionStorage.getItem('username') !== 'test@gmail.com';
    }
}