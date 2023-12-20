import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// URL for API calls
const apiUrl = 'https://bond-flix-9c1709905a90.herokuapp.com/';

// Marks class as injectable service and specifies Angular should provide the service at the root
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Typescript class constructor. Can't be accessed outside the class. Provides HttpClient to entire class
  constructor(private http: HttpClient) {}

  public userRegistration(userDetails: any): Observable<any> {
    // Console logs the users details
    console.log(userDetails);

    // Method sends POST request with userDetails to the API endpoint for registering user
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // User login endpoint
  userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login?', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Unregister user endpoint
  userDelete(userDetails: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http
      .delete(apiUrl + user.userName, {})
      .pipe(catchError(this.handleError));
  }

  // Update user information endpoint
  userUpdate(userDetails: any): Observable<any> {
    const user = localStorage.getItem('user');
    return this.http
      .put(apiUrl + 'users/' + user, {})
      .pipe(catchError(this.handleError));
  }

  // Get data for all movies endpoint
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Adding favourite movie endpoint
  addFavourite(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.FavoriteMovies.push(movieID);
    return this.http
      .post(apiUrl + 'users/' + user + 'movies' + movieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Remove favourite movie point
  removeFavourite(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const index = user.FavoriteMovies.indexOf(movieID);
    if (index >= 0) {
      user.FavoriteMovies.splice(index, 1);
    }
    return this.http
      .delete(apiUrl + 'users/' + user + 'movies/' + movieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get data on one movie endpoint
  getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get data on one director endpoint
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get data on actor endpoint
  getActor(actorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + actorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Method is only accessible to this class. Responsble for handling HTTP errors
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
