import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userInfoSubject = new BehaviorSubject<object>({});
  userInfo = this.userInfoSubject.asObservable();
  canActive = false;
  constructor(private http: HttpClient) { }

  login(userInfo) {
    return this.http.post('/api/login', userInfo).pipe(
      tap((data) => {
        if (data) {
          localStorage.setItem('accessToken', `Bear ${data['token']}`);
          this.userInfoSubject.next(data);
        }
      })
    );
  }

  isLogin() {
    const accessToken = localStorage.getItem('accessToken');
    let headers = new HttpHeaders({});
    headers = headers.set('Authorization', accessToken ? accessToken : 'empty');
    return this.http.get('/api/isLogin', { headers });
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    console.log(token);
    // Check whether the token is expired and return
    // true or false
    return !!token;
  }
}
