import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private apiUrl = 'http://localhost:5000/api/artists'; // Adjust if needed

  constructor(private http: HttpClient) {}

  // Get all artists
  getArtists(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  // Get a single artist by ID
  getArtistById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Create a new artist
  createArtist(artist: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, artist);
  }

  // Update an artist
  updateArtist(id: string, artist: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, artist);
  }

  // Delete an artist
  deleteArtist(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Rate an artist
  // rateArtist(id: string, rating: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/${id}/rate`, rating);
  // }
}
