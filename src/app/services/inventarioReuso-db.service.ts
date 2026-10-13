import { Injectable } from "@angular/core";

import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  runTransaction,
  getDoc,
  getDocs
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

  async crearInventarioConsecutivo(data: any): Promise<string> {

  const inventarioRef = collection(
    this.firestore,
    'inventarioReuso-careba'
  );

  const contadorRef = doc(
    this.firestore,
    'configuracion-careba',
    'contadorInventario'
  );

  // Consultar si ya existe el contador
  const contadorInicial = await getDoc(contadorRef);

  let ultimoExistente = 0;

  // Si no existe el contador, revisar los productos guardados
  if (!contadorInicial.exists()) {

    const productosSnap = await getDocs(inventarioRef);

    productosSnap.forEach((productoDoc) => {

      const id = productoDoc.data()['identificadorRegistro'];

      const coincidencia = /^P(\d+)RC$/.exec(id ?? '');

      if (coincidencia) {
        ultimoExistente = Math.max(
          ultimoExistente,
          Number(coincidencia[1])
        );
      }

    });
  }

  // Crear la referencia del nuevo producto
  const nuevoProductoRef = doc(inventarioRef);

  // Incrementar el contador de forma segura
  return await runTransaction(this.firestore, async (transaction) => {

    const contadorSnap = await transaction.get(contadorRef);

    const ultimo = contadorSnap.exists()
      ? Number(contadorSnap.data()['ultimo'])
      : ultimoExistente;

    const siguiente = ultimo + 1;

    const identificador = `P${String(siguiente).padStart(4, '0')}RC`;

    transaction.set(contadorRef, {
      ultimo: siguiente
    });

    transaction.set(nuevoProductoRef, {
      ...data,
      identificadorRegistro: identificador
    });

    return identificador;

  });
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

  //Crear consecutivo
  

  // Consultar los productos registrados
  obtenerInventarioReuso(): Observable<any[]> {
    const referencia = collection(this.firestore, "inventarioReuso-careba");

    return collectionData(referencia, {
      idField: "id",
    }) as Observable<any[]>;
  }
}
