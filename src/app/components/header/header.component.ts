import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from '../../login/auth.service';
import { Router } from '@angular/router';
import { SidenavService } from '../../shared/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger)
  trigger: MatMenuTrigger;
  constructor(public authService: AuthService, private router: Router, private sidenavService: SidenavService) {}

  ngOnInit() {}

  openSidenav() {
    this.sidenavService.toggle().then(() => {});
  }

  logout() {
    this.authService.logout().then(_ => this.router.navigate(['/login']));
  }
}
