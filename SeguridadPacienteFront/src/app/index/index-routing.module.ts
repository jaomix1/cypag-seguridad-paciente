import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { RegionalComponent } from '../componentes/regional/main/regional.component';
import { PacienteComponent } from '../componentes/paciente/main/paciente.component';
import { EpsComponent } from '../componentes/eps/main/eps.component';
import { SedeComponent } from '../componentes/sede/main/sede.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent, //canActivate: [Acceso],
    children: [
      {
        path: 'regional',
        component: RegionalComponent,
      },
      {
        path: 'paciente',
        component: PacienteComponent,
      },
      {
        path: 'eps',
        component: EpsComponent,
      },
      {
        path: 'sede',
        component: SedeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule {}
