import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthUserComponent } from './component/auth-user/auth-user.component';
import { HeaderComponent } from './component/header/header.component';
import { MainComponent } from './component/main/main.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule,
    AngularFirestoreModule,
    SharedModule,
  ],
  declarations: [
    HeaderComponent,
    AuthUserComponent,
    MainComponent,
  ],
  exports: [
    MainComponent,
  ],
})
export class CoreModule {
}
