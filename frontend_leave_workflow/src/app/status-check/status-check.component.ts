import { Component } from '@angular/core';
import { WLeaveService } from '../services/WLeave/wleave.service';
import { SharedService } from '../services/shared/shared.service';
import { DateLeave } from '../classes/dateLeave/date-leave';
import { Router } from '@angular/router';
@Component({
  selector: 'app-status-check',
  templateUrl: './status-check.component.html',
  styleUrl: './status-check.component.css'
})
export class StatusCheckComponent {
  stat:string=''
  nameC:string=''
  period:string=''
  dateL: DateLeave = new DateLeave();

  constructor(
    private wLeaveService :WLeaveService,
    private sharedService: SharedService,
    private router: Router, 
  ){}
  ngOnInit() {
    console.log(this.sharedService.emp?.matEmp)
    this.update();
}
update(){
  if(this.sharedService.empr &&this.sharedService.empr?.matBoss){

  this.wLeaveService.getStatus(this.sharedService.empr?.matBoss).subscribe({
    next: data => {
      this.dateL=data
      this.nameC="Hi "+this.dateL.lnameEmp+" "+this.dateL.fnameEmp +" !"
      this.period="Your request for a vacation from "+this.dateL.startLeave+" to "+this.dateL.endLeave +" is "
      this.stat=this.dateL.leaveStatus+""
      console.log(data)

    },
        error: error => {
          console.log('something went wrong, please try again.');  
        },
        complete: () => {
          console.log('work leave request completed');  
        }
      });
    } else if(this.sharedService.emp &&this.sharedService.emp?.matEmp){

      this.wLeaveService.getStatus(this.sharedService.emp?.matEmp).subscribe({
        next: data => {
          this.dateL=data
          if(this.dateL ){}
          this.sharedService.wdaypend=this.dateL
          this.nameC="Hi "+this.sharedService.emp?.lnameEmp+" "+this.sharedService.emp?.fnameEmp +" !"
          this.period="Your request for a vacation from "+this.dateL.startLeave+" to "+this.dateL.endLeave +" is"
          this.stat=this.dateL.leaveStatus+""
          console.log(data)
    
        },
            error: error => {
              console.log('something went wrong, please try again.');  
            },
            complete: () => {
              console.log('work leave request completed');  
            }
          });
        }
}
handlePending(){
  if(this.sharedService.emp?.matEmp){
    
    this.router.navigate(['leave-update']);
      }
}

    // update(){
    //   this.wLeaveService.insertWLeave(this.dateS).subscribe({
    //     next: data => {
         
    //       // this.sharedService.updateemp(data)
    //       console.log(data)
    //       console.log('work leave request is succesfull')
    //       // this.router.navigate(['/post-login']);
    //     },
    //     error: error => {
    //       console.log('something went wrong, please try again.');  
    //     },
    //     complete: () => {
    //       console.log('work leave request completed');  
    //     }
    //   });
    
    // }
}
