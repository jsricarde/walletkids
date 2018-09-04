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
  allProducts = new Array<any>();
  selectedStudent: Student;
  nonAllowedProducts = new Array<Product>();
  selected: Product[];
  studentSubscription: Subscription;
  subtotal = 0;
  constructor(
    private afs: AngularFirestore,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.getInitialData();
  }

  getInitialData() {
    // getting all products
    this.productsCollection = this.afs.collection<Product>('products');
    this.products = this.productsCollection.valueChanges();
    /*this.products.subscribe(products => {
      const temp = products;
      this.allProducts = temp;
    });*/
 }

  onQrSelected(qr) {
    this.studentSubscription = this.studentService.getStudentByDocId(qr)
    .subscribe(student => {
      this.selectedStudent = student;
      this.getNonAllowedProducts();
    });
  }

  updateGrid() {
    this.products.subscribe(products =>
        products.map(pr => {
          this.allProducts.push({
            ...pr,
            disable: this.nonAllowedProducts.some(product => product.name === pr.name)
          });
        })
    );
  }

  getNonAllowedProducts() {
    this.studentService.getProductsByDocumentId(this.selectedStudent.blocked_products)
      .subscribe(result => {
        result.subscribe(val => this.nonAllowedProducts.push(val));
        this.updateGrid();
      });
  }

  onNgModelChange(event: Event) {
    this.subtotal = 0;
    this.selected.forEach(product => {
      const price = +product.price;
      this.subtotal = this.subtotal + price;
    });
  }
}
