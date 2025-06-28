import { WLeaveService } from './../WLeave/wleave.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../../classes/employee/employee'; 
import { Employer } from '../../classes/employer/employer'; 
import { DateLeave } from '../../classes/dateLeave/date-leave'; 

export type emp = Employee |null;
export type empr =  Employer |null;
export type WLeave = DateLeave|null;

@Injectable({
  providedIn: 'root'
})
export class SharedService {
   dataS :boolean=false;
  wdaypend :WLeave =null;
   emp:emp=null;
   empr:empr=null;
   notif: DateLeave[] = [];
   getnotifcardbymatemp:WLeave=null;
  updateData(data: any) {
    this.dataS=data;
  }
  updateemp(worker: emp) {
    this.emp=worker;
  }
  updateempr(worker: empr) {
    this.empr=worker;
  }
  // updatePendung(wdaypend: any) {
  //   this.wdaypend =wdaypend ;
  // }
}
