import { Component, HostListener } from "@angular/core";

@Component({
  selector: "app-navbar",
  imports: [],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
})
export class NavbarComponent {
  isScrolled = false;
  menuOpen = false;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  scrollTo(event: Event, sectionId: string): void {
    event.preventDefault();
    event.stopPropagation();

    const target = document.getElementById(sectionId);
    if (!target) return;

    // Altura del navbar
    const navbar = document.querySelector(".navbar") as HTMLElement;
    const navbarHeight = navbar?.offsetHeight || 0;

    // Distancia adicional si el navbar está en top 40 o top 28
    const navbarOffset =
      parseInt(window.getComputedStyle(navbar).top.replace("px", "")) || 0;

    // Posición real del elemento
    const targetPosition = target.offsetTop;

    // Cálculo FINAL correcto
    const offsetPosition = targetPosition - navbarHeight - navbarOffset - 10;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}
