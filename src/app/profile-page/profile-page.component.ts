import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

import { DirectorComponentComponent } from '../director-component/director-component.component';
import { ActorDetailsComponent } from '../actor-details/actor-details.component';

import { MovieDetailsComponent } from '../movie-details/movie-details.component';

// Router module to handle routing
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user: { Username: string; DOB: string; Email: string } | null = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  // Will run when component first intialises
  ngOnInit(): void {
    console.log(this.user?.Username);
    if (this.user) {
      this.user.DOB = this.user?.DOB.slice(0, 10);
    }

    this.getMovies();
  }

  // Function to open the profile page
  openHomePage(): void {
    this.router.navigate(['movies']);
  }

  openUpdateInfoPage(): void {
    this.router.navigate(['updateinfo']);
  }

  openConfirmDeleteDialog(): void {
    this.dialog.open(ConfirmDeleteComponent, {
      // Assigning the dialog width
      width: '280px',
    });
  }

  // Function uses the injected fetchApiData service to make an API call to the movies endpoint
  getMovies(): void {
    // Once response is received the variable movies is assigned the response data
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const favoriteMovies = resp.filter((movie: any) =>
        user.FavouriteFilms.includes(movie._id)
      );
      this.movies = favoriteMovies;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavourited(): any {
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    let favouriteFilms = user.FavouriteFilms || [];
    this.movies = favouriteFilms;
    console.log('user: ', user);
    console.log('favourite films: ', user.FavouriteFilms);

    // return this.movies;
  }

  isFavourited(movie: any): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    // console.log('FavouriteFilms:', user.FavouriteFilms);

    return user.FavouriteFilms.includes(movie._id);
  }

  // Function adds movie to favourites
  favouriteMovie(movie: any): void {
    this.fetchApiData.addFavourite(movie).subscribe((response) => {
      console.log(response);
    });
  }

  // Function removes movie from favourites
  removeFavourite(movie: any): void {
    this.fetchApiData.removeFavourite(movie._id).subscribe((response) => {
      console.log(response);
    });
  }

  // Function get director details
  getDirector(movie: any): void {
    this.fetchApiData.getMovie('goldeneye').subscribe((resp: any) => {});

    this.dialog.open(DirectorComponentComponent, {
      data: {
        director: movie.Director.Name,
        directorBio: movie.Director.Bio,
        directorImage: movie.Director.DirectorImage,
      },
    });
  }

  // Function get director details
  getActor(movie: any): void {
    this.dialog.open(ActorDetailsComponent, {
      data: {
        actor: movie.Actor.Name,
        actorBio: movie.Actor.Bio,
        actorImage: movie.Actor.ActorImage,
      },
    });
  }

  // Function get movie details
  getMovie(movie: any): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: movie.Title,
        image: movie.ImageURL,
        plot: movie.Description,
        actor: movie.Actor.Name,
        actorBio: movie.Actor.Bio,
        actorImage: movie.Actor.ActorImage,
        directorName: movie.Director.Name,
        directorImage: movie.Director.DirectorImage,
        directorBio: movie.Director.Bio,
        movieID: movie._id,
      },
    });
  }
}
