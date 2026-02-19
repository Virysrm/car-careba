import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { QuotesComponent } from "./quotes/quotes.component";
import { ListComponent } from "./quotes/list/list.component";
import { SalesreusedComponent } from "./salesreused/salesreused.component";
import { UsersComponent } from "./users/users.component";
import { FormularyComponent } from "./quotes/formulary/formulary.component";


const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { 
        path: "quotes", 
        component: QuotesComponent,
        data: { title: 'Cotizaciones', subtitle: 'Cotizaciones 2026' }
      },
      { path: "list", 
        component: ListComponent,
        data: { title: 'Lista de Cotizaciones', subtitle: 'Cotizaciones 2026'}
      },
      { 
        path: "formulary", 
        component: FormularyComponent, 
        data: { title: 'Agregar Cotizaciones', subtitle: 'Cotizaciones 2026'}
      },
      { path: "salesused", component: SalesreusedComponent },
      { path: "users", component: UsersComponent },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeDashboardRoutingModule {}