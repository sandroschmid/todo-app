import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

const ROUTE_AUTH = 'auth';
const ROUTE_TODOS = 'todos';

const redirectUnauthorized = () => redirectUnauthorizedTo([ROUTE_AUTH]);
const redirectLoggedIn = () => redirectLoggedInTo(['/']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: `/${ROUTE_TODOS}`,
  },
  {
    path: ROUTE_AUTH,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    ...canActivate(redirectLoggedIn),
  },
  {
    path: ROUTE_TODOS,
    loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule),
    ...canActivate(redirectUnauthorized),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
