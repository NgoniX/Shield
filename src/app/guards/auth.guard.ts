import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import * as firebase from 'firebase';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
        resolve(true);
        console.log('User apinda');
        } else {
        // No user is signed in.
        resolve(false);
        this.router.navigateByUrl('/login');
        console.log('Aiwa zvadhakwa');
        }
      });
    });
  }
}
