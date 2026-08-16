import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "home-dashboard",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  pageTitle = "Dashboard";
  pageSubtitle = "";
  isMenuOpen = false;
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
  isCollapsed = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    //cOLOCAR RUTAS DE LAS PAGINAS
    this.route.firstChild?.data.subscribe((data) => {
      this.pageTitle = data["title"] || "";
      this.pageSubtitle = data["subtitle"] || "";
      console.log(data);
    });
  }
}
