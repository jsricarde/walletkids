import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrReaderComponent } from './qr-reader/qr-reader.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ZXingScannerModule,
    SharedModule
  ],
  declarations: [QrReaderComponent, HeaderComponent],
  exports : [ QrReaderComponent, HeaderComponent ]
})
export class ComponentsModule { }
