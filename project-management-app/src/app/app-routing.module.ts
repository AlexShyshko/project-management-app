import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { IncorrectPageComponent } from './core/incorrect-page/incorrect-page.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./core/core.module').then((m) => m.CoreModule) },
  {
    path: 'main',
    loadChildren: () => import('./boards/boards.module').then((m) => m.BoardsModule),
    canActivate: [AuthGuard],
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path: 'signup', loadChildren: () => import('./auth/sign-up/sign-up.module').then((m) => m.SignUpModule) },
  {
    path: 'edit-profile',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
  },
  { path: '**', component: IncorrectPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
