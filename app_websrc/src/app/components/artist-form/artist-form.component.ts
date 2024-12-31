import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-artist-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.scss']
})
export class ArtistFormComponent implements OnInit {
  userRating: number = 0;
  selectedFile: File | null = null;
  isEditMode = false;
  artistId: string | null = null;
  artistForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artistService: ArtistService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.artistId = this.route.snapshot.paramMap.get('id');

    if (this.artistId) {
      this.isEditMode = true;
      this.loadArtist(this.artistId);
    }
  }

  initializeForm() {
    this.artistForm = this.fb.group({
      artistName: ['', Validators.required],
      stageName: ['', Validators.required],
      numberOfAlbums: [0, [Validators.required, Validators.min(0)]],
      rate: [0, [Validators.min(1), Validators.max(5)]],
      careerStartDate: ['', Validators.required],
      label: ['', Validators.required],
      publishingHouse: ['', Validators.required],
      facebook: [''],
      instagram: [''],
      twitter: [''],
      youtube: ['']
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  loadArtist(id: string): void {
    this.artistService.getArtistById(id).subscribe({
      next: (data) => {
        // Populate the form with existing artist data
        this.artistForm.patchValue({
          artistName: data.artistName,
          stageName: data.stageName,
          numberOfAlbums: data.numberOfAlbums,
          rate: data.rate,
          careerStartDate: data.careerStartDate,
          label: data.label,
          publishingHouse: data.publishingHouse,
          facebook: data.socialMedia?.facebook || '',
          instagram: data.socialMedia?.instagram || '',
          twitter: data.socialMedia?.twitter || '',
          youtube: data.socialMedia?.youtube || ''
        });
      },
      error: (err) => {
        console.error('Error loading artist:', err);
        alert('Failed to load artist data.');
      }
    });
  }

  onSubmit(): void {
    if (this.artistForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    // Append form data
    Object.keys(this.artistForm.value).forEach((key) => {
      formData.append(key, this.artistForm.value[key]);
    });

    // Append the file if selected
    if (this.selectedFile) {
      formData.append('artistImage', this.selectedFile);
    }

    if (this.isEditMode && this.artistId) {
      // Update existing artist
      this.artistService.updateArtist(this.artistId, formData).subscribe({
        next: () => {
          alert('Artist updated successfully!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error updating artist:', err);
          alert('Failed to update artist.');
        }
      });
    } else {
      // Create new artist
      this.artistService.createArtist(formData).subscribe({
        next: (res) => {
          alert('Artist created successfully!');
          this.artistForm.reset();
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error creating artist:', err);
          alert('Failed to create artist.');
        }
      });
    }
  }
}
