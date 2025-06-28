import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DateLeave } from '../classes/dateLeave/date-leave';
import { SharedService } from '../services/shared/shared.service';
import { WLeaveService } from '../services/WLeave/wleave.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  isPopupVisible = false;
  notifications: DateLeave[] = this.sharedService.notif;
  // notification: DateLeave = new DateLeave();
 

 
 



  // notifications = [
  //   {
  //     title: 'Jane Doe',
  //     message: 'Lorem ipsum dolor sit amet'
  //   }
  // ];

  constructor(private router: Router,
      private sharedService: SharedService,
      private wLeaveService :WLeaveService 
  ) {}
  // ngOnInit() {
    
  // }
//   getPend() {
//     if(this.sharedService.empr?.matBoss)
//   this.wLeaveService.getPending(this.sharedService.empr?.matBoss).subscribe({
//     next: data => {
//   console.log()
//   this.notifications=data
//   console.log( this.notifications)
     
//     },
//     error: error => {
//       alert('fetching dates went wrong, please try again.');  
//     },
//     complete: () => {
//       console.log('fetching dates completed');  
//     }
//   });
// }
  togglePopup() {
   
    this.isPopupVisible = !this.isPopupVisible;
    this.notifications = this.sharedService.notif;
    console.log(this.notifications)
  }

  navigateToNotifCard(notification:DateLeave) {
    this.sharedService.getnotifcardbymatemp=notification;
    this.router.navigate(['/notifcard']);
  }
}
