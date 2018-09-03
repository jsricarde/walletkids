import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrReaderComponent } from './qr-reader/qr-reader.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MAT_DIALOG_DATA } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ZXingScannerModule
  ],
  declarations: [QrReaderComponent],
  exports : [ QrReaderComponent ]
})
export class ComponentsModule { }
