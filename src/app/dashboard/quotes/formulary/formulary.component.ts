import { DatePipe, CommonModule } from "@angular/common";
import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Observable } from "rxjs";
import generatePDF from "src/app/lib/pdf";
import { CotizacionesDbService } from "src/app/services/cotizaciones-db.service";

@Component({
  selector: "app-formulary",
  standalone: true,
  imports: [CommonModule, DatePipe, ReactiveFormsModule],
  templateUrl: "./formulary.component.html",
  styleUrl: "./formulary.component.scss",
})
export class FormularyComponent implements OnInit {
  today: Date = new Date();
  editandoId: string | null = null;

  @ViewChild("formBox") formBox!: ElementRef;

  public cotizaciones!: Observable<any>;
  mostrarModalExito: boolean = false;

  onGeneratePDF() {
    const form = this.formCotizaciones.getRawValue();

    // Mapear conceptos a productos
    const products = form.conceptos.map((item: any) => ({
      cliente: form.cliente,
      obra: form.obra,
      direccion: form.direccion,
      concepto: item.concepto,
      cantidad: item.cantidad,
      precioUnitario: item.precioUnitario,
    }));

    const notas = form.notas;

    const cotizacion = this.generarFolio(); // opcional dinámico
    const fecha = new Date().toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    generatePDF(products, cotizacion, fecha, notas);
  }
  generarFolio(): string {
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, "0");
    const dd = String(hoy.getDate()).padStart(2, "0");

    const random = Math.floor(Math.random() * 1000);

    return `COT-${yyyy}${mm}${dd}-${random}`;
  }

  constructor(
    private form: FormBuilder,
    private cotizacionesDbService: CotizacionesDbService,
  ) {}
  ngOnInit() {
    const cot = history.state.cot;

    if (cot) {
      this.editandoId = cot.id;
      this.cargarCotizacion(cot);
    }
  }
  /* 🔥 FORMULARIO PRINCIPAL */
  public formCotizaciones: FormGroup = this.form.group({
    cliente: ["", Validators.required],
    obra: ["", Validators.required],
    direccion: ["", Validators.required],
    conceptos: this.form.array([this.crearConcepto()]),
    notas: [""],
    subtotal: [{ value: "", disabled: true }],
    iva: [{ value: "", disabled: true }],
    total: [{ value: "", disabled: true }],
    fecha: [new Date()],
  });

  /* 🔥 GETTER CONCEPTOS */
  get conceptos(): FormArray {
    return this.formCotizaciones.get("conceptos") as FormArray;
  }

  /* 🔥 CREAR CONCEPTO */
  crearConcepto(): FormGroup {
    return this.form.group({
      concepto: ["", Validators.required],
      cantidad: ["", Validators.required],
      precioUnitario: ["", Validators.required],
      importe: [{ value: "", disabled: true }],
    });
  }

  /* 🔥 AGREGAR */
  agregarConcepto() {
    this.conceptos.push(this.crearConcepto());
  }

  /* 🔥 ELIMINAR */
  eliminarConcepto(index: number) {
    this.conceptos.removeAt(index);
  }

  /* 🔥 CALCULAR IMPORTE */
  calcularImporte(index: number) {
    const item = this.conceptos.at(index);
    const cantidad = item.get("cantidad")?.value || 0;
    const precio = item.get("precioUnitario")?.value || 0;

    item.get("importe")?.setValue(cantidad * precio);
    this.calcularTotales(); // 🔥 recalcula todo
  }

  calcularTotales() {
    const conceptos = this.formCotizaciones.getRawValue().conceptos;

    const subtotal = conceptos.reduce((acc: number, item: any) => {
      return acc + (Number(item.importe) || 0);
    }, 0);

    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    this.formCotizaciones.patchValue(
      {
        subtotal,
        iva,
        total,
      },
      { emitEvent: false },
    );
  }

  cargarCotizacion(cot: any) {
    this.formCotizaciones.patchValue({
      cliente: cot.cliente,
      obra: cot.obra,
      direccion: cot.direccion,
      notas: cot.notas,
      fecha: cot.fecha?.toDate ? cot.fecha.toDate() : cot.fecha,
    });

    this.conceptos.clear();

    cot.conceptos.forEach((item: any) => {
      const cantidad = item.cantidad || 0;
      const precio = item.precioUnitario || 0;

      this.conceptos.push(
        this.form.group({
          concepto: [item.concepto],
          cantidad: [cantidad],
          precioUnitario: [precio],
          importe: [{ value: cantidad * precio, disabled: true }], // 🔥 recalculado
        }),
      );
    });

    this.calcularTotales();
  }

  /* ENVIAR o ACTUALIZAR */
  enviarCotizaciones = async () => {
    if (this.formCotizaciones.valid) {
      const data = this.formCotizaciones.getRawValue();

      try {
        if (this.editandoId) {
          await this.cotizacionesDbService.actualizarCotizacion(
            this.editandoId,
            data,
          );
        } else {
          await this.cotizacionesDbService.crearCotizaciones({
            ...data,
            fecha: new Date(),
          });
        }

        this.mostrarModalExito = true; // 🔥 ahora sí funciona
      } catch (error) {
        console.error(error);
      }
    } else {
      this.formCotizaciones.markAllAsTouched();
    }
  };
}
