import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

export enum initPages {
  pos = '/sale',
  parent = '/parent'
}

export interface Parent {
  name: string;
}

export interface Pos {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user = firebaseAuth.authState;
  }

  validateParent(userId: string) {
    return this.afs.doc<Parent>(`parents/${userId}`).valueChanges();
  }

  validatePos(userId) {
    return this.afs.doc<Pos>(`pos/${userId}`).valueChanges();
  }

  login(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.firebaseAuth.auth.signOut();
  }
}
