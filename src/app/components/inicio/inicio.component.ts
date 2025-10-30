import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.scss"],
})
export class InicioComponent implements OnInit {
  elementosVisibles: boolean[] = [];
  @ViewChild("fadeEl") fadeEl!: ElementRef;
  @ViewChild("sectionEl") sectionEl!: ElementRef;

  isFadeVisible = false;
  isSectionVisible = false;
  constructor() {}

  ngOnInit(): void {}
  /*Clase para desplazar hacia la siguiente sección de la pagina */
  scrollDown(): void {
    window.scrollBy({
      top: window.innerHeight, // 🔹 Desliza una pantalla completa
      behavior: "smooth", // 🔹 Movimiento suave
    });
  }

  // ngAfterViewInit() {
  //   // Observer para fadeEl
  //   const fadeObserver = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         this.isFadeVisible = true;
  //         fadeObserver.unobserve(this.fadeEl.nativeElement);
  //       }
  //     },
  //     { threshold: 0.2 }
  //   );
  //   if (this.fadeEl) fadeObserver.observe(this.fadeEl.nativeElement);

  //   // Observer para sectionEl
  //   const sectionObserver = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         this.isSectionVisible = true;
  //         sectionObserver.unobserve(this.sectionEl.nativeElement);
  //       }
  //     },
  //     { threshold: 0.1 }
  //   );
  //   if (this.sectionEl) sectionObserver.observe(this.sectionEl.nativeElement);
  // }

  ngAfterViewInit() {
    const fadeObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.isFadeVisible = true;
          fadeObserver.unobserve(this.fadeEl.nativeElement); // solo una vez
        }
      },
      { threshold: 0.2 }
    );

    if (this.fadeEl) fadeObserver.observe(this.fadeEl.nativeElement);
  }
}
