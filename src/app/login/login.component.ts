import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  
  onLogin(){
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      this.authService.login(formData)
        .subscribe({
          next: (resp) => {
            console.log('Resposta login:', resp);
            localStorage.setItem('access_token', resp.access);
            localStorage.setItem('refresh_token', resp.refresh);

            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error('Erro ao fazer login:', err);
            alert('Usuário ou senha inválidos!');
          }
        });
    }
  }
}
