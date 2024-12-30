import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistRatingComponent } from './artist-rating.component';

describe('ArtistRatingComponent', () => {
  let component: ArtistRatingComponent;
  let fixture: ComponentFixture<ArtistRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
