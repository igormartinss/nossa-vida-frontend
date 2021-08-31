import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { LayoutComponent } from '../../layout/layout.component';
import { PeriodDetailsComponent } from './components/period-details/period-details.component';
import { PeriodsFormComponent } from './components/periods-form/periods-form.component';
import { PeriodsListComponent } from './components/periods-list/periods-list.component';

const routes: Routes = [
  {
    path: 'period',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'list', component: PeriodsListComponent },
      { path: 'form', component: PeriodsFormComponent },
      { path: 'form/:id', component: PeriodsFormComponent },
      { path: 'details', component: PeriodDetailsComponent },
      { path: 'details?id=:id', component: PeriodDetailsComponent },
      { path: '', pathMatch: 'full', redirectTo: '/period/list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
