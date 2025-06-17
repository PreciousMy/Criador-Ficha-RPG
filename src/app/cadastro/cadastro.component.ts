
import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-cadastro',
  imports: [RouterModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class CadastroComponent implements OnInit {
  constructor(private client: HttpClient) {}

  ngOnInit(): void {
    this.client
      .post<{ usuario: string; id: number }>(
        'http://localhost:8000/auth/users/',
        {
          usuario: 'felipe2',
          email: 'felipe2@gmail.com',
          senha: '!Q@S#E!Q@S#E',
          conf_senha: '!Q@S#E!Q@S#E',
        }
      )
      .subscribe((resp) => console.log(resp));
  }
}
