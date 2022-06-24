import { NgModule } from '@angular/core';
import { IndexComponent } from './index.component';

import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
import {
  NbSidebarModule,
  NbLayoutModule,
  NbButtonModule,
  NbCardModule,
  NbMenuModule,
  NbIconModule,
  NbActionsModule,
} from '@nebular/theme';

import { RegionalModule } from '../componentes/regional/main/regional.module';
import { PacienteModule } from '../componentes/paciente/main/paciente.module';
import { EpsModule } from '../componentes/eps/main/eps.module';
import { SedeModule } from '../componentes/sede/main/sede.module';

import { IndexRoutingModule } from './index-routing.module';
import { EliminarModule } from '../componentes/comunes/eliminar/eliminar.module';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    NbSidebarModule,
    NbLayoutModule,
    NbMenuModule,
    NbMenuModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbActionsModule,

    IndexRoutingModule,

    RegionalModule,
    PacienteModule,
    EpsModule,
    SedeModule,

    EliminarModule,
  ],
  exports: [IndexComponent],
})
export class IndexModule {}
