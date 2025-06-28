import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../classes/user/user';
import { Observable } from 'rxjs';
import { Employee } from '../../classes/employee/employee';
import { Employer } from '../../classes/employer/employer';
import { UpdateDaysLeft } from '../../classes/updateDaysLeft/update-days-left';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = "http://localhost:8081/employee/login";
  private baseUrl2 = "http://localhost:8081/employee/leave-form";
  constructor(private httpclient:HttpClient) { }
  loginEmployee(user :User):Observable<object>{
    // console.log(user)
    return this.httpclient.post<Employee>(`${this.baseUrl}`,user)
  }
  UpdateDaysLeftEmployee(updateDaysLeft :UpdateDaysLeft):Observable<object>{
    // console.log(user)
    return this.httpclient.post<Employee>(`${this.baseUrl2}`,updateDaysLeft)
  }
}
