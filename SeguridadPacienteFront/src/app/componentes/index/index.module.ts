import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { IndexRoutingModule } from './index-routing.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { IndexComponent } from './index.component';
import { QueryComponent } from './query/query.component';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { TablaComponent } from './demos/tabla/tabla.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormularioComponent } from './demos/formulario/formulario.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { DetallesComponent } from './detalles/detalles.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { NaranjoComponent } from './investigaciones/naranjo/naranjo.component';
import { LondresComponent } from './investigaciones/londres/londres.component';
import { SelectInvestigacionComponent } from './investigaciones/select-investigacion/select-investigacion.component';
import { CreateOportunidadesFormComponent } from './oportunidades-de-mejora/create-oportunidades-form/create-oportunidades-form.component';
import { M5Component } from './investigaciones/m5/m5.component';
import { P5Component } from './investigaciones/p5/p5.component';
import { DialogConfirmacionComponent } from '../dialog-confirmacion/dialog-confirmacion.component';
import { InfoComponent } from '../info/info.component';
import { DialogMainComponent } from '../dialog-main/dialog-main.component';
import { ExportarComponent } from './exportar/exportar.component';
import { ListOportunidaMejoraComponent } from './oportunidades-de-mejora/list-oportunidad-mejora/list-oportunidad-mejora.component';
import { ListPlanAccionComponent } from './planes-de-accion/list-plan-accion/list-plan-accion.component';
import { ListFollowsComponent } from './list_follows/list-follows.component';
import { CreateFollowFormComponent } from './create-follow-form/create-follow-form.component';
import { AggOportunityComponent } from './oportunidades-de-mejora/agg-oportunity/agg-oportunity.component';
import { AccionFormComponent } from './planes-de-accion/accion-form/accion-form.component';
import { EditPlanAccionComponent } from './oportunidades-de-mejora/edit-plan-accion/edit-plan.accion.component';

@NgModule({
  declarations: [
    IndexComponent,
    QueryComponent,
    ExportarComponent,
    OpportunityComponent,
    DetallesComponent,
    TablaComponent,
    FormularioComponent,
    NaranjoComponent,
    LondresComponent,
    SelectInvestigacionComponent,
    CreateOportunidadesFormComponent,
    AccionFormComponent,
    M5Component,
    P5Component,
    DialogConfirmacionComponent,
    InfoComponent,
    DialogMainComponent,
    ListOportunidaMejoraComponent,
    ListPlanAccionComponent,
    ListFollowsComponent,
    CreateFollowFormComponent,
    AggOportunityComponent,
    EditPlanAccionComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatGridListModule,
    IndexRoutingModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatChipsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  exports: [
    IndexComponent,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr' },
  ]
})
export class IndexModule { }
