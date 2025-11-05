import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from "@angular/core";

@Component({
    selector: 'app-attainment',
    templateUrl: './attainment.component.html',
    styleUrls: ['./attainment.component.scss'],
    standalone: false
})
export class AttainmentComponent implements AfterViewInit {
  @ViewChild('fadeEl') fadeEl!: ElementRef;
  isFadeVisible = false;

  ngAfterViewInit() {
    const fadeObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.isFadeVisible = true;
          fadeObserver.unobserve(this.fadeEl.nativeElement); // Solo una vez
        }
      },
      { threshold: 0.2 }
    );

    if (this.fadeEl) fadeObserver.observe(this.fadeEl.nativeElement);
  }
}