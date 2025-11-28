import { Component, OnInit, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';

@Component({
  selector: 'app-servicios',
  imports: [],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.scss',
})
export class ServiciosComponent {
 @ViewChild('fadeEl') fadeEl!: ElementRef;
  isFadeVisible = false;

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