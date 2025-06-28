import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared/shared.service';
import { DateLeave } from '../classes/dateLeave/date-leave';
import { WLeaveService } from '../services/WLeave/wleave.service';
import { EmployeeService } from '../services/employee/employee.service';
import { EmployerService } from '../services/employer/employer.service';
import { User } from '../classes/user/user';
import { Employer } from '../classes/employer/employer';
import { Employee } from '../classes/employee/employee';
import { UpdateDaysLeft } from '../classes/updateDaysLeft/update-days-left';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { start } from 'repl';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.css']
})
export class LeaveFormComponent {
  dateS: DateLeave = new DateLeave();
 
  days: string = '';
  minStartDate: Date = new Date();
  minStartDate2: Date = new Date();
  daysLeft : number | undefined=-1
  user:User =new User();
  updateDaysLeft:UpdateDaysLeft =new UpdateDaysLeft()
  empr :Employer = new Employer() ;
  emp :Employee = new Employee() ;
  dateForm: FormGroup;
  unselectableRanges: { start: Date; end: Date }[] = [];
  med: Date = new Date();
  statpend:boolean=true;

  constructor(private router: Router, 
    private sharedService: SharedService,
    private wLeaveService :WLeaveService ,
    private employeeservice :EmployeeService ,
    private employerservice :EmployerService,
    private fb: FormBuilder) {   this.dateForm = this.fb.group({
      date: ['', [Validators.required]]
    });}

  ngOnInit() {
   
    this.setMinstartLeave();
    this.post();
    this.disableDates();
    // this.unselectableRanges.some(range => {
    //   alert(range.start.getDate())
    //   range.start.setDate(range.start.getDate())
    //   range.end.setDate(range.end.getDate() )
    // }
    // );
  }

  
  disableDates(){
    if(this.dateS.matEmp){
    this.wLeaveService.getWLeaveEmp(this.dateS.matEmp).subscribe({
      next: data => {

        console.log(data)
        data.forEach(i => {
          if (i.startLeave && i.endLeave &&i.leaveStatus!=='Denied') {
            this.med=new Date(i.startLeave)
            this.med.setDate(this.med.getDate()-1 )
            this.unselectableRanges.push({
              start:new Date(this.med),
              end: new Date(i.endLeave)
            });
          }
        });
        for (let i = 0; i < data.length; i++) {
          if (data[i].leaveStatus && data[i].leaveStatus === 'Pending' && data[i].matEmp === this.dateS.matEmp) {
            this.statpend = false;
            break; 
          }
        }
        
        console.log(this.unselectableRanges)
       
      },
      error: error => {
        alert('fetching dates went wrong, please try again.');  
      },
      complete: () => {
        console.log('fetching dates completed');  
      }
    });
  }
  }
  setMinstartLeave() {
    const today = new Date();
    today.setDate(today.getDate() + 2); 
    this.minStartDate = today; 
  }
  
