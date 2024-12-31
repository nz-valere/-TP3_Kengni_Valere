import { Routes } from '@angular/router';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { ArtistFormComponent } from './components/artist-form/artist-form.component';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';
import { ArtistRatingComponent } from './components/artist-rating/artist-rating.component';

export const routes: Routes = [
  { path: '', component: ArtistListComponent }, // Default route
  { path: 'add', component: ArtistFormComponent },
  { path: 'edit/:id', component: ArtistFormComponent },
  { path: 'detail/:id', component: ArtistDetailComponent },
  { path: 'rating', component: ArtistRatingComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Wildcard route for invalid paths
];
