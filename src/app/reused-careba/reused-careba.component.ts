import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { NavbarComponent } from "./navbar/navbar.component";
import { ServiciosComponent } from "./servicios/servicios.component";
import { ProductsComponent } from "./products/products.component";
import { FooterComponent } from "./footer/footer.component";
import { ContactComponent } from "./contact/contact.component";

@Component({
  selector: 'reused-careba',
  imports: [NavbarComponent, ServiciosComponent, ProductsComponent, FooterComponent, ContactComponent],
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
