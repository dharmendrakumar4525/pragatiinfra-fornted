import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
//import { AuthService } from "@services/auth.service";
import { Subject } from 'rxjs';

@Injectable()

export class AuthGuard implements CanActivate {
    private subject = new Subject<any>();
    authData = this.subject.asObservable();
    //dataOpen = this.subject.asObservable();
    constructor(
        private router:Router){}

  canActivate() {
    if(localStorage.getItem('loginData')){
      return true;
    }else{
        this.subject.next("auth");
      this.router.navigate(['/login']);
      return false;
    }
  }
} 