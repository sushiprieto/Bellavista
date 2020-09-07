import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth'
import { first } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth,public fireservices:AngularFirestore) {
  }

    async login(email: string,password: string){
      try {
        const result = await this.afAuth.signInWithEmailAndPassword(email,password);
      return result;
      } catch (error) {
        console.log(error);
      }

    }

  async register(email: string,password: string){
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email,password);
    return result;
    } catch (error) {
      console.log(error);
    }
  }
  async logout(){
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }

  }

  getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  createUser(Record, Nombre){

    return this.fireservices.collection('Personas').doc(Nombre).set(Record);
  }
}
