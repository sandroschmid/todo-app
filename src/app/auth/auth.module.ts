import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './page/login-page/login-page.component';

@NgModule({
  imports: [
    AuthRoutingModule,
    SharedModule,
  ],
  declarations: [
    LoginPageComponent,
  ],
})
export class AuthModule {
}
