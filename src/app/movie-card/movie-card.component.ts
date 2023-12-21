import { Component, OnInit } from '@angular/core';
// These brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  // Injects an instance of the FetchApiDataService into the component
  constructor(public fetchApiData: FetchApiDataService) {}

  // Will run getMovies() function when component first intialises
  ngOnInit(): void {
    this.getMovies();
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
}
