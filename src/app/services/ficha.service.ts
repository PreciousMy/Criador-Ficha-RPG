import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ficha } from '../interface/ficha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FichaService {

  constructor(private http: HttpClient) { }

  getPublicFichas(): Observable<ficha[]> {
    // Note que não precisamos enviar o token de autenticação aqui, 
    // pois o endpoint Django está configurado com AllowAny.
    return this.http.get<ficha[]>('http://localhost:8000/FichasPublicas/');
  }
}
