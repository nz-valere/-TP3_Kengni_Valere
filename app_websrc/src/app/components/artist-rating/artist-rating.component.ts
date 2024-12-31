import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-artist-rating',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artist-rating.component.html',
  styleUrl: './artist-rating.component.scss'
})
export class ArtistRatingComponent {
  authors = [
    {
      name: 'John Michael',
      email: 'john@creative-tim.com',
      image: 'https://via.placeholder.com/40',
      function: { role: 'Manager', department: 'Organization' },
      status: 'ONLINE',
      employed: '23/04/18',
    },
    {
      name: 'Alexa Liras',
      email: 'alexa@creative-tim.com',
      image: 'https://via.placeholder.com/40',
      function: { role: 'Programmer', department: 'Developer' },
      status: 'OFFLINE',
      employed: '11/01/19',
    },
    {
      name: 'Laurent Perrier',
      email: 'laurent@creative-tim.com',
      image: 'https://via.placeholder.com/40',
      function: { role: 'Executive', department: 'Projects' },
      status: 'ONLINE',
      employed: '19/09/17',
    },
    {
      name: 'Michael Levi',
      email: 'michael@creative-tim.com',
      image: 'https://via.placeholder.com/40',
      function: { role: 'Programmer', department: 'Developer' },
      status: 'ONLINE',
      employed: '24/12/08',
    },
    {
      name: 'Richard Gran',
      email: 'richard@creative-tim.com',
      image: 'https://via.placeholder.com/40',
      function: { role: 'Manager', department: 'Executive' },
      status: 'OFFLINE',
      employed: '04/10/21',
    },
    {
      name: 'Miriam Eric',
      email: 'miriam@creative-tim.com',
      image: 'https://via.placeholder.com/40',
      function: { role: 'Programmer', department: 'Developer' },
      status: 'OFFLINE',
      employed: '14/09/20',
    },
  ];

  editAuthor(author: any): void {
    alert(`Edit author: ${author.name}`);
  }
}
