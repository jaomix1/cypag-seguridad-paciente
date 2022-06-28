
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Acceso } from 'src/app/control/acceso';

import { IndexComponent } from './index.component';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { QueryComponent } from './query/query.component';
import { DetallesComponent } from './detalles/detalles.component';

import { TablaComponent } from './demos/tabla/tabla.component';
import { FormularioComponent } from './demos/formulario/formulario.component';
import { MsPqComponent } from './investigaciones/ms-pq/ms-pq.component';
import { NaranjoComponent } from './investigaciones/naranjo/naranjo.component';
import { LondresComponent } from './investigaciones/londres/londres.component';
import { SelectInvestigacionComponent } from './investigaciones/select-investigacion/select-investigacion.component';
import { EventoAdversoComponent } from './evento-adverso/evento-adverso.component';

const routes: Routes = [
  {
    path: 'index', component : IndexComponent, canActivate: [Acceso],
    children: [
      {
          path: 'oportunidad',
          component: OpportunityComponent,
          //canActivate: [Acceso]
      },
      {
          path: 'consulta',
          component: QueryComponent,
          //canActivate: [Acceso]
      },
      {
          path: 'tabla',
          component: TablaComponent,
          //canActivate: [Acceso]
      },
      {
          path: 'form',
          component: FormularioComponent,
          //canActivate: [Acceso]
      },
      {
        path: 'detalles',
        component: DetallesComponent,
        //canActivate: [Acceso]
      },
      {
        path: 'investigacion',
        component: SelectInvestigacionComponent,
        //canActivate: [Acceso]
      },
      {
        path: 'naranjo',
        component: NaranjoComponent,
        //canActivate: [Acceso]
      },
      {
        path: 'londres',
        component: LondresComponent,
        //canActivate: [Acceso]
      },
      {
        path: 'evento',
        component: EventoAdversoComponent,
        //canActivate: [Acceso]
      },
    ]
  },
//   {
//     path: 'admin', component : IndexComponent, canActivate: [AccesoAdmin],
//     children: [
//       {
//           path: 'users',
//           component: AdminComponent,
//           canActivate: [AccesoAdmin]
//       },
//     ]
//   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
