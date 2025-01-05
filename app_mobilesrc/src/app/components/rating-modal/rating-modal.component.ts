import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.component.html',
  styleUrls: ['./rating-modal.component.scss'],
  imports: [IonicModule, ReactiveFormsModule],
  standalone: true
})
export class RatingModalComponent {
  @Input() artistId!: string; // Accept artist ID as input
  ratingForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.ratingForm = this.formBuilder.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  submitRating() {
    if (this.ratingForm.valid) {
      const ratingData = { artistId: this.artistId, ...this.ratingForm.value };
      console.log('Submitted Rating:', ratingData);
      this.modalController.dismiss(ratingData); // Dismiss with data
    }
  }

  dismissModal() {
    this.modalController.dismiss(); // Dismiss without data
  }
}
