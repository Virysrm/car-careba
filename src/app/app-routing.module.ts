import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InicioComponent } from "./components/inicio/inicio.component";
import { ContactComponent } from "./components/contact/contact.component";
import { ReusedComponent } from "./components/reused/reused.component";
import { UsComponent } from "./components/us/us.component";
import { FooterComponent } from "./shared/footer/footer.component";
//import { HeaderComponent } from './shared/header/header.component';
import { AttainmentComponent } from "./components/attainment/attainment.component";
import { GalleryComponent } from "./components/gallery/gallery.component";
import { WorksComponent } from "./components/works/works.component";
import { PoliticaPrivacidadComponent } from "./shared/politica-privacidad/politica-privacidad.component";
import { TerminosCondicionesComponent } from "./shared/terminos-condiciones/terminos-condiciones.component";

const routes: Routes = [
  { path: "home", component: InicioComponent },
  { path: "attainment", component: AttainmentComponent },
  { path: "works", component: WorksComponent },
  { path: "contacto", component: ContactComponent },
  { path: "reused", component: ReusedComponent },
  { path: "us", component: UsComponent },
  { path: "gallery", component: GalleryComponent },
  {
    path: "reused-careba",
    loadChildren: () =>
      import("./reused-careba/reused-careba.module").then(
        (m) => m.ReusedCarebaModule,
      ),
  },
  {
    path: "home-dashboard",
    loadChildren: () =>
      import("./dashboard/home-dashboard.module").then(
        (m) => m.HomeDashboardModule,
      ),
  },
  { path: "footer", component: FooterComponent },
  { path: "politica-privacidad", component: PoliticaPrivacidadComponent },
  { path: "terminos-condiciones", component: TerminosCondicionesComponent },
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "**", redirectTo: "home" },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
