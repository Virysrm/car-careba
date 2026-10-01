import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class InventarioReusoDbService {

  constructor(private firestore: Firestore) {}

  crearInventarioReuso(data: any) {
    const ref = collection(this.firestore, 'inventarioReuso-careba');
    return addDoc(ref, data);
  }

}
