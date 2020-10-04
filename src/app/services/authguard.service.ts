import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class AuthguardService implements CanActivate {

    constructor( public router: Router) { }

    canActivate(): boolean {
      if(sessionStorage.getItem('username')) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    }
}