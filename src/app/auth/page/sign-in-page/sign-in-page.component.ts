import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { UtilityService } from '../../../core/service/utility.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
})
export class SignInPageComponent {

  public isLoading = false;

  public constructor(private readonly router: Router,
                     private readonly fireAuth: AngularFireAuth,
                     private readonly utility: UtilityService) {
  }

  public async signInWithGoogle(): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    this.signIn(provider);
  }

  public async signInWithGithub(): Promise<void> {
    const provider = new auth.GithubAuthProvider();
    provider.addScope('read:user');
    provider.addScope('user:email');
    this.signIn(provider);
  }

  private async signIn(provider: auth.AuthProvider): Promise<void> {
    this.isLoading = true;
    try {
      await this.fireAuth.signInWithRedirect(provider);
    } catch (error) {
      this.utility.showMessage('Could not sign in');
      console.error('Could not sign in', error);
    }
  }

}
