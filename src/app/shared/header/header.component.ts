import { Component, OnInit, HostListener } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  standalone: false,
})
export class HeaderComponent implements OnInit {
  menuOpen = false;
  isScrolled = false;

  constructor() {}

  ngOnInit(): void {}
  /*Clase para desplazar hacia la siguiente sección de la pagina */
  // scrollTo(event: Event, sectionId: string): void {
  //   event.preventDefault();
  //   event.stopPropagation();

  //   const target = document.getElementById(sectionId);

  //   target?.scrollIntoView({
  //     behavior: "smooth",
  //     block: "start",
  //   });
  // }
  scrollTo(event: Event, sectionId: string): void {
  event.preventDefault();
  event.stopPropagation();

  const target = document.getElementById(sectionId);

  if (!target) return;

  const navbarHeight = document.querySelector('.masthead')?.clientHeight || 0;

  const targetPosition = target.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = targetPosition - navbarHeight - 0; // Ajuste extra de 10px

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen ? "hidden" : ""; // evita scroll
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50; // cambia a "true" al hacer scroll
  }
}
