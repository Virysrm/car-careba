import { CommonModule } from "@angular/common";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Observable } from "rxjs";
import { ContactoReusoDbService } from 'src/app/services/contactoReuso-db.service'; 

const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
@Component({
  selector: 'app-contact',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  
  @ViewChild("formBox") formBox!: ElementRef;

  public contactoReuso!: Observable<any>;
  mostrarModalExito: boolean = false;

  public formContactoReuso: FormGroup = this.form.group({
    nombre: ["", [Validators.required]],
    correo: ["", [Validators.required, Validators.pattern(EMAIL_REGEX)]],
    mensaje: ["", [Validators.required]],
    telefono: ["", [Validators.required]],
  });

  // constructor(private form: FormBuilder, private authService: AuthService ) {}
  constructor(
    private form: FormBuilder,
        private contactoReusoDbService: ContactoReusoDbService,
  ) {}

  ngOnInit(): void {}

  enviarContactoReuso = () => {
    if (this.formContactoReuso.valid) {
      this.contactoReusoDbService
        .crearContactoReuso(this.formContactoReuso.value)
        .then(() => {
          // limpiar formulario
          this.formContactoReuso.reset();

          // mostrar modal
          this.mostrarModalExito = true;
        });
    } else {
      this.formContactoReuso.markAllAsTouched();
    }
  };
}
