import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [CommonModule, MatSidenavModule, MatDividerModule],
  declarations: [],
  exports: [MatSidenavModule, MatDividerModule]
})
export class SharedModule {}
