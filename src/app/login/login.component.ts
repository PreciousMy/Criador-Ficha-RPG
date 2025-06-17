import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent implements OnInit {
  constructor(private client: HttpClient) {}

  ngOnInit(): void {
    this.client
      .post<{ access: string; refresh: string }>(
        'http://localhost:8000/auth/jwt/create/',
        { usuario: 'felipe2', senha: '!Q@S#E!Q@S#E' }
      )
      .subscribe((resp) => localStorage.setItem('token', resp.access));
  }
}
