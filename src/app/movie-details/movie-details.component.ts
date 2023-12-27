import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FetchApiDataService } from '../fetch-api-data.service';

import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { DirectorComponentComponent } from '../director-component/director-component.component';
import { ActorDetailsComponent } from '../actor-details/actor-details.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent {
  movieDetails: {
    Title: string;
    Image: string;
    Plot: string;
    Actor: string;
    ActorBio: string;
    ActorImage: string;
    DirectorName: string;
    DirectorBio: string;
    DirectorImage: string;
    ID: string;
  } = {
    Title: '',
    Image: '',
    Plot: '',
    Actor: '',
    ActorBio: '',
    ActorImage: '',
    DirectorName: '',
    DirectorBio: '',
    DirectorImage: '',
    ID: '',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Access the movie title from the injected data

    this.movieDetails = {
      Title: this.data.title,
      Image: this.data.image,
      Plot: this.data.plot,
      Actor: this.data.actor,
      ActorBio: this.data.actorBio,
      ActorImage: this.data.actorImage,
      DirectorName: this.data.directorName,
      DirectorImage: this.data.directorImage,
      DirectorBio: this.data.directorBio,
      ID: this.data.movieID,
    };

    console.log('Movie Title:', this.movieDetails.Title);
  }

  isFavourited(movie: any): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    // console.log('FavouriteFilms:', user.FavouriteFilms);

    return user.FavouriteFilms.includes(this.movieDetails.ID);
  }

  // Function adds movie to favourites
  favouriteMovie(movie: any): void {
    this.fetchApiData
      .addFavourite(this.movieDetails.ID)
      .subscribe((response) => {
        console.log(response);
      });
  }

  // Function removes movie from favourites
  removeFavourite(movie: any): void {
    this.fetchApiData
      .removeFavourite(this.movieDetails.ID)
      .subscribe((response) => {
        console.log(response);
      });
  }

  getActor(movie: any): void {
    console.log('clicked');
    this.dialog.open(ActorDetailsComponent, {
      data: {
        actor: this.movieDetails.Actor,
        actorBio: this.movieDetails.ActorBio,
        actorImage: this.movieDetails.ActorImage,
      },
    });
  }

  // Function get director details
  getDirector(movie: any): void {
    this.dialog.open(DirectorComponentComponent, {
      data: {
        director: this.movieDetails.DirectorName,
        directorBio: this.movieDetails.DirectorBio,
        directorImage: this.movieDetails.DirectorImage,
      },
    });
  }
}
