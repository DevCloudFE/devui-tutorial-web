import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    const accessToken = localStorage.getItem('accessToken');
    this.headers = new HttpHeaders({});
    this.headers = this.headers.set('Authorization', accessToken ? accessToken : 'empty');
  }

  getCards() {
    return this.http.get('/api/dashboard/cards', { headers: this.headers });
  }

  getAuthors() {
    return this.http.get('/api/dashboard/authors', { headers: this.headers });
  }

  getDashboard() {
    return this.http.get('/api/dashboard', { headers: this.headers });
  }
}
