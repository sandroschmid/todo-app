import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUser } from '../../model/auth-user';
import { UtilityService } from '../../service/utility.service';

@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrls: ['./auth-user.component.scss'],
})
export class AuthUserComponent implements OnInit {

  public user$: Observable<AuthUser>;

  public constructor(private readonly router: Router,
                     private readonly fireAuth: AngularFireAuth,
                     private readonly utility: UtilityService) {
  }

  public ngOnInit(): void {
    this.user$ = this.utility.authUser$;
  }

  public async signOut(): Promise<void> {
    try {
      await this.fireAuth.signOut();
      await this.router.navigate(['/auth']);
    } catch (error) {
      const message = 'Could not sign out';
      console.error(message, error);
      this.utility.showMessage(message);
    }
  }

}
