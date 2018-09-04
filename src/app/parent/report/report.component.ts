import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../login/auth.service';

export interface SellItem {
  id_student: number;
  products: Array<any>;
  date: string;
}

export interface Student {
  balance: number;
  day_ceiling_max: number;
  min_value_amount: number;
  date_of_birth: String;
  phone_number: String;
  name: String;
  status: String;
  url_image: String;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  private sellCollection: AngularFirestoreCollection<SellItem>;
  private studentDoc: AngularFirestoreDocument<Student>;
  private fatherDoc: AngularFirestoreDocument<any>;
  sellItems: Observable<SellItem[]>;
  student: Observable<Student>;
  father: Observable<any>;

  constructor(private afs: AngularFirestore, auth: AuthService) {
    auth.user.subscribe((result: any) => {
      const fatherId = result.uid;
      auth.validateParent(fatherId).subscribe((father: any) => {
        const studentId = father.id_student;
        this.sellCollection = this.afs.collection('selled_items', ref =>
          ref.where('id_student', '==', studentId)
        );
        this.sellItems = this.sellCollection.valueChanges();
      });
    });
  }

  ngOnInit() {}
}
