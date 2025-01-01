import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModalComponent } from '../../components/rating-modal/rating-modal.component';

import { IonicModule } from '@ionic/angular';

import { ArtistDetailPageRoutingModule } from './artist-detail-routing.module';

import { ArtistDetailPage } from './artist-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ArtistDetailPageRoutingModule
  ],
  declarations: [ArtistDetailPage, RatingModalComponent],
})
export class ArtistDetailPageModule {}
