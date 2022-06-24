import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login.component';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbSpinnerModule } from '@nebular/theme';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    NbLayoutModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbSpinnerModule,
    NbIconModule,
    NbFormFieldModule,

    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  exports :[
    LoginComponent,
 ]
})
export class LoginModule { }
