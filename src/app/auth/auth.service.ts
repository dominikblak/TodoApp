import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(public angularFire: AngularFireAuth, private router: Router) {
    angularFire.authState.subscribe(user => {
      this.user = user;
    });
  }
  login(email: string, password: string) {
    this.angularFire.auth.signInWithEmailAndPassword(email, password).then(user => {
      this.router.navigate(['/todoTask']);
    })
      .catch(err => {
        console.log(err);
      });
  }
  signup(email: string, password: string) {
    this.angularFire.auth.createUserWithEmailAndPassword(email, password).then(user => {
      console.log(user);
    })
      .catch(err => {
        console.log(err);
      });
  }
  logout() {
    this.angularFire.auth.signOut();
  }
}
