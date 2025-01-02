import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule] ,
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.scss'],
})
export class ArtistFormComponent implements OnInit {
  artistForm: FormGroup;
  isEditMode: boolean = false;
  artistId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private artistService: ArtistService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.artistForm = this.fb.group({
      artistId: ['', [Validators.required]],
      image: [''],
      name: ['', [Validators.required]],
      stageName: ['', [Validators.required]],
      albums: [0, [Validators.min(0)]],
      socialMedia: [''],
      label: ['', [Validators.required]],
      publishingHouse: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Check if the route has an artist ID (edit mode)
    this.artistId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.artistId;

    if (this.isEditMode) {
      this.loadArtistData();
    }
  }

  // Load artist data in edit mode
  loadArtistData(): void {
    if (!this.artistId) {
      console.error('No artist ID provided.');
      return;
    }
  
    console.log('Loading artist with ID:', this.artistId);
  
    this.artistService.getArtistById(this.artistId).subscribe({
      next: (artist) => {
        this.artistForm.patchValue(artist);
        this.artistForm.get('artistId')?.disable(); // Disable editing artist ID
      },
      error: (err) => {
        console.error('Error loading artist:', err);
        alert('Failed to load artist. Please check the ID or try again later.');
        this.router.navigate(['/artists']); // Redirect back to the list on error
      },
    });
  }
  

  // Submit the form
  onSubmit(): void {
    if (this.artistForm.invalid) return;

    const artistData = this.artistForm.getRawValue(); // Get form data
    if (this.isEditMode && this.artistId) {
      // Update existing artist
      this.artistService.updateArtist(this.artistId, artistData).subscribe({
        next: () => {
          alert('Artist updated successfully!');
          this.router.navigate(['/artists']);
        },
        error: (err) => console.error('Failed to update artist:', err),
      });
    } else {
      // Create a new artist
      this.artistService.createArtist(artistData).subscribe({
        next: () => {
          alert('Artist created successfully!');
          this.router.navigate(['/artists']);
        },
        error: (err) => console.error('Failed to create artist:', err),
      });
    }
  }
}
