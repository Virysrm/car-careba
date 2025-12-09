import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-servicios",
  imports: [CommonModule],
  templateUrl: "./servicios.component.html",
  styleUrl: "./servicios.component.scss",
})
export class ServiciosComponent {
  @ViewChild("fadeEl") fadeEl!: ElementRef;
  isFadeVisible = false;

  serv = [
    {
      bg: "#1e3a47",
      icon: "bi bi-award",
      title: "Calidad Garantizada",
      text: "Todos nuestros muebles son inspeccionados y restaurados",
      textColor: "rgb(81, 81, 81)",
      isTouched: false,
    },

    {
      bg: "#1e3a47",
      icon: "bi bi-box-seam",
      title: "Entregas",
      text: "Diseñamos y fabricamos muebles únicos adaptados a tus necesidades y espacio.",
      textColor: "rgb(81, 81, 81)",
      isTouched: false,
    },
    {
      bg: "#1e3a47",
      icon: "bi bi-hand-thumbs-up",
      title: "Garantía de Satisfacción",
      text: "Devolvemos la vida a tus muebles con excelentes técnicas de restauracion.",
      textColor: "rgb(81, 81, 81)",
      isTouched: false,
    },
    {
      bg: "#1e3a47",
      icon: "bi bi-leaf",
      title: "Sostenible",
      text: "Desde armarios hasta terrazas, todo tipo de proyectos en madera tanto interior como exterior",
      textColor: "rgb(81, 81, 81)",
      isTouched: false,
    },
  ];

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
