import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { CotizacionesDbService } from "src/app/services/cotizaciones-db.service";
import generatePDF from "src/app/lib/pdf";
import { Router } from "@angular/router";

@Component({
  selector: "app-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent {
  cotizaciones: any[] = [];

  sortColumn: string = "";
  sortDirection: boolean = true;

  constructor(
    private cotizacionesDbService: CotizacionesDbService,
    private router: Router,
  ) {
    this.cotizacionesDbService
      .obtenerCotizaciones()
      .subscribe((data: any[]) => {
        this.cotizaciones = data;
      });
  }

  ordenar(columna: string) {
    if (this.sortColumn === columna) {
      this.sortDirection = !this.sortDirection;
    } else {
      this.sortColumn = columna;
      this.sortDirection = true;
    }

    this.cotizaciones.sort((a: any, b: any) => {
      let valorA = a[columna] ?? "";
      let valorB = b[columna] ?? "";

      // ===== FECHAS FIRESTORE =====
      if (valorA?.toDate) {
        valorA = valorA.toDate().getTime();
      }

      if (valorB?.toDate) {
        valorB = valorB.toDate().getTime();
      }

      // ===== FECHAS STRING dd/mm/yyyy =====
      // ===== FECHAS STRING dd/mm/yyyy =====
      if (typeof valorA === "string" && valorA.includes("/")) {
        const partesA = valorA.split("/");
        const partesB = valorB.split("/");

        if (partesA.length === 3 && partesB.length === 3) {
          valorA = new Date(
            Number(partesA[2]),
            Number(partesA[1]) - 1,
            Number(partesA[0]),
          ).getTime();

          valorB = new Date(
            Number(partesB[2]),
            Number(partesB[1]) - 1,
            Number(partesB[0]),
          ).getTime();
        }
      }

      // ===== TEXTO =====
      if (typeof valorA === "string") {
        valorA = valorA.toLowerCase().trim();
      }

      if (typeof valorB === "string") {
        valorB = valorB.toLowerCase().trim();
      }

      if (valorA < valorB) {
        return this.sortDirection ? -1 : 1;
      }

      if (valorA > valorB) {
        return this.sortDirection ? 1 : -1;
      }

      return 0;
    });
  }

  irAEditar(cot: any) {
    console.log("Voy a navegar", cot);

    this.router.navigate(["/home-dashboard/formulary"], {
      state: { cot },
    });
  }

  generarPDFDesdeBD(cot: any) {
    const products = cot.conceptos.map((item: any) => ({
      cliente: cot.cliente,
      obra: cot.obra,
      direccion: cot.direccion,
      concepto: item.concepto,
      cantidad: item.cantidad,
      precioUnitario: item.precioUnitario,
    }));

    const notas = cot.notas;

    const fecha = cot.fecha?.toDate
      ? cot.fecha.toDate().toLocaleDateString("es-MX", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : new Date(cot.fecha).toLocaleDateString("es-MX");

    const cotizacion = cot.folio || cot.id;

    generatePDF(products, cotizacion, fecha, notas);
  }

  editarCotizacion(cot: any) {
    const dataActualizada = {
      ...cot,
      cliente: cot.cliente + " (Editado)",
    };

    this.cotizacionesDbService
      .actualizarCotizacion(cot.id, dataActualizada)
      .then(() => {
        console.log("Cotización actualizada");
      });
  }

  // ===== PAGINACIÓN =====

  paginaActual: number = 1;

  registrosPorPagina: number = 9;

  get cotizacionesPaginadas() {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;

    const fin = inicio + this.registrosPorPagina;

    return this.cotizaciones.slice(inicio, fin);
  }

  get totalPaginas() {
    return Math.ceil(this.cotizaciones.length / this.registrosPorPagina);
  }

  get totalPagesArray() {
    return Array(this.totalPaginas).fill(0);
  }

  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
  }

  get paginasVisibles(): number[] {
    const total = this.totalPaginas;

    // Máximo 3 páginas visibles
    if (total <= 3) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    // Inicio
    if (this.paginaActual <= 2) {
      return [1, 2, 3];
    }

    // Final
    if (this.paginaActual >= total - 1) {
      return [total - 2, total - 1, total];
    }

    // Centro
    return [this.paginaActual - 1, this.paginaActual, this.paginaActual + 1];
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
    }
  }
}
