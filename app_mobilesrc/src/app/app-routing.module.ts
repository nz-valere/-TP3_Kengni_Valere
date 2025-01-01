import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
  {
    path: 'homepage',
    loadChildren: () => import('./pages/homepage/homepage.module').then( m => m.HomepagePageModule)
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
  {
    path: '**',
    redirectTo: 'homepage',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
