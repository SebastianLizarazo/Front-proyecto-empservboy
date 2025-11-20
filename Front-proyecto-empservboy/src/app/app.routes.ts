import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './autenticacion/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'clientes',
        loadChildren: () => import('./gestion-clientes/gestion-clientes.module').then(m => m.GestionClientesModule)
    },
    { path: 'usuarios',
        loadChildren: () => import('./gestion-usuarios/gestion-usuarios.module').then(m => m.GestionUsuariosModule)
    },
    { path: 'contratos',
        loadChildren: () => import('./gestion-contratos/gestion-contratos-module').then(m => m.GestionContratosModule)
    },
    { path: 'residuos',
        loadChildren: () => import('./gestion-recepcion-residuos/gestion-recepcion-residuos-module').then(m => m.GestionRecepcionResiduosModule)
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
