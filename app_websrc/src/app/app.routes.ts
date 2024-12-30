import { Routes } from '@angular/router';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';
import { ArtistFormComponent } from './components/artist-form/artist-form.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { ArtistRatingComponent } from './components/artist-rating/artist-rating.component';

export const routes: Routes = [
    {
        path: '', 
        component: ArtistListComponent
    },
    {
        path: '', 
        component: ArtistFormComponent
    },
    {
        path: 'detail/:id', 
        component: ArtistDetailComponent
    },
    {
        path: 'rating', 
        component: ArtistRatingComponent
    }
];
