import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { DevUIModule } from 'ng-devui';

@NgModule({
  declarations: [DashboardComponent],
  providers: [
    DashboardService
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    DevUIModule
  ]
})
export class DashboardModule { }
