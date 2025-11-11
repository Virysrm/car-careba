import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit {
menuOpen = false;
  constructor() { }

  ngOnInit(): void {
  }

toggleMenu() {
  this.menuOpen = !this.menuOpen;
  document.body.style.overflow = this.menuOpen ? 'hidden' : ''; // evita scroll
}

}
