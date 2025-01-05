import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.scss'],
})
export class ArtistFormComponent implements OnInit {
  artistForm: FormGroup;
  isEditMode: boolean = false;
  artistId: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private artistService: ArtistService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form group
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

    this.artistService.getArtistById(this.artistId).subscribe({
      next: (artist) => {
        // Patch the artist data to the form
        this.artistForm.patchValue({
          artistId: artist.artistId,
          name: artist.name,
          stageName: artist.stageName,
          albums: artist.albums,
          socialMedia: artist.socialMedia.join(', '), // Convert array to comma-separated string
          label: artist.label,
          publishingHouse: artist.publishingHouse,
          startDate: artist.startDate,
        });
        this.artistForm.get('artistId')?.disable(); // Disable editing artist ID
      },
      error: (err) => {
        console.error('Error loading artist:', err);
        alert('Failed to load artist. Please check the ID or try again later.');
        this.router.navigate(['/artists']);
      },
    });
  }

  // Handle file selection
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  // Submit the form
  onSubmit(): void {
    if (this.artistForm.invalid) return;

    const formData = new FormData();
    const artistData = this.artistForm.getRawValue();

    // Append form data
    for (const key in artistData) {
      if (key !== 'image') {
        formData.append(key, artistData[key]);
      }
    }

    // Append the selected file if available
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.isEditMode && this.artistId) {
      // Update artist
      this.artistService.updateArtist(this.artistId, formData).subscribe({
        next: () => {
          alert('Artist updated successfully!');
          this.router.navigate(['/artists']);
        },
        error: (err) => {
          console.error('Failed to update artist:', err);
          alert('Error updating artist. Please try again later.');
        },
      });
    } else {
      // Create artist
      this.artistService.createArtist(formData).subscribe({
        next: () => {
          alert('Artist created successfully!');
          this.router.navigate(['/artists']);
        },
        error: (err) => {
          console.error('Failed to create artist:', err);
          alert('Error creating artist. Please try again later.');
        },
      });
    }
  }
}
