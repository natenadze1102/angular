import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  onCreateEditDelUserAnimation,
  questioningUserAnimation,
  spinnerAnimation,
} from '../animations';

import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  // host: {
  //   '[@triggerLoader]': "isSpinning? 'enable' : 'disable'",
  //   '(@triggerLoader.start)': 'captureStartEvent($event)',
  //   '(@triggerLoader.done)': 'onAnimationEvent($event)',
  // },
  animations: [
    [questioningUserAnimation],
    [onCreateEditDelUserAnimation],
    [spinnerAnimation],
  ],
})
export class EmployeesComponent {
  userId: any;
  currentEmployee: any;
  editingEmployeeDetails: any;
  dataLoaded: boolean = false;
  employeesLoaded: boolean = false;
  editForm: FormGroup = new FormGroup({});
  userOperatSuccess: boolean = false;
  message: string = '';
  popupLoaded: boolean = false;
  employeeList: any;
  disableBtn: boolean = false;
  page: any;
  maxSize = 10;

  //
  isShown: boolean = false;
  showSpinner: boolean = false;
  showSpinnerOnDelete: boolean = false;
  //Animation event vars
  isSpinning: boolean = false;
  closed: boolean = false;

  //Animated End
  onAnimationEvent(event: AnimationEvent) {
    this.isSpinning = this.isSpinning === false ? true : false;
  }
  //
  //
  //
  toggleIsShown() {
    this.isShown = !this.isShown;
  }

  public config: any = {
    id: 'advanced',
    itemsPerPage: 4,
    currentPage: 1,
  };

  constructor(
    private fb: FormBuilder,
    private UsersService: UsersService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataLoaded = false;
    this.showSpinnerOnDelete = true;
    this.activateRoute.params.subscribe((data) => {
      this.userId = data.id;
    });
    this.UsersService.listEmployers().subscribe(
      (data) => {
        this.employeesLoaded = true;
        this.employeeList = data;

        this.showSpinnerOnDelete = false;
      },
      (err) => {
        this.popupLoaded = true;
        this.userOperatSuccess = false;
        this.message = `Sorry, but error occured. Check your internet connection`;
        setTimeout(() => {
          this.popupLoaded = false;
          this.showSpinnerOnDelete = false;
          console.log(this.showSpinnerOnDelete, this.showSpinner, this.isShown);
        }, 2000);
      }
    );
  }

  onEditEmployee(employee: any) {
    this.disableBtn = true;
    // Show employee details
    this.showSpinner = true;
    this.currentEmployee = employee;

    this.UsersService.showEmployee(employee.id)

      .toPromise()
      .then((data) => {
        this.editingEmployeeDetails = data;
        Object.assign(this.editingEmployeeDetails, data);
        this.showSpinner = false;

        this.editForm = this.fb.group({
          name: [this.editingEmployeeDetails.name, Validators.required],
          email: [this.editingEmployeeDetails.email, Validators.required],
          website: [this.editingEmployeeDetails.website, Validators.required],
        });
        // console.log(this.editingEmployeeDetails);
        this.dataLoaded = true;
      })
      .catch((err) => {
        this.popupLoaded = true;
        this.message = `Sorry, but error occured. Check your internet connection`;
        this.showSpinner = false;
        this.disableBtn = false;

        setTimeout(() => {
          this.userOperatSuccess = false;
          this.popupLoaded = false;
        }, 2000);
      });
  }

  editEmployee() {
    this.showSpinner = true;

    this.UsersService.editEmployee(
      this.editingEmployeeDetails.id,
      this.editForm.value
    ).subscribe(
      () => {
        return Promise.resolve().then(() => {
          setTimeout(() => {
            return (this.dataLoaded = false);
          }, 100);

          this.showSpinner = false;
          this.popupLoaded = true;
          this.message = `Employee with id ${this.currentEmployee.id}: ${this.currentEmployee.name} was successfully updated`;
          this.userOperatSuccess = true;
          this.disableBtn = false;

          setTimeout(() => {
            this.userOperatSuccess = false;
            this.popupLoaded = false;
          }, 2000);
        });
      },
      (err) => {
        this.popupLoaded = true;
        this.userOperatSuccess = false;
        this.message = `Sorry, but error occured. Check your internet connection`;
        this.showSpinner = false;

        setTimeout(() => {
          this.popupLoaded = false;
        }, 2000);
      }
    );
  }

  onDeleteEmployee(employee: any) {
    this.toggleIsShown();
    this.userId = employee.id;
    this.currentEmployee = employee.name;
    this.disableBtn = true;
  }

  deleteEmployee() {
    this.isShown = false;
    this.showSpinnerOnDelete = true;

    this.UsersService.deleteEmployee(this.userId).subscribe(
      () => {
        this.userOperatSuccess = true;
        this.showSpinnerOnDelete = false;

        //Load popup (Success/error)
        this.popupLoaded = true;
        this.message = `Employee with id ${this.userId}: ${this.currentEmployee} was successfully deleted`;
        this.disableBtn = false;

        setTimeout(() => {
          this.userOperatSuccess = false;
          this.popupLoaded = false;
        }, 2000);
      },
      (err) => {
        this.popupLoaded = true;
        this.userOperatSuccess = false;
        this.message = `Sorry, but error occured. Check your internet connection`;
        this.showSpinnerOnDelete = false;
        this.disableBtn = false;

        setTimeout(() => {
          this.popupLoaded = false;
        }, 2000);
      }
    );
  }

  onPageChange(number: number) {
    this.config.currentPage = number;
  }

  onPageBoundsCorrection(number: number) {
    this.config.currentPage = number;
  }
}
