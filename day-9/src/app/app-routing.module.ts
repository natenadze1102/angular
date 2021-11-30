import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';

const routes: Routes = [
  { path: 'employee-register', component: EmployeeRegisterComponent },

  {
    path: 'employees',
    children: [
      { path: '', component: EmployeesComponent },
      { path: 'employee/:id', component: EmployeeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
