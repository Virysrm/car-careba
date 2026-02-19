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
