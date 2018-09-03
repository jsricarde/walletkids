import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';

export interface Product {
  name: string;
  url_image: string;
  price: Number;
  brand: string;
}

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  private productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  selected: Product[];
  constructor(private afs: AngularFirestore) {
    this.productsCollection = afs.collection<Product>('products');
    this.products = this.productsCollection.valueChanges();
  }

  ngOnInit() {}
}
