import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AtenticacaoService} from '../servico/atenticacao.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  usuario = '';
  senha = '';

  constructor(private AtenticacaoService: AtenticacaoService, private router: Router) {}

  Login() {
    this.AtenticacaoService.login({ usuario: this.usuario, senha: this.senha }).subscribe({
      next: (res: { token: string; }) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        alert('Login inválido');
      },
    });
  }
}
