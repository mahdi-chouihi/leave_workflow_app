import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LeaveFormComponent } from './leave-form/leave-form.component';
import { PostLoginComponent } from './post-login/post-login.component';
import { StatusCheckComponent } from './status-check/status-check.component';
import { NotifcardComponent } from './notifcard/notifcard.component';
import { NotificationComponent } from './notification/notification.component';
import { IconComponent } from './icon/icon.component';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { LeaveUpdateComponent } from './leave-update/leave-update.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LeaveFormComponent,
    PostLoginComponent,
    StatusCheckComponent,
    NotifcardComponent,
    NotificationComponent,
    IconComponent,
    DatePickerComponent,
    LeaveUpdateComponent,
   
  ],
  imports: [
    CalendarModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideAnimationsAsync() // Configure HttpClient to use fetch API
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
