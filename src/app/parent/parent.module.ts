import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentRoutingModule } from './parent-routing.module';
import { ParentComponent } from './parent/parent.component';
import { SharedModule } from '../shared/shared.module';
import { StudentComponent } from './student/student.component';
import { ComponentsModule } from '../components/components.module';
import { ChargeComponent } from './charge/charge.component';
import { ReportComponent } from './report/report.component';

@NgModule({
  imports: [CommonModule, ParentRoutingModule, SharedModule, ComponentsModule],
  declarations: [ParentComponent, StudentComponent, ChargeComponent, ReportComponent]
})
export class ParentModule {}
