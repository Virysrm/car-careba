import { Injectable } from "@angular/core";

import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from "@angular/fire/firestore";

import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "@angular/fire/storage";

import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InventarioReusoDbService {
  constructor(
    private firestore: Firestore,
    private storage: Storage,
  ) {}

  // Guardar la información del producto en Firestore
  crearInventarioReuso(data: any) {
    const referencia = collection(this.firestore, "inventarioReuso-careba");

    return addDoc(referencia, data);
  }

  // Subir imágenes a Firebase Storage y obtener sus URL
  async subirImagenes(archivos: File[]): Promise<string[]> {
    const urls = await Promise.all(
      archivos.map(async (archivo, indice) => {
        const nombreArchivo = `${Date.now()}_${indice}_${archivo.name}`;
        const ruta = `inventarioReuso/${nombreArchivo}`;

        const referencia = ref(this.storage, ruta);

        await uploadBytes(referencia, archivo);

        return await getDownloadURL(referencia);
      }),
    );

    return urls;
  }

  // Consultar los productos registrados
  obtenerInventarioReuso(): Observable<any[]> {
    const referencia = collection(this.firestore, "inventarioReuso-careba");

    return collectionData(referencia, {
      idField: "id",
    }) as Observable<any[]>;
  }
}
