import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DateLeave } from '../../classes/dateLeave/date-leave';
import { UpdatePending} from '../../classes/updatePending/update-pending';

@Injectable({
  providedIn: 'root'
})
export class WLeaveService {
  private baseUrl = "http://localhost:8081/WLeave/leave-form";
  private baseUrl2 = "http://localhost:8081/WLeave/fetch";
  private baseUrl3="http://localhost:8081/WLeave/status-check"
  private baseUrl4="http://localhost:8081/WLeave/update-pending"
  private baseUrl5="http://localhost:8081/WLeave/notification"
   private baseUrl6="http://localhost:8081/WLeave/notifcard"
  constructor(private httpclient:HttpClient) { }
  insertWLeave(wl :DateLeave):Observable<object>{
    // console.log(user)
    return this.httpclient.post<DateLeave>(`${this.baseUrl}`,wl)
  }
  getWLeaveEmp(matEmp :string):Observable<DateLeave[]>{
    // console.log(user)
    return this.httpclient.post<DateLeave[]>(`${this.baseUrl2}`,matEmp)
  }
  getStatus(matEmp :string):Observable<DateLeave>{
    // console.log(user)
    return this.httpclient.post<DateLeave>(`${this.baseUrl3}`,matEmp)
  }
  getStatusAndDelete(matEmp :string):Observable<DateLeave>{
    // console.log(user)
    return this.httpclient.post<DateLeave>(`${this.baseUrl4}`,matEmp)
  }
  getPending(matBoss :string):Observable<DateLeave[]>{
    // console.log(user)
    return this.httpclient.post<DateLeave[]>(`${this.baseUrl5}`,matBoss)
  }
  updatePending(sth :UpdatePending):Observable<object>{
    // console.log(user)
    return this.httpclient.post<DateLeave>(`${this.baseUrl6}`,sth)
  }
  
}
