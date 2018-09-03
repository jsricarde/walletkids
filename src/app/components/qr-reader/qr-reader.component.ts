import { Component, OnInit, Inject, ViewChild, Output } from "@angular/core";
import * as scanner from "@zxing/ngx-scanner";
import { Result } from "@zxing/library";
import { MatDialog } from "@angular/material";
import { ViewEncapsulation } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "app-qr-reader",
  templateUrl: "./qr-reader.component.html",
  styleUrls: ["./qr-reader.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class QrReaderComponent implements OnInit {
  @ViewChild("scanner")
  scanner: scanner.ZXingScannerComponent;
  hasCameras = false;
  hasPermission: boolean;
  qrResultString: string;
  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;

  @Output()
  qrSelected = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;
      this.availableDevices = devices;

      // selects the devices's back camera by default
      // for (const device of devices) {
      //     if (/back|rear|environment/gi.test(device.label)) {
      //         this.scanner.changeDevice(device);
      //         this.selectedDevice = device;
      //         break;
      //     }
      // }
    });

    this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
      console.error(
        "An error has occurred when trying to enumerate your video-stream-enabled devices."
      );
    });

    this.scanner.permissionResponse.subscribe((answer: boolean) => {
      this.hasPermission = answer;
    });
  }

  handleQrCodeResult(resultString: string) {
    this.qrSelected.emit(resultString);
  }

  onDeviceSelectChange(selectedValue: string) {
    this.selectedDevice = this.scanner.getDeviceById(selectedValue);
  }
}
