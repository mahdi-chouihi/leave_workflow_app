import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostLoginComponent } from './post-login/post-login.component';
import { LeaveFormComponent } from './leave-form/leave-form.component';
import { StatusCheckComponent } from './status-check/status-check.component';
import { LoginComponent } from './login/login.component';
import { IconComponent } from './icon/icon.component';
import { NotifcardComponent } from './notifcard/notifcard.component';
import { NotificationComponent } from './notification/notification.component';
import { AuthGuard } from './routes/auth.guard'; 
import { LeaveUpdateComponent } from './leave-update/leave-update.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'post-login',
    component: PostLoginComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'leave-form',
    component: LeaveFormComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'status-check',
    component: StatusCheckComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'icon',
    component: IconComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'notification',
    component: NotificationComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'leave-update',
    component: LeaveUpdateComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'notifcard',
    component: NotifcardComponent,
    canActivate: [AuthGuard] 
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
