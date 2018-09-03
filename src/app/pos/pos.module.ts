import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRoutingModule } from './pos-routing.module';
import { SaleComponent } from './sale/sale.component';
import { PosComponent } from './pos/pos.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [CommonModule, PosRoutingModule, SharedModule, ComponentsModule],
  declarations: [SaleComponent, PosComponent]
})
export class PosModule {}
