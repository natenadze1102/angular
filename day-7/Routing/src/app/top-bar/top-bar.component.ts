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
    this.auth.loginStateChange.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }
}
