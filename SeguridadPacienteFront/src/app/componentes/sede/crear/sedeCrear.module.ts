import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SedeCrearComponent } from './sedeCrear.component';
import {
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule,
} from '@nebular/theme';

@NgModule({
  declarations: [SedeCrearComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    NbCardModule,
    NbSpinnerModule,
    NbInputModule,
    NbButtonModule,
  ],
  providers: [],
})
export class SedeCrearModule {}
