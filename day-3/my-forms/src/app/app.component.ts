import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-forms';

  // usersArray: any = [
  //   {
  //     email: 'test',
  //     password: 'test.pass',
  //     password_repeat: 'test.confirm_password',
  //     nickname: 'test.nick',
  //     phone: 'test.phoneNum',
  //     website: 'test.web',
  //   },
  // ];

  usersArray: object[] = [];

  registFormIsShown: boolean = false;
  listFormIsShown: boolean = false;

  toggleRegisterForm() {
    this.registFormIsShown = !this.registFormIsShown;
  }

  toggleUserListForm() {
    this.listFormIsShown = !this.listFormIsShown;
  }
}
