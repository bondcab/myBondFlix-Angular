import { Component, OnInit } from '@angular/core';
// These brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// Router module to handle routing
import { Router } from '@angular/router';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatDialog } from '@angular/material/dialog';
import { DirectorComponentComponent } from '../director-component/director-component.component';
import { ActorDetailsComponent } from '../actor-details/actor-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  // Injects an instance of the FetchApiDataService into the component
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  // Will run getMovies() function when component first intialises
  ngOnInit(): void {
    this.getMovies();
  }

  isFavourited(movie: any): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    // console.log('FavouriteFilms:', user.FavouriteFilms);

    return user.FavouriteFilms.includes(movie._id);
  }

  // Function uses the injected fetchApiData service to make an API call to the movies endpoint
  getMovies(): void {
    // Once response is received the variable movies is assigned the response data
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  // Function to open the profile page
  openProfile(): void {
    this.router.navigate(['profile']);
  }

  // Logs user out
  logOut(): void {
    this.router.navigate(['welcome']);
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

  // Function adds movie to favourites
  favouriteMovie(movie: any): void {
    this.fetchApiData.addFavourite(movie._id).subscribe((response) => {
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
}
