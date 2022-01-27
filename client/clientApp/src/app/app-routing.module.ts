import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { ManageComponent } from './pages/manage/manage.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'manage', component: ManageComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: '**', redirectTo: 'dashboard' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
