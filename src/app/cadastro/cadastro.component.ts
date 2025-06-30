import { RouterModule,Router } from '@angular/router';
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-cadastro',
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.sass'
})

export class CadastroComponent{
  cadastroForm: FormGroup;

  constructor(
    private router:Router,
    private fb: FormBuilder, 
    private client: HttpClient){
      this.cadastroForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        re_password: ['', Validators.required],
      });
    }

  onCadastro(){
    if (this.cadastroForm.valid) {
      const formData = this.cadastroForm.value;
      this.client.post('http://localhost:8000/auth/users/',formData)
      .subscribe((resp) => {
        console.log("Cadastrado")
        this.router.navigate(['/login'])
      });
    }
  }
}

