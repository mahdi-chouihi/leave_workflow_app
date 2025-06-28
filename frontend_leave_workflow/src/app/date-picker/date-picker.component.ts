import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  dateForm: FormGroup;
  selectableRanges: { start: Date; end: Date }[] = [
    { start: new Date('2024-08-20'), end: new Date('2024-08-25') },
    { start: new Date('2024-09-10'), end: new Date('2024-09-15') },
    { start: new Date('2024-09-8'), end: new Date('2024-09-17') }
  ];
   
  constructor(private fb: FormBuilder) {
    this.dateForm = this.fb.group({
      date: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.selectableRanges.some(range => {
      range.start.setDate(range.start.getDate() -1)
      range.end.setDate(range.end.getDate() )
    }
    );
  }

  // Disable all dates except those within the selectableRanges
  isDateDisabled = (date: Date | null): boolean => {
    if (!date) return false;
    
    // const dateTime = date.getTime(); // Get the time in milliseconds for comparison
    // Check if the date is not within any selectable range
    return !this.selectableRanges.some(range => 
      // range.start.setDate(range.start.getDate() + 1)
      date > range.start && date < range.end
    );
  }
}
