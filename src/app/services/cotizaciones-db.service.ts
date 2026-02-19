import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CotizacionesDbService {

  constructor(private firestore: Firestore) {}

  crearCotizaciones(data: any) {
    const ref = collection(this.firestore, 'cotizaciones-careba');
    return addDoc(ref, data);
  }

}
