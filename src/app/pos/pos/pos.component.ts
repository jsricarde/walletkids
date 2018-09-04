import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from '../../shared/sidenav.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {
  @ViewChild('sidenav')
  public sidenav: MatSidenav;
  constructor(private sidenavService: SidenavService) {}

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
