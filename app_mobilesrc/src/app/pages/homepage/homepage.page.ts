import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  artists: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  isLoading: boolean = false;
  searchQuery: string = '';

  constructor(private artistService: ArtistService) {}

  ngOnInit() {
    this.loadArtists();
  }

// Load artists with pagination
loadArtists(page: number = 1): void {
  if (this.isLoading || (this.totalPages && page > this.totalPages)) return;

  this.isLoading = true;
  this.artistService.getArtists(page, 100).subscribe(
    (data) => {
      this.artists = [...this.artists, ...data.artists];
      this.currentPage = data.currentPage;
      this.totalPages = data.totalPages;
      this.isLoading = false;
    },
    (error) => {
      console.error('Error loading artists:', error);
      this.isLoading = false;
    }
  );
}

 // Search for artists by name or stage name
 searchArtists() {
  if (this.searchQuery.trim() === '') {
    this.resetPagination();
    this.loadArtists();
    return;
  }

  this.artistService.getArtists(1, 100).subscribe(
    (data) => {
      this.artists = data.artists.filter((artist: any) =>
        artist.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        artist.stageName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    (error) => {
      console.error('Error searching artists:', error);
    }
  );
}

// Reset pagination
resetPagination() {
  this.artists = [];
  this.currentPage = 1;
  this.totalPages = 0;
}

// Handle infinite scroll
onScroll(event: any) {
  this.loadArtists(this.currentPage + 1);
  if (event) {
    event.target.complete();
  }
}

}
