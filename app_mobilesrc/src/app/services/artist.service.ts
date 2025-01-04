import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private baseUrl = 'https://tp3-kengni-valere-1.onrender.com/api/artists';

  constructor(private http: HttpClient) {}

  getArtists(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?page=${page}&limit=${limit}`);
  }

  // Get a single artist by ID
  getArtistById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // rateArtist(id: string, rating: number): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/${id}/rate`, { rating });
  // }

  // rateArtist(artistId: string, userId: string, rating: number): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/${artistId}/rate`, { userId, rating });
  // }
  
  rateArtist(artistId: string, payload: { userId: string; userRating: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/${artistId}/rate`, payload);
  }
  

}
