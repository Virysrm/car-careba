import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { CotizacionesDbService } from "src/app/services/cotizaciones-db.service";
import generatePDFConIVA from "src/app/lib/pdfCompleto";
import generatePDFSinIVA from "src/app/lib/pdf";

@Component({
  selector: "app-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  cotizaciones: any[] = [];
  sortColumn: string = "";
  paginaActual: number = 1;
  registrosPorPagina: number = 10;

  // =========================================================
  // CONSTRUCTOR
  // =========================================================

  constructor(
    private cotizacionesDbService: CotizacionesDbService,
    private router: Router,
  ) {}

  // =========================================================
  // INICIO
  // =========================================================

  ngOnInit(): void {
    this.obtenerCotizaciones();
  }

  // =========================================================
  // OBTENER COTIZACIONES DE FIRESTORE
  // =========================================================

  obtenerCotizaciones(): void {
    this.cotizacionesDbService.obtenerCotizaciones().subscribe({
      next: (data: any[]) => {
        this.cotizaciones = data
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

  convertirFecha(fecha: any): number {
    // -----------------------------------------------
    // No existe fecha
    // -----------------------------------------------

    if (!fecha) {
      return 0;
    }

    // -----------------------------------------------
    // Firestore Timestamp
    // -----------------------------------------------

    if (typeof fecha.toDate === "function") {
      return fecha.toDate().getTime();
    }

    // -----------------------------------------------
    // Objeto Firestore serializado
    // { seconds, nanoseconds }
    // -----------------------------------------------

    if (typeof fecha.seconds === "number") {
      return fecha.seconds * 1000;
    }

    // -----------------------------------------------
    // Objeto con _seconds
    // -----------------------------------------------

    if (typeof fecha._seconds === "number") {
      return fecha._seconds * 1000;
    }

    // -----------------------------------------------
    // Fecha como string dd/MM/yyyy
    // -----------------------------------------------

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

    // -----------------------------------------------
    // Fecha como Date
    // -----------------------------------------------

    if (fecha instanceof Date) {
      return fecha.getTime();
    }

    // -----------------------------------------------
    // Último intento
    // -----------------------------------------------

    const fechaConvertida = new Date(fecha).getTime();

    return isNaN(fechaConvertida) ? 0 : fechaConvertida;
  }
  // ORDENAR COTIZACIONES

  ordenarCotizaciones = ({ target }: any) => {
    this.sortColumn = target.value;

    if (!this.sortColumn) {
      return;
    }

    this.cotizaciones.sort((a: any, b: any) => {
      let valorA = a[this.sortColumn];
      let valorB = b[this.sortColumn];

      // ORDENAR POR FECHA

      if (this.sortColumn === "fecha") {
        const convertirFecha = (fecha: any): number => {
          // -----------------------------------------------
          // No existe fecha
          // -----------------------------------------------

          if (!fecha) {
            return 0;
          }

          // -----------------------------------------------
          // Firestore Timestamp
          // -----------------------------------------------

          if (typeof fecha.toDate === "function") {
            return fecha.toDate().getTime();
          }

          // -----------------------------------------------
          // Objeto Firestore serializado
          // { seconds, nanoseconds }
          // -----------------------------------------------

          if (typeof fecha.seconds === "number") {
            return fecha.seconds * 1000;
          }

          // -----------------------------------------------
          // Objeto con _seconds
          // -----------------------------------------------

          if (typeof fecha._seconds === "number") {
            return fecha._seconds * 1000;
          }

          // -----------------------------------------------
          // Fecha como string
          // dd/MM/yyyy
          // -----------------------------------------------

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

          // -----------------------------------------------
          // Fecha como Date
          // -----------------------------------------------

          if (fecha instanceof Date) {
            return fecha.getTime();
          }

          // -----------------------------------------------
          // Último intento
          // -----------------------------------------------

          const fechaConvertida = new Date(fecha).getTime();

          return isNaN(fechaConvertida) ? 0 : fechaConvertida;
        };

        const fechaA = convertirFecha(valorA);

        const fechaB = convertirFecha(valorB);

        // -----------------------------------------------
        // COMPARACIÓN REAL DE FECHAS
        // -----------------------------------------------

        return fechaA - fechaB;
      }

      // ORDENAR TEXTO / NÚMEROS

      valorA = valorA ?? "";
      valorB = valorB ?? "";

      return valorA.toString().localeCompare(valorB.toString(), "es", {
        numeric: true,
        sensitivity: "base",
      });
    });

    // =======================================================
    // REGRESAR A LA PRIMERA PÁGINA
    // =======================================================

    this.paginaActual = 1;
  };

  // =========================================================
  // ORDENAR DESDE LOS ENCABEZADOS
  // =========================================================
  // Puedes seguir utilizando:
  // (click)="nar('cliente')"
  // (click)="nar('direccion')"
  // =========================================================

  nar(columna: string): void {
    this.sortColumn = columna;

    this.cotizaciones.sort((a: any, b: any) => {
      let valorA = a[columna] ?? "";
      let valorB = b[columna] ?? "";

      // ==========================================
      // FECHA DE FIRESTORE
      // ==========================================

      if (valorA?.toDate) {
        valorA = valorA.toDate().getTime();
      }

      if (valorB?.toDate) {
        valorB = valorB.toDate().getTime();
      }

      // ==========================================
      // FECHA COMO STRING
      // ==========================================

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

      // ==========================================
      // TEXTO
      // ==========================================

      if (typeof valorA === "string") {
        valorA = valorA.toLowerCase().trim();
      }

      if (typeof valorB === "string") {
        valorB = valorB.toLowerCase().trim();
      }

      // ==========================================
      // COMPARACIÓN
      // ==========================================

      return valorA.toString().localeCompare(valorB.toString(), "es", {
        numeric: true,
        sensitivity: "base",
      });
    });

    // Regresar a primera página
    this.paginaActual = 1;
  }

  // =========================================================
  // IR A EDITAR COTIZACIÓN
  // =========================================================

  irAEditar(cot: any): void {
    console.log("Voy a editar:", cot);

    this.router.navigate(["/home-modules/formulary"], {
      state: {
        cot: cot,
      },
    });
  }

  // =========================================================
  // GENERAR PDF DESDE FIRESTORE
  // =========================================================

  generarPDFConIVADesdeBD(cot: any): void {
    // ==========================================
    // VALIDAR COTIZACIÓN
    // ==========================================

    if (!cot) {
      console.error("No se recibió la cotización.");

      return;
    }

    // ==========================================
    // CONCEPTOS
    // ==========================================

    const products = (cot.conceptos || []).map((item: any) => ({
      cliente: cot.cliente,

      obra: cot.obra,

      direccion: cot.direccion,

      concepto: item.concepto,

      cantidad: item.cantidad,

      precioUnitario: item.precioUnitario,
    }));

    // ==========================================
    // NOTAS
    // ==========================================

    const notas = cot.notas || "";

    // ==========================================
    // FECHA
    // ==========================================

    let fecha = "";

    // Fecha como Timestamp de Firestore

    if (cot.fecha?.toDate) {
      fecha = cot.fecha.toDate().toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }

    // Fecha como string o Date
    else if (cot.fecha) {
      fecha = new Date(cot.fecha).toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }

    // Si no existe fecha
    else {
      fecha = new Date().toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }

    // ==========================================
    // FOLIO
    // ==========================================

    const cotizacion = cot.folio || cot.id || "";

    // ==========================================
    // GENERAR PDF
    // ==========================================

    generatePDFConIVA(products, cotizacion, fecha, notas);
  }

  generarPDFSinIVADesdeBD(cot: any): void {
    // ==========================================
    // VALIDAR COTIZACIÓN
    // ==========================================

    if (!cot) {
      console.error("No se recibió la cotización.");

      return;
    }

    // ==========================================
    // CONCEPTOS
    // ==========================================

    const products = (cot.conceptos || []).map((item: any) => ({
      cliente: cot.cliente,

      obra: cot.obra,

      direccion: cot.direccion,

      concepto: item.concepto,

      cantidad: item.cantidad,

      precioUnitario: item.precioUnitario,
    }));

    // ==========================================
    // NOTAS
    // ==========================================

    const notas = cot.notas || "";

    // ==========================================
    // FECHA
    // ==========================================

    let fecha = "";

    // Fecha como Timestamp de Firestore

    if (cot.fecha?.toDate) {
      fecha = cot.fecha.toDate().toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }

    // Fecha como string o Date
    else if (cot.fecha) {
      fecha = new Date(cot.fecha).toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }

    // Si no existe fecha
    else {
      fecha = new Date().toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }

    // ==========================================
    // FOLIO
    // ==========================================

    const cotizacion = cot.folio || cot.id || "";

    // ==========================================
    // GENERAR PDF
    // ==========================================

    generatePDFSinIVA(products, cotizacion, fecha, notas);
  }
  // =========================================================
  // ACTUALIZAR COTIZACIÓN
  // =========================================================

  editarCotizacion(cot: any): void {
    // ==========================================
    // VALIDAR ID
    // ==========================================

    if (!cot?.id) {
      console.error("La cotización no tiene ID.");

      return;
    }

    // ==========================================
    // DATOS ACTUALIZADOS
    // ==========================================

    const dataActualizada = {
      ...cot,

      cliente: cot.cliente + " (Editado)",
    };

    // ==========================================
    // ACTUALIZAR FIRESTORE
    // ==========================================

    this.cotizacionesDbService
      .actualizarCotizacion(cot.id, dataActualizada)

      .then(() => {
        console.log("Cotización actualizada correctamente.");
      })

      .catch((error) => {
        console.error("Error al actualizar la cotización:", error);
      });
  }

  // ==========================================
  // ELIMINAR
  // ==========================================
  cotizacionEliminada = "";
  cotizacionPendiente: any = null;

  showDeleteModal = false;
  eliminarCotizacion(cot: any): void {
    if (!cot?.id) {
      //"Si cot no tiene un ID, detén el proceso."
      console.error("La cotización no tiene ID");
      return;
    }

    this.cotizacionPendiente = cot;
    this.showDeleteModal = true;
  }

  confirmarEliminacion(): void {
    if (this.cotizacionPendiente === null) {
      console.error("La cotización no tiene ID");
      return;
    }

    this.cotizacionesDbService
      .eliminarCotizacion(this.cotizacionPendiente.id)
      .then(() => {
        this.showDeleteModal = false;

        this.cotizacionPendiente = null;
        this.mensajeExito = "Registro eliminado correctamente.";

        this.mostrarModalExito = true;
      })
      .catch((error) => {
        console.error("Error al eliminar la cotización:", error);
      });
  }

  cancelarEliminacion(): void {
    this.showDeleteModal = false;
    this.cotizacionPendiente = null;
  }

  // ============================================================
  // MODAL
  // ============================================================

  mostrarModalExito = false;
  mensajeExito = "";

  cerrarModalExito() {
    this.mostrarModalExito = false;
  }

  // =========================================================
  // COTIZACIONES PAGINADAS
  // =========================================================

  get cotizacionesPaginadas(): any[] {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;

    const fin = inicio + this.registrosPorPagina;

    return this.cotizaciones.slice(inicio, fin);
  }

  // =========================================================
  // TOTAL DE PÁGINAS
  // =========================================================

  get totalPaginas(): number {
    return Math.ceil(this.cotizaciones.length / this.registrosPorPagina);
  }

  // =========================================================
  // PÁGINAS VISIBLES
  // =========================================================

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

    // ==========================================
    // INICIO
    // ==========================================

    if (this.paginaActual <= 2) {
      return [1, 2, 3];
    }

    // ==========================================
    // FINAL
    // ==========================================

    if (this.paginaActual >= total - 1) {
      return [total - 2, total - 1, total];
    }

    // ==========================================
    // CENTRO
    // ==========================================

    return [this.paginaActual - 1, this.paginaActual, this.paginaActual + 1];
  }

  // =========================================================
  // CAMBIAR PÁGINA
  // =========================================================

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  // =========================================================
  // PÁGINA ANTERIOR
  // =========================================================

  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  // =========================================================
  // PÁGINA SIGUIENTE
  // =========================================================

  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
    }
  }
}
