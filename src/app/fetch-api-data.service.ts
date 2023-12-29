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

  /**
   * Method to register user
   * @param userDetails
   * @returns post request sent to the endpoint for registering user along with user details provided in form component
   * @throws error
   */
  public userRegistration(userDetails: any): Observable<any> {
    // Console logs the users details
    console.log(userDetails);

    // Method sends POST request with userDetails to the API endpoint for registering user
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Method to register user
   * @param userDetails
   * @returns post request sent to the endpoint for logging user in along with user details provided in form component
   */
  userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login?', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Method to delete user
   * @returns Delete request sent to the endpoint for logging user in along with username and JWT token extracted from local storage
   * @throws error
   */
  userDelete(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(apiUrl + 'users/' + user.Username);
    console.log(token);
    return this.http
      .delete(apiUrl + 'users/' + user.Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Method to update users username
   * @param userDetails
   * @returns Put request sent to the endpoint for logging user in along with username and JWT token extracted from local storage
   * @throws error
   */
  usernameUpdate(userDetails: any): Observable<any> {
    // Gets user object from local storage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log('Username: ', user.Username);
    console.log('Token, ', token);
    console.log('URL Enpoint Path ', apiUrl + 'users/' + user.Username);

    return this.http
      .put(apiUrl + 'users/' + user.Username, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Method to update users email
   * @param userDetails
   * @returns Put request sent to the endpoint for logging user in along with username and JWT token extracted from local storage
   * @throws error
   */
  emailUpdate(userDetails: any): Observable<any> {
    // Gets user object from local storage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log('Username: ', user.Username);
    console.log('Token, ', token);
    console.log('URL Enpoint Path ', apiUrl + 'users/' + user.Username);

    return this.http
      .put(apiUrl + 'users/' + user.Username, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Method to update users date of birth
   * @param userDetails
   * @returns Put request sent to the endpoint for logging user in along with username and JWT token extracted from local storage
   * @throws error
   */
  userDOBUpdate(userDetails: any): Observable<any> {
    // Gets user object from local storage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log('Username: ', user.Username);
    console.log('Token, ', token);
    console.log('URL Enpoint Path ', apiUrl + 'users/' + user.Username);

    // Method sends POST request with userDetails to the API endpoint for registering user
    return this.http
      .put(apiUrl + 'users/' + user.Username, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Method to retriieve all movies from database
   * @returns Get request sent to the endpoint for getting all movies along with JWT token extracted from local storage
   * @throws error
   */
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

  /**
   * Method to retrieve information on a single movie from database
   * @param movieID
   * @returns Get request sent to the endpoint for getting a single movie along with JWT token extracted from local storage
   * @throws error
   */
  addFavourite(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(movieID + ' added to favourites');
    user.FavouriteFilms.push(movieID);
    localStorage.setItem('user', JSON.stringify(user));

    return this.http
      .post(
        apiUrl + 'users/' + user.Username + '/movies/' + movieID,
        {},
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Method to remove a single movie from users favourites array
   * @param movieID
   * @returns Delete request sent to the endpoint for deleting movie from favourites array along with JWT token extracted from local storage
   * @throws error
   */
  removeFavourite(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(movieID + ' removed from favourites');
    const index = user.FavouriteFilms.indexOf(movieID);

    if (index >= 0) {
      user.FavouriteFilms.splice(index, 1);
    }
    localStorage.setItem('user', JSON.stringify(user));
    return this.http
      .delete(apiUrl + 'users/' + user.Username + '/movies/' + movieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Method to get information on a single movie
   * @param title
   * @returns Get request sent to the endpoint for getting information on single movie along with JWT token extracted from local storage
   * @throws error
   */
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

  /**
   * Method to get information on a director
   * @param directorName
   * @returns Get request sent to the endpoint for getting information director along with JWT token extracted from local storage
   * @throws error
   */
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

  /**
   * Method to get information on an actor
   * @param actorName
   * @returns Get request sent to the endpoint for getting information on an actor along with JWT token extracted from local storage
   * @throws error
   */
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
