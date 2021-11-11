import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @Input() usersArray: any;

  currentUser: object = {};
  userIndex!: number;
  isEditing!: boolean;

  constructor() {}

  ngOnInit(): void {}

  deleteUser(user: any, i: number) {
    if (
      confirm(
        `This action will remove a user with this email: ${user.email} Are you shure?`
      )
    ) {
      this.usersArray.splice(i, 1);
      this.isEditing = false;
    }
  }

  triggerUserUpdate(user: object, i: number) {
    this.currentUser = user;
    this.userIndex = i;
    this.isEditing = !this.isEditing;
  }
}
