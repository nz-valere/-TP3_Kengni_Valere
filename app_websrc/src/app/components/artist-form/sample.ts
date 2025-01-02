// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ArtistService } from '../../services/artist.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-artist-form',
//   standalone: true,
//   imports: [FormsModule, ReactiveFormsModule, CommonModule],
//   templateUrl: './artist-form.component.html',
//   styleUrls: ['./artist-form.component.scss'],
// })
// export class ArtistFormComponent implements OnInit {
//   isEditMode = false;
//   artistId: number = 0; // Auto-incremented ID
//   artistForm!: FormGroup;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private artistService: ArtistService,
//     private fb: FormBuilder
//   ) {}

//   ngOnInit(): void {
//     this.initializeForm();
//     this.artistId = this.getNextArtistId();

//     const routeArtistId = this.route.snapshot.paramMap.get('id');
//     if (routeArtistId) {
//       this.isEditMode = true;
//       this.artistId = parseInt(routeArtistId, 10);
//       this.loadArtist(this.artistId.toString());
//     }
//   }

//   initializeForm(): void {
//     this.artistForm = this.fb.group({
//       artistId: [this.artistId, Validators.required], // Auto-incremented ID
//       name: ['', Validators.required], // Artist Name
//       stageName: ['', Validators.required], // Stage Name
//       albums: [0, [Validators.required, Validators.min(0)]], // Number of Albums
//       rating: [0, [Validators.min(1), Validators.max(5)]], // Rating
//       image: [''], // Artist Image
//       startDate: ['', Validators.required], // Career Start Date
//       label: ['', Validators.required], // Label
//       publishingHouse: ['', Validators.required], // Publishing House
//       facebook: [''], // Optional Social Media
//       instagram: [''],
//       twitter: [''],
//       youtube: [''],
//     });
//   }
  

//   getNextArtistId(): number {
//     // Get the last artistId from local storage or initialize it to 1
//     const lastId = parseInt(localStorage.getItem('lastArtistId') || '0', 10);
//     const nextId = lastId + 1;
//     localStorage.setItem('lastArtistId', nextId.toString()); // Save the next ID
//     return nextId;
//   }

//   loadArtist(id: string): void {
//     this.artistService.getArtistById(id).subscribe({
//       next: (data) => {
//         this.artistForm.patchValue({
//           artistId: data.id,
//           name: data.artistName,
//           stageName: data.stageName,
//           albums: data.numberOfAlbums,
//           rating: data.rate,
//           image: data.image,
//           startDate: data.careerStartDate,
//           label: data.label,
//           publishingHouse: data.publishingHouse,
//           facebook: data.socialMedia?.facebook || '',
//           instagram: data.socialMedia?.instagram || '',
//           twitter: data.socialMedia?.twitter || '',
//           youtube: data.socialMedia?.youtube || '',
//         });
//       },
//       error: (err) => {
//         console.error('Error loading artist:', err);
//         alert('Failed to load artist data.');
//       },
//     });
//   }

//   onSubmit(): void {
//     console.log('Form Data:', this.artistForm.value);
    
//     if (this.artistForm.invalid) {
//       console.error('Form Validation Errors:', this.artistForm.errors);
//       alert('Please fill in all required fields.');
//       return;
//     }
  
//     const formData = new FormData();
//     Object.keys(this.artistForm.value).forEach((key) => {
//       formData.append(key, this.artistForm.value[key]);
//     });
  
//     if (this.selectedFile) {
//       formData.append('artistImage', this.selectedFile);
//     }
  
//     if (this.isEditMode) {
//       this.artistService.updateArtist(this.artistId.toString(), formData).subscribe({
//         next: () => {
//           alert('Artist updated successfully!');
//           this.router.navigate(['/']);
//         },
//         error: (err) => {
//           console.error('Error updating artist:', err);
//           alert('Failed to update artist.');
//         },
//       });
//     } else {
//       this.artistService.createArtist(formData).subscribe({
//         next: () => {
//           alert('Artist created successfully!');
//           this.artistForm.reset();
//           this.artistId = this.getNextArtistId();
//           this.artistForm.patchValue({ artistId: this.artistId });
//           this.router.navigate(['/']);
//           console.log('Form Data Submitted:', this.artistForm.value);

//         },
//         error: (err) => {
//           console.error('Error creating artist:', err);
//           alert('Failed to create artist.');
//         },
//       });
//     }
//   }
  
// }
