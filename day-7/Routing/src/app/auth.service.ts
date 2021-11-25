import { Injectable } from '@angular/core';
// import { Promises } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: boolean = false;

  // loginState!: boolean;

  loginStateChange: Subject<boolean> = new Subject<boolean>();

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });
    return promise;
  }

  login() {
    this.loggedIn = true;
    // console.log(this.loggedIn);
  }

  logout() {
    this.loggedIn = false;
  }

  //
  //

  getLoggedInStatus() {
    return this.loggedIn;
  }

  constructor() {
    this.loginStateChange.subscribe((value) => {
      this.loggedIn = value;
    });
  }

  //need to change
  toggleLoginStateToTrue() {
    this.loginStateChange.next(true);
  }

  toggleLoginStateToFalse() {
    this.loginStateChange.next(false);
  }
}
