import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    IndexComponent,
    QueryComponent,
    OpportunityComponent,
  ],
  imports: [    
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, 
    HttpClientModule,

    IndexRoutingModule,
    
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule, 
    // MatGridListModule,
    // MatProgressBarModule,
    
  ],
  exports :[
   IndexComponent,
 ]
})
export class IndexModule { }
