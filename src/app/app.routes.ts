import { Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SalaComponent } from './sala/sala.component';
import {authGuard} from './guard/auth.guard';
import { FichaComponent } from './criaFicha/ficha.component';

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
        component: HomeComponent,
        canActivate: [authGuard]
    },
     {
        path: 'sala',
        component: SalaComponent,
        canActivate: [authGuard]
    },
    {
        path: 'ficha',
        component: FichaComponent,
        canActivate: [authGuard]
    } 
];