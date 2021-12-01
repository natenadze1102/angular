import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { onCreateEditDelUserAnimation, spinnerAnimation } from '../animations';
import { User } from '../users.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss'],
  animations: [[spinnerAnimation, onCreateEditDelUserAnimation]],
})
export class EmployeeRegisterComponent implements OnInit {
  loadedUsers: User[] = [];
  currentEmployee: object = {};
  isShown: boolean = false;
  popupLoaded: boolean = false;
  message: string = '';
  userOperatSuccess: boolean = false;

  profileForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    web: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
        ),
      ],
    ],
  });

  onCreateEmployee() {
    this.isShown = true;

    this.profileForm.disable();
    this.usersService.createEmployee(this.profileForm.value).subscribe(
      (data: any) => {
        this.userOperatSuccess = true;
        this.currentEmployee = data;
        this.isShown = false;

        this.popupLoaded = true;
        this.message = `Employee with id ${data.id}: ${data.name} was successfully created!`;

        this.profileForm.reset();
        this.profileForm.enable();

        setTimeout(() => {
          this.userOperatSuccess = false;
          this.popupLoaded = false;
        }, 2000);
      },

      (err) => {
        this.popupLoaded = true;
        this.userOperatSuccess = false;
        this.message = `Sorry, but error occured. Check your internet connection`;
        this.isShown = false;

        setTimeout(() => {
          this.popupLoaded = false;
        }, 2000);
      }
    );
  }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private usersService: UsersService
  ) {}

  ngOnInit() {}
}
