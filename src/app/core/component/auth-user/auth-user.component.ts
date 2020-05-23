import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrls: ['./auth-user.component.scss'],
})
export class AuthUserComponent {

  public constructor(private readonly router: Router,
                     public readonly fireAuth: AngularFireAuth) {
  }

  public async signOut(): Promise<void> {
    await this.fireAuth.signOut();
    await this.router.navigate(['/auth']);
  }

}
