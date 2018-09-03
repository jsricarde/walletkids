import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../login/auth.service';

/**
 * The AuthGuard Service
 *
 * This is th auth guard service to manage the session on the site.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * @constructor AuthGuard
   * @param {AuthService} authService - AuthService instance.
   * @param {Router} router - Router instance.
   */
  constructor(private auth: AuthService, private router: Router) {}

  /**
   * The canActivate function
   *
   * @type {ActivatedRouteSnapshot} next - ActivatedRouteSnapshot instance.
   * @type {RouterStateSnapshot} state - RouterStateSnapshot instance.
   * @return auth - Return an auth.user instance from firebase service.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user.pipe(
      take(1),
      map(authState => !!authState),
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
