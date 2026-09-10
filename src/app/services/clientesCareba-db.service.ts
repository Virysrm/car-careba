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
export class ClientesCarebaDbService {

  constructor(private firestore: Firestore) {}

  crearClientes(data: any) {

    const ref = collection(
      this.firestore,
      "clientes-careba"
    );

    return addDoc(ref, data);
  }

  // ========================================
  // OBTENER COTIZACIONES
  // ========================================
  obtenerClientes(): Observable<any[]> {

    const ref = collection(
      this.firestore,
      "clientes-careba"
    );

    return collectionData(ref, {
      idField: "id"
    }) as Observable<any[]>;
  }

  // ========================================
  // ACTUALIZAR COTIZACIÓN
  // ========================================
  actualizarClientes(
    id: string,
    data: any
  ) {

    const ref = doc(
      this.firestore,
      `clientes-careba/${id}`
    );

    return updateDoc(ref, data);
  }

  // ========================================
  // ELIMINAR COTIZACIÓN
  // ========================================
  eliminarClientes(id: string) {

    const ref = doc(
      this.firestore,
      `clientes-careba/${id}`
    );

    return deleteDoc(ref);
  }
}