import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

export interface Product {
  name: string;
  url_image: string;
  price: Number;
  brand: string;
}

export interface TimeWindow {
  min: string;
  max: string;
}

export interface Student {
  balance: Number;
  day_ceiling_max: Number;
  min_value_amount: Number;
  date_of_birth: String;
  phone_number: String;
  name: String;
  status: String;
  url_image: String;
  time_window: TimeWindow;
  blocked_products: Array<Product>;
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  private studentsCollection: AngularFirestoreCollection<Student>;
  public student: Student = { 'balance': null,
    'day_ceiling_max': null,
    'min_value_amount': null,
    'date_of_birth': null,
    'phone_number': null,
    'name': null,
    'status': null,
    'url_image': null,
    'time_window': {'min': null, 'max': null},
    'blocked_products': null};
  constructor(private afs: AngularFirestore) {
    this.studentsCollection = afs.collection<Student>('students');
  }

  ngOnInit() {
  }
  addStudent() {
    this.studentsCollection.add(this.student).then(result => {console.log(result); }).catch(error => {console.log('error: ', error); });
  }

}
