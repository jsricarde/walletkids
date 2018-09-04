import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Student } from '../entities/student';
import { Observable } from 'rxjs/internal/Observable';
import { concat, forkJoin } from 'rxjs';
import { Product } from 'src/app/entities/products';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private afs: AngularFirestore) { }

  getStudentByDocId (docId): Observable<Student> {
    return this.afs.doc<Student>(`students/${docId}`)
            .valueChanges();
  }

  getProductsByDocumentId (docsId: Array<any>): Observable<any> {
    const docsRequest = docsId.map(product => {
      return this.afs.doc<Product>(`products/085U3QkcU65IgXsky7ZX`).valueChanges();
    });
    return concat(docsRequest);
  }

}
