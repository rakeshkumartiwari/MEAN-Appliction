import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Employee } from '../shared/employee.model';
declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [EmployeeService],
})
export class EmployeeComponent implements OnInit {
  isShowMsg = false;
  message: string;

  employeeForm: FormGroup;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetForm();

    this.refreshEmployeeList();
  }
  resetForm() {
    this.employeeForm = new FormGroup({
      _id: new FormControl(),
      name: new FormControl(),
      position: new FormControl(),
      office: new FormControl(),
      salary: new FormControl()
    });
    if (!this.employeeForm) {
      this.employeeForm.setValue({
        _id: '',
        name: '',
        position: '',
        office: '',
        salary: null
      });
    }
  }
  onSubmit(): void {

    if (!this.employeeForm.value._id) {
      this.employeeService.saveEmployee(this.employeeForm.value).subscribe((res: Employee) => {
        this.resetForm();
        M.toast({html: `${res.name} is Saved Successfully`, classes: 'rounded'});
        this.refreshEmployeeList();
        setTimeout(() => {
          this.isShowMsg = false;
          this.message = '';
        }, 5000);

      });
    } else {
      this.employeeService.updateEmployee(this.employeeForm.value).subscribe((res: Employee) => {
        this.resetForm();
        M.toast({html: `${res.name} is Updated Successfully`, classes: 'rounded'});
        this.refreshEmployeeList();
        setTimeout(() => {
          this.isShowMsg = false;
          this.message = '';
        }, 2000);

      });
    }

  }

  refreshEmployeeList() {
    this.employeeService.getEmployees().subscribe((res: Employee[]) => {
      this.employeeService.employees = res;
    });
  }

  onEdit(emp: Employee) {
    this.employeeForm.setValue({
      _id: emp._id,
      name: emp.name,
      salary: emp.salary,
      position: emp.position,
      office: emp.office
    });
  }

  // tslint:disable-next-line: variable-name
  onDelete(_id: string) {
    if (confirm('Are you sure to delete this record.') === true) {
      this.employeeService.deleteEmployee(_id).subscribe((res: Employee) => {
        M.toast({html: `${res.name} is Deleted Successfully`, classes: 'rounded'});
        this.refreshEmployeeList();
        this.resetForm();
      });
    }
  }
}
