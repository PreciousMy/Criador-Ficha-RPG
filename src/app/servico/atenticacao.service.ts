import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtenticacaoService  {
  private apiUrl = 'http://localhost:3000/api'; // Colocar a URL da API

  constructor(private http: HttpClient) {}

  login(credentials: { usuario: string; senha: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  cadastro(data: {usuario: string; email: string; senha: string; confirma_senha:string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  sair() {
    localStorage.removeItem('token');
  }

  autenticacao(): boolean {
    return !!localStorage.getItem('token');
  }
}


