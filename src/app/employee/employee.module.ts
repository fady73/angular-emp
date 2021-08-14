import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [EmployeeListComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    EmployeeRoutingModule,
  ],
})
export class EmployeeModule {}
