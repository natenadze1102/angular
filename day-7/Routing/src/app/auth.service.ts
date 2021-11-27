import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: boolean = false;

  loginStateChange: Subject<boolean> = new Subject<boolean>();

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
    return promise;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
    this.toggleLoginState();
  }

  toggleLoginState() {
    this.loginStateChange.next(this.loggedIn);
  }

  constructor() {
    // this.loginStateChange.subscribe((value) => {
    //   this.loggedIn = value;
    // });
  }
}
