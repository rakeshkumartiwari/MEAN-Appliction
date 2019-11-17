import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];
  readonly baseUrl = 'http://localhost:3000/employees';
  constructor(private http: HttpClient) { }

  saveEmployee(employee: Employee) {
    return this.http.post(this.baseUrl, employee);
  }

  getEmployees() {
    return this.http.get(this.baseUrl);
  }

  updateEmployee(employee: Employee) {
    return this.http.put(this.baseUrl + `/${employee._id}`, employee);
  }

  // tslint:disable-next-line: variable-name
  deleteEmployee(_id: string) {
    return this.http.delete(this.baseUrl + `/${_id}`);
  }
}
