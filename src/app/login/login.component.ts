import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, initPages } from './auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loading = false;
  email = '';
  password = '';
  userType: 'pos' | 'parent' = null;
  error_message: string = null;
  userSubscription: Subscription = null;
  authServiceSubscription: Subscription = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authServiceSubscription = this.authService.user.subscribe(user => {
      if (user) {
        this.redirectToUserHome(user.uid);
      }
    });
  }

  login(valid) {
    if (valid) {
      this.loading = true;
      this.authService
        .login(this.email, this.password)
        .then(value => {
          this.redirectToUserHome(value.user.uid);
        })
        .catch(err => {
          this.error_message = 'Usuario o Password incorrectos';
        });
    }
  }

  redirectToUserHome(user: string) {
    let userTypeValidation = null;
    if (this.userType) {
      userTypeValidation =
        this.userType === 'parent' ? this.authService.validateParent(user) : this.authService.validatePos(user);
      this.userSubscription = userTypeValidation.subscribe(userData => {
        if (userData) {
          this.loading = false;
          this.redirect();
        } else {
          this.error_message = 'Usuario o Password incorrectos';
          this.loading = false;
        }
      });
    } else {
      this.userSubscription = this.authService.validateParent(user).subscribe(
        userData => {
          if (userData) {
            this.loading = false;
            this.userType = 'parent';
            this.redirect();
          } else {
            this.authService.validatePos(user).subscribe(posData => {
              this.userType = 'pos';
              this.loading = false;
              this.redirect();
            });
          }
        },
        error => (this.loading = false)
      );
    }
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.authServiceSubscription) {
      this.authServiceSubscription.unsubscribe();
    }
  }

  redirect() {
    this.router.navigate([initPages[this.userType]]);
  }
}
