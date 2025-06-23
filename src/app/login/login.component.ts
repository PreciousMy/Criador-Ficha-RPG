import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private client: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  Login(): void {
    if (this.loginForm.valid) {
      this.client
        .post<{ access: string; refresh: string }>(
          'http://localhost:8000/auth/jwt/create/',
          this.loginForm.value
        )
        .subscribe({
          next: (resp) => {
            localStorage.setItem('token', resp.access);
            this.router.navigate(['/home']); // redirecionar para painel ou dashboard
          },
          error: (err) => {
            console.error('Erro ao fazer login:', err);
            alert('Usuário ou senha inválidos!');
          }
        });
    }
  }
}
