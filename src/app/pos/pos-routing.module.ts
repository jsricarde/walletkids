import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaleComponent } from './sale/sale.component';
import { PosComponent } from './pos/pos.component';
import { AuthGuard } from '../shared/auth.guard';

const routes: Routes = [
  {
    path: 'sale',
    component: PosComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: SaleComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule {}
