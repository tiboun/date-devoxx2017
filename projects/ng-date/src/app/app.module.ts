import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MyFormComponent } from './my-form/my-form.component';
import { MyDatePickerModule } from 'mydatepicker';
import {MomentService} from './moment.service';
import {MyFormService} from './my-form.service';

@NgModule({
  declarations: [
    AppComponent,
    MyFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MyDatePickerModule
  ],
  providers: [MyFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
