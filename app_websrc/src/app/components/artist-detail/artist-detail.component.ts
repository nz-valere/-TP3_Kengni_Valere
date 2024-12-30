import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-artist-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './artist-detail.component.html',
  styleUrl: './artist-detail.component.scss'
})
export class ArtistDetailComponent implements OnInit {
  artist: any = {};
  userRating: number = 0;

  constructor(private route: ActivatedRoute, private artistService: ArtistService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.artistService.getArtistById(id).subscribe((data) => (this.artist = data));
  }

  submitRating(): void {
    const id = this.artist._id;
    this.artistService.rateArtist(id, { userId: 'user123', userRating: this.userRating }).subscribe((data) => {
      this.artist.rating = data.averageRating;
      alert('Rating submitted successfully');
    });
  }
}
