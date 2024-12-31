import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-artist-detail',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './artist-detail.component.html',
  styleUrl: './artist-detail.component.scss'
})
export class ArtistDetailComponent implements OnInit {
  artist: any = {};
  userRating: number = 0;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private artistService: ArtistService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    if(id) {
      this.artistService.getArtistById(id.toString()).subscribe({
        next: (data) => {
          this.artist = data
          this.errorMessage = null;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = err.error.message || 'An error occurred while fetching the artist.';
        }
      });
    }else {
      this.errorMessage = 'Invalid artist ID.';
    }
  }

  submitRating(): void {
    const id = this.artist._id;
    this.artistService.rateArtist(id, { userId: 'user123', userRating: this.userRating }).subscribe((data) => {
      this.artist.rating = data.averageRating;
      alert('Rating submitted successfully');
    });
  }

  deleteArtist(id: string): void {
    this.artistService.deleteArtist(id.toString()).subscribe(() => {
      alert('Artist deleted successfully');
      this.router.navigate(['/']);
    });
  }
}
