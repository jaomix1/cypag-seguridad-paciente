import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SedeComponent } from './sede.component';
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
import { SedeEditarModule } from '../editar/sedeEditar.module';
import { SedeCrearModule } from '../crear/sedeCrear.module';

@NgModule({
  declarations: [SedeComponent],
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

    SedeEditarModule,
    SedeCrearModule,
  ],
  providers: [],
})
export class SedeModule {}
