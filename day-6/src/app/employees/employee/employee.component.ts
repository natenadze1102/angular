import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  employeeId: string = '';
  employeeDetails: any;

  constructor(
    private userService: UsersService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((data) => {
      this.employeeId = data.id;
    });
    this.userService.showEmployee(this.employeeId).subscribe((data) => {
      this.employeeDetails = data;
    });
  }
}
