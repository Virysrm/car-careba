import { Injectable } from '@angular/core';
import { doc, updateDoc,  Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CotizacionesDbService {

  constructor(private firestore: Firestore) {}

  crearCotizaciones(data: any) {
    const ref = collection(this.firestore, 'cotizaciones-careba');
    return addDoc(ref, data);
  }

    obtenerCotizaciones(): Observable<any[]> {
    const ref = collection(this.firestore, 'cotizaciones-careba');
    return collectionData(ref, { idField: 'id' }) as Observable<any[]>;
  }

    actualizarCotizacion(id: string, data: any) {
    const ref = doc(this.firestore, `cotizaciones-careba/${id}`);
    return updateDoc(ref, data);
  }
}
