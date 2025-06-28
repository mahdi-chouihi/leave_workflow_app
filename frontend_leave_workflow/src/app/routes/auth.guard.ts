import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedService } from '../services/shared/shared.service'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sharedService: SharedService, private router: Router) {}

  canActivate(): boolean {
    // console.log(this.sharedService.dataS)
    if (this.sharedService.dataS) {
      return true; 
    } else {
      this.router.navigate(['/login']); 
      return false; 
    }
  }
}
