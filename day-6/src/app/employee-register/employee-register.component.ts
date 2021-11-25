import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import { map } from 'rxjs/operators';
import { User } from '../users.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss'],
})
export class EmployeeRegisterComponent implements OnInit {
  loadedUsers: User[] = [];
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
    this.usersService.createEmployee(this.profileForm.value).subscribe(
      (data: any) => {
        alert(
          `Congrats..Employer with ID ${data.id} was successfully created!`
        );
        this.profileForm.reset();
      },
      (err) => {
        `Congrats..Employer  was not created! ... ${err.message}`;
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
