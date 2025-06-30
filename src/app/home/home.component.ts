import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent implements OnInit{
  userData: any | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(){
     this.authService.getLoggedUser().subscribe({
      next: (data) => {
        this.userData = data;
        console.log('Dados do usuário recebidos:', this.userData);
      },
      error: (err) => {
        console.error('Erro ao buscar dados do usuário:', err);
        this.authService.logout();
      }
    });
  }

  logout(){
    this.authService.logout();
  }
}