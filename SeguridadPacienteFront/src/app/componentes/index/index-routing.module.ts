
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Acceso } from 'src/app/control/acceso';
import { IndexComponent } from './index.component';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { QueryComponent } from './query/query.component';


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
    //   {
    //       path: 'consultar',
    //       component: Pag4Component,
    //       canActivate: [Acceso]
    //   },
    //   {
    //       path: 'estadistica',
    //       component: EstadisticaComponent,
    //       canActivate: [Acceso]
    //   },
    //   {
    //       path: 'estadistica2',
    //       component: EstadisticaEmpresaComponent,
    //       canActivate: [Acceso]
    //   },
    //   {
    //       path: 'estadistica3',
    //       component: EstadisticaSedeComponent,
    //       canActivate: [Acceso]
    //   },
    //   {
    //       path: 'excel',
    //       component: ExcelComponent,
    //       canActivate: [Acceso]
    //   },

      
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
