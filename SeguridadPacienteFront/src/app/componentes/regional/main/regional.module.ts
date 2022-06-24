import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegionalComponent } from './regional.component';
import { NbActionsModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbSpinnerModule, NbTableModule, NbTreeGridModule, NbWindowModule } from '@nebular/theme';
import { RegionalEditarModule } from '../editar/regionalEditar.module';
import { RegionalCrearModule } from '../crear/regionalCrear.module';

@NgModule({
  declarations: [
    RegionalComponent,
  ],
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

    RegionalEditarModule,
    RegionalCrearModule
  ],
  providers: [
  ],
})

export class RegionalModule { }
