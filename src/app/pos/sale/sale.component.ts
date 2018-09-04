import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../../entities/products';
import { Student } from 'src/app/entities/student';
import { StudentService } from 'src/app/communication/student.service';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  private productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  selledItemsCollection: AngularFirestoreCollection<any>;
  allProducts = new Array<any>();
  selectedStudent: Student;
  nonAllowedProducts = new Array<Product>();
  selected: Product[];
  studentSubscription: Subscription;
  subtotal = 0;
  user: any;
  idStudent: string;

  constructor(
    private afs: AngularFirestore,
    private studentService: StudentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getInitialData();
  }

  getInitialData() {
    this.productsCollection = this.afs.collection<Product>('products');
    this.products = this.productsCollection.valueChanges();

    // getting selled items
    this.selledItemsCollection = this.afs.collection<any>('selled_items');

    // getting seller
    this.authService.user.subscribe(user => (this.user = user));
  }

  onQrSelected(qr) {
    this.idStudent = qr;
    this.studentSubscription = this.studentService.getStudentByDocId(qr).subscribe(student => {
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
    this.studentService.getProductsByDocumentId(this.selectedStudent.blocked_products).subscribe(result => {
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

  pay() {
    const entity = this.getSelledEntity();
    this.selledItemsCollection
      .add(entity)
      .then(result => {
        location.reload();
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }

  getSelledEntity() {
    const entity = {
      date: '02/08/2018',
      id_seller: this.user.uid,
      id_student: this.idStudent,
      products: this.selected,
      total_selled: this.subtotal
    };
    return entity;
  }
}
