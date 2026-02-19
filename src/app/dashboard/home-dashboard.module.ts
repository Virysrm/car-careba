import { NgModule } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { QuotesComponent } from "./quotes/quotes.component";
import { SalesreusedComponent } from "./salesreused/salesreused.component";
import { UsersComponent } from "./users/users.component";
import { HomeComponent } from "./home/home.component";
import { HomeDashboardRoutingModule } from "./home-dashboard-routing.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HomeDashboardRoutingModule,
    ReactiveFormsModule,
    HomeComponent,
    QuotesComponent,
    SalesreusedComponent,
    UsersComponent
  ]
})
export class HomeDashboardModule {}
