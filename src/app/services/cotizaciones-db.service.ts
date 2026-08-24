import { Injectable } from "@angular/core";

import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "@angular/fire/firestore";

import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CotizacionesDbService {

  constructor(private firestore: Firestore) {}

  // ========================================
  // CREAR COTIZACIÓN
  // ========================================
  crearCotizaciones(data: any) {

    const ref = collection(
      this.firestore,
      "cotizaciones-careba"
    );

    return addDoc(ref, data);
  }

  // ========================================
  // OBTENER COTIZACIONES
  // ========================================
  obtenerCotizaciones(): Observable<any[]> {

    const ref = collection(
      this.firestore,
      "cotizaciones-careba"
    );

    return collectionData(ref, {
      idField: "id"
    }) as Observable<any[]>;
  }

  // ========================================
  // ACTUALIZAR COTIZACIÓN
  // ========================================
  actualizarCotizacion(
    id: string,
    data: any
  ) {

    const ref = doc(
      this.firestore,
      `cotizaciones-careba/${id}`
    );

    return updateDoc(ref, data);
  }

  // ========================================
  // ELIMINAR COTIZACIÓN
  // ========================================
  eliminarCotizacion(id: string) {

    const ref = doc(
      this.firestore,
      `cotizaciones-careba/${id}`
    );

    return deleteDoc(ref);
  }
}