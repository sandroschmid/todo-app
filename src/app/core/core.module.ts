import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './component/header/header.component';
import { MainComponent } from './component/main/main.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSnackBarModule,
    AngularFirestoreModule,
  ],
  declarations: [
    HeaderComponent,
    MainComponent,
  ],
  exports: [
    MainComponent,
  ],
})
export class CoreModule {
}
