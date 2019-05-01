import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private firestore: AngularFirestore) { }

  create_NewInnovation(record) {
    return this.firestore.collection('Innovations').add(record);
  }

  read_Innovations() {
    return this.firestore.collection('Innovations').snapshotChanges();
  }

  update_Innovation(recordID, record) {
    this.firestore.doc('Innovations/' + recordID).update(record);
  }

  delete_Innovation(record_id) {
    this.firestore.doc('Innovations/' + record_id).delete();
  }

  getUserID(userid) {
    return firebase.firestore().collection('Users').where('uid', '==', userid).get();
  }


}
