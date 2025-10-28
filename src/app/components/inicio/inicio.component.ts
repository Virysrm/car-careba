import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.scss"],
})
export class InicioComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  /*Clase para desplazar hacia la siguiente sección de la pagina */
  scrollDown(): void {
    window.scrollBy({
      top: window.innerHeight, // 🔹 Desliza una pantalla completa
      behavior: "smooth", // 🔹 Movimiento suave
    });
  }
}
