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
    private fb: FormBuilder,
    private usersService: UsersService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userList = this.usersService.getUsers();

    this.dataLoaded = false;
    this.activateRoute.params.subscribe((data) => {
      this.userId = data.id;
    });
    this.loggedUserId = this.usersService.currentUserId;
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
    this.usersService.editUser(
      this.userId,
      this.editForm.controls.email.value,
      this.editForm.controls.pass.value
    );
    this.userList = this.usersService.getUsers();
    this.dataLoaded = false;
  }

  onDeleteUser(user: any) {
    this.usersService.deleteUser(user.id);
    this.userList = this.usersService.getUsers();

    setTimeout(() => {
      this.auth.logout();
      this.route.navigate(['/login']);
    }, 500);
  }

  onLogout() {
    this.auth.logout();

    this.route.navigate(['/login']);
  }
}
