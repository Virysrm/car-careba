import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { InventarioReusoDbService } from "src/app/services/inventarioReuso-db.service";
@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss',
})
export class InventarioComponent implements OnInit {
  paginaActual: number = 1;
  registrosPorPagina: number = 10;
  inventario: any[] = [];

  constructor(
    private inventarioDbService: InventarioReusoDbService
    ) { }

  ngOnInit(): void {
    this.obtenerInventarioReuso();
  }

  convertirFecha(fecha: any): number {
    // No existe fecha
    if (!fecha) {
      return 0;
    }

    // Firestore Timestamp
    if (typeof fecha.toDate === "function") {
      return fecha.toDate().getTime();
    }

    if (typeof fecha.seconds === "number") {
      return fecha.seconds * 1000;
    }

    if (typeof fecha._seconds === "number") {
      return fecha._seconds * 1000;
    }


    // Fecha como string dd/MM/yyyy
    if (typeof fecha === "string" && fecha.includes("/")) {
      const partes = fecha.split("/");

      if (partes.length === 3) {
        return new Date(
          Number(partes[2]),
          Number(partes[1]) - 1,
          Number(partes[0]),
        ).getTime();
      }
    }


    // Fecha como Date
    if (fecha instanceof Date) {
      return fecha.getTime();
    }

    const fechaConvertida = new Date(fecha).getTime();

    return isNaN(fechaConvertida) ? 0 : fechaConvertida;
  }

  obtenerInventarioReuso(): void {
    this.inventarioDbService.obtenerInventarioReuso().subscribe({
      next: (data: any[]) => {
        this.inventario = data
          .sort((a: any, b: any) => {
            return this.convertirFecha(a.fecha) - this.convertirFecha(b.fecha);
          })
          .reverse();

        // Comenzar siempre en la primera página
        this.paginaActual = 1;
      },

      error: (error) => {
        console.error("Error al obtener las cotizaciones:", error);
      },
    });
  }

  // PAGINACIÓN
  get inventarioPaginado(): any[] {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;

    const fin = inicio + this.registrosPorPagina;

    return this.inventario.slice(inicio, fin);
  }

  // TOTAL DE PÁGINAS
  get totalPaginas(): number {
    return Math.ceil(this.inventario.length / this.registrosPorPagina);
  }

  // PÁGINAS VISIBLES
  get paginasVisibles(): number[] {
    const total = this.totalPaginas;

    // No existen páginas
    if (total === 0) {
      return [];
    }

    // Máximo 3 páginas
    if (total <= 3) {
      return Array.from(
        {
          length: total,
        },
        (_, i) => i + 1,
      );
    }

    // INICIO
    if (this.paginaActual <= 2) {
      return [1, 2, 3];
    }

    // FINAL
    if (this.paginaActual >= total - 1) {
      return [total - 2, total - 1, total];
    }

    // CENTRO
    return [this.paginaActual - 1, this.paginaActual, this.paginaActual + 1];
  }

  // CAMBIAR PÁGINA
  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  // PÁGINA ANTERIOR
  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  // PÁGINA SIGUIENTE
  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
    }
  }
}
