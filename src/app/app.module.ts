import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QrReaderComponent } from './components/qr-reader/qr-reader.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ComponentsModule } from './components/components.module';
import { MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { PosModule } from './pos/pos.module';
import { ParentModule } from './parent/parent.module';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    BrowserAnimationsModule,
    ZXingScannerModule.forRoot(),
    ComponentsModule,
    SharedModule,
    PosModule,
    ParentModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent],
  entryComponents: [QrReaderComponent]
})
export class AppModule {}
