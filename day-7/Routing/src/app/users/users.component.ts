import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UsersService } from '../users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userList: any = [];

  userId: any;
  loggedUserId!: number;
  editingUserDetails: any;
  dataLoaded: boolean = false;
  editForm: FormGroup = new FormGroup({});

  employeeList: any;

  constructor(
    private auth: AuthService,
    private route: Router,
    private userService: UsersService,
    private fb: FormBuilder,
    private UsersService: UsersService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userList = this.userService.getUsers();

    this.dataLoaded = false;
    this.activateRoute.params.subscribe((data) => {
      this.userId = data.id;
    });
    this.loggedUserId = this.UsersService.currentUserId;
    console.log(this.loggedUserId);
  }

  onEditUser(user: any) {
    console.log(user);
    this.userId = user.id;

    this.editForm = this.fb.group({
      email: [user.email, Validators.required],
      pass: [user.password, Validators.required],
    });

    this.dataLoaded = true;
  }

  editUser() {
    // this.userList[this.userId - 1].email = this.editForm.controls.email.value;
    // this.userList[this.userId - 1].password = this.editForm.controls.pass.value;
    this.UsersService.editUser(
      this.userId,
      this.editForm.controls.email.value,
      this.editForm.controls.pass.value
    );
    this.dataLoaded = false;
  }

  onDeleteUser(user: any) {
    this.UsersService.deleteUser(user.id);

    console.log(this.UsersService.getUsers());
    console.log(user.id);
    this.userList = this.userService.getUsers();
  }

  onLogout() {
    this.route.navigate(['/login']);
    this.auth.logout();
    this.auth.toggleLoginState();
    console.log(this.auth.loggedIn + 'test');
  }
}
