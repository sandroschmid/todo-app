import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './component/header/header.component';
import { MainComponent } from './component/main/main.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
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