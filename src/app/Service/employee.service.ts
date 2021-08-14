import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Employee } from '../ViewModel/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  httpOptions: any = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}
  rootUrl: string = 'https://reqres.in/api/';

  GetAllEmployee(page): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.rootUrl + `users?page=${page}`);
  }

  AddNew(emp: Employee): any {
    return this.http.post<any>(this.rootUrl + 'user', emp, this.httpOptions);
  }

  Update(emp: Employee): any {
    return this.http.put<any>(
      this.rootUrl + 'users/' + emp.id,
      emp,
      this.httpOptions
    );
  }

  Get(ID: number): Observable<Employee> {
    return this.http.get<Employee>(this.rootUrl + 'users/' + ID);
  }

  Deleted(ID: number): any {
    return this.http.delete<any>(this.rootUrl + 'users/' + ID);
  }
}
