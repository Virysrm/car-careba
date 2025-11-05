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