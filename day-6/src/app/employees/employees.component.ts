import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent {
  userId: any;
  editingEmployeeDetails: any;
  dataLoaded: boolean = false;
  editForm: FormGroup = new FormGroup({});

  employeeList: any;
  page: any;
  maxSize = 10;

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
    this.activateRoute.params.subscribe((data) => {
      this.userId = data.id;
    });
    this.UsersService.listEmployers().subscribe((data) => {
      this.employeeList = data;
    });
  }

  onEditEmployee(user: any) {
    // Show employee details
    this.UsersService.showEmployee(user.id)
      .toPromise()
      .then((data) => {
        this.editingEmployeeDetails = data;
        Object.assign(this.editingEmployeeDetails, data);

        this.editForm = this.fb.group({
          name: [this.editingEmployeeDetails.name, Validators.required],
          email: [this.editingEmployeeDetails.email, Validators.required],
          website: [this.editingEmployeeDetails.website, Validators.required],
        });
        console.log(this.editingEmployeeDetails);
        this.dataLoaded = true;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editEmployee() {
    this.UsersService.editEmployee(
      this.editingEmployeeDetails.id,
      this.editForm.value
    ).subscribe(
      (data) => {
        alert(
          `Employee with id ${this.editingEmployeeDetails.id} was successfully updated`
        );
        this.router.navigate(['']);
      },
      (err) => {
        alert(`${err.message}`);
      }
    );
  }

  onDeleteEmployee(user: any) {
    this.UsersService.deleteEmployee(user.id).subscribe(
      (data) => {
        alert(`Employee with id ${user.id} was successfully deleted`);
        this.router.navigate(['']);
      },
      (err) => {
        console.log(err);
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
