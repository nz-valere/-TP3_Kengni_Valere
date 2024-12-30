import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-artist-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.scss']
})
export class ArtistFormComponent implements OnInit {
  artist: any = {};
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.artistService.getArtistById(id).subscribe((data) => (this.artist = data));
    }
  }

  saveArtist(): void {
    if (this.isEdit) {
      this.artistService.updateArtist(this.artist._id, this.artist).subscribe(() => this.router.navigate(['/']));
    } else {
      this.artistService.createArtist(this.artist).subscribe(() => this.router.navigate(['/']));
    }
  }
}
