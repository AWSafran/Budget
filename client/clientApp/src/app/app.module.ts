import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { ExpensesComponent } from './pages/expenses/expenses/expenses.component';
import { ManageComponent } from './pages/manage/manage/manage.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ExpensesComponent,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
