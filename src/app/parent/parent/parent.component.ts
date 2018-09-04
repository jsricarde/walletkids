import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from '../../shared/sidenav.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  @ViewChild('sidenav')
  public sidenav: MatSidenav;

  constructor(private sidenavService: SidenavService) {}

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
