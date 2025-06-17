import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-protegida',
  imports: [],
  templateUrl: './protegida.component.html',
  styleUrl: './protegida.component.sass'
})
export class ProtegidaComponent implements OnInit{
 usuario: string = '';
  constructor(private client: HttpClient) {}

  ngOnInit(): void {
    this.client
      .get<{ username: string }>('http://localhost:8000/auth/users/me/')
      .subscribe((resp) => (this.usuario = resp.usuario));
  }
}
