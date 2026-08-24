import { NgModule } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { QuotesComponent } from "./careba/budget/quotes.component";
import { SalesreusedComponent } from "./reuse-careba/salesreused/salesreused.component";
import { UsersComponent } from "./settings/users/users.component";
import { HomeComponent } from "./menu/home.component";
import { HomeDashboardRoutingModule } from "./home-dashboard-routing.module";
import { IniciosComponent } from "./dashboard/inicios.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HomeDashboardRoutingModule,
    ReactiveFormsModule,
    HomeComponent,
    QuotesComponent,
    SalesreusedComponent,
    UsersComponent, 
    IniciosComponent
  ]
})
export class HomeDashboardModule {}
