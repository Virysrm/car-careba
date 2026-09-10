import { CommonModule } from "@angular/common";
import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators,} from "@angular/forms";
import { Observable } from "rxjs";
import { CotizacionesDbService } from "src/app/services/cotizaciones-db.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import generatePDFSinIVA from "src/app/lib/pdf";
@Component({
  selector: "app-formulary",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: "./formulary.component.html",
  styleUrl: "./formulary.component.scss",
})

export class FormularyComponent implements OnInit {
  today: Date = new Date();
  fechaMostrar: Date = new Date();
  editandoId: string | null = null;
  @ViewChild("formBox") formBox!: ElementRef;
  public cotizaciones!: Observable<any>;
  // MODAL
  mostrarModalExito = false;
  mensajeExito = "";

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

  // FORMULARIO PRINCIPAL
  public formCotizaciones: FormGroup = this.form.group({
    cliente: ["", Validators.required],
    obra: [""],
    direccion: [""],
    conceptos: this.form.array([this.crearConcepto()]),
    notas: [""],
    subtotal: [
      {
        value: 0,
        disabled: true,
      },
    ],
    iva: [
      {
        value: 0,
        disabled: true,
      },
    ],
    total: [
      {
        value: 0,
        disabled: true,
      },
    ],
    fecha: [this.obtenerFechaActual()],
    fechaModificacion: [new Date()],
    statusProceso: ["", Validators.required]
  });

  obtenerFechaActual(): string {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");
    return `${año}-${mes}-${dia}`;
  }

