import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  isLoggedIn!: boolean;

  constructor(private auth: AuthService) {
    this.isLoggedIn = this.auth.loggedIn;
  }

  ngOnInit(): void {
    // this.isLoggedIn = this.auth.loggedIn;
    this.auth.loginStateChange.subscribe((value) => {
      this.isLoggedIn = value;
      console.log(value);
    });
  }

  ngOnChanges() {
    this.isLoggedIn = this.auth.loggedIn;
    console.log(this.isLoggedIn);
  }

  getState() {
    this.auth.loginStateChange.subscribe((x) => {
      this.isLoggedIn = x;
      console.log(x);
    });
    console.log(this.isLoggedIn);
  }
}
