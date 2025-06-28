import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../classes/user/user';
import { Observable } from 'rxjs';
import { Employer } from '../../classes/employer/employer';
import { UpdateDaysLeft } from '../../classes/updateDaysLeft/update-days-left';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  private baseUrl = "http://localhost:8081/employer/login";
  private baseUrl2 = "http://localhost:8081/employer/leave-form";
  constructor(private httpclient:HttpClient) { }
  loginEmployer(user :User):Observable<object>{
    // console.log(user)
    return this.httpclient.post<Employer>(`${this.baseUrl}`,user)
  }
  UpdateDaysLeftEmployer(updateDaysLeft :UpdateDaysLeft):Observable<object>{
    // console.log(user)
    return this.httpclient.post<Employer>(`${this.baseUrl2}`,updateDaysLeft)
  }
}
