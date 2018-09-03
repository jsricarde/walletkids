import { Component, OnInit } from '@angular/core';
import {
  AngularFirestoreDocument,
  AngularFirestore
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../login/auth.service';

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
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.css']
})
export class ChargeComponent implements OnInit {
  private studentDoc: AngularFirestoreDocument<Student>;
  private fatherDoc: AngularFirestoreDocument<any>;
  chargeData = 0;
  balance = 0;
  student: Observable<Student>;
  father: Observable<any>;

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    auth.user.subscribe((result: any) => {
      const fatherId = result.uid;
      auth.validateParent(fatherId).subscribe((father: any) => {
        const studentId = father.id_student;
        this.studentDoc = afs.doc<Student>(`students/${studentId}`);
        this.student = this.studentDoc.valueChanges();
        this.student.subscribe(student => {
          this.balance = +student.balance;
        });
      });
    });
  }

  ngOnInit() {}

  onUpdateCharge() {
    const updateBalance = +this.chargeData + this.balance;
    this.studentDoc.update({ balance: updateBalance });
  }
}
