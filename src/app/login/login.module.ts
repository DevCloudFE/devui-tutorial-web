import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { HeaderModule } from '../header/header.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import { DevUIModule } from 'ng-devui';
@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    HeaderModule,
    HttpClientModule,
    FormsModule,
    DevUIModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
