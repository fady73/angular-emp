import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../Service/employee.service';
import { Employee } from 'src/app/ViewModel/employee';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  data: any[] = [];
  loading = true; // Add this line
  total: number;
  total_pages: number;
  displayedColumns: string[] = [
    'id',
    'email',
    'first_name',
    'last_name',
    'avatar',
    'action',
  ];
  dataSource: Employee[] = [];

  constructor(private Emp: EmployeeService, private toastr: ToastrService) {}

  ngOnInit() {
    this.loading = true; // Add this line
    this.fetchData(1);
  }

  delete(ID: number) {
    this.Emp.Deleted(ID).subscribe(
      (res: any) => {
        const index = this.dataSource.findIndex((item) => item.id === ID);
        this.dataSource.splice(index, 1);
        this.dataSource = [...this.dataSource];
        this.toastr.success('the item is deleted successfully');
      },
      (err) => {
        this.toastr.error(err.message);
      }
    );
  }

  fetchData(page) {
    this.Emp.GetAllEmployee(page).subscribe(
      (res: any) => {
        this.dataSource = res.data;
        this.total = res.total;
        this.loading = false; // And this one
      },
      (err) => {
        this.toastr.error(err.message);
      }
    );
  }

  loadMore(event) {
    this.fetchData(event.pageIndex + 1);
  }
}
