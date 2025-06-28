import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared/shared.service';
import { WLeaveService } from '../services/WLeave/wleave.service';
import { DateLeave } from '../classes/dateLeave/date-leave';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent {
  isPopupVisible = false;
  // notifications: DateLeave[] = [];
  constructor(private router: Router,
    private sharedService: SharedService,
    private wLeaveService :WLeaveService 
) {}

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  //   if(this.sharedService.empr?.matBoss)
  //     this.wLeaveService.getPending(this.sharedService.empr?.matBoss).subscribe({
  //       next: data => {
  //     console.log()
  //     this.sharedService.notif=data
  //     console.log( this.sharedService.notif)
         
  //       },
  //       error: error => {
  //         alert('fetching dates went wrong, please try again.');  
  //       },
  //       complete: () => {
  //         console.log('fetching dates completed');  
  //       }
  //     });
  }
}
