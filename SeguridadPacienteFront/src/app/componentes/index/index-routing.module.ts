
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Acceso } from 'src/app/control/acceso';

import { IndexComponent } from './index.component';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { QueryComponent } from './query/query.component';

import { TablaComponent } from './demos/tabla/tabla.component';
import { FormularioComponent } from './demos/formulario/formulario.component';
import { ExportarComponent } from './exportar/exportar.component';
import { AdminComponent } from '../admin/admin.component';
import { AccesoAdmin } from 'src/app/control/accesoAdmin';

const routes: Routes = [
  {
    path: 'index', component: IndexComponent, canActivate: [Acceso],
    children: [
      {
        path: 'oportunidad',
        component: OpportunityComponent,
        canActivate: [Acceso]
      },
      {
        path: 'consulta',
        component: QueryComponent,
        canActivate: [Acceso]
      },
      {
        path: 'exportar',
        component: ExportarComponent,
        canActivate: [Acceso]
      },
    ]
  },
  {
    path: 'admin', component: IndexComponent, canActivate: [AccesoAdmin],
    children: [
      {
        path: 'usuarios',
        component: AdminComponent,
        canActivate: [AccesoAdmin]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
