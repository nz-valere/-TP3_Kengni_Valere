import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';
import { RatingModalComponent } from '../../components/rating-modal/rating-modal.component'

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.page.html',
  styleUrls: ['./artist-detail.page.scss'],
})
export class ArtistDetailPage implements OnInit {
  artist: any;
  userId: string = 'uniqueUserId';
  ratingForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.ratingForm = this.formBuilder.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  ngOnInit() {
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

  submitRating(rating: number) {
    const payload = {
      userId: this.userId, // Replace with actual user management logic
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
  
}
