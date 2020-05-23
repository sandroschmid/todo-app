import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { InfoComponent } from './component/info/info.component';
import { LoadingComponent } from './component/loading/loading.component';

const materialModules = [
  MatToolbarModule,
  MatProgressBarModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
];

const declarations = [
  LoadingComponent,
  InfoComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ...materialModules,
  ],
  exports: [
    CommonModule,
    ...materialModules,
    ...declarations,
  ],
  declarations,
})
export class SharedModule {
}
