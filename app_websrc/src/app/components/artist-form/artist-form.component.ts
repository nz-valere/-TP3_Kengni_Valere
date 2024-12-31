import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../../services/artist.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artist-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.scss']
})
export class ArtistFormComponent implements OnInit {
  artist: any = {
    id: '',
    name: '',
    stagename: '',
    label: '',
    
  };
  userRating: number = 0;
  // isEdit = false;
  isEditMode = false;

  artistForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artistService: ArtistService,
    private fb: FormBuilder, 
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.loadArtist(id);
      this.artistService.getArtistById(id.toString()).subscribe((data) => (this.artist = data));
      console.log(this.artist);
    }
  }

  initializeForm() {
    this.artistForm = this.fb.group({
      id: [this.artist.id], // Hidden ID field
      cropName: [this.artist.name, Validators.required],
      artiststagename: [this.artist.stagename, Validators.required],
      label: [this.artist.label, Validators.required],
      
    });
  }

  loadArtist(id: string): void {
    this.artistService.getArtistById(id).subscribe({
      next: (data) => {
        this.artistForm.patchValue(data);
      },
      error: (err) => console.error('Error loading the artist:', err)
    });
  }

  saveArtist(): void {
    if (this.isEditMode) {
      this.artistService.updateArtist(this.artist._id, this.artist).subscribe(() => this.router.navigate(['/']));
    } else {
      this.artistService.createArtist(this.artist).subscribe(() => this.router.navigate(['/']));
    }
  }

  onSubmit(): void {
    if (this.artistForm.invalid) {
      return;
    }

    const artistData = this.artistForm.value;

    if (this.isEditMode) {
      // Update existing artist
      this.artistService.updateArtist(artistData.id, artistData).subscribe({
        next: () => {
          alert('Artist updated successfully');
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error updating artist:', err)
      });
    } else {
      // Add new artist
      this.artistService.createArtist(artistData).subscribe({
        next: (res) => {
          console.log('artist created successfully:', res);
          alert('Artist added successfully');
          this.artistForm.reset();
          this.router.navigate(['/']);
        },
        error: (err) => {console.error('Error adding artist:', err);
        alert('Error creating an artist!');
        }
      });
    }
  }
}
