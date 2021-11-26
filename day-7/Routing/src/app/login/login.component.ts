import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required]],
  });

  users: any = [];
  userMatch!: string;
  currentUserId!: number;

  constructor(
    private fb: FormBuilder,
    private UsersService: UsersService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.users = this.UsersService.getUsers();
  }

  onloginUser() {
    // for (let user of this.users) {
    //   if (
    //     user.email === this.loginForm.value.email &&
    //     user.password === this.loginForm.value.pass
    //   ) {
    //     this.auth.login();
    //   } else {
    //     this.auth.logout();
    //   }
    // }
    const filtered = this.users.filter((user: any, id: number, array: any) => {
      return (
        user.email === this.loginForm.value.email &&
        user.password === this.loginForm.value.pass
      );
    });
    // console.log(filtered);
    if (filtered.length > 0) {
      this.auth.login();
      this.auth.toggleLoginState();
      this.auth.loginStateChange.subscribe((value: any) => {
        this.auth.loggedIn = value;
      });
      this.userMatch = 'true';
      this.currentUserId = filtered[0].id;
      this.UsersService.showCurrentUserId(filtered[0].id);

      setTimeout(() => {
        this.loginForm.reset();
      }, 500);
    } else {
      this.auth.logout();
      this.auth.toggleLoginState();
      this.userMatch = 'false';
    }
  }
}
