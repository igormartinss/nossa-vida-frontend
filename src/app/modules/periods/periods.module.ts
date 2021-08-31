import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { PeriodDetailsComponent } from './components/period-details/period-details.component';
import { PeriodsFormComponent } from './components/periods-form/periods-form.component';
import { PeriodsListComponent } from './components/periods-list/periods-list.component';
import { ClientesRoutingModule } from './periods-routing.module';

@NgModule({
  declarations: [
    PeriodsListComponent,
    PeriodsFormComponent,
    PeriodDetailsComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    PeriodsListComponent,
    PeriodsFormComponent,
    PeriodDetailsComponent
  ]
})
export class PeriodsModule { }
