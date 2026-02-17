import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactoDbService {

  constructor(private firestore: Firestore) {}

  crearContactoPresupuesto(data: any) {
    const ref = collection(this.firestore, 'contactoPresupuesto-careba');
    return addDoc(ref, data);
  }

}
