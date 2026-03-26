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
  cotizaciones$ = this.cotizacionesDbService.obtenerCotizaciones();

  constructor(
    private cotizacionesDbService: CotizacionesDbService,
    private router: Router,
  ) {}

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
      cliente: cot.cliente + " (Editado)", // ejemplo
    };

    this.cotizacionesDbService
      .actualizarCotizacion(cot.id, dataActualizada)
      .then(() => {
        console.log("Cotización actualizada");
      });
  }
}
