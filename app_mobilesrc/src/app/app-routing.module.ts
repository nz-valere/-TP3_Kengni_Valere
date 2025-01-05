import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'homepage',
    loadChildren: () => import('./pages/homepage/homepage.module').then( m => m.HomepagePageModule),
    // canActivate: [AuthGuard], // Protect this route
  },
  {
    path: 'artist-detail',
    loadChildren: () => import('./pages/artist-detail/artist-detail.module').then( m => m.ArtistDetailPageModule)
  },
  {
    path: 'artist-detail/:id',
    loadChildren: () =>
      import('./pages/artist-detail/artist-detail.module').then((m) => m.ArtistDetailPageModule),
  },
  // {
  //   path: '**',
  //   redirectTo: 'homepage',
  // },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'artist-detail',
    loadChildren: () => import('./pages/artist-detail/artist-detail.module').then( m => m.ArtistDetailPageModule)
  },
  {
    path: 'homepage',
    loadChildren: () => import('./pages/homepage/homepage.module').then( m => m.HomepagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
