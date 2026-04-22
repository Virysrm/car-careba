import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactoReusoDbService {

  constructor(private firestore: Firestore) {}

  crearContactoReuso(data: any) {
    const ref = collection(this.firestore, 'contactoReuso-careba');
    return addDoc(ref, data);
  }

}
