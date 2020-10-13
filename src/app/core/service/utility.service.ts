import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthProvider } from '../model/auth-provider';
import { AuthUser } from '../model/auth-user';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {

  public readonly authUser$: Observable<AuthUser>;

  public constructor(fireAuth: AngularFireAuth,
                     private readonly snackBar: MatSnackBar) {
    this.authUser$ = fireAuth.user.pipe(map(user => {
      let authUser: AuthUser;
      if (user && user.providerData) {
        for (const data of user.providerData) {
          if (data.providerId === 'google.com') {
            authUser = {
              displayName: data.displayName,
              email: data.email,
              photoUrl: data.photoURL,
              provider: AuthProvider.Google,
            };
            break;
          } else if (data.providerId === 'github.com') {
            authUser = {
              displayName: data.displayName,
              email: data.email,
              photoUrl: data.photoURL,
              provider: AuthProvider.Github,
            };
            break;
          }
        }
      }

      if (authUser) {
        console.log('User email=%s, provider=%s', authUser.email, authUser.provider || 'Unknown');
      } else {
        console.log('No user is authenticated');
      }

      return authUser;
    }));
  }

  public showMessage(message: string): void {
    this.snackBar.open(message, 'OK', { duration: 1000 });
  }

}
