
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
  
  
  @Component({
    selector: 'leave-update',
    templateUrl: './leave-update.component.html',
    styleUrl: './leave-update.component.css'
  })
  export class LeaveUpdateComponent {
    dateS: DateLeave = new DateLeave();
    emprdate: DateLeave = new DateLeave();
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
    daypend:number=0;
    
  
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
            if (i.startLeave && i.endLeave && i.leaveStatus ==='Approved') {
              this.med=new Date(i.startLeave)
              this.med.setDate(this.med.getDate()-1 )
              this.unselectableRanges.push({
                start:new Date(this.med),
                end: new Date(i.endLeave)
              });
            }
          });
          // for (let i = 0; i < data.length; i++) {
          //   if (data[i].leaveStatus && data[i].leaveStatus === 'Pending' && data[i].matEmp === this.dateS.matEmp) {
          //     this.statpend = false;
          //     break; 
          //   }
          // }
          
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
            if(this.sharedService.wdaypend?.startLeave &&this.sharedService.wdaypend?.endLeave &&this.daysLeft &&this.emp.daysLeft){
            const start = new Date(this.sharedService.wdaypend?.startLeave);
            const end = new Date(this.sharedService.wdaypend?.endLeave);
            const timeDiff = end.getTime() - start.getTime();
    
            this.daypend = this.emp.daysLeft + (Math.ceil(timeDiff / (1000 * 3600 * 24))+1);
          }
            
            console.log(this.daypend)
            if(this.daypend && this.daypend>1){
            this.days = 'you have ' + this.daypend + ' days left, use them wisely!';
          }else if(this.daypend &&this.daypend===1){
            this.days = 'you have ' + this.daypend + ' day left, use it wisely!';
          }else{
            this.days = 'you have ' + this.daypend + ' days left';
          }
            this.daysLeft=this.daypend;
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
    if (this.sharedService.emp && (this.dateS.daysLeft )&&this.dateS.matEmp){
      this.dateS.daysLeft=this.dateS.daysLeft+40
  
      console.log(this.dateS.daysLeft)
      if(this.dateS.daysLeft>-1){
      this.updateDaysLeft.daysLeft=this.dateS.daysLeft
      this.updateDaysLeft.matBoss=this.dateS.matEmp
      console.log(this.updateDaysLeft)
    this.employeeservice.UpdateDaysLeftEmployee(this.updateDaysLeft).subscribe({
      next: data => {
       
        console.log(data)

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
 
      this.dateS.startLeave.setDate(this.dateS.startLeave.getDate()+1)
      this.dateS.endLeave.setDate(this.dateS.endLeave.getDate()+1)
 
    
   }
    this.wLeaveService.insertWLeave(this.dateS).subscribe({
      next: data => {
        console.log(data)
        console.log('work leave request is succesfull')
        
      },
      error: error => {
        console.log('something went wrong, please try again.');  
      },
      complete: () => {
        console.log('work leave request completed');  
      }
    });
  
  }
  
  isDateDisabled = (date: Date | null): boolean => {
    if (!date) return false;
    

    return !this.unselectableRanges.some(range => 

      date > range.start && date < range.end
    );
  }
    submitForm() {
      this.deletePending()
      this.calculatedaysLeft();
      this.exactDate();
      console.log(this.dateS);
      this.insertWl()
   
    }
    deletePending(){
      if(this.sharedService.emp?.matEmp){
    
        this.wLeaveService.getStatusAndDelete(this.sharedService.emp?.matEmp).subscribe({
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
            
          }

    }
    
    
  }
  
  
  

