import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;
  msgs = [];
  constructor(private loginService: LoginService, private route: Router) { }

  ngOnInit() {
  }

  doLogin() {
    if ( !this.userName || ! this.password) {
      this.msgs = [{ severity: 'error', summary: '提示', detail: '请填写完整的用户名密码！' }];
      return;
    }
    this.loginService.login({
      userName: this.userName,
      password: this.password
    }).subscribe((res) => {
      if (res) {
        this.route.navigate(['/admin/dashboard']);
      } else {
        this.msgs = [{ severity: 'error', summary: '提示', detail: '错误的用户名密码！' }];
      }
    });
  }

}
