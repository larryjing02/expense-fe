import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { OverviewComponent } from './overview/overview.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';
import { ExpenseItemComponent } from './expense-item/expense-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    DashboardComponent,
    SearchComponent,
    BarChartComponent,
    ExpenseListComponent,
    OverviewComponent,
    LoginComponent,
    RegisterComponent,
    PublicComponent,
    PrivateComponent,
    ExpenseItemComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
