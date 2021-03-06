import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { StudentComponent } from './student/student.component';
import { ChargeComponent } from './charge/charge.component';
import { ReportComponent } from './report/report.component';
import { AuthGuard } from '../shared/auth.guard';

const routes: Routes = [
  {
    path: 'parent',
    component: ParentComponent,
    canActivate: [AuthGuard],
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
      },
      {
        path: 'report',
        component: ReportComponent,
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
