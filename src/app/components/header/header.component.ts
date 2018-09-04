import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from '../../login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger)
  trigger: MatMenuTrigger;
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {}

  openSidenav() {}

  logout() {
    this.authService.logout().then(_ => this.router.navigate(['/login']));
  }
}
