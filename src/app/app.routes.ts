import { Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SalaComponent } from './sala/sala.component';
import {ProtegidaComponent} from '../app/protegida/protegida.component';
import { guardaGuard } from './protegida/guarda.guard';

export const routes: Routes = [
    { 
        path: '', redirectTo: '/login', pathMatch: 'full' 
    }, 
    {
        path: 'cadastro',
        component: CadastroComponent 
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
     {
        path: 'sala',
        component: SalaComponent
    },
     { path: 'protegida', 
        component: Protegida, 
        canActivate: [guardaGuard]},

];