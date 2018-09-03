import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../../entities/products';
import { Student } from 'src/app/entities/student';
import { StudentService } from 'src/app/communication/student.service';
@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  private productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  selectedStudent: Student;
  selected: Product[];
  studentSubscription: Subscription;
  constructor(private afs: AngularFirestore,
              private studentService: StudentService) {
  }

  ngOnInit() {
    this.getInitialData();
  }

  getInitialData () {
    // getting all products
    this.productsCollection = this.afs.collection<Product>('products');
    this.products = this.productsCollection.valueChanges();
 }

  onQrSelected(qr) {
    this.studentSubscription = this.studentService.getStudentByDocId('5OED3E1pjV7AkdBWV0Rr')
    .subscribe(student => this.selectedStudent = student);
  }


}
