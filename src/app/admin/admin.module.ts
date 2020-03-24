import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { HeaderModule } from '../header/header.module';


@NgModule({
  declarations: [AdminComponent, AdminSidebarComponent ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HeaderModule
  ]
})
export class AdminModule { }
