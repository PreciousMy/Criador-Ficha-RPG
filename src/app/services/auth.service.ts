import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ficha } from '../interface/ficha';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient, private router: Router) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getLoggedUser(): Observable<({id: number; username: string; email:string; fichas: ficha[]})> {
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<({id: number; username: string; email:string; fichas: ficha[]})>('http://localhost:8000/auth/users/me/', {headers});
  }

  login(credentials: {username: string, password: string}) {
      return this.http.post<{ access: string; refresh: string }>
      ('http://localhost:8000/auth/jwt/create/', credentials);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

}
