import { DatePipe, CommonModule } from "@angular/common";
import { Component, ElementRef, ViewChild } from "@angular/core";
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
export class FormularyComponent {
  today: Date = new Date();

  @ViewChild("formBox") formBox!: ElementRef;

  public cotizaciones!: Observable<any>;
  mostrarModalExito: boolean = false;

onGeneratePDF(){

  const products = [
    {
      cliente: 'Carlos Ramirez',
      obra: 'CAREBA',
      direccion: 'Santa Cecilia Mz 10 Lt 16',
      concepto: 'Lista de Productos 1',
      cantidad: 1,
      precioUnitario: 100,
      importe: 100,
      subtotal: 100,
      iva: 16,
      total: 116
    },
    {
      cliente: 'Carlos Ramirez',
      obra: 'CAREBA',
      direccion: 'Santa Cecilia Mz 10 Lt 16',
      concepto: 'Lista de Productos 2',
      cantidad: 1,
      precioUnitario: 200,
      importe: 200,
      subtotal: 200,
      iva: 32,
      total: 232
    },
    {
      cliente: 'Carlos Ramirez',
      obra: 'CAREBA',
      direccion: 'Santa Cecilia Mz 10 Lt 16',
      concepto: 'Lista de Productos 3',
      cantidad: 1,
      precioUnitario: 300,
      importe: 300,
      subtotal: 300,
      iva: 48,
      total: 348
    }
  ];

  const cotizacion = '01234567890';
  const fecha = '18 de marzo de 2026';

  generatePDF(products, cotizacion, fecha);
}
  constructor(
    private form: FormBuilder,
    private cotizacionesDbService: CotizacionesDbService,
  ) {}

  /* 🔥 FORMULARIO PRINCIPAL */
  public formCotizaciones: FormGroup = this.form.group({
    cliente: ["", Validators.required],
    obra: ["", Validators.required],
    direccion: ["", Validators.required],
    conceptos: this.form.array([this.crearConcepto()]),
    subtotal: [{ value: "", disabled: true }],
    iva: [{ value: "", disabled: true }],
    total: [{ value: "", disabled: true }],
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

  /* 🔥 ENVIAR */
  enviarCotizaciones = () => {
    if (this.formCotizaciones.valid) {
      if (this.formCotizaciones.valid) {
        this.cotizacionesDbService
          .crearCotizaciones(this.formCotizaciones.value)
          .then(() => {
            // limpiar formulario
            //this.formCotizaciones.reset();

            // mostrar modal
            this.mostrarModalExito = true;
          });
      } else {
        this.formCotizaciones.markAllAsTouched();
      }
    }
  };
}
