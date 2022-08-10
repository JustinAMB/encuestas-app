import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormPollComponent } from './components/form-poll/form-poll.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormPollComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
