import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { start } from 'repl';
import { SharedService } from '../services/shared/shared.service';
import { WLeaveService } from '../services/WLeave/wleave.service';
import { DateLeave } from '../classes/dateLeave/date-leave';
import { UpdatePending } from '../classes/updatePending/update-pending';
import { EmployeeService } from '../services/employee/employee.service';
import { UpdateDaysLeft } from '../classes/updateDaysLeft/update-days-left';

@Component({
  selector: 'app-notifcard',
  templateUrl: './notifcard.component.html',
  styleUrls: ['./notifcard.component.css']
})
export class NotifcardComponent {
  daten: DateLeave = new DateLeave();
  pendUpdate:UpdatePending=new UpdatePending();
  caseDeny:UpdateDaysLeft=new UpdateDaysLeft();
  nameC:string=''
  phrase:string='';
  phrase2:string='';
  isAccepted = false;
  isDenied = false;
  daysNum:number=0;
  Num:number=0;
  constructor(
    private employeeservice :EmployeeService ,
    private wLeaveService :WLeaveService,
    private sharedService: SharedService,
    private router: Router, 
  ){}
  ngOnInit() {
    this.info();
}
  accept() {
    if(this.daten.daysLeft)
      this.Num=this.daten.daysLeft;

    this.pendUpdate.daysLeft=this.Num.toString()
    this.pendUpdate.leaveStatus='Approved'
    this.wLeaveService.updatePending(this.pendUpdate).subscribe({
      next: data => {
        
        console.log(data)
  
      },
          error: error => {
            console.log('something went wrong, please try again.');  
          },
          complete: () => {
            console.log('work leave request completed');  
          }
        });
        this.Num=0;
        this.sharedService.notif=[]
        this.router.navigate(['post-login'])
  }

  deny() {
    if(this.daten.daysLeft)
      this.Num=this.daten.daysLeft+ this.daysNum;
    this.caseDeny.daysLeft=this.Num;
    if(this.daten.matEmp )
    this.caseDeny.matBoss=this.daten.matEmp;
    this.pendUpdate.daysLeft=this.Num.toString();
    this.pendUpdate.leaveStatus='Denied'
    this.wLeaveService.updatePending(this.pendUpdate).subscribe({
      next: data => {
        
        console.log(data)
  
      },
          error: error => {
            console.log('something went wrong, please try again.');  
          },
          complete: () => {
            console.log('work leave request completed');  
          }
        });
        this.employeeservice.UpdateDaysLeftEmployee(this.caseDeny).subscribe({
          next: data => {
            
            console.log(data)
      
          },
              error: error => {
                console.log('something went wrong, please try again.');  
              },
              complete: () => {
                console.log('work leave request completed');  
              }
            });
        this.sharedService.notif=[]
        this.router.navigate(['post-login'])
  }

  info(){
    if(this.sharedService.getnotifcardbymatemp)
    this.daten=this.sharedService.getnotifcardbymatemp;
  if (this.daten.startLeave && this.daten.endLeave && this.daten.matBoss && this.daten.matEmp) {
    const start = new Date(this.daten.startLeave);
    const end = new Date(this.daten.endLeave);

    const timeDiff = end.getTime() - start.getTime();
    this.nameC=this.daten.lnameEmp+" "+this.daten.fnameEmp 
    this.daysNum =  (Math.ceil(timeDiff / (1000 * 3600 * 24))+1);
    this.phrase='I hope this message finds you well. I am writing to  request leave from work for '+ this.daysNum+' days, ';
    this.phrase2='starting from'+this.daten.startLeave+  ' to ' + this.daten.endLeave+'.';
    this.pendUpdate.matBoss =this.daten.matBoss;
    this.pendUpdate.matEmp=this.daten.matEmp;
  }
}
}
