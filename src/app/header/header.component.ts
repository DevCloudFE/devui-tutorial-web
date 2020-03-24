import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userInfo;
  constructor(private login: LoginService, private route: Router) { }

  ngOnInit() {
    this.login.isLogin().pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
    })
    ).subscribe((res) => {
       this.userInfo = res;
    });
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.route.navigate(['/login']);
  }

}
