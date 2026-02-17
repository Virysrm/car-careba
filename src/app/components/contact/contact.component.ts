import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ContactoDbService } from 'src/app/services/contacto-db.service';

const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: false
})

export class ContactComponent {
 @ViewChild("formBox") formBox!: ElementRef;

 public contactoPresupuestos! : Observable<any>
 mostrarModalExito: boolean = false;

  public formContactoPresupuesto: FormGroup = this.form.group({
    nombre: ["", [Validators.required]],
    correo: ["", [Validators.required, Validators.pattern(EMAIL_REGEX)]],
    mensaje: ["", [Validators.required]],
    telefono: ["", [Validators.required]]
  });

    // constructor(private form: FormBuilder, private authService: AuthService ) {}
constructor(private form: FormBuilder, private contactoDbService: ContactoDbService) {}

  ngOnInit(): void { }

enviarContactoPresupuesto = () => {
  if (this.formContactoPresupuesto.valid) {

    this.contactoDbService.crearContactoPresupuesto(this.formContactoPresupuesto.value)
      .then(() => {

        // limpiar formulario
        this.formContactoPresupuesto.reset();

        // mostrar modal
        this.mostrarModalExito = true;

      });

  } else {
    this.formContactoPresupuesto.markAllAsTouched();
  }
}


}