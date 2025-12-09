import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from "@angular/core";

@Component({
    selector: 'app-works',
    templateUrl: './works.component.html',
    styleUrls: ['./works.component.scss'],
    standalone: false
})
export class WorksComponent implements AfterViewInit {
  @ViewChild('fadeEl') fadeEl!: ElementRef;
  isFadeVisible = false;

    cards = [
    { bg:'#434448', icon:'bi bi-pencil-square', title:'Diseño Personalizado', text:'Cada pieza es única, diseñada específicamente para tu espacio y necesidades', isTouched: false },
    { bg:'#1e3a47', icon:'bi bi-rulers', title:'Muebles a Medida', text:'Diseñamos y fabricamos muebles únicos adaptados a tus necesidades y espacio.', isTouched: false },
    { bg:'#4b2848', icon:'bi bi-stars', title:'Restauración Premium', text:'Devolvemos la vida a tus muebles con excelentes técnicas de restauracion.', isTouched: false },
    { bg:'#1d442d', icon:'bi bi-hammer', title:'Carpintería Integral', text:'Desde armarios hasta terrazas, todo tipo de proyectos en madera tanto interior como exterior', isTouched: false }
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
