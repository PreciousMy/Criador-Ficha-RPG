import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ficha } from '../interface/ficha';
import { FichaService } from '../services/ficha.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent implements OnInit{
  userData: any | null = null;
  fichas: ficha[] = [];
  fichasPublicas: ficha[] = [];

  fichaSelecionada: ficha | null = null;

  editando = false;
  editor: FormGroup;

  constructor(private authService: AuthService, 
    private fichaService: FichaService, 
    private fb: FormBuilder) {
      this.editor = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      });
  }

  ngOnInit(){
     this.loadPublicFichas();
     this.loadDadosUsuario();
  }

  selecionarFicha(ficha: ficha) {
    this.fichaSelecionada = ficha;
    console.log('Ficha selecionada:', this.fichaSelecionada.nomePerso);
  }

  loadDadosUsuario(){
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

  loadPublicFichas() {
    this.fichaService.getPublicFichas().subscribe({
      next: (data: any) => {
        this.fichasPublicas = data.results; 
        console.log('Fichas Publicas Recebidas:', this.fichasPublicas);
      },
      error: (err) => {
        console.error('Erro ao carregar fichas públicas:', err);
      }
    });
  }
  
  edicaoPerfil(): void {
    this.editando = true;
    this.editor.setValue({
      username: this.userData?.username || '',
      email: this.userData?.email || ''
    });
  }
  cancelarEdit(): void {
    this.editando = false;
  }
  salvarEdit(): void {
    if (this.editor.invalid) {
      console.error('Formulário inválido!');
      return;
    }

    const updatedData = this.editor.value;
    this.authService.updateUsuario(updatedData).subscribe({
      next: (resp) => {
        console.log('Usuário atualizado com sucesso!', resp);
        // Atualiza os dados locais com a resposta do servidor
        this.userData = resp;
        // Sai do modo de edição
        this.editando = false;
      },
      error: (err) => {
        console.error('Erro ao atualizar usuário:', err);
        // Você pode adicionar uma mensagem de erro para o usuário aqui
      }
    });
  }

  isOwnerOfSelectedFicha(): boolean {
    // Se não houver ficha selecionada ou dados do usuário, não é o dono.
    if (!this.fichaSelecionada || !this.userData) {
      return false;
    }
    return this.fichaSelecionada.usuario === this.userData.url;
  }
  deleteSelectedFicha(): void {
    if (!this.fichaSelecionada) {
      alert('Por favor, selecione uma ficha da sua lista para excluir.');
      return;
    }
    if (!this.isOwnerOfSelectedFicha()) {
      alert('Ação não permitida: Você só pode excluir as suas próprias fichas.');
      return;
    }

    const confirmDelete = confirm(
      `Você tem certeza que deseja excluir a ficha "${this.fichaSelecionada.nomePerso}"? Esta ação não pode ser desfeita.`
    );

    if (confirmDelete) {
      this.fichaService.deleteFicha(this.fichaSelecionada.url).subscribe({
        next: () => {
          alert('Ficha excluída com sucesso!');
          
          this.fichas = this.fichas.filter(f => f.url !== this.fichaSelecionada!.url);
          this.fichaSelecionada = null;
        },
        error: (err) => {
          console.error('Erro ao excluir a ficha:', err);
          alert('Ocorreu um erro ao tentar excluir a ficha.');
        }
      });
    }
  }

  logout(){
    this.authService.logout();
  }
}