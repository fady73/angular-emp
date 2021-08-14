import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../Service/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/ViewModel/employee';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css'],
})
export class ViewEmployeeComponent implements OnInit {
  empId: number = null;
  details: Employee;

  constructor(
    private employe: EmployeeService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.empId = params.id;
    });
  }

  ngOnInit() {
    if (this.empId) {
      this.employe.Get(this.empId).subscribe((res: any) => {
        this.details = res.data;
        console.log(this.details);
      });
    }
  }
}
