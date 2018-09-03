import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { StudentComponent } from './student/student.component';
import { ChargeComponent } from './charge/charge.component';

const routes: Routes = [
  {
    path: 'parent',
    component: ParentComponent,
    children: [
      {
        path: '',
        component: StudentComponent,
        pathMatch: 'full'
      },
      {
        path: 'charge',
        component: ChargeComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule {}
