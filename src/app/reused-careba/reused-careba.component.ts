import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'reused-careba',
  imports: [NavbarComponent],
  templateUrl: './reused-careba.component.html',
  styleUrl: './reused-careba.component.scss',
})
export class ReusedCarebaComponent {
  @ViewChild("fadeEl") fadeEl!: ElementRef;
  @ViewChild("sectionEl") sectionEl!: ElementRef;

  isFadeVisible = false;
  isSectionVisible = false;
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
