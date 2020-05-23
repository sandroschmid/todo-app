import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InfoComponent } from './component/info/info.component';
import { LoadingComponent } from './component/loading/loading.component';

const angularModules = [
  FormsModule,
  ReactiveFormsModule,
];

const firebaseModules = [
  AngularFireAuthModule,
];

const materialModules = [
  MatToolbarModule,
  MatProgressBarModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatButtonModule,
  MatTooltipModule,
];

const declarations = [
  LoadingComponent,
  InfoComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ...angularModules,
    ...firebaseModules,
    ...materialModules,
  ],
  exports: [
    CommonModule,
    ...angularModules,
    ...firebaseModules,
    ...materialModules,
    ...declarations,
  ],
  declarations,
})
export class SharedModule {
}
