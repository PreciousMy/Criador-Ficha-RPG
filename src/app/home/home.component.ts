import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ficha } from '../interface/ficha';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent implements OnInit{
  userData: any | null = null;
  fichas: ficha[] = [];

  fichaSelecionada: ficha | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(){
     this.authService.getLoggedUser().subscribe({
      next: (data) => {
        this.userData = data;
        this.fichas = data.fichas;
        console.log('Dados do usuário recebidos:', this.userData);

        if (this.fichas.length > 0) {
          this.fichaSelecionada = this.fichas[0];
        }

      },
      error: (err) => {
        console.error('Erro ao buscar dados do usuário:', err);
        this.authService.logout();
      }
    });
  }

  selecionarFicha(ficha: ficha) {
    this.fichaSelecionada = ficha;
    console.log('Ficha selecionada:', this.fichaSelecionada.nomePerso);
  }

  logout(){
    this.authService.logout();
  }
}