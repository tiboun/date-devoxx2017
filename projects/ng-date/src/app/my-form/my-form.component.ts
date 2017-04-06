import { Component, OnInit } from '@angular/core';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import {
  FormBuilder,
  FormGroup,
  AbstractControl
} from '@angular/forms';
import {MomentService} from '../moment.service';
import {MyFormService} from '../my-form.service';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css'],
  providers : [MomentService]
})
export class MyFormComponent {

  private myForm: FormGroup;
  private email: AbstractControl;
  private password: AbstractControl;
  private birthdate: AbstractControl;
  private defaultDate: Boolean;
  private lastSelectedDate: IMyDateModel;
  private serverResponse:String;
  private clientRequest:String;

  private myDatePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
  };


  constructor(fb: FormBuilder, private momentService:MomentService, private myFormService:MyFormService) {
    this.myForm = fb.group({
      'email': ['e@mail.com'],
      'password': ['password'],
      'birthdate': ['']
    });
    this.email = this.myForm.controls['email'];
    this.password = this.myForm.controls['password'];
    this.birthdate = this.myForm.controls['birthdate'];
    this.defaultDate = true;
  }

  // dateChanged callback function called when the user select the date. This is mandatory callback
  // in this option. There are also optional inputFieldChanged and calendarViewChanged callbacks.
  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    this.lastSelectedDate = event;
    this.setBirthDate();
  }

  setBirthDate() {
    if (this.lastSelectedDate) {
      if (this.defaultDate) {
        this.birthdate.setValue(this.lastSelectedDate.jsdate);
      } else {
        let momentDate = {
          year: this.lastSelectedDate.date.year, 
          month: this.lastSelectedDate.date.month - 1,
          day: this.lastSelectedDate.date.day
        };
        this.birthdate.setValue(this.momentService.get().tz(momentDate, this.momentService.get().tz.guess()).utc());
      }
    }
  }

  onDefaultDateChanged(value: Boolean) {
    this.defaultDate = value;
    this.setBirthDate();
  }

  clearDate(): void {
    // Clear the date using the setValue function
    this.myForm.setValue({ birthdate: '' });
  }

  onSubmit(value: any): void {
    this.clientRequest = JSON.stringify(value);
    this.myFormService.create(value).subscribe(value => this.serverResponse = JSON.stringify(value));
  }
}
