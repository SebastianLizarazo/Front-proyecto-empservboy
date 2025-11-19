import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './autenticacion/login/login.component';
/*import { ActualizarClientesComponent, CrearClientesComponent, ListarClientesComponent } from './gestion-clientes';*/

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'clientes',
        loadChildren: () => import('./gestion-clientes/gestion-clientes.module').then(m => m.GestionClientesModule)
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
