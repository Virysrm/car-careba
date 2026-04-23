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

  activeIndex: number = -1;

    cards = [
    { bg:'#434448', icon:'bi bi-pencil-square', title:'Diseño Personalizado', text:'Cada pieza es única, diseñada específicamente para tu espacio y necesidades', isTouched: false },
    { bg:'#1e3a47', icon:'bi bi-rulers', title:'Muebles a Medida', text:'Diseñamos y fabricamos muebles únicos adaptados a tus necesidades y espacio.', isTouched: false },
    { bg:'#4b2848', icon:'bi bi-stars', title:'Restauración Premium', text:'Devolvemos la vida a tus muebles con excelentes técnicas de restauracion.', isTouched: false },
    { bg:'#1d442d', icon:'bi bi-hammer', title:'Carpintería Integral', text:'Desde armarios hasta terrazas, en madera para interior y exterior', isTouched: false }
  ];

animateCardsSequentially() {
  this.cards.forEach((card, index) => {
    
    // Primero: hacer visible la card
    setTimeout(() => {
      card.isTouched = true;
    }, index * 500);

    // Segundo: mover el borde activo
    setTimeout(() => {
      this.activeIndex = index;
    }, index * 800); // 👈 este delay es clave
  });
}

  ngAfterViewInit() {
  const fadeObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        this.animateCardsSequentially();
        fadeObserver.unobserve(this.fadeEl.nativeElement);
      }
    },
    { threshold: 0.2 }
  );

  if (this.fadeEl) fadeObserver.observe(this.fadeEl.nativeElement);
}
  
}
