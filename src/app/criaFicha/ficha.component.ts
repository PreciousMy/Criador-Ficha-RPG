// src/app/pages/criar-ficha/criar-ficha.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FichaService } from '../services/ficha.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-criar-ficha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.sass']
})
export class FichaComponent implements OnInit {
  userData: any | null = null;
  fichaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fichaService: FichaService,
    private router: Router,
    private authService: AuthService
  ) {
  
    this.fichaForm = this.fb.group({
      // Cabeçalho
      nomePerso: ['', Validators.required],
      classe: [''],
      nivel: [1, Validators.required],
      raca: [''],
      antecendente: [''],
      alinhamento: [''],
      exp: [0],

      // Atributos
      forc: [10, Validators.required],
      dest: [10, Validators.required],
      consti: [10, Validators.required],
      inte: [10, Validators.required],
      sab: [10, Validators.required],
      car: [10, Validators.required],
      
      // Modificadores (serão calculados, então não precisam de validação)
      forcMod: [{ value: 0, disabled: true }],
      destMod: [{ value: 0, disabled: true }],
      constiMod: [{ value: 0, disabled: true }],
      inteMod: [{ value: 0, disabled: true }],
      sabMod: [{ value: 0, disabled: true }],
      carMod: [{ value: 0, disabled: true }],

      
      tracosPerso: [''],
      ideais: [''],
      vinculos: [''],
      fraquezas: [''],
    
      pvTotais: [10],
      iniciativa: [0],
      deslocamento: [9],
      dadoVida: ['1d8'],
      qtd_DadosVida: [1],
      bonusProef: [2],
      sabPassiva: [10],
      inspira: [0], 
      idiomas_Proeficiencias: [''],
      descAtaque: [''],
      descEquip: [''],
      caractHabilidades: [''], 
      historia: [''], 
      aparencia: [''], 
      aliadosOrg: [''], 
      outrasCaract: [''], 
      tesouro: [''], 
      
      // Aparência Física 
      idade: [20], 
      altura: [1.75], 
      peso: [70],
      olhos: [''], 
      pele: [''], 
      cabelos: [''], 
      
      // Dinheiro 
      pCobre: [0], 
      pPrata: [0],
      pEletro: [0], 
      pOuro: [10],
      pPlatina: [0], 

      publica: [false],
     
    });
  }

  ngOnInit(): void {
    this.setupAttributeCalculations();
    this.loadDadosUsuario();
  }


  loadDadosUsuario(){
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
  
  setupAttributeCalculations(): void {
    const attributes = ['forc', 'dest', 'consti', 'inte', 'sab', 'car'];
    attributes.forEach(attr => {
      this.fichaForm.get(attr)?.valueChanges.subscribe(score => {
        const modifier = Math.floor((score - 10) / 2);
        this.fichaForm.get(`${attr}Mod`)?.setValue(modifier, { emitEvent: false });
      });
    });
  }

  onSubmit(): void {

    if (this.fichaForm.invalid) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    const formValue = this.fichaForm.getRawValue();

    this.fichaService.criaFicha(formValue).subscribe({
      next: (novaFicha) => {
        console.log('Ficha criada com sucesso!', novaFicha);
        alert(`Ficha "${novaFicha.nomePerso}" criada com sucesso!`);
        this.router.navigate(['/home']); 
      },
      error: (err) => {
        console.error('Erro ao criar ficha:', err);
        alert('Ocorreu um erro ao criar a ficha.');
      }
    });
  }
}