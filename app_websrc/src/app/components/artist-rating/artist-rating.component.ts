import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.scss']
})
export class ArtistFormComponent implements OnInit {
  artistForm!: FormGroup;
  selectedFile: File | null = null;
  isEditMode: boolean = false;
  artistId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
    this.artistForm = this.fb.group({
      artistName: ['', Validators.required],
      stageName: ['', Validators.required],
      numberOfAlbums: [0, [Validators.required, Validators.min(0)]],
      careerStartDate: ['', Validators.required],
      label: ['', Validators.required],
      publishingHouse: ['', Validators.required]
    });

    this.artistId = this.route.snapshot.paramMap.get('id');
    if (this.artistId) {
      this.isEditMode = true;
      this.loadArtistData(this.artistId);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  loadArtistData(id: string): void {
    this.artistService.getArtistById(id).subscribe({
      next: (artist) => this.artistForm.patchValue(artist),
      error: (err) => console.error(err)
    });
  }

  onSubmit(): void {
    if (this.artistForm.valid) {
      const formData = new FormData();
      formData.append('artistName', this.artistForm.value.artistName);
      formData.append('stageName', this.artistForm.value.stageName);
      formData.append('numberOfAlbums', this.artistForm.value.numberOfAlbums);
      formData.append('careerStartDate', this.artistForm.value.careerStartDate);
      formData.append('label', this.artistForm.value.label);
      formData.append('publishingHouse', this.artistForm.value.publishingHouse);

      if (this.selectedFile) {
        formData.append('artistImage', this.selectedFile);
      }

      if (this.isEditMode && this.artistId) {
        this.artistService.updateArtist(this.artistId, formData).subscribe(() => this.router.navigate(['/']));
      } else {
        this.artistService.createArtist(formData).subscribe(() => this.router.navigate(['/']));
      }
    }
  }
}
