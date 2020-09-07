import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { formulario } from 'src/app/Model/formulario.model';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {

  constructor(private firestore: AngularFirestore) {

  }

  getDatosFormulario() {
    return this.firestore.collection('Personas').snapshotChanges();
}
}
