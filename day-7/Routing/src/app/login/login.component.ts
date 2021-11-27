import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private activatedSubject!: Subscription;
  loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ],
    ],
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
    const filtered = this.users.filter((user: any, id: number, array: any) => {
      return (
        user.email === this.loginForm.value.email &&
        user.password === this.loginForm.value.pass
      );
    });

    if (filtered.length > 0) {
      this.auth.login();
      this.auth.toggleLoginState();
      this.activatedSubject = this.auth.loginStateChange.subscribe(
        (value: any) => {
          this.auth.loggedIn = value;
        }
      );
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

  ngOnDestroy(): void {
    this.activatedSubject.unsubscribe();
  }
}
