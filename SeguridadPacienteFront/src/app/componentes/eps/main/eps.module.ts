import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EpsComponent } from './eps.component';
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
import { EpsEditarModule } from '../editar/epsEditar.module';
import { EpsCrearModule } from '../crear/epsCrear.module';

@NgModule({
  declarations: [EpsComponent],
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

    EpsEditarModule,
    EpsCrearModule,
  ],
  providers: [],
})
export class EpsModule {}
