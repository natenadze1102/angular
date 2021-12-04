import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { spinnerAnimation } from 'src/app/animations';
import { UsersService } from 'src/app/users.service';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  animations: [[spinnerAnimation]],
})
export class EmployeeComponent implements OnInit {
  employeeId: string = '';
  employeeDetails: any;
  message: string = '';

  showSpinner: boolean = false;
  isSpinning: boolean = false;

  constructor(
    private userService: UsersService,
    private activateRoute: ActivatedRoute
  ) {}

  onAnimationEvent(event: AnimationEvent) {
    this.isSpinning = this.isSpinning === false ? true : false;
  }

  ngOnInit(): void {
    this.showSpinner = true;
    this.activateRoute.params.subscribe((data) => {
      this.employeeId = data.id;
    });

    this.userService.showEmployee(this.employeeId).subscribe(
      (data) => {
        this.showSpinner = false;
        this.employeeDetails = data;
      },
      (err) => {
        this.showSpinner = false;
        this.employeeDetails;
      }
    );
  }
}
