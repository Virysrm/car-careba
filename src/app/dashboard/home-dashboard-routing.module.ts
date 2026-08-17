import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { QuotesComponent } from "./quotes/quotes.component";
import { ListComponent } from "./quotes/list/list.component";
import { SalesreusedComponent } from "./salesreused/salesreused.component";
import { UsersComponent } from "./users/users.component";
import { FormularyComponent } from "./quotes/formulary/formulary.component";
import { IniciosComponent } from "./inicios/inicios.component";


const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [

      {
        path: "",
        redirectTo: "inicios",
        pathMatch: "full"
      },

      // =========================
      // COTIZACIONES
      // =========================
      {
        path: "list",
        component: ListComponent,
        data: {
          title: "PRESUPUESTOS",
          subtitle: "Lista de cotizaciones",
          description: "Desgloce de Presupuestos y Status",
          icon: "bi-hammer"
        }
      },

      {
        path: "formulary",
        component: FormularyComponent,
        data: {
          title: "PRESUPUESTOS",
          subtitle: "Agregar cotización",
          description: "Ingresa los datos correspondoentes, el PDF se descargará con o Sin IVA",
          icon: "bi-hammer"
        }
      },

      // =========================
      // VENTAS
      // =========================
      {
        path: "salesused",
        component: SalesreusedComponent,
        data: {
          title: "VENTAS",
          subtitle: "Ventas realizadas de REUSO CAREBA y otros Servicios",
          description: "Desgloce de ingresos por otros canales de Venta y Srvicio",
          icon: "bi-grid-fill"
        }
      },

      // =========================
      // USUARIOS
      // =========================
      {
        path: "users",
        component: UsersComponent,
        data: {
          title: "USUARIOS",
          subtitle: "Lista de usuarios registrados",
            description: "Desgloce de ingresos por otros canales de Venta y Srvicio",
          icon: "bi-gear-fill"
        }
      },

      // =========================
      // INICIO
      // =========================
      {
        path: "inicios",
        component: IniciosComponent,
        data: {
          title: "DASHBOARD",
          subtitle: "Información General",
          description: "Desgloce de Montos y Proyectos al Día",
          icon: "bi-house-fill"
        }
      }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeDashboardRoutingModule {}