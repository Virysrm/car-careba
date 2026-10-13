import { CommonModule } from "@angular/common";
import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Observable } from "rxjs";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { InventarioReusoDbService } from "src/app/services/inventarioReuso-db.service";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: "app-altas-inventario",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: "./altas-inventario.component.html",
  styleUrl: "./altas-inventario.component.scss",
})

export class AltasInventarioComponent {
  @ViewChild("formBox") formBox!: ElementRef;
  today: Date = new Date();
  fechaMostrar: Date = new Date();
  editandoId: string | null = null;
  mostrarModalExito = false;
  mensajeExito = "";
  public formSended: boolean = false;
  public sendedSuccess: boolean = false;
  public step: number = 1;
  imagenesPreview: string[] = [];
  imagenesSeleccionadas: File[] = [];
  authService: any;
  contactForm: any;
  healthForm: any;

  constructor(
    private form: FormBuilder,
    private inventarioReusoDbService: InventarioReusoDbService,
  ) { }

  ngOnInit() { this.generarIdentificadorRegistro(); }

  // FORMULARIO PRINCIPAL - PRODUCTO
  public formInventario: FormGroup = this.form.group({
    identificadorRegistro: ["", Validators.required],
    producto: ["", Validators.required],
    medidas: ["", Validators.required],
    descripcion: ["", Validators.required],
    categoria: ["", Validators.required],
    condicion: ["", Validators.required],
    fecha: [this.obtenerFechaActual()],
    fechaModificacion: [new Date()],
  });

  // FORMULARIO 2 - IMAGEN DEL PRODUCTO
  public formImgInventario: FormGroup = this.form.group({
    img: [[], Validators.required],
  });

  // FORMULARIO 3 - PRECIO DEL PRODUCTO
  public formPrecioInventario: FormGroup = this.form.group({
    precio: ["", Validators.required],
    cantidad: ["", Validators.required],
    existencia: ["", Validators.required],
  });

  generarIdentificador(consecutivo: number): string {
    return `P${String(consecutivo).padStart(4, "0")}RC`;
  }

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

  // IMÁGENES
  seleccionarImagenes(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    // Convertimos FileList a arreglo
    const archivos = Array.from(input.files);

    // MÁXIMO 7 IMÁGENES 
    const espaciosDisponibles = 7 - this.imagenesSeleccionadas.length;
    const archivosPermitidos = archivos.slice(0, espaciosDisponibles);

    archivosPermitidos.forEach((archivo: File) => {
      // VALIDAR QUE SEA UNA IMAGEN

      if (!archivo.type.startsWith("image/")) {
        return;
      }

      // GUARDAR ARCHIVO
      this.imagenesSeleccionadas.push(archivo);

      // CREAR VISTA PREVIA
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.imagenesPreview.push(e.target.result as string);
        }
      };

      reader.readAsDataURL(archivo);
    });


    // ACTUALIZAR FORMULARIO
    this.formImgInventario.get("img")?.setValue(this.imagenesSeleccionadas);

    // ACTUALIZAR VALIDACIÓN
    this.formImgInventario.get("img")?.updateValueAndValidity();

    // LIMPIAR INPUT
    input.value = "";
  }

  eliminarImagen(index: number): void {
    // Eliminar archivo
    this.imagenesSeleccionadas.splice(index, 1);

    // Eliminar vista previa
    this.imagenesPreview.splice(index, 1);

    // Actualizar FormControl
    this.formImgInventario.get("img")?.setValue(this.imagenesSeleccionadas);

    // Actualizar validación
    this.formImgInventario.get("img")?.updateValueAndValidity();
  }

  // FORMATEAR PRECIO
  formatearPrecio(): void {
    const control = this.formPrecioInventario.get("precio");

    if (!control) {
      return;
    }

    let valor = control.value;

    if (valor === null || valor === undefined || valor === "") {
      return;
    }

    // ELIMINAR COMAS, SIGNO DE PESO Y CUALQUIER OTRO CARÁCTER
    valor = String(valor)
      .replace(/[$,]/g, "")
      .replace(/[^0-9.]/g, "");

    // EVITAR MÚLTIPLES PUNTOS
    const partes = valor.split(".");

    if (partes.length > 2) {
      valor = partes[0] + "." + partes.slice(1).join("");
    }

    const numero = parseFloat(valor);

    if (isNaN(numero)) {
      control.setValue("", {
        emitEvent: false,
      });

      return;
    }

    // FORMATO: 1,000.00
    const valorFormateado = numero.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    control.setValue(valorFormateado, {
      emitEvent: false,
    });
  }

  private limpiarArchivos(valor: any): any {
    if (
      valor instanceof File ||
      valor instanceof Blob ||
      valor instanceof FileList
    ) {
      return undefined;
    }

    if (Array.isArray(valor)) {
      return valor
        .map((item) => this.limpiarArchivos(item))
        .filter((item) => item !== undefined);
    }

    if (valor !== null && typeof valor === "object") {
      const resultado: { [key: string]: any } = {};

      for (const [clave, contenido] of Object.entries(valor)) {
        const limpio = this.limpiarArchivos(contenido);

        if (limpio !== undefined) {
          resultado[clave] = limpio;
        }
      }

      return resultado;
    }

    return valor;
  }

  // CON BD
  async sendRegister() {
    if (
      this.formInventario.valid &&
      this.formImgInventario.valid &&
      this.formPrecioInventario.valid
    ) {
      this.formSended = true;

      try {
        // 1. Subir las imágenes a Firebase Storage
        const imagenesUrl = await this.inventarioReusoDbService.subirImagenes(
          this.imagenesSeleccionadas,
        );

        // 2. Obtener todos los datos de los formularios
        const datosFormulario = {
          ...this.formInventario.getRawValue(),
          ...this.formImgInventario.getRawValue(),
          ...this.formPrecioInventario.getRawValue(),
        };

        // 3. Eliminar archivos del objeto que se guardará
        const datosLimpios = this.limpiarArchivos(datosFormulario);

        // 4. Agregar las URL de las imágenes
        const datosInventario = {
          ...datosLimpios,
          imagenes: imagenesUrl,
        };

        // 5. Guardar el producto en Firestore
        //console.log("Datos que se enviarán a Firestore:", datosInventario);

        const identificadorGenerado =
          await this.inventarioReusoDbService.crearInventarioConsecutivo(
            datosInventario
          );

        this.formInventario.patchValue({
          identificadorRegistro: identificadorGenerado,
        });

        this.sendedSuccess = true;
        this.mensajeExito = "El producto se registró correctamente.";
      } catch (error) {
        console.error("Error al guardar el inventario:", error);
        // Mostrar modal de éxito
        this.sendedSuccess = true;
        this.mostrarModalExito = true;

        alert(
          "Ocurrió un problema al guardar el producto. Inténtalo más tarde.",
        );
      } finally {
        this.formSended = false;
      }
    } else {
      this.formInventario.markAllAsTouched();
      this.formImgInventario.markAllAsTouched();
      this.formPrecioInventario.markAllAsTouched();
    }
  }

  async generarIdentificadorRegistro(): Promise<void> {
    const productos = await firstValueFrom(
      this.inventarioReusoDbService.obtenerInventarioReuso()
    );

    let ultimo = 0;

    productos.forEach((producto: any) => {
      const coincidencia = /^P(\d+)RC$/.exec(
        producto.identificadorRegistro ?? ''
      );

      if (coincidencia) {
        ultimo = Math.max(ultimo, Number(coincidencia[1]));
      }
    });

    const siguiente = ultimo + 1;

    const identificador = `P${String(siguiente).padStart(4, '0')}RC`;

    this.formInventario.patchValue({
      identificadorRegistro: identificador
    });
  }

  // CAMBIAR ENTRE SECCIONES DEL ALTA 
  nextStep(): void {
    if (this.formInventario.valid) {
      this.step = 2;
    } else {
      this.formInventario.markAllAsTouched();
    }
  }

  nextStep2(): void {
    if (
      this.imagenesSeleccionadas.length >= 1 &&
      this.imagenesSeleccionadas.length <= 7
    ) {
      this.step = 3;
    } else {
      this.formImgInventario.markAllAsTouched();
    }
  }

  backStep(): void {
    this.step = 1;
  }

  backStep2(): void {
    this.step = 2;
  }

  cerrarModalExito() {
    this.mostrarModalExito = false;
  }
}
