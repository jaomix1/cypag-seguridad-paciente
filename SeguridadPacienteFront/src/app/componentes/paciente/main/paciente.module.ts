import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PacienteComponent } from './paciente.component';
import {
  NbActionsModule,
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule,
  NbTableModule,
  NbTreeGridModule,
  NbWindowModule,
} from '@nebular/theme';
import { PacienteEditarModule } from '../editar/pacienteEditar.module';
import { PacienteCrearModule } from '../crear/pacienteCrear.module';

@NgModule({
  declarations: [PacienteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbSpinnerModule,
    NbButtonGroupModule,
    NbIconModule,
    NbActionsModule,
    NbTreeGridModule,

    PacienteEditarModule,
    PacienteCrearModule,
  ],
  providers: [],
})
export class PacienteModule {}
