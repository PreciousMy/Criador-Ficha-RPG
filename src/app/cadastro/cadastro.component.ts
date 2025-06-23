import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-cadastro',
  imports: [RouterModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.sass'
})

export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;

  constructor(private fb: FormBuilder, private client: HttpClient) {}

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      conf_senha: ['', Validators.required],
    });
  }

  Cadastro(): void {
    if (this.cadastroForm.valid) {
      const formData = this.cadastroForm.value;
      this.client
        .post<{ usuario: string; id: number }>(
          'http://localhost:8000/auth/users/',
          formData
        )
        .subscribe((resp) => console.log(resp));
    }
  }
}

