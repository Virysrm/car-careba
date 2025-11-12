import { Component, OnInit, HostListener } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  standalone: false,
})
export class HeaderComponent implements OnInit {
  menuOpen = false;
  isScrolled = false;

  constructor() {}

  ngOnInit(): void {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen ? "hidden" : ""; // evita scroll
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50; // cambia a "true" al hacer scroll
  }
}
