import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  HostListener,
} from "@angular/core";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.scss"],
  standalone: false,
})
export class InicioComponent implements OnInit {
  elementosVisibles: boolean[] = [];
  @ViewChild("fadeEl") fadeEl!: ElementRef;
  @ViewChild("sectionEl") sectionEl!: ElementRef;

  isFadeVisible = false;
  isSectionVisible = false;
  isScrolled = false;
  loading = true;

  constructor() {}

ngOnInit(): void {

  setTimeout(() => {
    this.loading = false;

    // activar animación del hero
    setTimeout(() => {
      this.isFadeVisible = true;
    }, 100);

  }, 2000);

}

  /*Clase para desplazar hacia la siguiente sección de la pagina */
  scrollDown(): void {
    window.scrollBy({
      top: window.innerHeight, // 🔹 Desliza una pantalla completa
      behavior: "smooth", // 🔹 Movimiento suave
    });
  }

  // ngAfterViewInit() {
  //   const fadeObserver = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         this.isFadeVisible = true;
  //         fadeObserver.unobserve(this.fadeEl.nativeElement); // solo una vez
  //       }
  //     },
  //     { threshold: 0.2 }
  //   );

  //   if (this.fadeEl) fadeObserver.observe(this.fadeEl.nativeElement);
  // }

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
