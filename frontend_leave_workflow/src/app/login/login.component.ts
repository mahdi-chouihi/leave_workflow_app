import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user/user';
import { error } from 'console';

import { SharedService } from '../services/shared/shared.service';
import { EmployeeService } from '../services/employee/employee.service';
import { EmployerService } from '../services/employer/employer.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user:User =new User();
  

  constructor(private router: Router, private employeeservice :EmployeeService ,private sharedService: SharedService,private employerservice :EmployerService ){}
  
      
  onSubmit() {
    // console.log(this.user);
    if(this.user.username.startsWith('E')){
    this.employeeservice.loginEmployee(this.user).subscribe({
      next: data => {
        this.sharedService.updateData(true);
        this.sharedService.updateemp(data)
        this.sharedService.updateempr(null)
        console.log(data)
        this.router.navigate(['/post-login']);  
      },
      error: error => {
        alert('Invalid credentials, please try again.');  
        this.sharedService.updateData(false);
      },
      complete: () => {
        console.log('Login request completed');  
      }
    });}else if(this.user.username.startsWith('B')){
      this.employerservice.loginEmployer(this.user).subscribe({
        next: data => {
          this.sharedService.updateData(true);
          console.log(data)
          this.sharedService.updateempr(data)
          this.sharedService.updateemp(null)
          // console.log(data)
          this.router.navigate(['/post-login']);  
        },
        error: error => {
          alert('Invalid credentials, please try again.');  
          this.sharedService.updateData(false);
        },
        complete: () => {
          console.log('Login request completed');  
        }
      });}else{
        alert('Invalid credentials, please try again.');  
        this.sharedService.updateData(false);
      }
    }
  }
  
  