  // CONVERTIR FECHA PARA INPUT DATE
  convertirFechaParaInput(fecha: Date): string {
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${año}-${mes}-${dia}`;
  }

  // CONVERTIR FECHA DE FIRESTORE
  convertirFecha(cotFecha: any): Date {
    let fecha: Date;

    // Firestore Timestamp
    if (cotFecha && typeof cotFecha.toDate === "function") {
      fecha = cotFecha.toDate();
    }

    // Timestamp como objeto
    else if (cotFecha && cotFecha.seconds) {
      fecha = new Date(cotFecha.seconds * 1000);
    }

    // Date
    else if (cotFecha instanceof Date) {
      fecha = cotFecha;
    }

    // String
    else if (cotFecha) {
      fecha = new Date(cotFecha);
    }

    // Sin fecha
    else {
      fecha = new Date();
    }

    // Validar fecha
    if (isNaN(fecha.getTime())) {
      console.error("Fecha inválida:", cotFecha);

      fecha = new Date();
    }

    return fecha;
  }

  // GETTER CONCEPTOS
  get conceptos(): FormArray {
    return this.formCotizaciones.get("conceptos") as FormArray;
  }

  // CREAR CONCEPTO
  crearConcepto(): FormGroup {
    return this.form.group({
      concepto: ["", Validators.required],
      cantidad: ["", Validators.required],
      precioUnitario: ["", Validators.required],
      // Se mantiene como número internamente
      importe: [
        {
          value: 0,
          disabled: true,
        },
      ],
    });
  }

  // AGREGAR CONCEPTO
  agregarConcepto() {
    this.conceptos.push(this.crearConcepto());
  }

  // ELIMINAR CONCEPTO
  eliminarConcepto(index: number) {
    this.conceptos.removeAt(index);
    this.calcularTotales();
  }

  // FORMATEAR PRECIO UNITARIO
  formatearPrecio(index: number) {
    const control = this.conceptos.at(index).get("precioUnitario");

    if (!control) {
      return;
    }

    let valor = control.value;

    if (valor === null || valor === undefined || valor === "") {
      return;
    }

    // ELIMINAR COMAS
    valor = String(valor).replace(/,/g, "");

    // PERMITIR SOLO NÚMEROS Y PUNTO
    valor = valor.replace(/[^0-9.]/g, "");

    // Evitar múltiples puntos
    const partes = valor.split(".");

    if (partes.length > 2) {
      valor = partes[0] + "." + partes.slice(1).join("");
    }

    const numero = parseFloat(valor);

    if (isNaN(numero)) {
      control.setValue("", {
        emitEvent: false,
      });

      this.calcularImporte(index);

      return;
    }

    // FORMATO 1,000.00
    const valorFormateado = numero.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    control.setValue(valorFormateado, {
      emitEvent: false,
    });

    // CALCULAR
    this.calcularImporte(index);
  }

  // OBTENER NÚMERO LIMPIO
  obtenerNumero(valor: any): number {
    if (valor === null || valor === undefined || valor === "") {
      return 0;
    }

    // Eliminar comas
    const valorLimpio = String(valor).replace(/,/g, "");
    const numero = parseFloat(valorLimpio);
    return isNaN(numero) ? 0 : numero;
  }

  // CALCULAR IMPORTE
  calcularImporte(index: number) {
    const item = this.conceptos.at(index);
    const cantidad = this.obtenerNumero(item.get("cantidad")?.value);
    const precio = this.obtenerNumero(item.get("precioUnitario")?.value);
    const importe = cantidad * precio;

    item.get("importe")?.setValue(importe, {
      emitEvent: false,
    });

    // RECALCULAR TOTALES
    this.calcularTotales();
  }

  // CALCULAR TOTALES
  calcularTotales() {
    const conceptos = this.formCotizaciones.getRawValue().conceptos;

    const subtotal = conceptos.reduce((acc: number, item: any) => {
      const importe = this.obtenerNumero(item.importe);

      return acc + importe;
    }, 0);

    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    this.formCotizaciones.patchValue(
      {
        subtotal: subtotal,
        iva: iva,
        total: total,
      },
      {
        emitEvent: false,
      },
    );
  }

  // CARGAR COTIZACIÓN PARA EDITAR
  cargarCotizacion(cot: any) {
    console.log("Cotización recibida:", cot);

    console.log("Fecha recibida:", cot.fecha);

    // FECHA
    const fechaConvertida = this.convertirFecha(cot.fecha);
    console.log("Fecha convertida:", fechaConvertida);
    this.fechaMostrar = fechaConvertida;
    const fechaParaInput = this.convertirFechaParaInput(fechaConvertida);
    console.log("Fecha para input:", fechaParaInput);

    // DATOS PRINCIPALES
    this.formCotizaciones.patchValue({
      statusProceso: cot.statusProceso || "",
      cliente: cot.cliente || "",
      obra: cot.obra || "",
      direccion: cot.direccion || "",
      notas: cot.notas || "",
      fecha: fechaParaInput,
    });

    // CONCEPTOS
    this.conceptos.clear();

    (cot.conceptos || []).forEach((item: any) => {
      const cantidad = this.obtenerNumero(item.cantidad);
      const precio = this.obtenerNumero(item.precioUnitario);
      const importe = cantidad * precio;

      this.conceptos.push(
        this.form.group({
          concepto: [item.concepto || "", Validators.required],
          cantidad: [cantidad, Validators.required],
          //Guardamos visualmente el precio como 1,000.00
          precioUnitario: [
            precio === 0
              ? ""
              : precio.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }),
            Validators.required,
          ],

          importe: [
            {
              value: importe,
              disabled: true,
            },
          ],
        }),
      );
    });

    // RECALCULAR
    this.calcularTotales();
  }

  // CREAR / ACTUALIZAR
  enviarCotizaciones = async () => {
    if (this.formCotizaciones.valid) {
      const data = this.formCotizaciones.getRawValue();

      // FECHA DE LA COTIZACIÓN
      const fecha = data.fecha ? new Date(data.fecha + "T00:00:00") : new Date();
      // FECHA DE MODIFICACIÓN
      const fechaModificacion = new Date();

      // LIMPIAR PRECIOS
      const conceptosLimpios = data.conceptos.map((item: any) => {
        const cantidad = this.obtenerNumero(item.cantidad);
        const precioUnitario = this.obtenerNumero(item.precioUnitario);
        const importe = cantidad * precioUnitario;
        return {
          ...item,
          cantidad: cantidad,
          precioUnitario: precioUnitario,
          importe: importe,
        };
      });

      // DATOS A GUARDAR
      const dataGuardar = {
        ...data,
        conceptos: conceptosLimpios,
        fecha: fecha,
        fechaModificacion: fechaModificacion,
      };

      try {
        // ACTUALIZAR
        if (this.editandoId) {
          await this.cotizacionesDbService.actualizarCotizacion(
            this.editandoId,
            dataGuardar,
          );

          this.mensajeExito = "La cotización fue actualizada correctamente.";
        }

        // CREAR
        else {
          await this.cotizacionesDbService.crearCotizaciones(dataGuardar);

          this.mensajeExito = "La cotización fue creada correctamente.";
        }

        // MODAL
        this.mostrarModalExito = true;
      } catch (error) {
        console.error("Error al guardar la cotización:", error);
      }
    } else {
      this.formCotizaciones.markAllAsTouched();
    }
  };

  // CAMBIAR STATUS
  setStatus(valor: string) {
    this.formCotizaciones.get("statusProceso")?.setValue(valor);
  }

  cerrarModalExito() {
    this.mostrarModalExito = false;
  }

  // GENERAR FOLIO
  generarFolio(): string {
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, "0");
    const dd = String(hoy.getDate()).padStart(2, "0");
    const random = Math.floor(Math.random() * 1000);
    return `COT-${yyyy}${mm}${dd}-${random}`;
  }

  // GENERAR PDF
  onGeneratePDFSinIVA() {
    const form = this.formCotizaciones.getRawValue();

    const products = form.conceptos.map((item: any) => ({
      cliente: form.cliente,
      obra: form.obra,
      direccion: form.direccion,
      concepto: item.concepto,
      cantidad: this.obtenerNumero(item.cantidad),
      precioUnitario: this.obtenerNumero(item.precioUnitario)
    }));

    const notas = form.notas;
    const cotizacion = this.generarFolio();

    // FECHA PDF
    let fechaPDF: Date;

    if (form.fecha) {
      fechaPDF = new Date(form.fecha + "T00:00:00");
    } else {
      fechaPDF = new Date();
    }

    const fecha = fechaPDF.toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    generatePDFSinIVA(products, cotizacion, fecha, notas);
  }
}
