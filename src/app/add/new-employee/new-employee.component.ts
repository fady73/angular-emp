import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';

import { EmployeeService } from '../../Service/employee.service';
import { ToastrService } from 'ngx-toastr';

import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css'],
})
export class NewEmployeeComponent implements OnInit {
  ngForm: FormGroup;
  empId: number = null;

  constructor(
    private employe: EmployeeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.empId = params.ID;
    });
  }

  ngOnInit() {
    if (this.empId) {
      this.employe.Get(this.empId).subscribe((res: any) => {
        this.ngForm = this.formBuilder.group({
          first_name: new FormControl(res.data.first_name, [
            Validators.required,
          ]),
          last_name: new FormControl(res.data.last_name, [Validators.required]),
          email: new FormControl(res.data.email, [
            Validators.required,
            Validators.email,
          ]),
          avatar: new FormControl(res.data.avatar, []),
        });
      });
    } else {
      this.ngForm = this.formBuilder.group({
        first_name: new FormControl(null, [Validators.required]),
        last_name: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        avatar: new FormControl('', []),
      });
    }
  }

  errorHandling = (control: string, error: string) => {
    return this.ngForm.controls[control].hasError(error);
  };

  onSubmit() {
    if (Object.values(this.ngForm.value).some((el) => el === null)) {
      return;
    } else {
      if (this.empId) {
        this.employe
          .Update({ id: this.empId, ...this.ngForm.value })
          .subscribe((data) => {
            this.toastr.success('the item is update successfully');

            this.router.navigate(['/']);
          });
      } else {
        this.employe.AddNew(this.ngForm.value).subscribe((data) => {
          this.toastr.success('the item is added successfully');

          this.router.navigate(['/']);
        });
      }
    }
  }
}
