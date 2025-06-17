import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AtenticacaoService} from '../servico/atenticacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [RouterModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.sass'
})
export class CadastroComponent {
  usuario: string = '';
  email: string = '';
  senha: string = '';
  confirma_senha: string = '';

  constructor(
    private authService: AtenticacaoService,
    private router: Router
  ) {}

  Cadastrar() {
    const dados = {
      usuario: this.usuario,
      email: this.email,
      senha: this.senha,
      confirma_senha: this.confirma_senha
    };

    this.authService.cadastro(dados).subscribe({
      next: () => {
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Erro ao cadastrar: ' + err.message);
      }
    });
  }
}
