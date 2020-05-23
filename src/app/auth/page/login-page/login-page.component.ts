import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {

  public loggingIn = false;

  public constructor(private readonly router: Router,
                     private readonly fireAuth: AngularFireAuth) {
  }

  public async loginGoogle(): Promise<void> {
    this.loggingIn = true;
    await this.fireAuth.signInWithPopup(new auth.GoogleAuthProvider());
    await this.router.navigate(['/']);
  }

}
