import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';
import { AuthService } from '../../services/auth.service';
import { RatingModalComponent } from '../../components/rating-modal/rating-modal.component';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.page.html',
  styleUrls: ['./artist-detail.page.scss'],
})
export class ArtistDetailPage implements OnInit {

  artist: any;
  userId: string | null = null; // Initialize as null
  ratingForm: FormGroup;
  alertButtons = ['Dismiss'];

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private authService: AuthService,
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.ratingForm = this.formBuilder.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  ngOnInit() {
    // Retrieve the logged-in user's ID dynamically
    this.userId = this.authService.getUserId();
    if (!this.userId) {
      console.error('User ID is not available. Please log in.');
    }

    const artistId = this.route.snapshot.paramMap.get('id');
    this.artistService.getArtistById(artistId!).subscribe(
      (data) => {
        this.artist = data;
      },
      (error) => {
        console.error('Error fetching artist details:', error);
      }
    );
  }

  async openRatingModal() {
    const modal = await this.modalController.create({
      component: RatingModalComponent,
      componentProps: { artistId: this.artist._id },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.submitRating(data.rating);
      console.log('Received Rating Data:', data);
    }
  }

  followArtist() {
    alert('You are now following this artist!');
    }

  submitRating(rating: number) {
    if (!this.userId) {
      console.error('Cannot submit rating: User ID is not available.');
      return;
    }

    const payload = {
      userId: this.userId, // Use the dynamically retrieved user ID
      userRating: rating, // Match the backend's "userRating" key
    };

    console.log('Submitting payload to backend:', payload); // Debugging log

    this.artistService.rateArtist(this.artist._id, payload).subscribe(
      (response) => {
        console.log('Rating submitted successfully:', response);
        this.ngOnInit(); // Refresh artist details
      },
      (error) => {
        console.error('Error submitting rating:', error.error.message || error.message);
      }
    );
  }

  onScroll(event: any) {
    // this.loadArtists(this.currentPage + 1);
    if (event) {
      event.target.complete();
    }
  }
}