  post() {
    if (this.sharedService.emp && this.sharedService.emp.matEmp && this.sharedService.emp.passEmp) {
      
      this.user.username=this.sharedService.emp.matEmp
      this.user.password= this.sharedService.emp.passEmp
      // console.log(this.sharedService.emp);
      this.employeeservice.loginEmployee(this.user).subscribe({
        next: data => {
          console.log(data)
          console.log('data')
          
          this.emp=data
          console.log(this.emp.daysLeft)
        
          if(this.emp.daysLeft && this.emp.daysLeft>1){
          this.days = 'you have ' + this.emp.daysLeft + ' days left, use them wisely!';
        }else if(this.emp.daysLeft &&this.emp.daysLeft===1){
          this.days = 'you have ' + this.emp.daysLeft + ' day left, use it wisely!';
        }else{
          this.days = 'you have ' + this.emp.daysLeft + ' days left';
        }
          this.daysLeft=this.emp.daysLeft;
        },error: error => {
          console.log('eror fetching employee');  
        }

    });
  
      // this.days = 'you have ' + this.sharedService.emp.daysLeft + ' days left, use them wisely!';
      // this.daysLeft=this.sharedService.emp.daysLeft
      this.dateS.matEmp = this.sharedService.emp.matEmp;
      this.dateS.fnameEmp = this.sharedService.emp.fnameEmp;
      this.dateS.lnameEmp = this.sharedService.emp.lnameEmp;
      this.dateS.matBoss = this.sharedService.emp.matBoss;
      this.dateS.leaveStatus='Pending';
      
    } else if (this.sharedService.empr && this.sharedService.empr.matBoss && this.sharedService.empr.passBoss) {
      console.log(this.sharedService.empr);
      this.user.username=this.sharedService.empr.matBoss
      this.user.password= this.sharedService.empr.passBoss
      // console.log(this.sharedService.emp);
      this.employerservice.loginEmployer(this.user).subscribe({
        next: data => {
          console.log(data)
          this.empr=data
          console.log(this.empr.daysLeft)
     
          // this.days = 'you have ' + this.empr.daysLeft + ' days left, use them wisely!';
          if(this.empr.daysLeft && this.empr.daysLeft>1){
            console.log('more')
            this.days = 'you have ' + this.empr.daysLeft + ' days left, use them wisely!';
          }else if(this.empr.daysLeft &&this.empr.daysLeft===1){
            console.log('1')
            this.days = 'you have ' + this.empr.daysLeft + ' day left, use it wisely!';
          }else{
            console.log('0')
            this.days = 'you have ' + this.empr.daysLeft + ' days left';
          }
          this.daysLeft=this.empr.daysLeft;
        },error: error => {
          console.log('eror fetching employee');  
        }

    });
      // console.log(this.sharedService.emp);
    //   this.wLeaveService.getStatus(this.sharedService.empr?.matBoss).subscribe({
    //     next: data => {
    //       console.log(data)
    //       this.emprdate=data
    //       this.days = 'you have ' + this.emprdate.daysLeft + ' days left, use them wisely!';
    //       this.daysLeft=this.emprdate.daysLeft;
    //       this.sharedService.empr==this.emprdate.daysLeft;
    //     },error: error => {
    //       console.log('eror fetching employee');  
    //     }

    // });
      // this.days = 'you have ' + this.sharedService.empr.daysLeft + ' days left, use them wisely!';
      // this.daysLeft =this.sharedService.empr.daysLeft
      this.dateS.matEmp = this.sharedService.empr.matBoss;
      this.dateS.fnameEmp = this.sharedService.empr.fnameBoss;
      this.dateS.lnameEmp = this.sharedService.empr.lnameBoss;
      // this.dateS.matBoss = this.sharedService.empr.matBoss;
//       Pending - The request is awaiting review or a decision.
// Approved - The request has been accepted or granted.
// Denied - The request has been rejected.
      this.dateS.matBoss =null;
      this.dateS.leaveStatus='Approved';
      // this.dateS.id=1;
    }
  }
  calculatedaysLeft() {
    if (this.dateS.startLeave && this.dateS.endLeave&& this.daysLeft !== undefined) {
        const start = new Date(this.dateS.startLeave);
        const end = new Date(this.dateS.endLeave);

        const timeDiff = end.getTime() - start.getTime();

        this.dateS.daysLeft = this.daysLeft - (Math.ceil(timeDiff / (1000 * 3600 * 24))+1)-40;
       
        
    }

}

exactDate() {
  const currentDate = new Date();
  this.dateS.creationDate =currentDate
}
insertWl(){
 
  if (this.sharedService.empr && (this.dateS.daysLeft )&&this.dateS.matEmp){
    
    this.dateS.daysLeft=this.dateS.daysLeft+40
   
    if(this.dateS.daysLeft>-1){
    this.updateDaysLeft.daysLeft=this.dateS.daysLeft
    this.updateDaysLeft.matBoss=this.dateS.matEmp
    console.log(this.updateDaysLeft)
  this.employerservice.UpdateDaysLeftEmployer(this.updateDaysLeft).subscribe({
    next: data => {
     
      console.log(data)
      // this.empr=data
      // this.days = 'you have ' + this.empr.daysLeft + ' days left, use them wisely!';
      // this.daysLeft=this.empr.daysLeft;
    },error: error => {
      console.log('eror inserting days left');  
    },complete: () => {
      console.log('work leave request completed');  
    }

});
this.update()
this.router.navigate(['/post-login']);
}
else{
  alert("you can't you surpassed the limit of your days off")
}
  }else if (this.sharedService.emp && (this.dateS.daysLeft )&&this.dateS.matEmp){
    this.dateS.daysLeft=this.dateS.daysLeft+40
    // console.log(this.dateS.daysLeft)
    console.log(this.dateS.daysLeft)
    if(this.dateS.daysLeft>-1){
    this.updateDaysLeft.daysLeft=this.dateS.daysLeft
    this.updateDaysLeft.matBoss=this.dateS.matEmp
    console.log(this.updateDaysLeft)
  this.employeeservice.UpdateDaysLeftEmployee(this.updateDaysLeft).subscribe({
    next: data => {
     
      console.log(data)
      // this.empr=data
      // this.days = 'you have ' + this.empr.daysLeft + ' days left, use them wisely!';
      // this.daysLeft=this.empr.daysLeft;
    },error: error => {
      console.log('eror inserting days left');  
    },complete: () => {
      console.log('work leave request completed');  
    }

});
this.update()
this.router.navigate(['/post-login']);
}
else{
  alert("you can't you surpassed the limit of your days off")
}
  }
}

update(){
  if(this.dateS.startLeave && this.dateS.endLeave){
  //   if (this.sharedService.emp){
  //  this.dateS.startLeave.setDate(this.dateS.startLeave.getDate())
  //  this.dateS.endLeave.setDate(this.dateS.endLeave.getDate())
  // }else{
    this.dateS.startLeave.setDate(this.dateS.startLeave.getDate()+1)
    this.dateS.endLeave.setDate(this.dateS.endLeave.getDate()+1)
  // }
  
 }
  this.wLeaveService.insertWLeave(this.dateS).subscribe({
    next: data => {
     
      // this.sharedService.updateemp(data)
      console.log(data)
      console.log('work leave request is succesfull')
      // this.router.navigate(['/post-login']);
    },
    error: error => {
      console.log('something went wrong, please try again.');  
    },
    complete: () => {
      console.log('work leave request completed');  
    }
  });

}
// Disable all dates except those within the unselectableRanges
isDateDisabled = (date: Date | null): boolean => {
  if (!date) return false;
  
  // const dateTime = date.getTime(); // Get the time in milliseconds for comparison
  // Check if the date is not within any selectable range
  return !this.unselectableRanges.some(range => 
    // range.start.setDate(range.start.getDate() + 1)
    date > range.start && date < range.end
  );
}
  submitForm() {
    if(this.statpend ){
      // if(this.emp.daysLeft){
      //   this.sharedService.daypend=this.emp.daysLeft;}
    this.calculatedaysLeft();
    this.exactDate();

    console.log(this.dateS);
    this.insertWl()
  }else{
   alert('you already waiting for a response on your other request')
  }
    
     
    
     
 

    
  }
  
}


