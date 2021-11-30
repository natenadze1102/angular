import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// import { User } from './users.model';
// import { map } from 'rxjs/operators';
// import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl: string = 'https://jsonplaceholder.cypress.io/';
  // baseUrl: string = 'https://dummy.restapiexample.com/api/v1/';
  listEmployers() {
    return this.http.get(this.baseUrl + 'users');
    // return this.http.get(this.baseUrl + 'employees');
  }

  showEmployee(id: string) {
    return this.http.get(this.baseUrl + 'users/' + id);
  }

  createEmployee(employeeObj: Object) {
    return this.http.post(this.baseUrl + 'users', employeeObj);
  }

  editEmployee(id: string, employeeObj: object) {
    return this.http.put(this.baseUrl + 'users/' + id, employeeObj);
  }

  deleteEmployee(id: string) {
    return this.http.delete(this.baseUrl + 'users/' + id);
  }
  //
  //
  //

  public subject = new Subject<any>();
  public isShown: boolean = false;

  constructor(private http: HttpClient) {
    this.subject.subscribe((value: boolean) => {
      this.isShown = value;
    });
  }

  changeToShow() {
    this.isShown = true;
  }

  changeToFalse() {
    this.isShown = false;
  }

  toggleIsShown() {
    this.subject.next(this.isShown);
  }
}
