import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Student } from '../entities/student';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private afs: AngularFirestore) { }

  getStudentByDocId (docId): Observable<Student> {
    return this.afs.doc<Student>(`students/${docId}`)
            .valueChanges();
  }
}
