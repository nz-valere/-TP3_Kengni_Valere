import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-artist-rating',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artist-rating.component.html',
  styleUrl: './artist-rating.component.scss'
})
export class ArtistRatingComponent {

}
