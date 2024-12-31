import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';
import { CommonModule } from '@angular/common';
import { artist } from '../../types/artist';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-artist-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artist-list.component.html',
  styleUrl: './artist-list.component.scss'
})
export class ArtistListComponent implements OnInit{
  artists: any[] = [];
  currentPage = 1;
  limit = 5;
  totalArtists = 0;
  totalPages = 0;

  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    this.loadArtists();
  }

  loadArtists(page: number = 1): void {
    this.artistService.getArtists(page, 4).subscribe((data) => {
      this.artists = data.artists;
      this.currentPage = data.currentPage;
      this.totalPages = data.totalPages;
    });
  }

  paginate(page: number): void {
    this.currentPage = page;
    this.loadArtists();
  }

  deleteArtist(id: string): void {
    this.artistService.deleteArtist(id).subscribe(() => this.loadArtists(this.currentPage));
  }
}
