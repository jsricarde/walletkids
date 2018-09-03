import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { StudentComponent } from './student/student.component';
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule {}
