import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./menu/home.component";
import { ListComponent } from "./careba/budget/list/list.component";
import { VentasComponent } from "./reuse-careba/ventas/ventas.component";
import { UsersComponent } from "./settings/users/users.component";
import { FormularyComponent } from "./careba/budget/formulary/formulary.component";
import { IniciosComponent } from "./dashboard/inicios.component";
import { CustomersComponent } from "./careba/directory/customers/customers.component";
import { SuppliersComponent } from "./careba/directory/suppliers/suppliers.component";
import { StaffComponent } from "./careba/directory/staff/staff.component";
import { ResumenComponent } from "./reuse-careba/ventas/resumen/resumen.component";
import { InventarioComponent } from "./reuse-careba/ventas/inventario/inventario.component";
import { AltasInventarioComponent } from "./reuse-careba/ventas/altas-inventario/altas-inventario.component";
import { DetallesVentasComponent } from "./reuse-careba/ventas/detalles-ventas/detalles-ventas.component";


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
      // COTIZACIONES - budget
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
          description: "Ingresa los datos correspondientes, el PDF se descargará SIN IVA",
          icon: "bi-hammer"
        }
      },

      // =========================
      // DIRECTORIO - directory
      // =========================
      {
        path: "customers",
        component: CustomersComponent,
        data: {
          title: "DIRECTORIO",
          subtitle: "Lista de Clientes Registrados",
          description: "Desgloce de Información de Cada Cliente que se le otorga un Presupuesto",
          icon: "bi-hammer"
        }
      },

      {
        path: "suppliers",
        component: SuppliersComponent,
        data: {
          title: "PRESUPUESTOS",
          subtitle: "Agregar cotización",
          description: "Ingresa los datos correspondientes, el PDF se descargará SIN IVA",
          icon: "bi-hammer"
        }
      },

      {
        path: "staff",
        component: StaffComponent,
        data: {
          title: "PRESUPUESTOS",
          subtitle: "Agregar cotización",
          description: "Ingresa los datos correspondientes, el PDF se descargará SIN IVA",
          icon: "bi-hammer"
        }
      },

      // =========================
      // VENTAS
      // =========================
      {
        path: "resumen",
        component: ResumenComponent,
        data: {
          title: "Ventas",
          subtitle: "Ventas realizadas de REUSO CAREBA y otros Servicios",
          description: "Desgloce de todas las compras de muebles del catálogo",
          icon: "bi-grid-fill"
        }
      },
      {
        path: "detalles-ventas",
        component: DetallesVentasComponent,
        data: {
          title: "Información de Cada Venta",
          subtitle: "Detalles del Pedido",
          description: "Informativo",
          icon: "bi-grid-fill"
        }
      },
            {
        path: "inventario",
        component: InventarioComponent,
        data: {
          title: "Inventario",
          subtitle: "Productos en lista para su venta en linea",
          description: "Cunsulta todos los detalles de los productos en lista",
          icon: "bi-grid-fill"
        }
      },
      {
        path: "altas-inventario",
        component: AltasInventarioComponent,
        data: {
          title: "Información del Producto",
          subtitle: "Alta de Cada Producto en el Sistema",
          description: "Descripción  y Vista de cada Producto",
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