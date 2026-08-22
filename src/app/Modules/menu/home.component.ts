import { Component, OnInit } from "@angular/core";
import { NgClass } from "@angular/common";
import {
  RouterModule,
  ActivatedRoute,
  Router,
  NavigationEnd,
} from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "home-dashboard",
  standalone: true,
  imports: [RouterModule, NgClass],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
  pageTitle: string = "Hola";
  pageSubtitle: string = "";
  pageDescription: string = "Descripcion de la pagína";
  pageIcon: string = "bi-house-fill";

  isMenuOpen = false;
  isCollapsed = false;

  menuAbierto: string | null = null;
  showCareba: boolean = false;
  showDirectorio: boolean = false;
  showPresupuestos: boolean = false;
  showContactoCareba: boolean = false;
  showFinanzas: boolean = false;
  showInventario: boolean = false;
  showReusoCareba: boolean = false;
  showVentas: boolean = false;
  showContactoReusoCareba: boolean = false;
  showOtrosServicios: boolean = false;
  showPisos: boolean = false;
  showLambrin: boolean = false;
  showAdministracion: boolean = false;
  showUsuarios: boolean = false;
  showAutenticacion: boolean = false;
  showListaUsuarios: boolean = false;

  // showProveedores: boolean = false;
  // showPersonal: boolean = false;
  // showProyectos: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
      )
      .subscribe(() => {
        this.actualizarEncabezado();
      });

    this.actualizarEncabezado();
  }

  actualizarEncabezado(): void {
    let route = this.activatedRoute;

    while (route.firstChild) {
      route = route.firstChild;
    }

    route.data.subscribe((data) => {
      this.pageTitle = data["title"] || "INICIO";
      this.pageSubtitle = data["subtitle"] || "Dashboard";
      this.pageDescription = data["description"] || "Descripción";
      this.pageIcon = data["icon"] || "bi-house-fill";
    });
  }
}
