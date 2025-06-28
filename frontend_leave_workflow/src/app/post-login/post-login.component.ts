import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared/shared.service';
import { EmployeeService } from '../services/employee/employee.service';
import { EmployerService } from '../services/employer/employer.service';
import { WLeaveService } from '../services/WLeave/wleave.service';

@Component({
  selector: 'app-post-login',
  templateUrl: './post-login.component.html',
  styleUrls: ['./post-login.component.css']
})
export class PostLoginComponent {

 constructor(private router: Router, 
  private employeeservice :EmployeeService ,
  private sharedService: SharedService,
  private employerservice :EmployerService ,
  private wLeaveService :WLeaveService ){}
  
 showIcon: boolean = false;
 name :string =''


 ngOnInit() {
  
  this.post();
  this.getPend();
}

  getPend() {
    
    if(this.sharedService.empr?.matBoss)
  this.wLeaveService.getPending(this.sharedService.empr?.matBoss).subscribe({
    next: data => {
  console.log()
  this.sharedService.notif=data
  console.log( this.sharedService.notif)   
    },
    error: error => {
      alert('fetching dates went wrong, please try again.');  
    },
    complete: () => {
      console.log('fetching dates completed');  
    }
  });
}

 post(){
  if (this.sharedService.emp) {
    this.showIcon=false;
    this.name = this.sharedService.emp?.lnameEmp + ' ' + this.sharedService.emp?.fnameEmp
    console.log(this.sharedService.emp)
  //  this.showIcon=  !Object.values(this.sharedService.workerS)[0].startsWith('E')
    // console.log(this.sharedService.workerS)
  }else if (this.sharedService.empr) {
    console.log(this.sharedService.empr)
    this.name = this.sharedService.empr?.lnameBoss + ' ' + this.sharedService.empr?.fnameBoss
    this.showIcon=true;
  }
 }
 
  navigateToLeaveForm() {
    this.router.navigate(['/leave-form']);
  }

  navigateToStatusCheck() {
    this.router.navigate(['/status-check']);
  }
}

