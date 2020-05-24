import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInPageComponent } from './page/sign-in-page/sign-in-page.component';

@NgModule({
  imports: [
    AuthRoutingModule,
    SharedModule,
  ],
  declarations: [
    SignInPageComponent,
  ],
})
export class AuthModule {
}
